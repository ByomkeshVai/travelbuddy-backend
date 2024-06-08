import * as z from 'zod';

const UserProfileSchema = z.object({
  username: z.string({
    required_error: 'username is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const loginValidationSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const updateValidation = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  name: z.string({
    required_error: 'Name is required',
  }),
});

const updatePasswordValidation = z.object({
  password: z.string({
    required_error: 'Old Password is required',
  }),
  newPassword: z.string({
    required_error: 'New Password is required',
  }),
});

export const UserProfileValidation = {
  UserProfileSchema,
  loginValidationSchema,
  updateValidation,
  updatePasswordValidation,
};
