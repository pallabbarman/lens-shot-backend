/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const createReviewValidation = z.object({
    body: z.object({
        review: z.string({
            required_error: 'Review is required!',
        }),
        rating: z.number({
            required_error: 'Rating is required!',
        }),
    }),
});
