import { NotFoundError } from '../../../common/errors/notFoundError';
import { ObjectID } from 'mongodb';

export class GalleryNotFoundError extends NotFoundError {
    galleryId: ObjectID;

    constructor(galleryId: ObjectID, message?: string) {
        super(message);

        this.name = 'GalleryNotFound';
        this.galleryId = galleryId;
    }
}