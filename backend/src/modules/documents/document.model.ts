import { Schema, model, Document, Types } from 'mongoose';

export interface IDocument extends Document {
  company: Types.ObjectId;
  folderPath: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedBy: Types.ObjectId;
  uploadedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    folderPath: { type: String, required: true, trim: true },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: false }
);

const DocumentModel = model<IDocument>('Document', documentSchema);

export default DocumentModel;
