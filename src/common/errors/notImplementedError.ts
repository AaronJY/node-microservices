export class NotImplementedError extends Error {
    constructor() {
        super();
        this.message = "Not yet implemeted!";
        this.name = "NotImplementedError";
    }
}