/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import {
    createFeedback,
    deleteFeedback,
    getAllFeedbacks,
    getFeedback,
    updateFeedback,
} from './controller';
import { createFeedbackValidation, updateFeedbackValidation } from './validation';

const router = Router();

router.get('/', getAllFeedbacks);
router.get('/:id', getFeedback);
router.post(
    '/',
    validateRequest(createFeedbackValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER),
    createFeedback
);
router.patch(
    '/:id',
    validateRequest(updateFeedbackValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateFeedback
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteFeedback);

const feedbackRoutes = router;

export default feedbackRoutes;
