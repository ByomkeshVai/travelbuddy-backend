import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TripValidation } from './trip.validation';
import { tripController } from './trip.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/add-trip',
  auth(),
  validateRequest(TripValidation.TripSchema),
  tripController.createTripController,
);
router.get('/', tripController.getAllTripController);
router.get('/:tripId', tripController.getSignelTripController);
router.get('/user-trips/:userId', tripController.getAllRequestTrips);
router.get('/all-trips/:userId', tripController.getAllUserTrips);
router.get('/delete/:tripId', tripController.deleteTrips);

export const tripRoutes = router;
