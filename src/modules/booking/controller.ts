/* eslint-disable object-curly-newline */
import { Booking } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { editBooking, findAllBookings, findBooking, insertBooking, removeBooking } from './service';

export const createBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await insertBooking(req.body);

    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking completed successfully!',
        data: result,
    });
});

export const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const result = await findAllBookings();

    sendResponse<Booking[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings is retrieved successfully!',
        data: result,
    });
});

export const getBooking = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findBooking(id);

    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking is retrieved successfully!',
        data: result,
    });
});

export const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editBooking(id, req.body);

    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking is updated successfully!',
        data: result,
    });
});

export const deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeBooking(id);

    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully!',
        data: result,
    });
});
