import {Injectable} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';

import {UserService} from 'src/user/user.service';

import {
    CreatePermissionDto,
    SetUserPermissionsDto,
} from './dto';
import {DuplicateException} from './exceptions/dto';
import {EntityException} from './exceptions/entities';
import {PermissionsEntity, UserPermissionsEntity} from './permissions.entity';
import {bulkPermissions} from './utils/bulk';

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

    requestAll() {
        return this.permissionsRepository.find();
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
        await bulkPermissions(
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
