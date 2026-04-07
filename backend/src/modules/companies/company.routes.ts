import { Router } from 'express';
import { listCompanies } from './company.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager', 'employe'), listCompanies);

export default router;
