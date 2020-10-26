import Keys from "./keys";

export const ProductionKeys: Keys = {
    ApiHttpPort: parseInt(process.env.API_HTTP_PORT),
    ImageDbConnectionString: process.env.IMAGE_DB_CONNECTION_STRING
};