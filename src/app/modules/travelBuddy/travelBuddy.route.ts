import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TravelBuddyValidation } from './travelBuddy.validation';
import { travelBuddyController } from './travelBuddy.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/request',
  auth(),
  validateRequest(TravelBuddyValidation.TravelBuddyRequestSchema),
  travelBuddyController.createTravelBuddyController,
);

router.put(
  '/travel-buddies/:buddyId/respond',
  auth(),
  travelBuddyController.updateStatusTravelBuddyController,
);

router.get(
  '/travel-buddies/:tripId',
  auth(),
  travelBuddyController.getTravelBuddyController,
);

export const travelRoutes = router;
