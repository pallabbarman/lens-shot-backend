"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-newline */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllEvents);
router.get('/:id', controller_1.getEvent);
router.post('/', (0, validateRequest_1.default)(validation_1.createEventValidation), controller_1.createEvent);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateEventValidation), controller_1.updateEvent);
router.delete('/:id', controller_1.deleteEvent);
const eventRoutes = router;
exports.default = eventRoutes;
