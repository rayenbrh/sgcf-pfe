import { Schema, model, Document, Types } from 'mongoose';

export type InvoiceStatus = 'draft' | 'sent' | 'paid';

export interface IInvoice extends Document {
  company: Types.ObjectId;
  deadline: Types.ObjectId;
  amount: number;
  status: InvoiceStatus;
  issuedAt: Date;
  paidAt?: Date;
  invoiceNumber: string;
  createdBy: Types.ObjectId;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    deadline: { type: Schema.Types.ObjectId, ref: 'Deadline', required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'sent', 'paid'],
      default: 'draft',
    },
    issuedAt: { type: Date, required: true, default: Date.now },
    paidAt: { type: Date },
    invoiceNumber: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const InvoiceModel = model<IInvoice>('Invoice', invoiceSchema);

export default InvoiceModel;
