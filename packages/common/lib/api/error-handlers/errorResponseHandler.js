"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorResponseHandler(err, req, res, next) {
    const responseObj = {
        error: err.name,
        message: err.message
    };
    if (process.env.NODE_ENV === 'development') {
        responseObj.stack = err.stack;
    }
    res.contentType('application/json').send(responseObj);
}
exports.errorResponseHandler = errorResponseHandler;
class ErrorResponse {
}
//# sourceMappingURL=errorResponseHandler.js.map