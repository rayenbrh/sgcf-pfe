import { Router } from 'express';
import { listDeadlines } from './deadline.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';

const router = Router();

router.get('/', protect, authorize('admin', 'manager', 'employe', 'client'), listDeadlines);

export default router;
