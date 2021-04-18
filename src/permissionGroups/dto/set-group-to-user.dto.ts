import {IsNotEmpty, IsArray, IsString} from 'class-validator';

export class SetGroupToUserDto {
    @IsNotEmpty()
    @IsArray()
    readonly users: number[]; // ids

    @IsNotEmpty()
    @IsString()
    readonly group: string;
}
