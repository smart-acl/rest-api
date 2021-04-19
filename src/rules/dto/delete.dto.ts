import {IsNotEmpty, IsNumber} from 'class-validator';

export class DeleteDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
}
