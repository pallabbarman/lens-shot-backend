/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { Prisma, Event as PrismaEvent } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { eventSearchableFields } from './constant';
import { EventFilters } from './interface';

export const insertEvent = async (data: PrismaEvent): Promise<PrismaEvent> => {
    const result = await prisma.event.create({
        data,
    });

    return result;
};

export const findAllEvents = async (
    filters: EventFilters,
    options: IPaginationOptions
): Promise<IGenericResponse<PrismaEvent[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
    const { search, ...filterData } = filters;

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: eventSearchableFields.map((field) => ({
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

    const whereConditions: Prisma.EventWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.event.findMany({
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

    const total = await prisma.event.count({
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

export const findEvent = async (id: string): Promise<PrismaEvent | null> => {
    const result = await prisma.event.findUnique({
        where: { id },
    });

    return result;
};

export const editEvent = async (
    id: string,
    payload: Partial<PrismaEvent>
): Promise<PrismaEvent> => {
    const result = await prisma.event.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

export const removeEvent = async (id: string): Promise<PrismaEvent> => {
    const result = await prisma.event.delete({
        where: {
            id,
        },
    });

    return result;
};
