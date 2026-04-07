import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';
import { getAllInvoices } from './invoice.provider';

export const listInvoices = asyncHandler(async (_req: Request, res: Response) => {
  const invoices = await getAllInvoices();
  sendSuccess(res, invoices);
});
