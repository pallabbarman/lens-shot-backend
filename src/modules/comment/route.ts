/* eslint-disable comma-dangle */
import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from 'middlewares/auth';
import validateRequest from 'middlewares/validateRequest';
import {
    createComment,
    deleteComment,
    getAllComments,
    getComment,
    updateComment,
} from './controller';
import { createCommentValidation, updateCommentValidation } from './validation';

const router = Router();

router.get('/', getAllComments);
router.get('/:id', getComment);
router.post(
    '/',
    validateRequest(createCommentValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER),
    createComment
);
router.patch(
    '/:id',
    validateRequest(updateCommentValidation),
    auth(Roles.ADMIN, Roles.SUPER_ADMIN),
    updateComment
);
router.delete('/:id', auth(Roles.ADMIN, Roles.SUPER_ADMIN), deleteComment);

const commentRoutes = router;

export default commentRoutes;
