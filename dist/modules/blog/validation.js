"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.createBlogValidation = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createBlogValidation = zod_1.default.object({
    body: zod_1.default.object({
        img: zod_1.default.string({
            required_error: 'Image is required!',
        }),
        title: zod_1.default.string({
            required_error: 'Title name is required!',
        }),
        content: zod_1.default.string({
            required_error: 'Content name is required!',
        }),
    }),
});
exports.updateBlogValidation = zod_1.default.object({
    body: zod_1.default.object({
        img: zod_1.default.string().optional(),
        title: zod_1.default.string().optional(),
        content: zod_1.default.string().optional(),
    }),
});
