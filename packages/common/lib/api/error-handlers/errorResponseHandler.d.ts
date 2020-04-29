import { Response, NextFunction, Request } from 'express';
export declare function errorResponseHandler(err: Error, req: Request, res: Response, next: NextFunction): void;
