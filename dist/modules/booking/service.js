"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBooking = exports.editBooking = exports.findBooking = exports.findAllBookings = exports.insertBooking = void 0;
var apiError_1 = __importDefault(require("../../errors/apiError"));
var http_status_1 = __importDefault(require("http-status"));
var prisma_1 = __importDefault(require("../../utils/prisma"));
var insertBooking = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var eventId, startDate, endDate, parsedStartDate, parsedEndDate, existingBookings, overlappingBooking, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventId = data.eventId, startDate = data.startDate, endDate = data.endDate;
                parsedStartDate = new Date(startDate);
                parsedEndDate = new Date(endDate);
                return [4 /*yield*/, prisma_1.default.booking.findMany({
                        where: {
                            eventId: eventId,
                        },
                    })];
            case 1:
                existingBookings = _a.sent();
                overlappingBooking = existingBookings.find(function (booking) {
                    var bookingStartDate = new Date(booking.startDate);
                    var bookingEndDate = new Date(booking.endDate);
                    return ((parsedStartDate >= bookingStartDate && parsedStartDate <= bookingEndDate) ||
                        (parsedEndDate >= bookingStartDate && parsedEndDate <= bookingEndDate) ||
                        (parsedStartDate <= bookingStartDate && parsedEndDate >= bookingEndDate));
                });
                if (overlappingBooking) {
                    throw new apiError_1.default(http_status_1.default.CONFLICT, 'Already booked for that time, try another time!');
                }
                return [4 /*yield*/, prisma_1.default.booking.create({
                        data: data,
                        include: {
                            event: true,
                            user: true,
                        },
                    })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.insertBooking = insertBooking;
var findAllBookings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.booking.findMany({
                    include: {
                        event: true,
                        user: true,
                    },
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.findAllBookings = findAllBookings;
var findBooking = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.booking.findUnique({
                    where: { id: id },
                    include: {
                        event: true,
                        user: true,
                    },
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.findBooking = findBooking;
var editBooking = function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.booking.update({
                    where: {
                        id: id,
                    },
                    include: {
                        event: true,
                        user: true,
                    },
                    data: payload,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.editBooking = editBooking;
var removeBooking = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.booking.delete({
                    where: {
                        id: id,
                    },
                    include: {
                        event: true,
                        user: true,
                    },
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.removeBooking = removeBooking;
