"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventValidation = exports.createEventValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createEventValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required!',
        }),
        description: zod_1.default.string({
            required_error: 'Description is required!',
        }),
        photo: zod_1.default.string({
            required_error: 'Photo is required!',
        }),
        price: zod_1.default.string({
            required_error: 'Price is required!',
        }),
    }),
});
exports.updateEventValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        photo: zod_1.default.string().optional(),
        price: zod_1.default.string().optional(),
    }),
});
