import * as z from 'zod';
const TravelBuddyRequestSchema = z.object({
  tripId: z.string().optional(),
  userId: z.string().optional(),
  notes: z.string().optional(),
  status: z.string().optional().default('PENDING'),
});

const UpdateStatusTravelBuddyDBParamsSchema = z.object({
  tripId: z.string(),
  buddyId: z.string(),
  status: z.string({
    required_error: 'Status is required',
  }),
});

export const TravelBuddyValidation = {
  TravelBuddyRequestSchema,
  UpdateStatusTravelBuddyDBParamsSchema,
};
