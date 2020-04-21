import express from 'express';
import GalleryRouter from './routers/galleryRouter';
import mongoose from 'mongoose';
import clientErrorHandler from '../../common/api/error-handlers/clientErrorHandler';
import bodyparser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import { ServiceConfig } from './config/serviceConfig';

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
        this.api.use(clientErrorHandler);
    }

    start(): void {
        console.log(`Connecting to MongoDB with connection string ${this.config.dbConnectionString}`);
        mongoose.connect(process.env.IMAGE_DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectionOptions);

        console.log(`Starting Image service on port ${this.config.apiHttpPort}`);
        this.api.listen(this.config.apiHttpPort, () => {
            console.log('Listening...');
        });
    }
}