"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.findProfile = void 0;
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const findProfile = async (user) => {
    const userId = user?.userId;
    const role = user?.role;
    if (role !== client_1.Roles.USER && role !== client_1.Roles.ADMIN && role !== client_1.Roles.SUPER_ADMIN) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user role!');
    }
    const result = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile not found!');
    }
    return result;
};
exports.findProfile = findProfile;
const editProfile = async (user, data) => {
    const userId = user?.userId;
    const role = user?.role;
    if (role !== client_1.Roles.USER && role !== client_1.Roles.ADMIN && role !== client_1.Roles.SUPER_ADMIN) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid user role!');
    }
    const result = await prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
};
exports.editProfile = editProfile;
