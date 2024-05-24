import * as z from 'zod';

const TripSchema = z.object({
  userId: z.string().optional(),
  destination: z.string({
    required_error: 'destination is required',
  }),
  startDate: z.string({
    required_error: 'startDate is required',
  }),
  endDate: z.string({
    required_error: 'endDate is required',
  }),
  budget: z.number({
    required_error: 'budget is required',
  }),
  activities: z.array(
    z.string({
      required_error: 'activities is required',
    }),
  ),
});

export const TripValidation = {
  TripSchema,
};
