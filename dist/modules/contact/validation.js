"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactValidation = void 0;
/* eslint-disable import/prefer-default-export */
var zod_1 = __importDefault(require("zod"));
exports.createContactValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required!',
        }),
        email: zod_1.default.string({
            required_error: 'Email is required!',
        }),
        subject: zod_1.default.string({
            required_error: 'Subject is required!',
        }),
        message: zod_1.default.string({
            required_error: 'Message is required!',
        }),
    }),
});
