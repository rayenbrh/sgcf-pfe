import { Schema, model, Document } from 'mongoose';

export interface ICompanyType extends Document {
  name: string;
  description?: string;
  fiscalCalendar: {
    monthlyDeclaration: number;
    annualBilan: number;
  };
  isActive: boolean;
}

const companyTypeSchema = new Schema<ICompanyType>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fiscalCalendar: {
      monthlyDeclaration: { type: Number, required: true },
      annualBilan: { type: Number, required: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CompanyTypeModel = model<ICompanyType>('CompanyType', companyTypeSchema);

export default CompanyTypeModel;
