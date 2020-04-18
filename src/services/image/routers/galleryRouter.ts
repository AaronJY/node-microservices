import { Response, Request, Router, NextFunction } from "express";
import GalleryModel, { Gallery } from "../models/galleryModel";
import { GalleryApiModel } from "../api-models/galleryApiModel";
import { NewGalleryApiModel } from "../api-models/newGalleryApiModel";
import express from "express";
import { ObjectID } from "mongodb";
import { GalleryNotFoundError } from "../errors/galleryNotFoundError";
import { PatchResult, Operation, applyPatch, Validator, validate, JsonPatchError } from "fast-json-patch";

const router: Router = express.Router();

router.get('/', (req: Request, resp: Response, next: NextFunction) => {
    GalleryModel.find()
        .then((galleries: Gallery[]) => galleries.map(model => new GalleryApiModel(model)))
        .then((apiModels: GalleryApiModel[]) => resp.send(apiModels))
        .catch(err => next(err));
});

router.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
    const id: ObjectID = new ObjectID(req.params.id);
    GalleryModel.findById(id)
        .then((gallery: Gallery) => {
            if (gallery === null) {
                throw new GalleryNotFoundError(id);
            }
            
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
        .then((gallery: Gallery) => resp.status(201).send(new GalleryApiModel(gallery)))
        .catch(err => next(err));
});

router.delete('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    const id = new ObjectID(req.params.id);

    GalleryModel.exists({ _id: id })
        .then(exists => {
            if (!exists) {
                throw new GalleryNotFoundError(id);
            }
        })
        .then(() => GalleryModel.deleteOne({ _id: id }))
        .then(() => resp.status(204).send())
        .catch((err: Error) => next(err))
});

router.patch('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    const id: ObjectID = new ObjectID(req.params.id);
    const operations: Operation[] = req.body;

    // NOTE: While this validator validates whether given paths exist or are valid, it doesn't
    // validate the operations against the path. Because of this, consumers will be able to run
    // operations against paths that shouldn't be allowed (remove against /name, for example) and 
    // the API won't respond telling them they're not allowed. Thankfully, any attempt to change
    // the document beyond what the DB allows will result in a ValidationError from mongoose.
    const galleryPatchDocumentValidator: Validator<Gallery> = (operation: Operation, index: number, document: Gallery, existingPathFragment: string) => {
        // Firstly, use the built-in validator to validate things like
        // whether the given paths exist
        const defaultValidationError: JsonPatchError = validate(operations, document);
        if (defaultValidationError) {
            throw defaultValidationError;
        }

        // Then, ensure only set paths are being validated
        switch (operation.path)
        {
            case "/name":
            case "/visibility":
                break;

            default:
                throw new JsonPatchError(`Not allowed to patch path ${operation.path}`, 'OPERATION_PATH_INVALID', index, operation, document);
        }
    }

    GalleryModel.findById(id)
        .then((gallery: Gallery) => {
            if (gallery === null) {
                throw new GalleryNotFoundError(id);
            }

            return gallery;
        })
        .then((gallery: Gallery) => applyPatch(gallery, operations, galleryPatchDocumentValidator).newDocument.save())
        .then(() => resp.status(200).send())
        .catch(err => next(err));
});

export default router;