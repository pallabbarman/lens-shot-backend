"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllBookings);
router.get('/:id', controller_1.getBooking);
router.post('/', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN, client_1.Roles.USER), controller_1.createBooking);
router.patch('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN, client_1.Roles.USER), controller_1.updateBooking);
router.delete('/:id', (0, auth_1.default)(client_1.Roles.ADMIN, client_1.Roles.SUPER_ADMIN, client_1.Roles.USER), controller_1.deleteBooking);
const bookingRoutes = router;
exports.default = bookingRoutes;
