/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { Category, Prisma } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { categorySearchableFields } from './constant';
import { CategoryFilters } from './interface';

export const insertCategory = async (data: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data,
    });

    return result;
};

export const findAllCategories = async (
    filters: CategoryFilters,
    options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
    const { search, ...filterData } = filters;

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: categorySearchableFields.map((field) => ({
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

    const whereConditions: Prisma.CategoryWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.category.findMany({
        where: whereConditions,
        include: {
            events: true,
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

    const total = await prisma.category.count({
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

export const findCategory = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({
        where: { id },
        include: {
            events: true,
        },
    });

    return result;
};

export const editCategory = async (id: string, payload: Partial<Category>): Promise<Category> => {
    const result = await prisma.category.update({
        where: {
            id,
        },
        include: {
            events: true,
        },
        data: payload,
    });

    return result;
};

export const removeCategory = async (id: string): Promise<Category> => {
    const result = await prisma.category.delete({
        where: {
            id,
        },
    });

    return result;
};
