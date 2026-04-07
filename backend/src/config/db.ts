import mongoose from 'mongoose';
import { env } from './env';
import UserModel from '../modules/users/user.model';

export const connectDB = async () => {
  const conn = await mongoose.connect(env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
  await UserModel.syncIndexes();
};
