import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

interface ErrorResponseBody {
  success: false;
  message: string;
  data: null;
  stack?: string;
}

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const body: ErrorResponseBody = {
    success: false,
    message: 'Internal server error',
    data: null,
  };

  if (err instanceof AppError) {
    body.message = err.message;
    res.status(err.statusCode).json(body);
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    body.message = messages.join(', ') || 'Validation error';
    res.status(400).json(body);
    return;
  }

  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    body.message = 'Invalid token';
    res.status(401).json(body);
    return;
  }

  if (env.NODE_ENV === 'development' && err instanceof Error) {
    body.stack = err.stack;
  }

  res.status(500).json(body);
};
