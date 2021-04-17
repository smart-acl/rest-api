import {Param, HttpStatus, Get, Post, Body, Controller, UseGuards} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {JwtService} from '@nestjs/jwt';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import omit from 'lodash/omit';

import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {CreateUserDto, LoginUserDto} from './dto';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {User} from './user.decorator';
import {UserEntity} from './user.entity';
import {UserRO, TokenResponse} from './user.interface';
import {UserService} from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:email')
    async findUser(@Param('email', ValidationPipe) email: string): Promise<UserRO> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpException({message: 'no user'}, HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async findMe(@User() user: UserEntity): Promise<UserRO> {
        return {user: user};
    }

    @Post('register')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @Post('login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<TokenResponse> {
        const user = await this.userService.findOne(loginUserDto);

        const errors = {User: 'not found'};
        if (!user) {
            throw new HttpException({errors}, HttpStatus.UNAUTHORIZED);
        }

        const token = this.jwtService.sign(omit(user, ['password']));
        return {access_token: token};
    }
}
