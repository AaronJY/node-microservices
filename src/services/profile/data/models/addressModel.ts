import { Schema, Document } from 'mongoose';
import { ConnectionManager } from '../connections';

export interface Address extends Document {
    profile: Address['_id'];
    addressLine1: string;
    addressLine2: string;
    townOrCity: string;
    postOrZipCode: string;
    country: string;
}

const AddressSchema: Schema = new Schema({
    profile: { type: Schema.Types.ObjectId, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    townOrCity: { type: String, required: true },
    postOrZipCode: { type: String, required: true },
    country: { type: String, required: true }
});

export default ConnectionManager.getConnection().model<Address>('Address', AddressSchema);