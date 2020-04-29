import { ObjectID } from 'mongodb';
import { NotFoundError } from 'nodejs-ms-pkg-common';

export class GalleryNotFoundError extends NotFoundError {
    galleryId: ObjectID;

    constructor(galleryId: ObjectID, message?: string) {
        super(message);

        this.name = 'GalleryNotFound';
        this.galleryId = galleryId;
    }
}