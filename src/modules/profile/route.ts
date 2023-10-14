/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { getProfile, updateProfile } from './controller';
import { updateProfileValidation } from './validation';

const router = Router();

router.get('/', auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER), getProfile);
router.patch(
    '/',
    validateRequest(updateProfileValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER),
    updateProfile
);

const profileRoutes = router;

export default profileRoutes;
