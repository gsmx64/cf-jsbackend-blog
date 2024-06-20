import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

// Get Frontend URL from .env file
const frontendProtocol = process.env.FRONTEND_PROTOCOL;
const frontendHost = process.env.FRONTEND_HOST;
const frontendPort = (process.env.FRONTEND_PORT === 80) ? '' : ':'+process.env.FRONTEND_PORT;

// Get Frontend URL from .env file
const frontendProxyProtocol = process.env.FRONTEND_PROXY_PROTOCOL;
const frontendProxyHost = process.env.FRONTEND_PROXY_HOST;
const frontendProxyPort = (process.env.FRONTEND_PROXY_PORT === 80) ? '' : ':'+process.env.FRONTEND_PORT;

/**
 * Configuration options for Cross-Origin Resource Sharing (CORS).
 */
export const CORS: CorsOptions = {
  credentials: true,
  origin: (process.env.NODE_ENV === 'production') ?
    `${frontendProxyProtocol}://${frontendProxyHost}${frontendProxyPort}` :
    `${frontendProtocol}://${frontendHost}${frontendPort}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
};