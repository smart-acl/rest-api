import {IsNotEmpty, IsEnum, IsString} from 'class-validator';
import { HttpMethod } from 'src/types/http';

export class CheckDto {
    @IsNotEmpty()
    @IsString()
    readonly userLogin: string;

    @IsNotEmpty()
    @IsString()
    readonly route: string;

    @IsNotEmpty()
    @IsEnum(HttpMethod)
    readonly method: HttpMethod;
}
