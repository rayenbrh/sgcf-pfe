import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess, sendError } from '../../utils/apiResponse';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
} from './user.provider';

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  sendSuccess(res, users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, user);
});

export const createUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  sendSuccess(res, user, 'User created', 201);
});

export const updateUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await updateUser(req.params.id, req.body);
  if (!user) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, user, 'User updated');
});

export const deactivateUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = await deactivateUser(req.params.id);
  if (!user) {
    sendError(res, 'User not found', 404);
    return;
  }
  sendSuccess(res, user, 'User deactivated');
});
