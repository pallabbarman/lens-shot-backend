import { Booking } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertBooking = async (data: Booking): Promise<Booking> => {
    const result = await prisma.booking.create({
        data,
        include: {
            event: true,
            user: true,
        },
    });

    return result;
};

export const findAllBookings = async (): Promise<Booking[]> => {
    const result = await prisma.booking.findMany({
        include: {
            event: true,
            user: true,
        },
    });

    return result;
};

export const findBooking = async (id: string): Promise<Booking | null> => {
    const result = await prisma.booking.findUnique({
        where: { id },
        include: {
            event: true,
            user: true,
        },
    });

    return result;
};

export const editBooking = async (id: string, payload: Partial<Booking>): Promise<Booking> => {
    const result = await prisma.booking.update({
        where: {
            id,
        },
        include: {
            event: true,
            user: true,
        },
        data: payload,
    });

    return result;
};

export const removeBooking = async (id: string): Promise<Booking> => {
    const result = await prisma.booking.delete({
        where: {
            id,
        },
        include: {
            event: true,
            user: true,
        },
    });

    return result;
};
