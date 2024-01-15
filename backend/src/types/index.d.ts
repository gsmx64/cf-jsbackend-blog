declare namespace NodeJS {
    interface ProcessEnv {
        APP_HOST: string;
        APP_PORT: number;
        APP_AUTH_SECRET: string;
        APP_AUTH_HASH_SALT: number;
        APP_AUTH_TOKEN_EXPIRATION: number;
        APP_AUTH_TWITTER_KEY: string;
        APP_AUTH_TWITTER_SECRET: string;
        APP_AUTH_FACEBOOK_KEY: string;
        APP_AUTH_FACEBOOK_SECRET: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_NAME: string;
        DB_USER: string;
        DB_PASSWORD: string;
    }
}
