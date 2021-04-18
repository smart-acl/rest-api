import {Connection} from 'typeorm';

import {DuplicateException} from '../exceptions/dto';
import {UserPermissionsEntity} from '../permissions.entity';

export async function setBulkPermissions(
    connection: Connection,
    items: UserPermissionsEntity[],
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

export async function unsetBulkPermissions(
    connection: Connection,
    items: UserPermissionsEntity[],
) {
    await connection.transaction(async manager => {
        for await (const item of items) {
            await manager.createQueryBuilder()
                .delete()
                .from(UserPermissionsEntity)
                .where({userId: item.user.id, permissionId: item.permission.id})
                .execute();
        }
    });
}
