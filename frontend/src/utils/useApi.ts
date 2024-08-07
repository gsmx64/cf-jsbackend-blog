import axios from "axios";

// Get API URL from .env file
const apiProtocol = import.meta.env.VITE_API_PROTOCOL;
const apiHost = import.meta.env.VITE_API_HOST;
const apiPort = (
  (Number(import.meta.env.VITE_API_PORT) === 80) ||
  (Number(import.meta.env.VITE_API_PORT) === 443)
  ) ? '' : ':'+import.meta.env.VITE_API_PORT;
const apiPath = import.meta.env.VITE_API_PATH;
const apiTimeout = import.meta.env.VITE_API_TIMEOUT;

// Get API path for Dev Docker-Copmpose URL from .env file;
const devUrl = import.meta.env.VITE_DEV_API_DOCKER === 'true';
const currentHost = window.location.hostname;

// Get API path for production from .env file;
const prodUrl = import.meta.env.VITE_PROD_API_BY_PROXY;

// Get CORS Settings from .env file
const corsWithCredentials = import.meta.env.VITE_CORS_WITH_CREDENTIALS === 'true';
const corsWithXSRFToken = import.meta.env.VITE_CORS_WITH_XSRF_TOKEN === 'true';

export default axios.create({
  baseURL: (import.meta.env.VITE_NODE_ENV === 'production') ?
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
