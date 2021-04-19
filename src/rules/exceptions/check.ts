import {HttpStatus, HttpException} from '@nestjs/common';

export class RulesCountException extends HttpException {
    constructor(route: string) {
        super(`route ${route} has broken config`, HttpStatus.BAD_REQUEST);
    }
}
