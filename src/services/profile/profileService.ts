import express from 'express';
import mongoose from 'mongoose';
import { ServiceConfig } from './config/serviceConfig';
import bodyparser from 'body-parser';
import clientErrorHandler from '../../common/api/error-handlers/clientErrorHandler';

export class ProfileService {
    private api: express.Express;
    private config: ServiceConfig;

    constructor(config: ServiceConfig) {
        if (!config) {
            throw new Error('Missing config.');
        }

        this.config = config;

        this.api = express();
        this.api.use(bodyparser.json());
        this.api.use(clientErrorHandler);
    }

    start(): void {
        console.log(`Connecting to MongoDB with connection string ${this.config.dbConnectionString}`);
        mongoose.connect(this.config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectionOptions);

        console.log(`Starting Profile service on port ${this.config.apiHttpPort}`);
        this.api.listen(this.config.apiHttpPort, () => {
            console.log('Listening...');
        });
    }
}