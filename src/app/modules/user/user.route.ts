import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserProfileValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post(
  '/login',
  validateRequest(UserProfileValidation.loginValidationSchema),
  UserController.loginUser,
);

router.post(
  '/register',
  validateRequest(UserProfileValidation.UserProfileSchema),
  UserController.registerUserController,
);

router.get('/profile', auth(), UserController.getTUserController);

router.put(
  '/profile',
  auth(),
  validateRequest(UserProfileValidation.updateValidation),
  UserController.updateUserController,
);

export const UserRoutes = router;
