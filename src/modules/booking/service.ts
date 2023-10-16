/* eslint-disable operator-linebreak */
import { Booking } from '@prisma/client';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import prisma from 'utils/prisma';

export const insertBooking = async (data: Booking): Promise<Booking> => {
    const { eventId, startDate, endDate } = data;

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const existingBookings = await prisma.booking.findMany({
        where: {
            eventId,
        },
    });

    const overlappingBooking = existingBookings.find((booking) => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);

        return (
            (parsedStartDate >= bookingStartDate && parsedStartDate <= bookingEndDate) ||
            (parsedEndDate >= bookingStartDate && parsedEndDate <= bookingEndDate) ||
            (parsedStartDate <= bookingStartDate && parsedEndDate >= bookingEndDate)
        );
    });

    if (overlappingBooking) {
        throw new ApiError(httpStatus.CONFLICT, 'Already booked for that time, try another time!');
    }

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
