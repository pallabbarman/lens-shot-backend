import { Router } from 'express';
import authRoutes from 'modules/auth/route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
