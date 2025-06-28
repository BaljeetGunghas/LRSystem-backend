import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";

// Register a new user
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      res.status(400).json({
        output: 0,
        status: 400,
        jsonResponse: null,
        message: "User already exists",
      });
      return;
    }

    const user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
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
  } catch (err) {
    console.error("Register/Login Error:", err); // <-- Add this line
    res.status(500).json({
      output: 0,
      status: 500,
      jsonResponse: null,
      message: "Registration failed",
    });
  }
};

// Login user
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({
        output: 0,
        status: 400,
        jsonResponse: null,
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
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
  } catch (err) {
    res.status(500).json({
      output: 0,
      status: 500,
      jsonResponse: null,
      message: "Login failed",
    });
  }
};

// Logout user
export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token");
  res.status(200).json({
    output: 1,
    status: 200,
    jsonResponse: null,
    message: "Logged out successfully",
  });
};
