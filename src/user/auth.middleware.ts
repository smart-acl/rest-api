import {NestMiddleware, HttpStatus, Injectable} from '@nestjs/common';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {Indexed} from 'utils';

import {UserService} from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}

    async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
        const authHeaders: string = req.headers.authorization;
        const token = authHeaders?.split(' ')?.[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await this.userService.findById((decoded as Indexed).id);

            if (!user) {
                throw new HttpException({message: 'user not found'}, HttpStatus.UNAUTHORIZED);
            }

            req.user = this.userService.buildUserRO(user).user;
            next();

        } else {
            throw new HttpException({message: 'not authorized'}, HttpStatus.UNAUTHORIZED);
        }
    }
}
