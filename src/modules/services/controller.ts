/* eslint-disable object-curly-newline */
import { Service } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { serviceFilterableFields } from './constant';
import { editService, findAllServices, findService, insertService, removeService } from './service';

export const createService = catchAsync(async (req: Request, res: Response) => {
    const result = await insertService(req.body);

    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New service added successfully!',
        data: result,
    });
});

export const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, serviceFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllServices(filters, options);

    sendResponse<Service[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Services is retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getService = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findService(id);

    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service is retrieved successfully!',
        data: result,
    });
});

export const updateService = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await editService(id, req.body);

    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service is updated successfully!',
        data: result,
    });
});

export const deleteService = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await removeService(id);

    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service deleted successfully!',
        data: result,
    });
});
