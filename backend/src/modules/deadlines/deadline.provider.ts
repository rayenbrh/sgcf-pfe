import DeadlineModel from './deadline.model';
import { IDeadline } from './deadline.model';

export const getAllDeadlines = (): Promise<IDeadline[]> => DeadlineModel.find();
