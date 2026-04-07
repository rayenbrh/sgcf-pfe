import 'dotenv/config';
import app from './src/app';
import { connectDB } from './src/config/db';
import { env } from './src/config/env';

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
