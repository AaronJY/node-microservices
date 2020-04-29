"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=notFoundError.js.map