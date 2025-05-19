// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true, unique: true },
//   author: { type: String, required: false },
//   coverUrl: { type: String, required: false },
//   description: { type: String, required: false },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   ratings: { type: [Number], default: [] },
//   averageRating: { type: Number, default: 0 },
//   tweets: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       text: { type: String }
//     }
//   ],
//   comments: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       text: { type: String }
//     }
//   ],
//   genre: { type: String, required: false }
// });

// const Book = mongoose.model('Book', bookSchema);

// module.exports = Book;

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    genre: { type: String },
    coverUrl: { type: String },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who added the book
    averageRating: { type: Number, default: 0,required:true }, // Overall average rating for the book
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

