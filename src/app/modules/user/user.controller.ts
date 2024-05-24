import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { UserService } from './user.service';

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await UserService.loginUser(email, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const registerUserController = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserService.registerUserDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  });
});

const getTUserController = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await UserService.getAllUserDb(id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserController = catchAsync(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;

  const result = await UserService.UpdateUserDB(id, payload);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile updated successfully',
    data: result,
  });
});

export const UserController = {
  registerUserController,
  loginUser,
  getTUserController,
  updateUserController,
};
