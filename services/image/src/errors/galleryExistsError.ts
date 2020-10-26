export class GalleryExistsError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "GalleryExists";
    }
}