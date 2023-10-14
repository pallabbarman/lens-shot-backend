/* eslint-disable object-curly-newline */
import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from './controller';
import { createEventValidation, updateEventValidation } from './validation';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', validateRequest(createEventValidation), createEvent);
router.patch('/:id', validateRequest(updateEventValidation), updateEvent);
router.delete('/:id', deleteEvent);

const eventRoutes = router;

export default eventRoutes;
