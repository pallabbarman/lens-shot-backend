/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { Blog, Prisma } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { blogSearchableFields } from './constant';
import { BlogFilters } from './interface';

export const insertBlog = async (data: Blog): Promise<Blog> => {
    const result = await prisma.blog.create({
        data,
    });

    return result;
};

export const findAllBlogs = async (
    filters: BlogFilters,
    options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
    const { search, ...filterData } = filters;

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: blogSearchableFields.map((field) => ({
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

    const whereConditions: Prisma.BlogWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.blog.findMany({
        where: whereConditions,
        include: {
            category: true,
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            contactNo: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
        skip,
        take: limit,
        orderBy:
            sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });

    const total = await prisma.blog.count({
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

export const findBlog = async (id: string): Promise<Blog | null> => {
    const result = await prisma.blog.findUnique({
        where: { id },
        include: {
            category: true,
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            contactNo: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });

    return result;
};

export const editBlog = async (id: string, payload: Partial<Blog>): Promise<Blog> => {
    const result = await prisma.blog.update({
        where: {
            id,
        },
        include: {
            category: true,
            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            contactNo: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
        data: payload,
    });

    return result;
};

export const removeBlog = async (id: string): Promise<Blog> => {
    const result = await prisma.blog.delete({
        where: {
            id,
        },
    });

    return result;
};
