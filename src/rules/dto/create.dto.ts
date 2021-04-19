import {IsNotEmpty, IsArray, IsString} from 'class-validator';

import {Rules} from '../rules.interface';

export class CreateDto {
    @IsNotEmpty()
    @IsArray()
    readonly rules: Rules;

    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
