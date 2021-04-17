import {HttpStatus} from '@nestjs/common';
import {Response} from 'express';

export const DEFAULT_RESPONSES = {
    CHANGE: {
        message: 'ok',
    },
    NO_CHANGES: {
        message: 'no changes',
    },
};

interface Options<T extends Record<string, unknown>> {
    code?: HttpStatus;
    data: T;
}

export function makeDataResponse<T extends Record<string, unknown>>(res: Response, options: Options<T>) {
    const {
        code = HttpStatus.OK,
        data,
    } = options;
    res.status(code).json(data);
}
