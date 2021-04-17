import * as jwt from 'jsonwebtoken';
import {Indexed} from 'utils';

export class BaseController {
    protected getUserIdFromToken(authorization: string): string {
        if (!authorization) {
            return null;
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return (decoded as Indexed).id;
    }
}
