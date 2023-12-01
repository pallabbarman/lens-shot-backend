"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
var client_1 = require("@prisma/client");
var index_1 = __importDefault(require("../configs/index"));
var apiError_1 = __importDefault(require("../errors/apiError"));
var handleClientError_1 = __importDefault(require("../errors/handleClientError"));
var handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
var handleZodError_1 = __importDefault(require("../errors/handleZodError"));
var http_status_1 = __importDefault(require("http-status"));
var logger_1 = require("../utils/logger");
var zod_1 = require("zod");
var globalErrorHandlers = function (err, _req, res, _next) {
    logger_1.errorLogger.error('globalErrorHandler ~', err);
    var statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    var message = 'Internal server error!';
    var errorMessages = [];
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        var error = (0, handleValidationError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        var error = (0, handleClientError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof zod_1.ZodError) {
        var error = (0, handleZodError_1.default)(err);
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.errorMessage;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: index_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandlers;
