import cron from 'node-cron';
import Reservation from '../models/Reservation';
import Book from '../models/Book';

/**
 * Cron job to clean expired reservations and update book availability
 * Runs every hour
 */
export const cleanExpiredReservations = () => {
  cron.schedule('0 * * * *', async () => {
    const now = new Date();
    try {
      const expiredReservations = await Reservation.find({ expiresAt: { $lt: now } });

      for (const reservation of expiredReservations) {
        const bookId = reservation.book;
        await Book.findByIdAndUpdate(bookId, { available: true });
        await Reservation.findByIdAndDelete(reservation._id);
      }

      if (expiredReservations.length > 0) {
        console.log(`[Cron] Cleaned ${expiredReservations.length} expired reservations`);
      }
    } catch (err) {
      console.error('[Cron] Error cleaning expired reservations:', err);
    }
  });
};
