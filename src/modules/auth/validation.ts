/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const createUserValidation = z.object({
    body: z.object({
        firstName: z.string({
            required_error: 'First name is required!',
        }),
        lastName: z.string({
            required_error: 'Last name is required!',
        }),
        email: z
            .string({
                required_error: 'Email is required!',
            })
            .email({ message: 'Please enter a valid email!' }),
        password: z.string({
            required_error: 'Password is required!',
        }),
        role: z.string().optional(),
        contactNo: z.string({
            required_error: 'Contact number is required!',
        }),
        address: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

export const loginValidation = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required!',
            })
            .email({ message: 'Please enter a valid email!' }),
        password: z.string({
            required_error: 'Password is required!',
        }),
    }),
});
