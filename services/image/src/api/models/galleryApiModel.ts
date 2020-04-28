import { Gallery } from '../../data/models/galleryModel';

// #region API Documentation

/**
 * @apiDefine GallerySuccess
 *
 * @apiSuccess {String}     id            The ID of the gallery.
 * @apiSuccess {String}     name          The name of the gallery.
 * @apiSuccess {Number}     profileId     The ID of the profile the gallery belongs to.
 * @apiSuccess {Number}     visiblity     The visiblity of the gallery. (0 = Private, 1 = Public)
 * @apiSuccess {Date}       createDate    The date theg gallery was created.
 * @apiSuccess {Number}     imageCount    The number of images in the gallery.
 */

/**
 * @apiDefine GallerySuccessExample
 *
 * @apiSuccessExample Success
 *   HTTP/1.1 200 OK
 *   {
 *       "id": "5ea4908d94ba077db2174c7a",
 *       "name": "My Gallery",
 *       "profileId": "5ea490a81b0c2462f8c7b0be",
 *       "visiblity": 0,
 *       "createDate": "2020-04-25T19:34:51.981Z",
 *       "imageCount": 12
 *   }
 */

/**
 * @apiDefine GallerySuccessMultiple
 *
 * @apiSuccess {Object[]}   galleries
 * @apiSuccess {String}     galleries.id            The ID of the gallery.
 * @apiSuccess {String}     galleries.name          The name of the gallery.
 * @apiSuccess {Number}     galleries.profileId     The ID of the profile the gallery belongs to.
 * @apiSuccess {Number}     galleries.visiblity     The visiblity of the gallery. (0 = Private, 1 = Public)
 * @apiSuccess {Date}       galleries.createDate    The date theg gallery was created.
 * @apiSuccess {Number}     galleries.imageCount    The number of images in the gallery.
 *
 *
 */

/**
 * @apiDefine GallerySuccessMultipleExample
 * @apiSuccessExample Success
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "id": "5ea4908d94ba077db2174c7a",
 *   "name": "My Gallery",
 *   "profileId": "5ea490a81b0c2462f8c7b0be",
 *   "visiblity": 0,
 *   "createDate": "2020-04-25T19:34:51.981Z",
 *   "imageCount": 12
 *  }
 * ]
 */

/**
 * @apiDefine GalleryModel
 * {
 *   "id": "5ea4908d94ba077db2174c7a",
 *   "name": "My Gallery",
 *   "profileId": "5ea490a81b0c2462f8c7b0be",
 *   "visiblity": 0,
 *   "createDate": "2020-04-25T19:34:51.981Z",
 *   "imageCount": 12
 *  }
 */

 // #endregion

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