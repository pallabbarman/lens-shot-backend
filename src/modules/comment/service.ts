import { Comment } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertComment = async (data: Comment): Promise<Comment> => {
    const result = await prisma.comment.create({
        data,
        include: {
            blog: true,
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
    });

    return result;
};

export const findAllComments = async (): Promise<Comment[]> => {
    const result = await prisma.comment.findMany({
        include: {
            blog: true,
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
    });

    return result;
};

export const findComment = async (id: string): Promise<Comment | null> => {
    const result = await prisma.comment.findUnique({
        where: { id },
        include: {
            blog: true,
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
    });

    return result;
};

export const editComment = async (id: string, payload: Partial<Comment>): Promise<Comment> => {
    const result = await prisma.comment.update({
        where: {
            id,
        },
        include: {
            blog: true,
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
        data: payload,
    });

    return result;
};

export const removeComment = async (id: string): Promise<Comment> => {
    const result = await prisma.comment.delete({
        where: {
            id,
        },
    });

    return result;
};
