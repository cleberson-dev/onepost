import { Request, Response, NextFunction } from 'express';
import ValidationError from '../errors/ValidationError';
import ClientError from '../errors/ClientError';

type Errors = ClientError | ValidationError;

export default function errorHandlerMiddleware(
  err: Errors,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (res.headersSent) {
    return next(err)
  }
  
  res.status(err.status || 400);
  if (err.name === 'ValidationError') {
    return res.json({
      name: err.name,
      message: err.message,
      fields: (err as ValidationError).fields
    });
  }

  return res.json({ name: err.name, message: err.message });
};
