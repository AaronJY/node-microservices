import { Document, Schema, model } from 'mongoose';
import { ObjectID } from 'mongodb';
import { Address } from './addressModel';

export interface Profile extends Document {
    name: string;
    accountId: ObjectID;
    bio: string;
    dateOfBirth: Date;
    addresses: Address[];
}

const ProfileSchema: Schema = new Schema({
    name: { type: String, required: true },
    accountId: { type: ObjectID, required: true },
    bio: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
    addresses: [{ type: ObjectID, ref: 'Address' }]
});

export default model<Profile>('Profile', ProfileSchema);