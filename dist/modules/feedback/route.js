"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
var client_1 = require("@prisma/client");
var express_1 = require("express");
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var controller_1 = require("./controller");
var validation_1 = require("./validation");
var router = (0, express_1.Router)();
router.get('/', controller_1.getAllFeedbacks);
router.get('/:id', controller_1.getFeedback);
router.post('/', (0, validateRequest_1.default)(validation_1.createFeedbackValidation), (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN, client_1.Roles.USER), controller_1.createFeedback);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateFeedbackValidation), (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.updateFeedback);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.deleteFeedback);
var feedbackRoutes = router;
exports.default = feedbackRoutes;
