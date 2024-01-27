/* eslint-disable import/prefer-default-export */
import { User } from '@prisma/client';
import prisma from 'utils/prisma';

export const editRole = async (id: string, role: string): Promise<User> => {
    const result = await prisma.user.update({
        where: {
            id,
        },
        data: role,
    });

    return result;
};
