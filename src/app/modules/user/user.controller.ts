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
    data: result,
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
const UpdateUserStatusController = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  const result = await UserService.UpdateUserStatus(userId, status);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile Status Updated successfully',
    data: result,
  });
});
const UpdateUserRoleController = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  const result = await UserService.UpdateUserStatus(userId, role);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile Role Updated successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile Get successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const { userId } = req.params;

  console.log(payload);

  const result = await UserService.changePassword(userId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Changed successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Fetched in successfully',
    data: result,
  });
});
export const UserController = {
  registerUserController,
  loginUser,
  getTUserController,
  updateUserController,
  getAllUsers,
  UpdateUserStatusController,
  UpdateUserRoleController,
  changePassword,
  getSingleUser,
};
