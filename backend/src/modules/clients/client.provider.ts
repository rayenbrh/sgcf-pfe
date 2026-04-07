import ClientModel from './client.model';
import { IClient } from './client.model';

export const getAllClients = (): Promise<IClient[]> => ClientModel.find();
