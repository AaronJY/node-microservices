import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/notFoundError";

export default function clientErrorHandler(err: Error, req: Request, resp: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
        resp.status(404);
    }

    next(err);
}