import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../../DB/db.config';
import UserModel from './user.model';
import bcrypt from 'bcrypt';
import { TUserProfile } from './user.interface';
import { AuthUtils } from '../../utils/authUtils';
import { createToken } from '../../utils/createToken';
import config from '../../config';

const loginUser = async (userEmail: string, password: string) => {
  if (!userEmail || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email and password are required',
    );
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  console.log(userExists);

  if (
    userExists.password &&
    !(await AuthUtils.comparePasswords(password, userExists.password))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const jwtPayload = {
    username: userExists.username,
    id: userExists.id,
    role: userExists.role,
    email: userExists.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const registerUserDB = async (payload: TUserProfile) => {
  try {
    const { email, password } = payload;

    // Check if user already exists
    const userExists = await UserModel.isUserExistsByEmail(email);
    if (userExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This email is already registered',
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (transactionClient) => {
      const newUser = await transactionClient.user.create({
        data: {
          username: payload.username,
          email: payload.email,
          password: hashedPassword,
        },
      });

      return newUser;
    });

    const jwtPayload = {
      username: result.username,
      id: result.id,
      role: result.role,
      email: result.email,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

const getAllUserDb = async (id: string) => {
  const userExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }
  return userExists;
};

const UpdateUserDB = async (id: string, payload: any) => {
  try {
    const tripExists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!tripExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This Trip does not exist');
    }

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...payload,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
};

export const UserService = {
  registerUserDB,
  loginUser,
  getAllUserDb,
  UpdateUserDB,
};
