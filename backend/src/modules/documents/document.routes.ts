import { Router } from 'express';
import { listDocuments } from './document.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager', 'employe', 'client'), listDocuments);

export default router;
