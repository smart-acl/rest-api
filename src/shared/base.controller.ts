import * as jwt from 'jsonwebtoken';
import {Indexed} from 'utils';

import {SECRET} from '../config';

export class BaseController {
    protected getUserIdFromToken(authorization: string): string {
        if (!authorization) {
            return null;
        }

        const token = authorization.split(' ')[1];
        const decoded: Indexed = jwt.verify(token, SECRET);
        return decoded.id;
    }
}
