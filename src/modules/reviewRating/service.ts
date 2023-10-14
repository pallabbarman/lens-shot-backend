/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
import { ReviewAndRating } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from 'utils/prisma';

export const insertReviewAndRating = async (
    data: ReviewAndRating,
    user: JwtPayload
): Promise<ReviewAndRating> => {
    const result = await prisma.reviewAndRating.create({
        data: {
            ...data,
            userId: user.userId,
        },
        include: {
            event: true,
            user: true,
        },
    });

    return result;
};
