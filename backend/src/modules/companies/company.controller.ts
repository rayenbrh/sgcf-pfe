import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllCompanies } from './company.provider';

export const listCompanies = asyncHandler(async (_req: Request, res: Response) => {
  const companies = await getAllCompanies();
  sendSuccess(res, companies);
});
