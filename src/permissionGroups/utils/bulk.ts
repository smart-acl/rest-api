import {Connection} from 'typeorm';

import {DuplicateException} from 'src/utils/exceptions/dto';

import {PermissionsGroupsMapEntity, PermissionsGroupsEntity} from '../permissionGroups.entity';

export async function createBulkGroupPermissions(
    connection: Connection,
    items: PermissionsGroupsMapEntity[],
) {
    try {
        await connection.transaction(async manager => {
            return Promise.all(
                items.map(item => {
                    return manager.save(item);
                }),
            );
        });
    } catch (error) {
        if (error.toString().includes('duplicate')) {
            throw new DuplicateException();
        }
    }
}

export async function popBulkGroupPermissions(
    connection: Connection,
    items: PermissionsGroupsMapEntity[],
) {
    await connection.transaction(async manager => {
        for await (const item of items) {
            await manager.createQueryBuilder()
                .delete()
                .from(PermissionsGroupsMapEntity)
                .where({group: item.group.id, permission: item.permission.id})
                .execute();
        }
    });
}
