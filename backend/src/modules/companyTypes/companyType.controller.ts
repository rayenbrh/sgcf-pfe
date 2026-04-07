import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllCompanyTypes } from './companyType.provider';

export const listCompanyTypes = asyncHandler(async (_req: Request, res: Response) => {
  const types = await getAllCompanyTypes();
  sendSuccess(res, types);
});
