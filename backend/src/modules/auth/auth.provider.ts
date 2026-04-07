import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import UserModel, { IUser } from '../users/user.model';

export const findUserByEmailWithPassword = (email: string): Promise<IUser | null> =>
  UserModel.findOne({ email: email.toLowerCase().trim() }).select('+password');

export const generateToken = (userId: string): string =>
  jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
