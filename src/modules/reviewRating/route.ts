/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { createReviewAndRating } from './controller';
import { createReviewValidation } from './validation';

const router = Router();

router.post(
    '/',
    validateRequest(createReviewValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER),
    createReviewAndRating
);

const reviewRoutes = router;

export default reviewRoutes;
