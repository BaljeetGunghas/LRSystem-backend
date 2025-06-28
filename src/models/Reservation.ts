import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  expiresAt: Date;
}

const ReservationSchema: Schema<IReservation> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
