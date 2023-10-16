"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertReviewAndRating = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const insertReviewAndRating = async (data, user) => {
    const result = await prisma_1.default.reviewAndRating.create({
        data: {
            ...data,
            userId: user.userId,
        },
        include: {
            event: true,
            user: true,
        },
    });
    return result;
};
exports.insertReviewAndRating = insertReviewAndRating;
