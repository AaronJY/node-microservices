import { NextFunction, Request, Response } from 'express';
export declare function errorResponseCodeHandler(err: Error, req: Request, resp: Response, next: NextFunction): void;
