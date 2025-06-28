import express from "express";
import {
  reserveBook,
  getUserReservations,
  cancelReservation,
} from "../controllers/reservationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, reserveBook);
router.get("/", authMiddleware, getUserReservations);
router.delete("/:id", authMiddleware, cancelReservation);

export default router;
