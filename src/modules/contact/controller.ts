import { Contact } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { findAllContacts, findContact, insertContact } from './service';

export const createContact = catchAsync(async (req: Request, res: Response) => {
    const result = await insertContact(req.body);

    sendResponse<Contact>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Thank you for contacting with us. We will reach you out shortly!',
        data: result,
    });
});

export const getAllContacts = catchAsync(async (_req: Request, res: Response) => {
    const result = await findAllContacts();

    sendResponse<Contact[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All contact information are retrieved successfully!',
        data: result,
    });
});

export const getContact = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await findContact(id);

    sendResponse<Contact>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Contact information is retrieved successfully!',
        data: result,
    });
});
