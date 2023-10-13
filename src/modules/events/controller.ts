/* eslint-disable import/prefer-default-export */
import { Event as PrismaEvent } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { insertEvent } from './service';

export const createEvent = catchAsync(async (req: Request, res: Response) => {
    const result = await insertEvent(req.body);

    sendResponse<PrismaEvent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New event created successfully!',
        data: result,
    });
});
