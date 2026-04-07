import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const first = result.error.issues[0];
      const message = first?.message ?? 'Validation failed';
      res.status(400).json({ success: false, message, data: null });
      return;
    }
    req.body = result.data;
    next();
  };
};
