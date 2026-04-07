import { RequestHandler } from 'express';
import { Role } from '../modules/users/user.model';

export const authorize =
  (...roles: Role[]): RequestHandler =>
  (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated', data: null });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Access denied', data: null });
      return;
    }
    next();
  };
