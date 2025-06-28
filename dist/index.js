"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const cleanExpiredReservations_1 = require("./cronJobs/cleanExpiredReservations");
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ CORS setup
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies & auth headers
}));
// ✅ Middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ✅ Database connection
(0, db_1.default)();
// ✅ Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/books", bookRoutes_1.default);
app.use("/api/reservations", reservationRoutes_1.default);
// Start Cron Job
(0, cleanExpiredReservations_1.cleanExpiredReservations)();
// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
