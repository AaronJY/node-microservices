import { NotFoundError } from 'nodejs-ms-pkg-common/errors/notFoundError';
import { ObjectID } from 'mongodb';

/**
 * @apiDefine GalleryAlreadyExistsError
 *
 * @apiError GalleryAlreadyExists A gallery with the given name already exists.
 *
 * @apiErrorExample Error
 *      HTTP/1.1 409 Conflict
 *      {}
 */
export class GalleryAlreadyExistsError extends NotFoundError {
    galleryId: ObjectID;

    constructor(message?: string) {
        super(message);

        this.name = 'GalleryAlreadyExists';
    }
}