/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { IGenericErrorMessage } from '../interface/error';
import { Prisma } from '@prisma/client';
import handleValidationError from '../errors/validationError';
import { ZodError } from 'zod';
import handleZodError from '../errors/zodError';
import AppError from '../errors/AppError';
import handleClientError from '../errors/handleClientError';
import UnAuthorize from '../errors/unauthorizedError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorDetails: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (error instanceof UnAuthorize) {
    statusCode = error?.statusCode;
    message = 'Unauthorized Access';
    errorDetails = [
      {
        message: error.message,
      },
    ];
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorDetails = error?.message
      ? [
          {
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorDetails = error?.message
      ? [
          {
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
