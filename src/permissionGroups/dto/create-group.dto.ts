import {IsNotEmpty, IsArray} from 'class-validator';

import {PermissionsEntity} from 'src/permissions/permissions.entity';

export class CreateGroupDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    readonly permissions: PermissionsEntity['name'][];
}
