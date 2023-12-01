"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
var jsonwebtoken_1 = require("jsonwebtoken");
var createToken = function (payload, secret, expireTime) {
    return (0, jsonwebtoken_1.sign)(payload, secret, {
        expiresIn: expireTime,
    });
};
exports.createToken = createToken;
var verifyToken = function (token, secret) {
    return (0, jsonwebtoken_1.verify)(token, secret);
};
exports.verifyToken = verifyToken;
