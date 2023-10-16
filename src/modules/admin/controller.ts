/* eslint-disable import/prefer-default-export */
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { editRole } from './service';

export const changeRole = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editRole(id, req.body);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Role change successfully!',
        data: result,
    });
});
