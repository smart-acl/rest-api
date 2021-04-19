import {PermissionsEntity} from 'src/permissions/permissions.entity';
import {HttpMethod} from 'src/types/http';

type PermissionRule =
    | { one_of: PermissionsEntity['name'][]; }
    | { all_of: PermissionsEntity['name'][]; };

interface AccessRule {
    path: string;
    method: HttpMethod;
    permissions: PermissionRule;
}
type AccessRules = AccessRule[];

export interface Rule {
    prefix: string;
    access_rules: AccessRules;
}
export type Rules = Rule[];
