import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import { cleanExpiredReservations } from "./cronJobs/cleanExpiredReservations";
import path from "path";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  'https://liberary.netlify.app/',
  /^http:\/\/localhost:\d+$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => o instanceof RegExp ? o.test(origin) : o === origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // ✅ Allow cookies/auth headers
  })
);


// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Database connection
connectDB().catch((err) => console.error("DB Connection Error:", err));



// ✅ Routes
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reservations", reservationRoutes);


// Start Cron Job
cleanExpiredReservations();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
