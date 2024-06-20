import axios from "axios";

// Get API URL from .env file
const apiProtocol = import.meta.env.VITE_API_PROTOCOL;
const apiHost = import.meta.env.VITE_API_HOST;
const apiPort = (import.meta.env.VITE_API_PORT === 80) ? '' : ':'+import.meta.env.VITE_API_PORT;
const apiUrl = import.meta.env.VITE_API_URL;
const apiTimeout = import.meta.env.VITE_API_TIMEOUT;

// Get APP URL from .env file
const appProtocol = import.meta.env.VITE_APP_PROTOCOL;
const appHost = import.meta.env.VITE_APP_HOST;
const appPort = (import.meta.env.VITE_APP_PORT === 80) ? '' : ':'+import.meta.env.VITE_APP_PORT;

// Get Proxy URL from .env file
const proxyProtocol = import.meta.env.VITE_PROXY_PROTOCOL;
const proxyHost = import.meta.env.VITE_PROXY_HOST;
const proxyPort = import.meta.env.VITE_PROXY_PORT;
const proxyUrl = import.meta.env.VITE_PROXY_URL;

// Get CORS Settings from .env file
const corsWithCredentials = import.meta.env.VITE_CORS_WITH_CREDENTIALS === 'true';
const corsWithXSRFToken = import.meta.env.VITE_CORS_WITH_XSRF_TOKEN === 'true';

export default axios.create({
  baseURL: (process.env.NODE_ENV === 'production') ?
    `${proxyProtocol}://${proxyHost}${proxyPort}${proxyUrl}/` :
    `${apiProtocol}://${apiHost}${apiPort}${apiUrl}/`,
  withCredentials: corsWithCredentials,
  withXSRFToken: corsWithXSRFToken,
  timeout: apiTimeout,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json;charset=utf-8",
    'Access-Control-Allow-Origin': (process.env.NODE_ENV === 'production') ?
      `${proxyProtocol}://${proxyHost}${proxyPort}` :
      `${appProtocol}://${appHost}${appPort}`, // CORS
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER'
  }
});