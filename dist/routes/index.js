"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../modules/auth/route"));
const route_2 = __importDefault(require("../modules/events/route"));
const route_3 = __importDefault(require("../modules/profile/route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: route_1.default,
    },
    {
        path: '/events',
        route: route_2.default,
    },
    {
        path: '/profile',
        route: route_3.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
