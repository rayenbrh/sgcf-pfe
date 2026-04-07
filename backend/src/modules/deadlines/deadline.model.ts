import { Schema, model, Document, Types } from 'mongoose';

export type DeadlineType = 'monthly' | 'annual';
export type DeadlineStatus = 'pending' | 'validated' | 'paid' | 'overdue';

export interface IDeadline extends Document {
  company: Types.ObjectId;
  type: DeadlineType;
  dueDate: Date;
  amount: number;
  status: DeadlineStatus;
  month?: number;
  year: number;
  invoice?: Types.ObjectId;
}

const deadlineSchema = new Schema<IDeadline>(
  {
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    type: { type: String, required: true, enum: ['monthly', 'annual'] },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'validated', 'paid', 'overdue'],
      default: 'pending',
    },
    month: { type: Number, min: 1, max: 12 },
    year: { type: Number, required: true },
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
  },
  { timestamps: false }
);

const DeadlineModel = model<IDeadline>('Deadline', deadlineSchema);

export default DeadlineModel;
