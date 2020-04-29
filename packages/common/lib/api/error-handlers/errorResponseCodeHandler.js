"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundError_1 = require("../../errors/notFoundError");
const fast_json_patch_1 = require("fast-json-patch");
function errorResponseCodeHandler(err, req, resp, next) {
    if (err instanceof notFoundError_1.NotFoundError) {
        resp.status(404);
    }
    else if (err instanceof fast_json_patch_1.JsonPatchError) {
        resp.status(400);
    }
    else {
        resp.status(500);
    }
    next(err);
}
exports.errorResponseCodeHandler = errorResponseCodeHandler;
//# sourceMappingURL=errorResponseCodeHandler.js.map