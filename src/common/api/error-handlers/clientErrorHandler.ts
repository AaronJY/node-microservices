import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/notFoundError";
import { JsonPatchError } from "fast-json-patch";

export default function clientErrorHandler(err: Error, req: Request, resp: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
        resp.status(404);
    } else if (err instanceof JsonPatchError) {
        resp.status(400);
    }

    next(err);
}