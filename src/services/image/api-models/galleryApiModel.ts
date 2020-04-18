import { Gallery } from "../models/galleryModel";

export class GalleryApiModel {
    name: Gallery['name'];
    profileId: Gallery['profileId'];
    visibility: Gallery['visibility'];
    createDate: Gallery['createDate'];
    imageCount: number;

    constructor(galleryModel: Gallery) {
        this.name = galleryModel.name;
        this.profileId = galleryModel.profileId;
        this.visibility = galleryModel.visibility;
        this.createDate = galleryModel.createDate;
        this.imageCount = 0;
    }
}