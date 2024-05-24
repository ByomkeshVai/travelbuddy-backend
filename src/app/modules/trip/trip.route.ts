import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TripValidation } from './trip.validation';
import { tripController } from './trip.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/trips',
  auth(),
  validateRequest(TripValidation.TripSchema),
  tripController.createTripController,
);
router.get('/trips', tripController.getAllTripController);

export const tripRoutes = router;
