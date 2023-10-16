"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../modules/auth/route"));
const route_2 = __importDefault(require("../modules/booking/route"));
const route_3 = __importDefault(require("../modules/events/route"));
const route_4 = __importDefault(require("../modules/profile/route"));
const route_5 = __importDefault(require("../modules/reviewRating/route"));
const route_6 = __importDefault(require("../modules/users/route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: route_1.default,
    },
    {
        path: '/users',
        route: route_6.default,
    },
    {
        path: '/events',
        route: route_3.default,
    },
    {
        path: '/profile',
        route: route_4.default,
    },
    {
        path: '/reviews',
        route: route_5.default,
    },
    {
        path: '/bookings',
        route: route_2.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
