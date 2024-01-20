import { Feedback } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertFeedback = async (data: Feedback): Promise<Feedback> => {
    const result = await prisma.feedback.create({
        data,
        include: {
            user: true,
        },
    });

    return result;
};

export const findAllFeedbacks = async (): Promise<Feedback[]> => {
    const result = await prisma.feedback.findMany({
        include: {
            user: true,
        },
    });

    return result;
};

export const findFeedback = async (id: string): Promise<Feedback | null> => {
    const result = await prisma.feedback.findUnique({
        where: { id },
        include: {
            user: true,
        },
    });

    return result;
};

export const editFeedback = async (id: string, payload: Partial<Feedback>): Promise<Feedback> => {
    const result = await prisma.feedback.update({
        where: {
            id,
        },
        include: {
            user: true,
        },
        data: payload,
    });

    return result;
};

export const removeFeedback = async (id: string): Promise<Feedback> => {
    const result = await prisma.feedback.delete({
        where: {
            id,
        },
    });

    return result;
};
