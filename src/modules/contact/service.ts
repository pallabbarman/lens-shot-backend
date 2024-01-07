import { Contact } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertContact = async (data: Contact): Promise<Contact> => {
    const result = await prisma.contact.create({
        data,
    });

    return result;
};

export const findAllContacts = async (): Promise<Contact[]> => {
    const result = await prisma.contact.findMany({});

    return result;
};

export const findContact = async (id: string): Promise<Contact | null> => {
    const result = await prisma.contact.findUnique({
        where: { id },
    });

    return result;
};
