"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var route_1 = __importDefault(require("../modules/admin/route"));
var route_2 = __importDefault(require("../modules/auth/route"));
var route_3 = __importDefault(require("../modules/blog/route"));
var route_4 = __importDefault(require("../modules/category/route"));
var route_5 = __importDefault(require("../modules/comment/route"));
var route_6 = __importDefault(require("../modules/contact/route"));
var route_7 = __importDefault(require("../modules/feedback/route"));
var route_8 = __importDefault(require("../modules/portfolio/route"));
var route_9 = __importDefault(require("../modules/profile/route"));
var route_10 = __importDefault(require("../modules/services/route"));
var route_11 = __importDefault(require("../modules/users/route"));
var router = (0, express_1.Router)();
var moduleRoutes = [
    {
        path: '/auth',
        route: route_2.default,
    },
    {
        path: '/users',
        route: route_11.default,
    },
    {
        path: '/categories',
        route: route_4.default,
    },
    {
        path: '/admins',
        route: route_1.default,
    },
    {
        path: '/profile',
        route: route_9.default,
    },
    {
        path: '/contact',
        route: route_6.default,
    },
    {
        path: '/blogs',
        route: route_3.default,
    },
    {
        path: '/feedback',
        route: route_7.default,
    },
    {
        path: '/comments',
        route: route_5.default,
    },
    {
        path: '/services',
        route: route_10.default,
    },
    {
        path: '/portfolio',
        route: route_8.default,
    },
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
