// models/Bookshelf.js
const mongoose = require("mongoose");

const bookshelfSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // e.g., "To Read", "Favorites"
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
}, { timestamps: true });

module.exports = mongoose.model("Bookshelve", bookshelfSchema);
