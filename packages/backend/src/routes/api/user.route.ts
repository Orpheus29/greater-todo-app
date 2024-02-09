import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { tryCatch } from '../../middlewares/try-catch.middleware';
import { validateBody } from '../../middlewares/validation.middleware';
import {
  changePassSchema,
  resetPassRequestSchema,
  resetPassSchema,
  userSchema
} from '../../utils/user-validation.util';
import { authRequired } from '../../middlewares/auth.middleware';
import { isExistValidator } from '../../middlewares/is-exists.middleware';
import { User } from '../../entities/user.entity';

const router: Router = Router();

router.get('/get-user', authRequired, tryCatch(userController.getUser.bind(userController)));

router.post(
  '/register',
  validateBody(userSchema),
  tryCatch(userController.register.bind(userController))
);
router.post(
  '/login',
  validateBody(userSchema),
  tryCatch(userController.login.bind(userController))
);

router.post(
  '/change-password/:id',
  validateBody(changePassSchema),
  isExistValidator(User),
  tryCatch(userController.changePassword.bind(userController))
);

router.post(
  '/request-reset',
  validateBody(resetPassRequestSchema),
  tryCatch(userController.requestChangePass.bind(userController))
);

router.post(
  '/reset-password/:id',
  validateBody(resetPassSchema),
  tryCatch(userController.resetPassword.bind(userController))
);

export default router;
