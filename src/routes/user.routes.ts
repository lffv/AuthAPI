import express from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from '../controller/user.controller';
import requiredUser from '../middleware/requiredUser';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from '../schema/user.schema';

const router = express.Router();

router.post(
  '/api/users',
  validateResource(createUserSchema),
  createUserHandler,
);
router.post(
  '/api/users/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler,
);
router.post(
  '/api/users/forgotpassword',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler,
);
router.post(
  '/api/users/resetpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler,
);

router.get('/api/users/me', requiredUser, getCurrentUserHandler);

export default router;
