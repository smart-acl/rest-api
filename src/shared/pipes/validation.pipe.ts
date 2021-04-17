import {PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';
import {Indexed} from 'utils';

const validateTypes = [String, Boolean, Number, Array, Object];

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
    async transform<T>(value: T, metadata: ArgumentMetadata): Promise<T | Error> {
        if (!value) {
            throw new BadRequestException('No data submitted');
        }

        const {metatype} = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException({message: 'Input data validation failed', errors:  this.buildError(errors)}, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private buildError<T extends {property: unknown; constraints: Indexed}>(errors: T[]) {
        const result = {};
        errors.forEach(el => {
            const prop = el.property;
            Object.entries(el.constraints).forEach(constraint => {
                result[prop + constraint[0]] = `${constraint[1]}`;
            });
        });
        return result;
    }

    private toValidate(metatype): boolean {
        return !validateTypes.find(type => metatype === type);
    }
}
