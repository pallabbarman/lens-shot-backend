import z from 'zod';

export const createBlogValidation = z.object({
    body: z.object({
        img: z.string({
            required_error: 'Image is required!',
        }),
        title: z.string({
            required_error: 'Title name is required!',
        }),
        content: z.string({
            required_error: 'Content name is required!',
        }),
    }),
});

export const updateBlogValidation = z.object({
    body: z.object({
        img: z.string().optional(),
        title: z.string().optional(),
        content: z.string().optional(),
    }),
});
