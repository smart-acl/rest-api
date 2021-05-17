import {Request, Response, NextFunction} from 'express';

const CSRF_ERROR = 'EBADCSRFTOKEN';
const CSRF_URL = '/api/csrf';

export function handleCSRFError(error, request: Request, response: Response, next: NextFunction) {
    if (error.code !== CSRF_ERROR) {
        next(error);
        return;
    }

    if (CSRF_URL.includes(request.url.toLowerCase())) {
        next();
        return;
    }

    response.status(403).json({
        error: 'no csrf token',
    });
}
