const express = require("express");
const router = express.Router();
const {createBookshelf,getUserShelves,addBookToShelf,removeBookFromShelf,deleteBookshelf} = require("../controllers/bookshelfController");
const { protect } = require('../middleware/authMiddleware'); // assuming your protect middleware is here

// @route   POST /api/bookshelves
// @desc    Create a new bookshelf
// @access  Private
router.post("/add", protect, createBookshelf);

// @route   GET /api/bookshelves
// @desc    Get all shelves of the logged-in user
// @access  Private
router.get("/", protect, getUserShelves);

// @route   PUT /api/bookshelves/add-book
// @desc    Add a book to a shelf
// @access  Private
router.put("/add-book", protect, addBookToShelf);

// @route   PUT /api/bookshelves/remove-book
// @desc    Remove a book from a shelf
// @access  Private
router.put("/remove-book", protect, removeBookFromShelf);

// @route   DELETE /api/bookshelves/:shelfId
// @desc    Delete a bookshelf for the user
// @access  Private
router.delete("/:shelfId", protect, deleteBookshelf);

module.exports = router;
