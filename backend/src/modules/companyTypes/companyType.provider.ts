import CompanyTypeModel from './companyType.model';
import { ICompanyType } from './companyType.model';

export const getAllCompanyTypes = (): Promise<ICompanyType[]> => CompanyTypeModel.find();
