/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from './controller';
import { createBlogValidation, updateBlogValidation } from './validation';

const router = Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.post(
    '/',
    validateRequest(createBlogValidation),
    auth(Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN),
    createBlog
);
router.patch(
    '/:id',
    validateRequest(updateBlogValidation),
    auth(Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN),
    updateBlog
);
router.delete('/:id', auth(Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN), deleteBlog);

const blogRoutes = router;

export default blogRoutes;
