import { AddressApiModel } from './addressApiModel';
import { Profile } from '../../data/models/profileModel';
import { Address } from '../../data/models/addressModel';

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