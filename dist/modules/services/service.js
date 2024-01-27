"use strict";
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeService = exports.editService = exports.findService = exports.findAllServices = exports.insertService = void 0;
var pagination_1 = __importDefault(require("../../utils/pagination"));
var prisma_1 = __importDefault(require("../../utils/prisma"));
var constant_1 = require("./constant");
var insertService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.service.create({
                    data: data,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.insertService = insertService;
var findAllServices = function (filters, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, limit, page, skip, sortBy, sortOrder, search, filterData, andConditions, whereConditions, result, total;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = (0, pagination_1.default)(options), limit = _a.limit, page = _a.page, skip = _a.skip, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
                search = filters.search, filterData = __rest(filters, ["search"]);
                andConditions = [];
                if (search) {
                    andConditions.push({
                        OR: constant_1.serviceSearchableFields.map(function (field) {
                            var _a;
                            return (_a = {},
                                _a[field] = {
                                    contains: search,
                                    mode: 'insensitive',
                                },
                                _a);
                        }),
                    });
                }
                if (Object.keys(filterData).length > 0) {
                    andConditions.push({
                        AND: Object.keys(filterData).map(function (key) {
                            var _a;
                            return (_a = {},
                                _a[key] = {
                                    equals: filterData[key],
                                },
                                _a);
                        }),
                    });
                }
                whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
                return [4 /*yield*/, prisma_1.default.service.findMany({
                        where: whereConditions,
                        skip: skip,
                        take: limit,
                        orderBy: sortBy && sortOrder
                            ? (_b = {}, _b[sortBy] = sortOrder, _b) : {
                            createdAt: 'desc',
                        },
                    })];
            case 1:
                result = _c.sent();
                return [4 /*yield*/, prisma_1.default.service.count({
                        where: whereConditions,
                    })];
            case 2:
                total = _c.sent();
                return [2 /*return*/, {
                        meta: {
                            page: page,
                            limit: limit,
                            total: total,
                        },
                        data: result,
                    }];
        }
    });
}); };
exports.findAllServices = findAllServices;
var findService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.service.findUnique({
                    where: { id: id },
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.findService = findService;
var editService = function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.service.update({
                    where: {
                        id: id,
                    },
                    data: payload,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.editService = editService;
var removeService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.service.delete({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.removeService = removeService;