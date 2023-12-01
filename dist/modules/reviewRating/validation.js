"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
/* eslint-disable import/prefer-default-export */
var zod_1 = __importDefault(require("zod"));
exports.createReviewValidation = zod_1.default.object({
    body: zod_1.default.object({
        review: zod_1.default.string({
            required_error: 'Review is required!',
        }),
        rating: zod_1.default.number({
            required_error: 'Rating is required!',
        }),
    }),
});
