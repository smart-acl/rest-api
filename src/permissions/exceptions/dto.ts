import {HttpStatus, HttpException} from '@nestjs/common';

export class DuplicateException extends HttpException {
    constructor() {
        super('duplicate data', HttpStatus.BAD_REQUEST);
    }
}
