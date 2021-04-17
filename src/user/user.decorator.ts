import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import {Indexed} from 'utils';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }

    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        return !!data ? decoded[data] : (decoded as Indexed).user;
    }
});
