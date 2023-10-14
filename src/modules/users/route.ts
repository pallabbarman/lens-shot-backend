/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { deleteUser, getAllUsers, getUser, updateUser } from './controller';
import { updateUserValidation } from './validation';

const router = Router();

router.get('/', auth(Roles.ADMIN, Roles.SUPER_ADMIN), getAllUsers);
router.get('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), getUser);
router.patch(
    '/:id',
    validateRequest(updateUserValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateUser
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteUser);

const userRoutes = router;

export default userRoutes;
