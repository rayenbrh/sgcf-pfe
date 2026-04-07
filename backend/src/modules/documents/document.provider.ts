import DocumentModel from './document.model';
import { IDocument } from './document.model';

export const getAllDocuments = (): Promise<IDocument[]> => DocumentModel.find();
