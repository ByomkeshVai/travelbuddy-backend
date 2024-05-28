import * as z from 'zod';

const TripSchema = z.object({
  userId: z.string().optional(),
  destination: z.string({
    required_error: 'Destination is required',
  }),
  description: z.string({
    required_error: 'description is required',
  }),
  startDate: z.string({
    required_error: 'Start date is required',
  }),
  endDate: z.string({
    required_error: 'End date is required',
  }),
  type: z.string().optional(),
  images: z.array(z.string()).optional(),
});
export const TripValidation = {
  TripSchema,
};
