import { Router } from 'express';
import adminRoutes from 'modules/admin/route';
import authRoutes from 'modules/auth/route';
import blogRoutes from 'modules/blog/route';
import bookingRoutes from 'modules/booking/route';
import categoryRoutes from 'modules/category/route';
import contactRoutes from 'modules/contact/route';
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
        path: '/categories',
        route: categoryRoutes,
    },
    {
        path: '/admins',
        route: adminRoutes,
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
    {
        path: '/contact',
        route: contactRoutes,
    },
    {
        path: '/blogs',
        route: blogRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
