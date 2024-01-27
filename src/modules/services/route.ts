/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import {
    createService,
    deleteService,
    getAllServices,
    getService,
    updateService,
} from './controller';
import { createServiceValidation, updateServiceValidation } from './validation';

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getService);
router.post(
    '/',
    validateRequest(createServiceValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    createService
);
router.patch(
    '/:id',
    validateRequest(updateServiceValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateService
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteService);

const serviceRoutes = router;

export default serviceRoutes;
