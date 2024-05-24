import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { tripRoutes } from '../modules/trip/trip.route';
import { travelRoutes } from '../modules/travelBuddy/travelBuddy.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/',
    route: tripRoutes,
  },
  {
    path: '/',
    route: travelRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
