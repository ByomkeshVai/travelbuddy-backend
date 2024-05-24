import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import UnAuthorize from '../errors/unauthorizedError';
import UserModel from '../modules/user/user.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnAuthorize(httpStatus.NOT_FOUND, 'Token not found');
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { email } = decoded;

      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
      }

      req.user = decoded as JwtPayload & {
        id: number;
        email: string;
        iat: number;
        exp: number;
      };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'JWT token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid JWT token');
      } else {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Undefined JWT token');
      }
    }
  });
};

export default auth;
