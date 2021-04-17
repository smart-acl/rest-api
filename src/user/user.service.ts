import {Injectable} from '@nestjs/common';
import {HttpStatus} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import {validate} from 'class-validator';
import {Repository, getRepository} from 'typeorm';

import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import {UserEntity} from './user.entity';
import {UserRO} from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {
    }

    async findOne({email, password}: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({email});
        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            return user;
        }

        return null;
    }

    async create(dto: CreateUserDto): Promise<UserRO> {
        const {username, email, password} = dto;
        const qb = await getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', {username})
            .orWhere('user.email = :email', {email});

        const user = await qb.getOne();

        if (user) {
            const errors = {username: 'Username and email must be unique.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        const newUser = new UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'userinput is not valid'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return UserService.buildUserRO(savedUser);
        }
    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        const toUpdate = await this.userRepository.findOne(id);
        delete toUpdate.password;

        const updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            const errors = {User: ' not found'};
            throw new HttpException({errors}, 401);
        }

        return UserService.buildUserRO(user);
    }

    async findByEmail(email: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({email: email});

        if (!user) {
            return null;
        }

        return UserService.buildUserRO(user);
    }

    private static buildUserRO(user: UserEntity): UserRO {
        const userRO = {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image,
        };

        return {user: userRO};
    }
}
