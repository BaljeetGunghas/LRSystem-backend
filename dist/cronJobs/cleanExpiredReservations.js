"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanExpiredReservations = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const Book_1 = __importDefault(require("../models/Book"));
/**
 * Cron job to clean expired reservations and update book availability
 * Runs every hour
 */
const cleanExpiredReservations = () => {
    node_cron_1.default.schedule('0 * * * *', async () => {
        const now = new Date();
        try {
            const expiredReservations = await Reservation_1.default.find({ expiresAt: { $lt: now } });
            for (const reservation of expiredReservations) {
                const bookId = reservation.book;
                await Book_1.default.findByIdAndUpdate(bookId, { available: true });
                await Reservation_1.default.findByIdAndDelete(reservation._id);
            }
            if (expiredReservations.length > 0) {
                console.log(`[Cron] Cleaned ${expiredReservations.length} expired reservations`);
            }
        }
        catch (err) {
            console.error('[Cron] Error cleaning expired reservations:', err);
        }
    });
};
exports.cleanExpiredReservations = cleanExpiredReservations;
