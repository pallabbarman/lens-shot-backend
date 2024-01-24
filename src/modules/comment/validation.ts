import z from 'zod';

export const createCommentValidation = z.object({
    body: z.object({
        comment: z.string({
            required_error: 'Feedback is required!',
        }),
    }),
});

export const updateCommentValidation = z.object({
    body: z.object({
        comment: z.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
