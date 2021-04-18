import {HttpStatus, HttpException} from '@nestjs/common';

export class EntityException extends HttpException {
    constructor(entityName: string, itemId: number | string) {
        super(`no ${entityName} ${itemId}`, HttpStatus.BAD_REQUEST);
    }
}
