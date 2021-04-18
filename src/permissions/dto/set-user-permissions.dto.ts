import {IsNotEmpty, IsArray} from 'class-validator';

export class SetUserPermissionsDto {
    @IsNotEmpty()
    @IsArray()
    readonly users: number[]; // ids

    @IsNotEmpty()
    @IsArray()
    readonly permissions: string[];
}
