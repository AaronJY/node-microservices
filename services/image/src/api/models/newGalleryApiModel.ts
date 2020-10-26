import { Gallery } from '../../data/models/galleryModel';

export class NewGalleryApiModel {
    name: Gallery['name'];
    visibility: Gallery['visibility'];
    profileId: Gallery['profileId'];
}