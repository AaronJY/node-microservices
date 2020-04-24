import { Address } from '../../data/models/addressModel';

export class AddressApiModel {
    addressLine1: Address['addressLine1'];
    addressLine2: Address['addressLine2'];
    townOrCity: Address['townOrCity'];
    postOrZipCode: Address['postOrZipCode'];
    country: Address['country'];

    constructor(address: Address) {
        this.addressLine1 = address.addressLine1;
        this.addressLine2 = address.addressLine2;
        this.townOrCity = address.townOrCity;
        this.postOrZipCode = address.postOrZipCode;
        this.country = address.country;
    }
}