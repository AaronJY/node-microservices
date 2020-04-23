import ProfileModel, { Profile } from '../models/profileModel';

import { ProfileNotFoundError } from '../../errors/profileNotFoundError';
import { ObjectID } from 'mongodb';

export class ProfileRepo {
    static async getById(id: ObjectID): Promise<Profile> {
        const profile: Profile = await ProfileModel.findById(id).populate('addresses');

        if (!profile) {
            throw new ProfileNotFoundError(id, `No profile found with id ${id}`);
        }

        return profile;
    }
}