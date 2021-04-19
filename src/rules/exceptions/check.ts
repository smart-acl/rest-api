import {HttpStatus, HttpException} from '@nestjs/common';

import {HttpMethod} from 'src/types/http';

export class RulesCountException extends HttpException {
    constructor(route: string) {
        super(`route ${route} has broken config`, HttpStatus.BAD_REQUEST);
    }
}

export class CheckPermissionException extends HttpException {
    constructor(_route?: string, _method?: HttpMethod) {
        super('user doesn\'t have permissions to route ', HttpStatus.UNAUTHORIZED);
    }
}
