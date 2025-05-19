const express = require("express");
const router = express.Router();
const {
  addComment,
  addRating,
  addTweet,
  getReviewsByBookId,
  editComment,
  alltweets
} = require("../controllers/reviewController");

// Add a comment
router.post("/comment", addComment);
router.put("/comment/edit", editComment);

// Add a rating
router.post("/rating", addRating);

// Add a tweet
router.post("/tweet", addTweet);
router.get("/all-tweets", alltweets);

// Get reviews for a specific book
router.get("/:bookId", getReviewsByBookId);

module.exports = router;
