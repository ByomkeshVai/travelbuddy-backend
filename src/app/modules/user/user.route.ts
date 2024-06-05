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
router.get('/', auth(), UserController.getAllUsers);
router.get('/single-user/:userId', auth(), UserController.getSingleUser);

router.put(
  '/status/:userId',
  auth(),
  UserController.UpdateUserStatusController,
);

router.put('/role/:userId', auth(), UserController.UpdateUserRoleController);

router.put(
  '/profile',
  auth(),
  validateRequest(UserProfileValidation.updateValidation),
  UserController.updateUserController,
);
router.put(
  '/changePassword/:userId',
  auth(),
  // validateRequest(UserProfileValidation.updatePasswordValidation),
  UserController.changePassword,
);

export const UserRoutes = router;
