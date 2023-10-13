import { User } from '@prisma/client';
import configs from 'configs/index';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { ILoginUserResponse } from './interface';
import { insertUser, signInUser } from './service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await insertUser(req.body);

    sendResponse<Omit<User, 'password'>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await signInUser(req.body);

    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
        secure: configs.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully!',
        data: others,
    });
});
