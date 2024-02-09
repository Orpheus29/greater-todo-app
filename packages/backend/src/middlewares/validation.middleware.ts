import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import { BadRequest } from '../errors/bad-request.error';

export const validateBody =
  (schema: Joi.ObjectSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    if (!result.error) next();
    if (result.error) next(new BadRequest(result.error.message));
  };

export const validateQuery =
  (schema: Joi.ObjectSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.query);
    if (!result.error) next();
    if (result.error) next(new BadRequest(result.error.message));
  };
