import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBooking,
    updateBooking,
} from './controller';

const router = Router();

router.get('/', getAllBookings);
router.get('/:id', getBooking);
router.post('/', auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER), createBooking);
router.patch('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER), updateBooking);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER), deleteBooking);

const bookingRoutes = router;

export default bookingRoutes;
