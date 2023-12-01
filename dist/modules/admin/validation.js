"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeRoleValidation = void 0;
/* eslint-disable import/prefer-default-export */
var zod_1 = __importDefault(require("zod"));
exports.changeRoleValidation = zod_1.default.object({
    body: zod_1.default.object({
        role: zod_1.default.enum(['SUPER_ADMIN', 'ADMIN', 'USER'], {
            required_error: 'Role is required!',
        }),
    }),
});
