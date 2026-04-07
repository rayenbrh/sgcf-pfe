import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllDocuments } from './document.provider';

export const listDocuments = asyncHandler(async (_req: Request, res: Response) => {
  const documents = await getAllDocuments();
  sendSuccess(res, documents);
});
