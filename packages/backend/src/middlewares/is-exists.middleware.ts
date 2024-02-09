import { NextFunction, Request, RequestHandler, Response } from 'express';
import { BaseEntityWithId } from '../types/with-id.type';
import { NotFound } from '../errors/not-found.error';
import { BaseEntityWithIdAndUser } from '../types/with-id-and-user.type';

export function isExistValidator(entityClass: BaseEntityWithId): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const exists = await entityClass.exists({ where: { id } });
      if (!exists) next(new NotFound('Not Found'));
      next();
    } catch (error) {
      next(new NotFound('Not Found'));
    }
  };
}

export function isExistsAndCreator(entity: BaseEntityWithIdAndUser): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user.id) return next(new NotFound('Not Found'));
      const { id: userId } = req.user;
      const { id } = req.params;
      const exists = await entity.exists({ where: { id, user: { id: userId } } });
      if (!exists) next(new NotFound('Not Found'));
      next();
    } catch (error) {
      next(new NotFound('Not Found'));
    }
  };
}
