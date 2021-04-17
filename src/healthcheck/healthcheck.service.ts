import {Injectable} from '@nestjs/common';
import moment from 'moment-timezone';

import {Pong} from './healthcheck.interface';

@Injectable()
export class HealthcheckService {
    async pong(): Promise<Pong> {
        return {
            dtm: moment(),
            message: 'pong',
            env: process.env.ENV,
        };
    }
}
