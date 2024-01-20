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
router.get('/', controller_1.getAllContacts);
router.get('/:id', controller_1.getContact);
router.post('/', (0, validateRequest_1.default)(validation_1.createContactValidation), controller_1.createContact);
var contactRoutes = router;
exports.default = contactRoutes;
