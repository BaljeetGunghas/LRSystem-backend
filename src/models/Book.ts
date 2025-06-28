import mongoose, { Document, Schema, model } from 'mongoose';

// Define the TypeScript interface for the Book document
export interface IBook extends Document {
  title: string;
  author: string;
  description?: string;
  cover_image?: string;
  price?: number;
  rating?: number;
  category?: string;
  published_year?: number;
  available?: boolean;
  isbn?: string;
  language?: string;
  pages?: number;
  publisher?: string;
  format?: string;
  edition?: string;
  dimensions?: string;
  weight?: string;
  bestseller?: boolean;
  tags?: string[];
  reviews_count?: number;
  discount?: number;
  currency?: string;
  stock_quantity?: number;
  reservedBy: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const bookSchema = new Schema<IBook>(
  {
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
    reservedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// Export the model
export default model<IBook>('Book', bookSchema);
