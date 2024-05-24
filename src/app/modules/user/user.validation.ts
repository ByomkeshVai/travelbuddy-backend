import * as z from 'zod';

const userProfileSchema = z.object({
  bio: z.string({
    required_error: 'Bio is required',
  }),
  age: z.number({
    required_error: 'Age is required',
  }),
});
const UserProfileSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  profile: userProfileSchema,
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

export const UserProfileValidation = {
  UserProfileSchema,
  loginValidationSchema,
  updateValidation,
};
