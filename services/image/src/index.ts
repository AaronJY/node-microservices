import { ImageService } from './service';
import { ServiceConfig } from './config/serviceConfig';

const config: ServiceConfig = {
    apiHttpPort: parseInt(process.env.API_HTTP_PORT),
    dbConnectionString: process.env.IMAGE_DB_CONNECTION_STRING
};

const service: ImageService = new ImageService(config);

service.start();