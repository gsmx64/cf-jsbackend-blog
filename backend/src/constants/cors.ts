import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 */
export const CORS: CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};