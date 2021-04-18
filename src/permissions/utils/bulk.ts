import {Connection} from 'typeorm';

import {DuplicateException} from '../exceptions/dto';
import {UserPermissionsEntity} from '../permissions.entity';

export async function bulkPermissions(
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
