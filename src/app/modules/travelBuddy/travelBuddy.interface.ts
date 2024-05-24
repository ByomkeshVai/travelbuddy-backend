import { Status } from '@prisma/client';

export interface TravelBuddyRequest {
  id: string;
  tripId: string;
  userId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
