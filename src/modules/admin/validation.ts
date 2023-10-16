/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const changeRoleValidation = z.object({
    body: z.object({
        role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER'] as [string, ...string[]], {
            required_error: 'Role is required!',
        }),
    }),
});
