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
router.delete('/delete/:tripId', tripController.deleteTrips);
router.put('/update/:tripId', tripController.updateTrip);
router.get('/all', tripController.getAllTrip);

export const tripRoutes = router;
