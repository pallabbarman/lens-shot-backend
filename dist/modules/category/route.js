"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllCategories);
router.get('/:id', controller_1.getCategory);
router.post('/', (0, validateRequest_1.default)(validation_1.createCategoryValidation), (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.createCategory);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateCategoryValidation), (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.updateCategory);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.deleteCategory);
const categoryRoutes = router;
exports.default = categoryRoutes;
