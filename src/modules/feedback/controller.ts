import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import {
    editFeedback,
    findAllFeedbacks,
    findFeedback,
    insertFeedback,
    removeFeedback,
} from './service';

export const createFeedback = catchAsync(async (req: Request, res: Response) => {
    const result = await insertFeedback(req.body);

    sendResponse<Feedback>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Thank you for feedback!',
        data: result,
    });
});

export const getAllFeedbacks = catchAsync(async (_req: Request, res: Response) => {
    const result = await findAllFeedbacks();

    sendResponse<Feedback[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All feedback information are retrieved successfully!',
        data: result,
    });
});

export const getFeedback = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findFeedback(id);

    sendResponse<Feedback>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback information is retrieved successfully!',
        data: result,
    });
});

export const updateFeedback = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editFeedback(id, req.body);

    sendResponse<Feedback>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback is updated successfully!',
        data: result,
    });
});

export const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeFeedback(id);

    sendResponse<Feedback>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback is deleted successfully!',
        data: result,
    });
});
