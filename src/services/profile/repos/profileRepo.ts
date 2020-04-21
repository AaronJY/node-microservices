import ProfileModel, { Profile } from '../models/profileModel';

import { ProfileNotFoundError } from '../errors/profileNotFoundError';
import { ObjectID } from 'mongodb';

// NOTE: Requiring addressModel before possible calls to getById, which calls
// populate() and expects a schema to have been defined for Address model already
//
// There's probably a nicer way to architect this that doesn't rely on require()
require('../models/addressModel');

export class ProfileRepo {
    static async getById(id: ObjectID): Promise<Profile> {
        const profile: Profile = await ProfileModel.findById(id).populate('addresses');

        if (!profile) {
            throw new ProfileNotFoundError(id, `No profile found with id ${id}`);
        }

        return profile;
    }
}