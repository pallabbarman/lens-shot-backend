/* eslint-disable object-curly-newline */
import { Blog } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { blogFilterableFields } from './constant';
import { editBlog, findAllBlogs, findBlog, insertBlog, removeBlog } from './service';

export const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await insertBlog(req.body);

    sendResponse<Blog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New blog created successfully!',
        data: result,
    });
});

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, blogFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllBlogs(filters, options);

    sendResponse<Blog[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs is retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findBlog(id);

    sendResponse<Blog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is retrieved successfully!',
        data: result,
    });
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editBlog(id, req.body);

    sendResponse<Blog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is updated successfully!',
        data: result,
    });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeBlog(id);

    sendResponse<Blog>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully!',
        data: result,
    });
});
