import { Router } from 'express';
import adminRoutes from 'modules/admin/route';
import authRoutes from 'modules/auth/route';
import blogRoutes from 'modules/blog/route';
import categoryRoutes from 'modules/category/route';
import commentRoutes from 'modules/comment/route';
import contactRoutes from 'modules/contact/route';
import feedbackRoutes from 'modules/feedback/route';
import portfolioRoutes from 'modules/portfolio/route';
import profileRoutes from 'modules/profile/route';
import serviceRoutes from 'modules/services/route';
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
        path: '/profile',
        route: profileRoutes,
    },
    {
        path: '/contact',
        route: contactRoutes,
    },
    {
        path: '/blogs',
        route: blogRoutes,
    },
    {
        path: '/feedback',
        route: feedbackRoutes,
    },
    {
        path: '/comments',
        route: commentRoutes,
    },
    {
        path: '/services',
        route: serviceRoutes,
    },
    {
        path: '/portfolio',
        route: portfolioRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
