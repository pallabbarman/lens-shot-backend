"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var handleClientError = function (error) {
    var _a;
    var errors = [];
    var message = '';
    var statusCode = http_status_1.default.BAD_REQUEST;
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found!';
        errors = [
            {
                path: '',
                message: message,
            },
        ];
    }
    else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errors = [
                {
                    path: '',
                    message: message,
                },
            ];
        }
    }
    return {
        statusCode: statusCode,
        message: message,
        errorMessage: errors,
    };
};
exports.default = handleClientError;
