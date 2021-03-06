import express from 'express';
import mongoose from 'mongoose';
import { ServiceConfig } from './config/serviceConfig';
import bodyparser from 'body-parser';
import ProfileRouter from './api/routers/profileRouter';
import errorResponseCodeHandler from 'nodejs-ms-pkg-common/api/error-handlers/errorResponseCodeHandler'
import errorResponseHandler from 'nodejs-ms-pkg-common/api/error-handlers/errorResponseHandler'

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
        this.api.use('/api/v1/profile', ProfileRouter);
        this.api.use(errorResponseCodeHandler);
        this.api.use(errorResponseHandler);
    }

    async start(): Promise<unknown> {
        return this.connectToDatabase()
            .then(() => this.registerDbSchmas())
            .then(() => {
                return new Promise((resolve) => {
                    this.api.listen(this.config.apiHttpPort, () => {
                        console.log(`Profile service now listening on on port ${this.config.apiHttpPort}`);
                        resolve();
                    });
                });
            });
    }

    private registerDbSchmas(): void {
        require('./data//models/addressModel');
        require('./data/models/profileModel');

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