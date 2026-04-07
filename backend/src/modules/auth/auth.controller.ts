import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess, sendError } from '../../utils/apiResponse';
import { findUserByEmailWithPassword, generateToken } from './auth.provider';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await findUserByEmailWithPassword(email);
  if (!user) {
    sendError(res, 'Invalid credentials', 401);
    return;
  }

  if (!user.isActive) {
    sendError(res, 'Account deactivated', 403);
    return;
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    sendError(res, 'Invalid credentials', 401);
    return;
  }

  const token = generateToken(user._id.toString());
  sendSuccess(
    res,
    {
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    },
    'Success',
    200
  );
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    sendError(res, 'Not authenticated', 401);
    return;
  }

  const u = req.user;
  sendSuccess(
    res,
    {
      _id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    },
    'Success',
    200
  );
});
