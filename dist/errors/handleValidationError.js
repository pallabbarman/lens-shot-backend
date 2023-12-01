"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var handleValidationError = function (error) {
    var errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    var statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode: statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
exports.default = handleValidationError;
