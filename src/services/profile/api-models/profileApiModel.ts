import { Profile } from '../models/profileModel';
import { Address } from '../models/addressModel';
import { AddressApiModel } from './addressApiModel';

export class ProfileApiModel {
    name: Profile['name'];
    id: Profile['id'];
    accountId: Profile['accountId'];
    dateOfBirth: Profile['dateOfBirth'];
    addresses: AddressApiModel[];

    constructor(profile: Profile) {
        this.name = profile.name;
        this.id = profile.id;
        this.accountId = profile.accountId;
        this.dateOfBirth = profile.dateOfBirth;
        this.addresses = profile.addresses ? profile.addresses.map((address: Address) => new AddressApiModel(address)) : [];
    }
}