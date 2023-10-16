import z from 'zod';

export const createEventValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required!',
        }),
        description: z.string({
            required_error: 'Description is required!',
        }),
        photo: z.string({
            required_error: 'Photo is required!',
        }),
        price: z.string({
            required_error: 'Price is required!',
        }),
    }),
});

export const updateEventValidation = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        photo: z.string().optional(),
        price: z.string().optional(),
    }),
});
