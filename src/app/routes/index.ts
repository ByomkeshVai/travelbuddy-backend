import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { tripRoutes } from '../modules/trip/trip.route';
import { travelRoutes } from '../modules/travelBuddy/travelBuddy.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/trips',
    route: tripRoutes,
  },
  {
    path: '/travel',
    route: travelRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
