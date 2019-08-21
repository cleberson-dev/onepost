import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/ClientError';

export default function errorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status);
  return res.json({ name: err.name, message: err.message });
};
