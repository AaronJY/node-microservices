import { ProfileService } from "./service";
import { ServiceConfig } from "./config/serviceConfig";

const config: ServiceConfig = {
    apiHttpPort: parseInt(process.env.API_HTTP_PORT),
    dbConnectionString: process.env.PROFILE_DB_CONNECTION_STRING
};

const service: ProfileService = new ProfileService(config);

service.start();