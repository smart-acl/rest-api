import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';

import {PermissionsService} from 'src/permissions/permissions.service';
import {UserEntity} from 'src/user/user.entity';
import {UserService} from 'src/user/user.service';
import {DuplicateException} from 'src/utils/exceptions/dto';
import {EntityException} from 'src/utils/exceptions/entities';

import {
    CreateGroupDto,
    PushPermissionsDto,
} from './dto';
import {PermissionsGroupsEntity, PermissionsGroupsMapEntity} from './permissionGroups.entity';
import {createBulkGroupPermissions, popBulkGroupPermissions} from './utils/bulk';

@Injectable()
export class PermissionGroupsService {
    constructor(
        @InjectRepository(PermissionsGroupsEntity)
        private readonly permissionsGroupsRepository: Repository<PermissionsGroupsEntity>,
        @InjectRepository(PermissionsGroupsMapEntity)
        private readonly permissionsGroupsMapRepository: Repository<PermissionsGroupsMapEntity>,
        private readonly userService: UserService,
        private readonly permissionsService: PermissionsService,
        @InjectConnection()
        private readonly connection: Connection,
    ) {}

    requestAll() {
        return this.permissionsGroupsRepository.find();
    }

    async createOne(body: CreateGroupDto): Promise<{message: string; isOk: boolean}> {
        try {
            const group = new PermissionsGroupsEntity();
            group.name = body.name;

            const result = await this.permissionsGroupsRepository.save(group);
            const preparedPermissions = await this.prepareCreatePermissionsGroup(result, body.permissions);
            await createBulkGroupPermissions(this.connection, preparedPermissions);

            return {message: 'ok', isOk: true};
        } catch (_error) {
            if (_error.toString().includes('duplicate')) {
                throw new DuplicateException();
            }

            return {message: 'save error', isOk: false};
        }
    }

    async push(body: PushPermissionsDto): Promise<void> {
        const result = await this.permissionsGroupsRepository.findOne({
            name: body.name,
        });

        if (!result) {
            throw new NotFoundException();
        }

        const preparedPermissions = await this.prepareCreatePermissionsGroup(result, body.permissions);
        await createBulkGroupPermissions(this.connection, preparedPermissions);
    }

    async pop(body: PushPermissionsDto): Promise<void> {
        const result = await this.permissionsGroupsRepository.findOne({
            name: body.name,
        });

        if (!result) {
            throw new NotFoundException();
        }

        const preparedPermissions = await this.prepareCreatePermissionsGroup(result, body.permissions);
        await popBulkGroupPermissions(this.connection, preparedPermissions);
    }

    private async prepareCreatePermissionsGroup(
        group: PermissionsGroupsEntity,
        permissions: CreateGroupDto['permissions'],
    ): Promise<PermissionsGroupsMapEntity[]> {
        const result: PermissionsGroupsMapEntity[] = [];

        for await (const user of permissions) {
            for await (const permission of permissions) {
                const entity = new PermissionsGroupsMapEntity();
                entity.group = group;

                const permissionEntity = await this.permissionsService.findOne(permission);
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
