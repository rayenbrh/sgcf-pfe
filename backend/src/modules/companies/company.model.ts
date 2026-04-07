import { Schema, model, Document, Types } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  matriculeFiscal: string;
  address?: string;
  client: Types.ObjectId;
  companyType: Types.ObjectId;
  pricingOverride?: {
    type: 'fixed' | 'custom';
    fixedMonthly?: number;
    fixedAnnual?: number;
    customMonthly?: Map<string, number>;
  };
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const pricingOverrideSchema = new Schema(
  {
    type: { type: String, enum: ['fixed', 'custom'], required: true },
    fixedMonthly: { type: Number },
    fixedAnnual: { type: Number },
    customMonthly: { type: Map, of: Number },
  },
  { _id: false }
);

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, trim: true },
    matriculeFiscal: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    companyType: { type: Schema.Types.ObjectId, ref: 'CompanyType', required: true },
    pricingOverride: { type: pricingOverrideSchema, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CompanyModel = model<ICompany>('Company', companySchema);

export default CompanyModel;
