import { ObjectID } from 'mongodb';
import {NotFoundError} from 'nodejs-ms-pkg-common/errors/notFoundError';

export class ProfileNotFoundError extends NotFoundError {
    profileId: ObjectID;

    constructor(profileId: ObjectID, message?: string) {
        super(message);

        this.name = 'ProfileNotFound';
        this.profileId = profileId;
    }
}