import {PermissionsEntity} from 'src/permissions/permissions.entity';
import {HttpMethod} from 'src/types/http';

interface PermissionRule {
    one_of?: PermissionsEntity['name'][];
    all_of?: PermissionsEntity['name'][];
}

export interface Rule {
    path: string;
    method: HttpMethod;
    permissions: PermissionRule;
}
export type Rules = Rule[];
