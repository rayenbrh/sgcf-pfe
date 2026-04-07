import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import UserModel from '../modules/users/user.model';
import { asyncHandler } from '../utils/asyncHandler';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No token provided', data: null });
    return;
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided', data: null });
    return;
  }

  let decoded: JwtPayload & { id?: string };
  try {
    decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload & { id?: string };
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token', data: null });
    return;
  }

  const userId = typeof decoded.id === 'string' ? decoded.id : undefined;
  if (!userId) {
    res.status(401).json({ success: false, message: 'Invalid token', data: null });
    return;
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(401).json({ success: false, message: 'User no longer exists', data: null });
    return;
  }

  req.user = user;
  next();
});
