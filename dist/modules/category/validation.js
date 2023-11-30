"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidation = exports.createCategoryValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCategoryValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Category name is required!',
        }),
    }),
});
exports.updateCategoryValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Category name is required!',
        }),
    }),
});
