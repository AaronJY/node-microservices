import { NotFoundError } from 'nodejs-ms-pkg-common/errors/notFoundError';
import { ObjectID } from 'mongodb';

/**
 * @apiDefine GalleryNotFoundError
 *
 * @apiError GalleryNotFound A gallery with the given ID was not found.
 *
 * @apiErrorExample Error
 *      HTTP/1.1 404 Not Found
 *      {}
 */
export class GalleryNotFoundError extends NotFoundError {
    galleryId: ObjectID;

    constructor(galleryId: ObjectID, message?: string) {
        super(message);

        this.name = 'GalleryNotFound';
        this.galleryId = galleryId;
    }
}