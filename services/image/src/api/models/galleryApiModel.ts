import { Gallery } from '../../data/models/galleryModel';

export class GalleryApiModel {
    id: Gallery['_id'];
    name: Gallery['name'];
    profileId: Gallery['profileId'];
    visibility: Gallery['visibility'];
    createDate: Gallery['createDate'];
    imageCount: number;

    constructor(galleryModel: Gallery) {
        this.id = galleryModel.id;
        this.name = galleryModel.name;
        this.profileId = galleryModel.profileId;
        this.visibility = galleryModel.visibility;
        this.createDate = galleryModel.createDate;
        this.imageCount = 0;
    }
}