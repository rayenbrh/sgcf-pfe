import InvoiceModel from './invoice.model';
import { IInvoice } from './invoice.model';

export const getAllInvoices = (): Promise<IInvoice[]> => InvoiceModel.find();
