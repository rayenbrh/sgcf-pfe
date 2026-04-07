import { Types } from 'mongoose';
import DeadlineModel from '../modules/deadlines/deadline.model';

/**
 * Utility to auto-generate deadlines when a company is created.
 * Called from companies.provider.ts after company creation.
 */
export const generateDeadlines = async (
  companyId: string,
  fiscalCalendar: { monthly: number; annual: number },
  year: number = new Date().getFullYear()
): Promise<void> => {
  const companyObjectId = new Types.ObjectId(companyId);

  const monthlyDocs = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const lastDay = new Date(year, month, 0);
    return {
      company: companyObjectId,
      type: 'monthly' as const,
      dueDate: lastDay,
      amount: fiscalCalendar.monthly,
      status: 'pending' as const,
      month,
      year,
    };
  });

  const annualDue = new Date(year, 11, 31);
  const annualDoc = {
    company: companyObjectId,
    type: 'annual' as const,
    dueDate: annualDue,
    amount: fiscalCalendar.annual,
    status: 'pending' as const,
    year,
  };

  await DeadlineModel.insertMany([...monthlyDocs, annualDoc]);
};
