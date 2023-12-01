"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = void 0;
/* eslint-disable import/prefer-default-export */
var zod_1 = __importDefault(require("zod"));
exports.updateProfileValidation = zod_1.default.object({
    body: zod_1.default.object({
        firstName: zod_1.default.string().optional(),
        lastName: zod_1.default.string().optional(),
        email: zod_1.default.string().email({ message: 'Please enter a valid email!' }).optional(),
        password: zod_1.default.string().optional(),
        role: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        profileImg: zod_1.default.string().optional(),
    }),
});
