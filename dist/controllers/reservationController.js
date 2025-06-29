"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservation = exports.getUserReservations = exports.reserveBook = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
const Book_1 = __importDefault(require("../models/Book"));
const mongoose_1 = require("mongoose");
// Reserve a book
const reserveBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        if (!req.userId) {
            res.status(401).json({
                output: 0,
                status: 401,
                jsonResponse: null,
                message: "Unauthorized",
            });
            return;
        }
        const existing = await Reservation_1.default.findOne({ user: req.userId, book: bookId });
        if (existing) {
            res.status(400).json({
                output: 0,
                status: 400,
                jsonResponse: null,
                message: "You have already reserved this book",
            });
            return;
        }
        const book = await Book_1.default.findById(bookId);
        if (!book || book.available === false) {
            res.status(400).json({
                output: 0,
                status: 400,
                jsonResponse: null,
                message: "Book not available for reservation",
            });
            return;
        }
        console.log(book.reservedBy);
        console.log(book.reservedBy.map(id => id.toString()).includes(req.userId));
        const userIdStr = String(req.userId); // Ensure it's string
        if (book.reservedBy &&
            book.reservedBy.map((id) => id.toString()).includes(userIdStr)) {
            res.status(400).json({
                output: 0,
                status: 400,
                jsonResponse: null,
                message: "You have already reserved this book (via reservedBy).",
            });
            return;
        }
        const reservation = await Reservation_1.default.create({
            user: req.userId,
            book: bookId,
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        });
        // 🟡 Mark book unavailable and push userId to reservedBy
        book.available = false;
        book.reservedBy.push(new mongoose_1.Types.ObjectId(req.userId));
        await book.save();
        res.status(201).json({
            output: 1,
            status: 201,
            jsonResponse: reservation,
            message: "Book reserved successfully",
        });
    }
    catch (error) {
        console.error("Reservation Error:", error);
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Failed to reserve book",
        });
    }
};
exports.reserveBook = reserveBook;
// Get reservations for a user
const getUserReservations = async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({
                output: 0,
                status: 401,
                jsonResponse: null,
                message: "Unauthorized",
            });
            return;
        }
        const reservations = await Reservation_1.default.find({ user: req.userId }).populate("book");
        res.status(200).json({
            output: 1,
            status: 200,
            jsonResponse: reservations,
            message: "Reservations fetched successfully",
        });
    }
    catch {
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Failed to fetch reservations",
        });
    }
};
exports.getUserReservations = getUserReservations;
// Cancel a reservation
const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.userId) {
            res.status(401).json({
                output: 0,
                status: 401,
                jsonResponse: null,
                message: "Unauthorized",
            });
            return;
        }
        const reservation = await Reservation_1.default.findById(id);
        if (!reservation || reservation.user.toString() !== req.userId) {
            res.status(404).json({
                output: 0,
                status: 404,
                jsonResponse: null,
                message: "Reservation not found",
            });
            return;
        }
        const book = await Book_1.default.findById(reservation.book);
        if (book) {
            book.available = true;
            await book.save();
        }
        await reservation.deleteOne();
        res.status(200).json({
            output: 1,
            status: 200,
            jsonResponse: null,
            message: "Reservation cancelled successfully",
        });
    }
    catch {
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Failed to cancel reservation",
        });
    }
};
exports.cancelReservation = cancelReservation;
