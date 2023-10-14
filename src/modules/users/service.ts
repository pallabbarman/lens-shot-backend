/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Prisma, User } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { userSearchableFields } from './constant';
import { IUser, IUserFilter } from './interface';

export const findAllUsers = async (
    filters: IUserFilter,
    options: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
    const { search, ...filterData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: userSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.UserWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                      createdAt: 'desc',
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

    const total = await prisma.user.count({
        where: whereConditions,
    });

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

export const findUser = async (id: string): Promise<IUser | null> => {
    const result = await prisma.user.findUnique({
        where: { id },
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

export const editUser = async (id: string, payload: Partial<User>): Promise<IUser> => {
    const result = await prisma.user.update({
        where: { id },
        data: payload,
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

export const removeUser = async (id: string): Promise<IUser> => {
    const result = await prisma.user.delete({
        where: { id },
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
