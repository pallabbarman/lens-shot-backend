/* eslint-disable import/prefer-default-export */
import prisma from 'utils/prisma';

export const findAllPortfolios = async (): Promise<string[]> => {
    const services = await prisma.service.findMany({});

    const result = services.flatMap((service) => service.photo);

    return result;
};
