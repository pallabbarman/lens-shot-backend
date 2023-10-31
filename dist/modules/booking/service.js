"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBooking = exports.editBooking = exports.findBooking = exports.findAllBookings = exports.insertBooking = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const insertBooking = async (data) => {
    const { eventId, startDate, endDate } = data;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const existingBookings = await prisma_1.default.booking.findMany({
        where: {
            eventId,
        },
    });
    const overlappingBooking = existingBookings.find((booking) => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);
        return ((parsedStartDate >= bookingStartDate && parsedStartDate <= bookingEndDate) ||
            (parsedEndDate >= bookingStartDate && parsedEndDate <= bookingEndDate) ||
            (parsedStartDate <= bookingStartDate && parsedEndDate >= bookingEndDate));
    });
    if (overlappingBooking) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, 'Already booked for that time, try another time!');
    }
    const result = await prisma_1.default.booking.create({
        data,
        include: {
            event: true,
            user: true,
        },
    });
    return result;
};
exports.insertBooking = insertBooking;
const findAllBookings = async () => {
    const result = await prisma_1.default.booking.findMany({
        include: {
            event: true,
            user: true,
        },
    });
    return result;
};
exports.findAllBookings = findAllBookings;
const findBooking = async (id) => {
    const result = await prisma_1.default.booking.findUnique({
        where: { id },
        include: {
            event: true,
            user: true,
        },
    });
    return result;
};
exports.findBooking = findBooking;
const editBooking = async (id, payload) => {
    const result = await prisma_1.default.booking.update({
        where: {
            id,
        },
        include: {
            event: true,
            user: true,
        },
        data: payload,
    });
    return result;
};
exports.editBooking = editBooking;
const removeBooking = async (id) => {
    const result = await prisma_1.default.booking.delete({
        where: {
            id,
        },
        include: {
            event: true,
            user: true,
        },
    });
    return result;
};
exports.removeBooking = removeBooking;
