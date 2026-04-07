import { Router } from 'express';
import { listClients } from './client.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager'), listClients);

export default router;
