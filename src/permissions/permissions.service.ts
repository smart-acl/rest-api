import {Injectable} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';

import {UserEntity} from 'src/user/user.entity';
import {UserService} from 'src/user/user.service';
import {DuplicateException} from 'src/utils/exceptions/dto';
import {EntityException} from 'src/utils/exceptions/entities';

import {
    CreatePermissionDto,
    SetUserPermissionsDto,
} from './dto';
import {PermissionsEntity, UserPermissionsEntity} from './permissions.entity';
import {setBulkPermissions, unsetBulkPermissions} from './utils/bulk';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionsEntity)
        private readonly permissionsRepository: Repository<PermissionsEntity>,
        @InjectRepository(UserPermissionsEntity)
        private readonly userPermissionsRepository: Repository<UserPermissionsEntity>,
        private readonly userService: UserService,
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    findOne(name: string) {
        return this.permissionsRepository.findOne({name});
    }

    requestAll() {
        return this.permissionsRepository.find();
    }

    requestAllByUser(user: UserEntity) {
        return this.userPermissionsRepository.find({
            relations: ['permission'],
            where: {user},
        });
    }

    async createOne(body: CreatePermissionDto): Promise<{message: string; isOk: boolean}> {
        try {
            await this.permissionsRepository.save(body);
            return {message: 'ok', isOk: true};
        } catch (_error) {
            if (_error.toString().includes('duplicate')) {
                throw new DuplicateException();
            }

            return {message: 'save error', isOk: false};
        }
    }

    async set(body: SetUserPermissionsDto) {
        await setBulkPermissions(
            this.connection,
            await this.prepareSetUserPermissions(body),
        );
    }

    async unset(body: SetUserPermissionsDto) {
        await unsetBulkPermissions(
            this.connection,
            await this.prepareSetUserPermissions(body),
        );
    }

    private async prepareSetUserPermissions(
        {users, permissions}: SetUserPermissionsDto,
    ): Promise<UserPermissionsEntity[]> {
        const result: UserPermissionsEntity[] = [];

        for await (const user of users) {
            for await (const permission of permissions) {
                const entity = new UserPermissionsEntity();

                const userEntity = await this.userService.findById(user);
                if (!userEntity) {
                    throw new EntityException('user', user);
                }
                entity.user = userEntity;

                const permissionEntity = await this.permissionsRepository.findOne({name: permission});
                if (!permissionEntity) {
                    throw new EntityException('permission', permission);
                }
                entity.permission = permissionEntity;

                result.push(entity);
            }
        }

        return result;
    }
}
