/* eslint-disable no-unused-vars */
import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IAuthUser = {
  id: string;
  email: string;
} | null;

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface IErrorIssue {
  field: string | number;
  message: string;
}

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: IGenericErrorMessage[];
};
