import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        output: 0,
        status: 401,
        jsonResponse: null,
        message: "Unauthorized: Token not provided",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      output: 0,
      status: 401,
      jsonResponse: null,
      message: "Unauthorized: Invalid token",
    });
  }
};
