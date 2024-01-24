/* eslint-disable object-curly-newline */
import { Comment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { editComment, findAllComments, findComment, insertComment, removeComment } from './service';

export const createComment = catchAsync(async (req: Request, res: Response) => {
    const result = await insertComment(req.body);

    sendResponse<Comment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Thank you for comment!',
        data: result,
    });
});

export const getAllComments = catchAsync(async (_req: Request, res: Response) => {
    const result = await findAllComments();

    sendResponse<Comment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Comment information are retrieved successfully!',
        data: result,
    });
});

export const getComment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findComment(id);

    sendResponse<Comment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Comment information is retrieved successfully!',
        data: result,
    });
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editComment(id, req.body);

    sendResponse<Comment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Comment is updated successfully!',
        data: result,
    });
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeComment(id);

    sendResponse<Comment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Comment is deleted successfully!',
        data: result,
    });
});
