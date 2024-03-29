"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-newline */
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var http_status_1 = __importDefault(require("http-status"));
var globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routers
app.use('/api/v1/', routes_1.default);
app.get('/', function (_req, res) {
    res.send('Successfully Running App!');
});
// global error handler
app.use(globalErrorHandler_1.default);
// handle not found route
app.use(function (req, res, next) {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API not found!',
            },
        ],
    });
    next();
});
exports.default = app;
