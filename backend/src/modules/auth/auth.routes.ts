import { Router } from 'express';
import { z } from 'zod';
import { login, logout, me } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', validate(loginSchema), login);
router.post('/logout', protect, logout);
router.get('/me', protect, me);

export default router;
