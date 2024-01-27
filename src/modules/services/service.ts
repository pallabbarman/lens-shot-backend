/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */

import { Prisma, Service } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { serviceSearchableFields } from './constant';
import { ServiceFilters } from './interface';

export const insertService = async (data: Service): Promise<Service> => {
    const result = await prisma.service.create({
        data,
    });

    return result;
};

export const findAllServices = async (
    filters: ServiceFilters,
    options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
    const { search, ...filterData } = filters;

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: serviceSearchableFields.map((field) => ({
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

    const whereConditions: Prisma.ServiceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.service.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });

    const total = await prisma.service.count({
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

export const findService = async (id: string): Promise<Service | null> => {
    const result = await prisma.service.findUnique({
        where: { id },
    });

    return result;
};

export const editService = async (id: string, payload: Partial<Service>): Promise<Service> => {
    const result = await prisma.service.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

export const removeService = async (id: string): Promise<Service> => {
    const result = await prisma.service.delete({
        where: {
            id,
        },
    });

    return result;
};
