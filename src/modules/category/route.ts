/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory,
} from './controller';
import { createCategoryValidation, updateCategoryValidation } from './validation';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post(
    '/',
    validateRequest(createCategoryValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    createCategory
);
router.patch(
    '/:id',
    validateRequest(updateCategoryValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateCategory
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteCategory);

const categoryRoutes = router;

export default categoryRoutes;
