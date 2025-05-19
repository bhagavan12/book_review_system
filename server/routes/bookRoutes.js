const express = require('express');
const { checkBook, addBook,getBooksByUser,getByGenre,getTopRatedBooks } = require('../controllers/bookController');

const router = express.Router();

// Route to check if a book exists by title
router.post('/check', checkBook);

// Route to add a new book
router.post('/add', addBook); 
router.get('/:userId', getBooksByUser); 
router.get("/books/genre/:genre", getByGenre);
router.get("/books/topratings", getTopRatedBooks);
module.exports = router;
