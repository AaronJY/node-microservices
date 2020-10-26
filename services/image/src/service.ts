import express from 'express';
import GalleryRouter from './api/routers/galleryRouter';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import { ServiceConfig } from './config/serviceConfig';
import { errorResponseCodeHandler, errorResponseHandler } from 'nodejs-ms-pkg-common';

export class ImageService {
    private api: express.Express;
    private config: ServiceConfig;

    constructor(config: ServiceConfig) {
        if (!config) {
            throw new Error('Missing config.');
        }

        this.config = config;

        this.api = express();
        this.api.use(bodyparser.json());
        this.api.use('/api/v1/gallery', GalleryRouter);
        this.api.use(errorResponseCodeHandler);
        this.api.use(errorResponseHandler);
    }

    async start(): Promise<unknown> {
        console.log('Starting...');
        console.table(this.config);

        return this.connectToDatabase()
            .then(() => {
                return new Promise((resolve) => {
                    this.api.listen(this.config.apiHttpPort, () => {
                        console.log(`Image service now listening on port ${this.config.apiHttpPort}`);
                        resolve();
                    });
                });
            })
            .catch((err: Error) => console.error(err));
    }

    private async connectToDatabase(): Promise<void> {
        await mongoose.connect(this.config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to MongoDB @ ${this.config.dbConnectionString}`);
    }
}