"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.editCategory = exports.findCategory = exports.findAllCategories = exports.insertCategory = void 0;
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const constant_1 = require("./constant");
const insertCategory = async (data) => {
    const result = await prisma_1.default.category.create({
        data,
    });
    return result;
};
exports.insertCategory = insertCategory;
const findAllCategories = async (filters, options) => {
    const { limit, page, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const { search, ...filterData } = filters;
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: constant_1.categorySearchableFields.map((field) => ({
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
    const result = await prisma_1.default.category.findMany({
        where: whereConditions,
        include: {
            events: true,
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = await prisma_1.default.category.count({
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
exports.findAllCategories = findAllCategories;
const findCategory = async (id) => {
    const result = await prisma_1.default.category.findUnique({
        where: { id },
        include: {
            events: true,
        },
    });
    return result;
};
exports.findCategory = findCategory;
const editCategory = async (id, payload) => {
    const result = await prisma_1.default.category.update({
        where: {
            id,
        },
        include: {
            events: true,
        },
        data: payload,
    });
    return result;
};
exports.editCategory = editCategory;
const removeCategory = async (id) => {
    const result = await prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.removeCategory = removeCategory;
