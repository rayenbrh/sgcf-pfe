import { Router } from 'express';
import { z } from 'zod';
import {
  listUsers,
  getUser,
  createUserHandler,
  updateUserHandler,
  deactivateUserHandler,
} from './user.controller';
import { protect } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/rbac.middleware';
import { validate } from '../../middleware/validate.middleware';

const router = Router();

const createUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  role: z.enum(['admin', 'manager', 'employe', 'client']),
});

const updateUserSchema = createUserSchema.partial();

router.use(protect, authorize('admin'));

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', validate(createUserSchema), createUserHandler);
router.put('/:id', validate(updateUserSchema), updateUserHandler);
router.delete('/:id', deactivateUserHandler);

export default router;
