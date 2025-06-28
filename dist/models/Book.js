"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    cover_image: String,
    price: Number,
    rating: Number,
    category: String,
    published_year: Number,
    available: Boolean,
    isbn: String,
    language: String,
    pages: Number,
    publisher: String,
    format: String,
    edition: String,
    dimensions: String,
    weight: String,
    bestseller: Boolean,
    tags: [String],
    reviews_count: Number,
    discount: Number,
    currency: String,
    stock_quantity: Number,
    reservedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
// Export the model
exports.default = (0, mongoose_1.model)('Book', bookSchema);
