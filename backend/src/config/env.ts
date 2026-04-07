export const env = {
  PORT: process.env.PORT || '5000',
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
};

if (!env.MONGO_URI || !env.JWT_SECRET) {
  throw new Error('Missing required environment variables: MONGO_URI, JWT_SECRET');
}
