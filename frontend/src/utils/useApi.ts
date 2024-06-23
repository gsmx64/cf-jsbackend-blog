import axios from "axios";

// Get API URL from .env file
const apiProtocol = import.meta.env.VITE_API_PROTOCOL;
const apiHost = import.meta.env.VITE_API_HOST;
const apiPort = (import.meta.env.VITE_API_PORT === 80) ? '' : ':'+import.meta.env.VITE_API_PORT;
const apiPath = import.meta.env.VITE_API_PATH;
const apiTimeout = import.meta.env.VITE_API_TIMEOUT;

// Get Proxy URL from .env fileT;
const prodUrl = import.meta.env.VITE_PROD_API_BY_PROXY;

// Get CORS Settings from .env file
const corsWithCredentials = import.meta.env.VITE_CORS_WITH_CREDENTIALS === 'true';
const corsWithXSRFToken = import.meta.env.VITE_CORS_WITH_XSRF_TOKEN === 'true';

export default axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ?
    `${prodUrl}/` :
    `${apiProtocol}://${apiHost}${apiPort}${apiPath}/`,
  withCredentials: corsWithCredentials,
  withXSRFToken: corsWithXSRFToken,
  timeout: apiTimeout,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json;charset=utf-8",
    "Access-Control-Allow-Headers": "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, access_token"
  }
});
