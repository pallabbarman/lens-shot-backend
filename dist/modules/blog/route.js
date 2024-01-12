"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
var client_1 = require("@prisma/client");
var express_1 = require("express");
var auth_1 = __importDefault(require("../../middlewares/auth"));
var validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
var controller_1 = require("./controller");
var validation_1 = require("./validation");
var router = (0, express_1.Router)();
router.get('/', controller_1.getAllBlogs);
router.get('/:id', controller_1.getBlog);
router.post('/', (0, validateRequest_1.default)(validation_1.createBlogValidation), (0, auth_1.default)(client_1.Roles.USER, client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.createBlog);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateBlogValidation), (0, auth_1.default)(client_1.Roles.USER, client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.updateBlog);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.USER, client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN), controller_1.deleteBlog);
var blogRoutes = router;
exports.default = blogRoutes;
