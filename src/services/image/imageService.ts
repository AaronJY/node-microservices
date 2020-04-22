import express from 'express';
import GalleryRouter from './routers/galleryRouter';
import mongoose from 'mongoose';
import errorResponseCodeHandler from '../../common/api/error-handlers/clientErrorHandler';
import bodyparser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import { ServiceConfig } from './config/serviceConfig';
import errorResponseHandler from '../../common/api/error-handlers/errorReportingHandler';

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
        this.api.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
        this.api.use('/api/v1/gallery', GalleryRouter);
        this.api.use(errorResponseCodeHandler);
        this.api.use(errorResponseHandler);
    }

    async start(): Promise<void> {
        return this.connectToDatabase()
            .then(() => this.registerDbSchmas())
            .then(() => {
                return new Promise((resolve) => {
                    this.api.listen(this.config.apiHttpPort, () => {
                        console.log(`Image service now listening on port ${this.config.apiHttpPort}`);
                        resolve();
                    });
                });
            });
    }

    private registerDbSchmas(): void {
        require('../image/models/galleryModel');

        console.log('Registered DB schemas');
    }

    private async connectToDatabase(): Promise<void> {
        await mongoose.connect(this.config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to MongoDB @ ${this.config.dbConnectionString}`);
    }
}