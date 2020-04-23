import GalleryModel, { Gallery } from '../models/galleryModel';
import { GalleryNotFoundError } from '../../errors/galleryNotFoundError';
import { ObjectID } from 'mongodb';

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

    static async insert(document: Gallery): Promise<Gallery> {
        return await GalleryModel.create(document);
    }

    static async deleteById(id: ObjectID): Promise<void> {
        if (!await GalleryModel.exists(id)) {
            throw new GalleryNotFoundError(id, `No gallery exists with ID ${id}`);
        }

        await GalleryModel.deleteOne({ _id: id });
    }
}