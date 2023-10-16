import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import { changeRole } from './controller';
import { changeRoleValidation } from './validation';

const router = Router();

router.patch('/:id', validateRequest(changeRoleValidation), auth(Roles.SUPER_ADMIN), changeRole);

const adminRoutes = router;

export default adminRoutes;
