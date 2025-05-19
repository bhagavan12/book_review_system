// controllers/bookshelfController.js
const Bookshelf = require("../models/Bookshelf");
const Book = require("../models/bookModel");

exports.createBookshelf = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user._id;
      // console.log("userId:",userId);
      // Check if shelf with the same name exists for the user
      const existingShelf = await Bookshelf.findOne({ userId, name: { $regex: new RegExp(`^${name}$`, "i") } });
      if (existingShelf) {
        return res.status(400).json({ message: "Bookshelf with this name already exists." });
      }
  
      const newShelf = new Bookshelf({ userId, name, books: [] });
      await newShelf.save();
      
      res.status(201).json({ message: "Bookshelf created", shelf: newShelf });
    } catch (error) {
      res.status(500).json({ message: "Error creating bookshelf", error: error.message });
    }
};
  

exports.addBookToShelf = async (req, res) => {
    try {
      const { shelfId, bookId } = req.body; 
      console.log(shelfId,bookId);
  
      const shelf = await Bookshelf.findById(shelfId);
      if (!shelf) {
        return res.status(404).json({ message: "Bookshelf not found." });
      }
  
      // Check if book already exists in the shelf
      const isBookInShelf = shelf.books.some(id => id.toString() === bookId);

      if (isBookInShelf) {
        console.log(`${bookId} already exists in this bookshelf.`);
        return res.status(400).json({ message: `${bookId} already exists in this bookshelf.` });
      }
      
      shelf.books.push(bookId);
      await shelf.save();
      console.log(shelf);
      res.status(200).json({ message: "Book added to shelf", shelf });
    } catch (error) {
      res.status(500).json({ message: "Error adding book", error: error.message });
    }
  };
  

exports.getUserShelves = async (req, res) => {
  try {
    // console.log("qwerty:",req.user._id,req.user.id);
    const shelves = await Bookshelf.find({ userId: req.user._id }).populate("books");
    // console.log("shelves:",shelves);
    res.status(200).json(shelves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shelves", error: error.message });
  }
};

exports.removeBookFromShelf = async (req, res) => {
  try {
    const { shelfId, bookId } = req.body;
    const shelf = await Bookshelf.findById(shelfId);

    shelf.books = shelf.books.filter(id => id.toString() !== bookId);
    await shelf.save();

    res.status(200).json({ message: "Book removed from shelf", shelf });
  } catch (error) {
    res.status(500).json({ message: "Error removing book", error: error.message });
  }
};


exports.deleteBookshelf = async (req, res) => {
    try {
      const { shelfId } = req.params;
  
      // Find the shelf and ensure it belongs to the logged-in user
      const shelf = await Bookshelf.findOne({ _id: shelfId, userId: req.user._id });
  
      if (!shelf) {
        return res.status(404).json({ message: "Bookshelf not found or access denied." });
      }
  
      await shelf.deleteOne(); // or Bookshelf.findByIdAndDelete(shelfId) if you already verified ownership
  
      res.status(200).json({ message: "Bookshelf deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting bookshelf", error: error.message });
    }
  };
  