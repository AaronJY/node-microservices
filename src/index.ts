import { ImageService } from "./services/image/imageService";

const imageService: ImageService = new ImageService();

console.log('Starting services...');
imageService.start(5000);