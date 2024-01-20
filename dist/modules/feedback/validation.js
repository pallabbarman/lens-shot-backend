"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackValidation = exports.createFeedbackValidation = void 0;
var zod_1 = __importDefault(require("zod"));
exports.createFeedbackValidation = zod_1.default.object({
    body: zod_1.default.object({
        feedback: zod_1.default.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
exports.updateFeedbackValidation = zod_1.default.object({
    body: zod_1.default.object({
        feedback: zod_1.default.string({
            required_error: 'Feedback is required!',
        }),
    }),
});
