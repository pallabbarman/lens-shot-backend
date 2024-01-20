import z from 'zod';

export const createFeedbackValidation = z.object({
    body: z.object({
        feedback: z.string({
            required_error: 'Feedback is required!',
        }),
    }),
});

export const updateFeedbackValidation = z.object({
    body: z.object({
        feedback: z.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
