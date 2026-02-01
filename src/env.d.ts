declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URI: string;
    JWT_SECRET: string;
    PORT: number;
  }
}
