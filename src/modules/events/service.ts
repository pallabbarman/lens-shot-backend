/* eslint-disable import/prefer-default-export */
import { Event as PrismaEvent } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertEvent = async (data: PrismaEvent): Promise<PrismaEvent> => {
    const result = await prisma.event.create({
        data,
    });

    return result;
};
