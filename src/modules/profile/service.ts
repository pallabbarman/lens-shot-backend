/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import { Roles, User } from '@prisma/client';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import prisma from 'utils/prisma';

export const findProfile = async (user: JwtPayload): Promise<Omit<User, 'password'> | null> => {
    const userId = user?.userId;
    const role = user?.role;

    if (role !== Roles.USER && role !== Roles.ADMIN && role !== Roles.SUPER_ADMIN) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role!');
    }

    const result = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found!');
    }

    return result;
};

export const editProfile = async (
    user: JwtPayload,
    data: Partial<User>
): Promise<Omit<User, 'password'> | null> => {
    const userId = user?.userId;
    const role = user?.role;

    if (role !== Roles.USER && role !== Roles.ADMIN && role !== Roles.SUPER_ADMIN) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role!');
    }

    const result = await prisma.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return result;
};
