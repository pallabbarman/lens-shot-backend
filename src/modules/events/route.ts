import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createEvent } from './controller';
import { createEventValidation } from './validation';

const router = Router();

router.post('/', validateRequest(createEventValidation), createEvent);

const eventRoutes = router;

export default eventRoutes;
