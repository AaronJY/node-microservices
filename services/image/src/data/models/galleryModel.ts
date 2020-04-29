import mongoose, { Schema, Document } from 'mongoose';
import { ObjectID } from 'mongodb';

import { GalleryVisibility } from 'nodejs-ms-pkg-common';

export interface Gallery extends Document {
    name: string;
    createDate: Date;
    profileId: ObjectID;
    visibility: GalleryVisibility;
}

const GallerySchema: Schema = new Schema({
    name: { type: String, required: true },
    createDate: { type: Date, required: true, default: Date() },
    profileId: { type: ObjectID, required: true },
    visibility: { type: GalleryVisibility, required: true, default: GalleryVisibility.Private }
}, { collection: 'galleries' });

export default mongoose.model<Gallery>('Gallery', GallerySchema);