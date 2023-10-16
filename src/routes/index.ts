import { Router } from 'express';
import authRoutes from 'modules/auth/route';
import bookingRoutes from 'modules/booking/route';
import eventRoutes from 'modules/events/route';
import profileRoutes from 'modules/profile/route';
import reviewRoutes from 'modules/reviewRating/route';
import userRoutes from 'modules/users/route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/events',
        route: eventRoutes,
    },
    {
        path: '/profile',
        route: profileRoutes,
    },
    {
        path: '/reviews',
        route: reviewRoutes,
    },
    {
        path: '/bookings',
        route: bookingRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
