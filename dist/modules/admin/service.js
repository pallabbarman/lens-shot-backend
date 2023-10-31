"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editRole = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const editRole = async (id, role) => {
    const result = await prisma_1.default.user.update({
        where: {
            id,
        },
        include: {
            reviewAndRatings: true,
        },
        data: role,
    });
    return result;
};
exports.editRole = editRole;
