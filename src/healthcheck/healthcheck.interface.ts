import {Moment} from 'moment-timezone';

export interface Pong {
    dtm: Moment;
    message: 'pong';
    env: string;
}
