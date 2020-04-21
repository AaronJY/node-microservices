import { ProfileService } from './services/profile/profileService';
import * as profileServiceConfig from './services/profile/config/serviceConfig';
import * as imageServiceConfig from './services/image/config/serviceConfig';
import { ImageService } from './services/image/imageService';

const imageService: ImageService = new ImageService({
    apiHttpPort: parseInt(process.env.IMAGE_API_HTTP_PORT),
    dbConnectionString: process.env.IMAGE_DB_CONNECTION
} as imageServiceConfig.ServiceConfig)

const profileService: ProfileService = new ProfileService({
    apiHttpPort: parseInt(process.env.PROFILE_API_HTTP_PORT),
    dbConnectionString: process.env.PROFILE_DB_CONNECTION
} as profileServiceConfig.ServiceConfig);

console.log('Starting services...');
profileService.start();
imageService.start();
