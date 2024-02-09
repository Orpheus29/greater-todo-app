import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { isExistsAndCreator } from '../../middlewares/is-exists.middleware';
import { Todo } from '../../entities/todo.entity';
import { tryCatch } from '../../middlewares/try-catch.middleware';
import { validateBody, validateQuery } from '../../middlewares/validation.middleware';
import { createTodo, todoQueryFilters, updateTodo } from '../../utils/todo-validation.util';
import { authRequired } from '../../middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(
  '',
  authRequired,
  validateQuery(todoQueryFilters),
  tryCatch(todoController.getAllTodo.bind(todoController))
);

todosRouter.get(
  '/:id',
  authRequired,
  isExistsAndCreator(Todo),
  tryCatch(todoController.getOneTodo.bind(todoController))
);

todosRouter.post(
  '',
  authRequired,
  validateBody(createTodo),
  tryCatch(todoController.createTodo.bind(todoController))
);

todosRouter.patch(
  '/:id',
  authRequired,
  validateBody(updateTodo),
  isExistsAndCreator(Todo),
  tryCatch(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  '/:id',
  authRequired,
  isExistsAndCreator(Todo),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
