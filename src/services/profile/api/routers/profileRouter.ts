import express, { Router, Request, Response, NextFunction } from 'express';
import { Profile } from '../../data/models/profileModel';
import { ObjectId } from 'mongodb';
import { ProfileApiModel } from '../models/profileApiModel';
import { ProfileRepo } from '../../data/repos/profileRepo';

const router: Router = express.Router();

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.header(400).send();
        return;
    }

    const id: ObjectId = new ObjectId(req.params.id);

    ProfileRepo.getById(id)
        .then((profile: Profile) => new ProfileApiModel(profile))
        .then((profile: ProfileApiModel) => res.send(profile))
        .catch(err => next(err));
});

export default router;