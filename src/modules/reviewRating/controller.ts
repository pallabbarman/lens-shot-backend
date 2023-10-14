/* eslint-disable import/prefer-default-export */
import { ReviewAndRating } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { insertReviewAndRating } from './service';

export const createReviewAndRating = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const result = await insertReviewAndRating(req.body, user);

    sendResponse<ReviewAndRating>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review added successfully!',
        data: result,
    });
});
