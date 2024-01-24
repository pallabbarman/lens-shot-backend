/* eslint-disable comma-dangle */
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import configs from 'configs/index';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { createToken } from 'utils/jwt';
import prisma from 'utils/prisma';
import { ILoginUser, ILoginUserResponse } from './interface';

export const insertUser = async (data: User): Promise<Omit<User, 'password'>> => {
    const password = await hash(data.password, Number(configs.bcrypt_salt_round));

    const result = await prisma.user.create({
        data: {
            ...data,
            password,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return result;
};

export const signInUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
    let isPasswordMatched;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    if (isUserExist.password) {
        isPasswordMatched = await compare(data.password, isUserExist.password);
    }

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
    }

    const { id: userId, role } = isUserExist;

    // create access token
    const accessToken = createToken(
        { userId, role },
        configs.jwt.secret as Secret,
        configs.jwt.secret_expire as string
    );

    // create refresh token
    const refreshToken = createToken(
        { userId, role },
        configs.jwt.refresh_secret as Secret,
        configs.jwt.refresh_secret_expire as string
    );

    return {
        accessToken,
        refreshToken,
    };
};
