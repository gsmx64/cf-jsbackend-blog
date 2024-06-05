/**
 * Represents the environment variables used in the application.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    APP_HOST: string;
    APP_PORT: number;
    APP_AUTH_SECRET: string;
    APP_AUTH_HASH_SALT: number;
    APP_AUTH_TOKEN_EXPIRATION: number;
    APP_AUTH_FACEBOOK_ENABLE: string;
    APP_AUTH_FACEBOOK_KEY: string;
    APP_AUTH_FACEBOOK_SECRET: string;
    APP_AUTH_GOOGLE_ENABLE: string;
    APP_AUTH_GOOGLE_ID: string;
    APP_AUTH_GOOGLE_SECRET: string;
    APP_AUTH_TWITTER_ENABLE: string;
    APP_AUTH_TWITTER_KEY: string;
    APP_AUTH_TWITTER_SECRET: string;        
    APP_DB_HOST: string;
    APP_DB_PORT: number;
    APP_DB_NAME: string;
    APP_DB_SCHEMA: string;
    APP_DB_USER: string;
    APP_DB_PASSWORD: string;
    APP_PAGINATION_DEFAULT_LIMIT: number;
    APP_PAGINATION_MAX_LIMIT: number;
    APP_LOGGING_ENABLE: string;
  }
}