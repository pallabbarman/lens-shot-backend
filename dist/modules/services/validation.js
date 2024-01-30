"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceValidation = exports.createServiceValidation = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createServiceValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required!',
        }),
        description: zod_1.default.string({
            required_error: 'Description is required!',
        }),
        photo: zod_1.default.string().array().nonempty({ message: 'Photo is required!' }),
    }),
});
exports.updateServiceValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        photo: zod_1.default.string().array().optional(),
    }),
});
