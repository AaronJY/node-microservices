import { NotFoundError } from '../../../common/errors/notFoundError';
import { ObjectID } from 'mongodb';

export class ProfileNotFoundError extends NotFoundError {
    profileId: ObjectID;

    constructor(profileId: ObjectID, message?: string) {
        super(message);

        this.profileId = profileId;
        this.name = 'ProfileNotFound';
    }
}