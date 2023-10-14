/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const updateUserValidation = z.object({
    body: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email({ message: 'Please enter a valid email!' }).optional(),
        password: z.string().optional(),
        role: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});
