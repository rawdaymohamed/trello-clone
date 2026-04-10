declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      CLIENT_URL: string;
    }
  }
}

export {}; // This makes the file a module
