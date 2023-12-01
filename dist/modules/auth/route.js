"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var controller_1 = require("./controller");
var validation_1 = require("./validation");
var router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(validation_1.createUserValidation), controller_1.createUser);
router.post('/login', (0, validateRequest_1.default)(validation_1.loginValidation), controller_1.loginUser);
var authRoutes = router;
exports.default = authRoutes;
