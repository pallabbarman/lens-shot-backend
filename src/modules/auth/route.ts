import { Router } from 'express';
import validateRequest from 'middlewares/validateRequest';
import { createUser, loginUser } from './controller';
import { createUserValidation, loginValidation } from './validation';

const router = Router();

router.post('/signup', validateRequest(createUserValidation), createUser);
router.post('/login', validateRequest(loginValidation), loginUser);

const authRoutes = router;

export default authRoutes;
