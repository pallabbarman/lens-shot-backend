import { Router } from 'express';
import authRoutes from 'modules/auth/route';
import eventRoutes from 'modules/events/route';
import profileRoutes from 'modules/profile/route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/events',
        route: eventRoutes,
    },
    {
        path: '/profile',
        route: profileRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
