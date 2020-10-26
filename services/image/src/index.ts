import { ImageService } from './service';
import { ServiceConfig } from './config/serviceConfig';
import { ProductionKeys } from './keys/keys.prod';
import { DevelopmentKeys } from './keys/keys.dev';

const keys = process.env.NODE_ENV === 'production' ? ProductionKeys : DevelopmentKeys;
const config: ServiceConfig = {
    apiHttpPort: keys.ApiHttpPort,
    dbConnectionString: keys.ImageDbConnectionString
};

const service: ImageService = new ImageService(config);

service.start();