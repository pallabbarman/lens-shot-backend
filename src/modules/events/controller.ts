/* eslint-disable object-curly-newline */
import { Event as PrismaEvent } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { eventFilterableFields } from './constant';
import { editEvent, findAllEvents, findEvent, insertEvent, removeEvent } from './service';

export const createEvent = catchAsync(async (req: Request, res: Response) => {
    const result = await insertEvent(req.body);

    sendResponse<PrismaEvent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New event created successfully!',
        data: result,
    });
});

export const getAllEvents = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, eventFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllEvents(filters, options);

    sendResponse<PrismaEvent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Events is retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getEvent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findEvent(id);

    sendResponse<PrismaEvent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event is retrieved successfully!',
        data: result,
    });
});

export const updateEvent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editEvent(id, req.body);

    sendResponse<PrismaEvent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event is updated successfully!',
        data: result,
    });
});

export const deleteEvent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeEvent(id);

    sendResponse<PrismaEvent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event deleted successfully!',
        data: result,
    });
});
