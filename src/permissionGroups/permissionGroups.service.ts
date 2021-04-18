import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectRepository} from '@nestjs/typeorm';
import {Repository, Connection} from 'typeorm';

import {PermissionsEntity} from 'src/permissions/permissions.entity';
import {PermissionsService} from 'src/permissions/permissions.service';
import {setBulkPermissions, unsetBulkPermissions} from 'src/permissions/utils/bulk';
import {UserService} from 'src/user/user.service';
import {DuplicateException} from 'src/utils/exceptions/dto';

import {
    CreateGroupDto,
    PushPermissionsDto,
    SetGroupToUserDto,
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
            const permissionsEntities = await this.preparePermissionsList(body.permissions);
            const preparedPermissions = await this.preparePermissionsGroup(result, permissionsEntities);
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
        const group = await this.permissionsGroupsRepository.findOne({
            name: body.name,
        });

        if (!group) {
            throw new NotFoundException('group not found');
        }

        const permissionsEntities = await this.preparePermissionsList(body.permissions);
        const preparedPermissions = await this.preparePermissionsGroup(group, permissionsEntities);
        await createBulkGroupPermissions(this.connection, preparedPermissions);
    }

    async pop(body: PushPermissionsDto): Promise<void> {
        const result = await this.permissionsGroupsRepository.findOne({
            name: body.name,
        });

        if (!result) {
            throw new NotFoundException('group not found');
        }

        const permissionsEntities = await this.preparePermissionsList(body.permissions);
        const preparedPermissions = await this.preparePermissionsGroup(result, permissionsEntities);
        await popBulkGroupPermissions(this.connection, preparedPermissions);
    }

    async set(body: SetGroupToUserDto): Promise<void> {
        await (this.makeSetGroupToUserAction(setBulkPermissions)(body));
    }

    async unset(body: SetGroupToUserDto): Promise<void> {
        await (this.makeSetGroupToUserAction(unsetBulkPermissions)(body));
    }

    private makeSetGroupToUserAction(action: typeof unsetBulkPermissions) {
        return async (body: SetGroupToUserDto): Promise<void> => {
            const group = await this.permissionsGroupsRepository.findOne({
                name: body.group,
            });

            if (!group) {
                throw new NotFoundException('group not found');
            }

            const permissionsMap = await this.permissionsGroupsMapRepository.find({
                relations: ['permission'],
                where: {group},
            });

            // const preparedPermissions = await this.preparePermissionsGroup(
            //     group,
            //     permissionsMap.map(({permission}) => permission),
            // );
            await action(
                this.connection,
                // TODO: Do not make O(n) SQL requests to find every permission
                // Check code before this (preparedPermissions)
                await this.permissionsService.prepareSetUserPermissions({
                    permissions: permissionsMap.map(({permission}) => permission.name),
                    users: body.users,
                }),
            );
        };
    }

    private preparePermissionsList(
        permissions: CreateGroupDto['permissions'],
    ): Promise<PermissionsEntity[]> {
        return this.permissionsService.findByNames(permissions);
    }

    private async preparePermissionsGroup(
        group: PermissionsGroupsEntity,
        permissions: PermissionsEntity[],
    ): Promise<PermissionsGroupsMapEntity[]> {
        const result: PermissionsGroupsMapEntity[] = [];

        for await (const permission of permissions) {
            const entity = new PermissionsGroupsMapEntity();
            entity.group = group;
            entity.permission = permission;

            result.push(entity);
        }

        return result;
    }
}
