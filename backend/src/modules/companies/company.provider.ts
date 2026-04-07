import CompanyModel from './company.model';
import { ICompany } from './company.model';

export const getAllCompanies = (): Promise<ICompany[]> => CompanyModel.find();
