import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllDeadlines } from './deadline.provider';

export const listDeadlines = asyncHandler(async (_req: Request, res: Response) => {
  const deadlines = await getAllDeadlines();
  sendSuccess(res, deadlines);
});
