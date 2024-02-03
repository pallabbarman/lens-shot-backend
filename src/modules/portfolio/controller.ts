/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { findAllPortfolios } from './service';

export const getAllPortfolios = catchAsync(async (_req: Request, res: Response) => {
    const result = await findAllPortfolios();

    sendResponse<string[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All portfolios are retrieved successfully!',
        data: result,
    });
});
