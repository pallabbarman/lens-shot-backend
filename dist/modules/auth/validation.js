"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.createUserValidation = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createUserValidation = zod_1.default.object({
    body: zod_1.default.object({
        firstName: zod_1.default.string({
            required_error: 'First name is required!',
        }),
        lastName: zod_1.default.string({
            required_error: 'Last name is required!',
        }),
        email: zod_1.default
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Please enter a valid email!' }),
        password: zod_1.default.string({
            required_error: 'Password is required!',
        }),
        role: zod_1.default.string().optional(),
        contactNo: zod_1.default.string({
            required_error: 'Contact number is required!',
        }),
        address: zod_1.default.string().optional(),
    }),
});
exports.loginValidation = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Please enter a valid email!' }),
        password: zod_1.default.string({
            required_error: 'Password is required!',
        }),
    }),
});
