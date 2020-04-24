import { Response, NextFunction, Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorResponseHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    const responseObj: ErrorResponse = {
        error: err.name,
        message: err.message
    };

    if (process.env.NODE_ENV === 'development') {
        responseObj.stack = err.stack;
    }

    res.contentType('application/json').send(responseObj);
}

class ErrorResponse {
    error: string;
    message: string;
    stack?: string
}