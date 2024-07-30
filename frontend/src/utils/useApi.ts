import axios from "axios";

// Get API URL from .env file
const apiProtocol = process.env.VITE_API_PROTOCOL;
const apiHost = process.env.VITE_API_HOST;
const apiPort = (
  (Number(process.env.VITE_API_PORT) === 80) ||
  (Number(process.env.VITE_API_PORT) === 443)
  ) ? '' : ':'+process.env.VITE_API_PORT;
const apiPath = process.env.VITE_API_PATH;
const apiTimeout = process.env.VITE_API_TIMEOUT;

// Get API path for Dev Docker-Copmpose URL from .env file;
const devUrl = process.env.VITE_DEV_API_DOCKER === 'true';
const currentHost = window.location.hostname;

// Get API path for production from .env file;
const prodUrl = process.env.VITE_PROD_API_BY_PROXY;

// Get CORS Settings from .env file
const corsWithCredentials = process.env.VITE_CORS_WITH_CREDENTIALS === 'true';
const corsWithXSRFToken = process.env.VITE_CORS_WITH_XSRF_TOKEN === 'true';

export default axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ?
    `${prodUrl}/` :
    (devUrl) ?
    `${apiProtocol}://${currentHost}${apiPort}${apiPath}/` :
    `${apiProtocol}://${apiHost}${apiPort}${apiPath}/`,
  withCredentials: corsWithCredentials,
  withXSRFToken: corsWithXSRFToken,
  timeout: Number(apiTimeout),
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Headers": "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, access_token",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  }
});
