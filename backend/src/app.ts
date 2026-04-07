import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import clientRoutes from './modules/clients/client.routes';
import companyRoutes from './modules/companies/company.routes';
import companyTypeRoutes from './modules/companyTypes/companyType.routes';
import deadlineRoutes from './modules/deadlines/deadline.routes';
import invoiceRoutes from './modules/invoices/invoice.routes';
import documentRoutes from './modules/documents/document.routes';

import { errorMiddleware } from './middleware/error.middleware';
import { env } from './config/env';

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(process.cwd(), env.UPLOAD_DIR)));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/company-types', companyTypeRoutes);
app.use('/api/deadlines', deadlineRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/documents', documentRoutes);

app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

app.use(errorMiddleware);

export default app;
