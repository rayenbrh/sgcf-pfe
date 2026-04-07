import { Router } from 'express';
import { listCompanyTypes } from './companyType.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager'), listCompanyTypes);

export default router;
