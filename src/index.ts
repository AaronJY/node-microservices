import { ProfileService } from './services/profile';
import * as profileServiceConfig from './services/profile/config/serviceConfig';
import * as imageServiceConfig from './services/image/config/serviceConfig';
import { ImageService } from './services/image';

const imageService: ImageService = new ImageService({
    apiHttpPort: parseInt(process.env.IMAGE_API_HTTP_PORT),
    dbConnectionString: process.env.IMAGE_DB_CONNECTION
} as imageServiceConfig.ServiceConfig)

const profileService: ProfileService = new ProfileService({
    apiHttpPort: parseInt(process.env.PROFILE_API_HTTP_PORT),
    dbConnectionString: process.env.PROFILE_DB_CONNECTION
} as profileServiceConfig.ServiceConfig);

console.log('Starting services...');
imageService.start().then(() => console.log('Image service started')).catch(err => console.error(err));
profileService.start().then(() => console.log('Profile service started')).catch(err => console.error(err));
