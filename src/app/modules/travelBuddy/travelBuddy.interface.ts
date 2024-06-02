import { Status } from '@prisma/client';

export interface TravelBuddyRequest {
  id: string;
  tripId: string;
  userId: string;
  status: Status;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
