/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.error';
import { HttpStatus } from '../types/http-status.type';

export const errorsMiddleware: ErrorRequestHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.httpStatus).send(err.message);
  }
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal server error.');
};
