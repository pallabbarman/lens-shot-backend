"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEvent = exports.editEvent = exports.findEvent = exports.findAllEvents = exports.insertEvent = void 0;
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const constant_1 = require("./constant");
const insertEvent = async (data) => {
    const result = await prisma_1.default.event.create({
        data,
        include: {
            reviewAndRatings: true,
        },
    });
    return result;
};
exports.insertEvent = insertEvent;
const findAllEvents = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { search, ...filterData } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: constant_1.eventSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.default.event.findMany({
        where: whereConditions,
        include: {
            reviewAndRatings: true,
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = await prisma_1.default.event.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.findAllEvents = findAllEvents;
const findEvent = async (id) => {
    const result = await prisma_1.default.event.findUnique({
        where: { id },
        include: {
            reviewAndRatings: true,
        },
    });
    return result;
};
exports.findEvent = findEvent;
const editEvent = async (id, payload) => {
    const result = await prisma_1.default.event.update({
        where: {
            id,
        },
        include: {
            reviewAndRatings: true,
        },
        data: payload,
    });
    return result;
};
exports.editEvent = editEvent;
const removeEvent = async (id) => {
    const result = await prisma_1.default.event.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.removeEvent = removeEvent;
