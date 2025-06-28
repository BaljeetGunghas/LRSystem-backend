import { Request, Response } from "express";
import Book from "../models/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [books, total] = await Promise.all([
      Book.find(query).skip(skip).limit(limit),
      Book.countDocuments(query),
    ]);

    res.status(200).json({
      output: 1,
      status: 200,
      jsonResponse: books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      message: "Books fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      output: 0,
      status: 500,
      jsonResponse: null,
      message: "Failed to fetch books",
    });
  }
};
