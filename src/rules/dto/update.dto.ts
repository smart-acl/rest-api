import {IsNotEmpty, IsArray, IsNumber} from 'class-validator';

import {Rules} from '../rules.interface';

export class UpdateDto {
    @IsNotEmpty()
    @IsArray()
    readonly rules: Rules;

    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
}
