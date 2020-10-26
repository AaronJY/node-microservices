import GalleryModel, { Gallery } from '../models/galleryModel';
import { GalleryNotFoundError } from '../../errors/galleryNotFoundError';
import { ObjectID } from 'mongodb';
import { GalleryExistsError } from '../../errors/galleryExistsError';

export class GalleryRepo {
    static async getAll(): Promise<Gallery[]> {
        return await GalleryModel.find();
    }

    static async getById(id: ObjectID): Promise<Gallery> {
        const gallery: Gallery = await GalleryModel.findById(id);

        if (!gallery) {
            throw new GalleryNotFoundError(id, `No gallery found with ID ${id}`);
        }

        return gallery;
    }

    static async getByName(profileId: ObjectID, galleryName: string): Promise<boolean> {
        return GalleryModel.exists({ profileId: profileId, name: galleryName});
    }

    static async insert(document: Gallery): Promise<Gallery> {
        if (await this.getByName(document.profileId, document.name)) {
            throw new GalleryExistsError(`Profile ${document.profileId} already has a gallery named "${document.name}"`)
        }
        
        return GalleryModel.create(document);
    }

    static async deleteById(id: ObjectID): Promise<void> {
        if (!await GalleryModel.exists(id)) {
            throw new GalleryNotFoundError(id, `No gallery exists with ID ${id}`);
        }

        GalleryModel.deleteOne({ _id: id });
    }
}