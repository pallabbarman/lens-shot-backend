import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { editProfile, findProfile } from './service';

export const getProfile = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;

    const result = await findProfile(user);

    sendResponse<Omit<User, 'password'>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile retrieved successfully!',
        data: result,
    });
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;

    const result = await editProfile(user, req.body);

    sendResponse<Omit<User, 'password'>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully!',
        data: result,
    });
});
