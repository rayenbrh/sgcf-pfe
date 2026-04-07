import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllClients } from './client.provider';

export const listClients = asyncHandler(async (_req: Request, res: Response) => {
  const clients = await getAllClients();
  sendSuccess(res, clients);
});
