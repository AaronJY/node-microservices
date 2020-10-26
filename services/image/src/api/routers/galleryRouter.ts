import express, { Response, Request, Router, NextFunction } from 'express';
import GalleryModel, { Gallery } from '../../data/models/galleryModel';
import { NewGalleryApiModel } from '../models/newGalleryApiModel';
import { ObjectID } from 'mongodb';
import { Operation, applyPatch, Validator, validate, JsonPatchError } from 'fast-json-patch';
import { GalleryRepo } from '../../data/repos/galleryRepo';
import { GalleryApiModel } from '../models/galleryApiModel';

const router: Router = express.Router();

router.get('/', (req: Request, resp: Response, next: NextFunction) => {
    GalleryRepo.getAll()
        .then((galleries: Gallery[]) => galleries.map(model => new GalleryApiModel(model)))
        .then((apiModels: GalleryApiModel[]) => resp.send(apiModels))
        .catch(err => next(err));
});

router.get('/:id', (req: Request, resp: Response, next: NextFunction) => {
    const id: ObjectID = new ObjectID(req.params.id);

    GalleryRepo.getById(id)
        .then((gallery: Gallery) => resp.send(new GalleryApiModel(gallery)))
        .catch(err => next(err));
});

router.post('/', (req: Request, resp: Response, next: NextFunction) => {
    const newGallery: NewGalleryApiModel = req.body as NewGalleryApiModel;

    const document = new GalleryModel({
        name: newGallery.name,
        profileId: newGallery.profileId,
        visibility: newGallery.visibility
    });

   GalleryRepo.insert(document)
        .then((gallery: Gallery) => resp.status(201).send(new GalleryApiModel(gallery)))
        .catch(err => next(err));
});

router.delete('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    const id = new ObjectID(req.params.id);

    GalleryModel.exists({ _id: id })
        .then(() => GalleryRepo.deleteById(id))
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const galleryPatchDocumentValidator: Validator<Gallery> = (operation: Operation, index: number, document: Gallery, existingPathFragment: string) => {
        // Firstly, use the built-in validator to validate things like
        // whether the given paths exist
        const defaultValidationError: JsonPatchError = validate(operations, document);
        if (defaultValidationError) {
            throw defaultValidationError;
        }

        // Then, ensure only set paths are being validated
        switch (operation.path) {
            case '/name':
            case '/visibility':
                break;

            default:
                throw new JsonPatchError(`Not allowed to patch path ${operation.path}`, 'OPERATION_PATH_INVALID', index, operation, document);
        }
    }

    GalleryRepo.getById(id)
        .then((gallery: Gallery) => applyPatch(gallery, operations, galleryPatchDocumentValidator).newDocument.save())
        .then(() => resp.status(200).send())
        .catch(err => next(err));
});

export default router;