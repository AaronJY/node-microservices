import express from 'express';
import GalleryRouter from "./routers/galleryRouter";
import mongoose from 'mongoose';
import clientErrorHandler from '../../common/api/error-handlers/clientErrorHandler';
import bodyparser from "body-parser";

export class ImageService {
    private api: express.Express;

    constructor() {
        this.api = express();
        this.api.use(bodyparser.json());
        this.api.use('/gallery', GalleryRouter);
        this.api.use(clientErrorHandler);
    }

    start(port: number) {
        console.log(`Connecting to MongoDB with connection string ${process.env.IMAGE_DB_CONNECTION}`);
        mongoose.connect(process.env.IMAGE_DB_CONNECTION, { useNewUrlParser: true });

        console.log(`Starting Image service on port ${port}`);
        this.api.listen(port, () => {
            console.log('Listening...');
        });
    }
}