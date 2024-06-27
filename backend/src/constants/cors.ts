import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 */
export const CORS: CorsOptions = {
  origin: (process.env.NODE_ENV === 'production') ? process.env.APP_CORS_PROD_WHITELIST.split(", ") : true,
  credentials: true,
  allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Origin, access_token',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
