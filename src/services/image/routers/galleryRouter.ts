import { Response, Request, Router, NextFunction } from "express";
import GalleryModel, { Gallery } from "../models/galleryModel";
import { GalleryApiModel } from "../api-models/galleryApiModel";
import { NewGalleryApiModel } from "../api-models/newGalleryApiModel";
import express from "express";
import { ObjectID } from "mongodb";
import { NotImplementedError } from "../../../common/errors/notImplementedError";
import { NotFoundError } from "../../../common/errors/notFoundError";

const router: Router = express.Router();

router.get('/', (req: Request, resp: Response, next: NextFunction) => {
    GalleryModel.find()
        .then((galleries: Gallery[]) => galleries.map(model => new GalleryApiModel(model)))
        .then((apiModels: GalleryApiModel[]) => resp.send(apiModels))
        .catch(err => next(err));
});

router.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
    GalleryModel.findById(req.params.id)
        .then((gallery: Gallery) =>
        {
            if (gallery === null)
                throw new NotFoundError(`Gallery with ObjectID ${req.params.id} not found.`);
            
            return gallery;
        })
        .then((gallery: Gallery) => resp.send(new GalleryApiModel(gallery)))
        .catch(err => next(err));
});

router.put('/', (req: Request, resp: Response, next: NextFunction) => {
    const newGallery: NewGalleryApiModel = req.body as NewGalleryApiModel;

    const galleryModel = new GalleryModel({
        name: newGallery.name,
        profileId: new ObjectID(),
        visibility: newGallery.visibility
    });

    GalleryModel.create(galleryModel)
        .then(() => resp.status(201).send())
        .catch(err => next(err));
});

router.delete('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    throw new NotImplementedError();
});

router.patch('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    throw new NotImplementedError();
});

export default router;