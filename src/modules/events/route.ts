/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from './controller';
import { createEventValidation, updateEventValidation } from './validation';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post(
    '/',
    validateRequest(createEventValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    createEvent
);
router.patch(
    '/:id',
    validateRequest(updateEventValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateEvent
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteEvent);

const eventRoutes = router;

export default eventRoutes;
