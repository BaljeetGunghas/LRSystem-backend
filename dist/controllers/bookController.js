"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const getBooks = async (req, res) => {
    try {
        const search = req.query.search;
        const page = parseInt(req.query.page) || 1;
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
            Book_1.default.find(query).skip(skip).limit(limit),
            Book_1.default.countDocuments(query),
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
    }
    catch (err) {
        res.status(500).json({
            output: 0,
            status: 500,
            jsonResponse: null,
            message: "Failed to fetch books",
        });
    }
};
exports.getBooks = getBooks;
