"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User_1.default.findOne({ email });
        if (existing) {
            res.status(400).json({
                output: 0,
                status: 400,
                jsonResponse: null,
                message: "User already exists",
            });
            return;
        }
        const user = await User_1.default.create({ name, email, password });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: "1d",
        });
        // Set cookie for 3 days
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
        });
        res.status(201).json({
            output: 1,
            status: 201,
            jsonResponse: { id: user._id, name: user.name, email: user.email, token },
            message: "User registered successfully",
        });
    }
    catch (err) {
        console.error("Register/Login Error:", err); // <-- Add this line
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Registration failed",
        });
    }
};
exports.register = register;
// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({
                output: 0,
                status: 400,
                jsonResponse: null,
                message: "Invalid credentials",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "", {
            expiresIn: "1d",
        });
        // Set cookie for 3 days
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
        });
        res.status(200).json({
            output: 1,
            status: 200,
            jsonResponse: { id: user._id, name: user.name, email: user.email, token },
            message: "Logged in successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Login failed",
        });
    }
};
exports.login = login;
// Logout user
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        output: 1,
        status: 200,
        jsonResponse: null,
        message: "Logged out successfully",
    });
};
exports.logout = logout;
