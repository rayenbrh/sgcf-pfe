import { Router } from 'express';
import { listInvoices } from './invoice.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager', 'employe'), listInvoices);

export default router;
