"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentValidation = exports.createCommentValidation = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createCommentValidation = zod_1.default.object({
    body: zod_1.default.object({
        comment: zod_1.default.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
exports.updateCommentValidation = zod_1.default.object({
    body: zod_1.default.object({
        comment: zod_1.default.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
