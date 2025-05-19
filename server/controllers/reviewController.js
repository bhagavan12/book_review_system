const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");
const User = require('../models/User');
// Add a comment
// exports.addComment = async (req, res) => {
//   try {
//     const { bookId, userId, comment } = req.body;
//     console.log(userId);
//     if (!bookId || !userId || !comment) {
//       return res.status(400).json({ message: "Book ID, User ID, and comment are required." });
//     }
//     const user = await User.findById(userId).select("name email");
//     console.log("userr:",user);
//     const name=user.name;
//     const email=user.email;
    
//     const review = await Review.findOneAndUpdate(
//       { bookId },
//       { $push: { comments: { userId,comment, timestamp: new Date() } } },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.status(200).json({ message: "Comment added successfully.", review });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add comment.", error: error.message });
//   }
// };
// // Edit a comment
// exports.editComment = async (req, res) => {
//   try {
//     const { bookId, commentId, userId, newComment } = req.body;

//     if (!bookId || !commentId || !userId || !newComment) {
//       return res.status(400).json({ message: "Book ID, Comment ID, User ID, and new comment are required." });
//     }

//     const review = await Review.findOneAndUpdate(
//       {
//         bookId,
//         "comments._id": commentId,  // Ensure we're targeting the correct comment
//         "comments.userId": userId,
//       },
//       {
//         $set: { "comments.$[elem].comment": newComment },
//         $push: {
//           "comments.$[elem].editHistory": {
//             oldComment: newComment,
//             editedAt: new Date(),
//           },
//         },
//       },
//       {
//         new: true,
//         arrayFilters: [{ "elem._id": commentId }] // Ensure we update the correct comment inside the array
//       }
//     );
//     if (!review) {
//       return res.status(404).json({ message: "Comment not found or unauthorized access." });
//     }
    
//     res.status(200).json({ message: "Comment edited successfully.", review });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to edit comment.", error: error.message });
//   }
// };

exports.addComment = async (req, res) => {
  try {
    const { bookId, userId, comment } = req.body;
    // console.log(userId);

    if (!bookId || !userId || !comment) {
      return res.status(400).json({ message: "Book ID, User ID, and comment are required." });
    }

    // Fetch user details (name, email)
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add the comment to the review
    const review = await Review.findOneAndUpdate(
      { bookId },
      { $push: { comments: { userId, comment, timestamp: new Date() } } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Prepare the added comment with user details
    const addedComment = review.comments[review.comments.length - 1]; // Assuming comment is added at the end
    const responseComment = {
      userId,
      comment: addedComment.comment,
      name: user.name,
      email: user.email,
      timestamp: addedComment.timestamp,
    };

    res.status(200).json({ message: "Comment added successfully.", comment: responseComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment.", error: error.message });
  }
};
exports.editComment = async (req, res) => {
  try {
    const { bookId, commentId, userId, newComment } = req.body;

    if (!bookId || !commentId || !userId || !newComment) {
      return res.status(400).json({ message: "Book ID, Comment ID, User ID, and new comment are required." });
    }

    // Fetch the user details (name, email)
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the review that contains the comment
    const review = await Review.findOne({ bookId });
    if (!review) {
      return res.status(404).json({ message: "Review for this book not found." });
    }

    // Check if the comment exists and belongs to the correct user
    const commentIndex = review.comments.findIndex(
      (comment) => comment._id.toString() === commentId && comment.userId.toString() === userId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found or unauthorized access." });
    }

    // Update the comment in the array
    review.comments[commentIndex].comment = newComment;
    review.comments[commentIndex].editHistory.push({
      oldComment: review.comments[commentIndex].comment,
      editedAt: new Date(),
    });

    // Save the review with the updated comment
    await review.save();

    // Prepare the response comment
    const updatedComment = review.comments[commentIndex];
    const responseComment = {
      userId,
      commentId,
      comment: updatedComment.comment,
      name: user.name,
      email: user.email,
      timestamp: updatedComment.timestamp,
    };

    res.status(200).json({ message: "Comment edited successfully.", comment: responseComment });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Failed to edit comment.", error: error.message });
  }
};

// const review = await Review.findOneAndUpdate(
//   {
//     bookId,
//     "comments._id": commentId,
//     "comments.userId": userId,
//   },
//   {
//     $set: { "comments.$.comment": newComment },
//     $push: {
//       "comments.$.editHistory": {
//         oldComment: newComment,
//         editedAt: new Date(),
//       },
//     },
//   },
//   { new: true }
// );


exports.addRating = async (req, res) => {
  try {
    const { bookId, userId, rating } = req.body;

    if (!bookId || !userId || rating == null) {
      return res.status(400).json({ message: "Book ID, User ID, and rating are required." });
    }

    // const bookObjectId = new mongoose.Types.ObjectId(bookId);
    // const userObjectId = new mongoose.Types.ObjectId(userId);

    // Step 1: Try updating existing user rating if present
    let updatedReview = await Review.findOneAndUpdate(
      {
        bookId,
        "ratings.userId": userId
      },
      {
        $set: {
          "ratings.$.rating": rating,
          "ratings.$.timestamp": new Date()
        }
      },
      {
        new: true
      }
    );

    // Step 2: If user hasn't rated or review doesn't exist, add rating or create review
    if (!updatedReview) {
      updatedReview = await Review.findOneAndUpdate(
        { bookId },
        {
          $setOnInsert: { bookId },
          $push: {
            ratings: {
              userId,
              rating,
              timestamp: new Date()
            }
          }
        },
        {
          upsert: true,
          new: true
        }
      );
    }

    // Step 3: Recalculate average rating
    const allRatings = updatedReview.ratings.map(r => r.rating);
    const averageRating = allRatings.length > 0
      ? allRatings.reduce((sum, val) => sum + val, 0) / allRatings.length
      : 0;

    await Book.findByIdAndUpdate(bookId, { averageRating });

    res.status(200).json({
      message: "Rating added/updated successfully.",
      review: updatedReview
    });

  } catch (error) {
    console.error("Error in addRating:", error.message);
    res.status(500).json({ message: "Failed to add rating.", error: error.message });
  }
};

// exports.addRating = async (req, res) => {
//   try {
//     const { bookId, userId, rating } = req.body;

//     if (!bookId || !userId || rating == null) {
//       return res.status(400).json({ message: "Book ID, User ID, and rating are required." });
//     }

//     // Find the review for the given bookId
//     const review = await Review.findOne({ bookId });
//     // console.log("review",review);
//     if (!review) {
//       // return res.status(404).json({ message: "Book not found for the rating." });
//       await Review.create({
//         bookId,
//         ratings: [{ userId, rating , timestamp: new Date()}]
//       });
//     }
//       // Check if the user has already rated the book
//       const existingRating = review.ratings.find(r => r.userId.toString() === userId.toString());

//       if (existingRating) {
//         // If the user has rated, update the rating
//         existingRating.rating = rating;
//         existingRating.timestamp = new Date();
//       } else {
//         // If the user hasn't rated, add a new rating
//         review.ratings.push({ userId, rating, timestamp: new Date() });
//       }

    
//       // Save the updated review
//       await review.save();

//       // Recalculate the average rating
//       const allRatings = review.ratings.map(r => r.rating);
//       const averageRating = allRatings.length > 0
//         ? allRatings.reduce((sum, value) => sum + value, 0) / allRatings.length
//         : 0;
//       console.log("averageRating",averageRating);
//       // Update the book's average rating
//       await Book.findByIdAndUpdate(bookId, { averageRating });

//       res.status(200).json({ message: "Rating added/updated successfully.", review });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add rating.", error: error.message });
//   }
// };

// Add a tweet
// exports.addTweet = async (req, res) => {
//   try {
//     const { bookId, userId, tweet } = req.body;

//     if (!bookId || !userId || !tweet) {
//       return res.status(400).json({ message: "Book ID, User ID, and tweet are required." });
//     }

//     const review = await Review.findOneAndUpdate(
//       { bookId },
//       { $push: { tweets: { userId, tweet, timestamp: new Date() } } },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     ).populate("bookId", "title");
//     // console.log("add tweet",review);
//     const recent_tweet=review?.tweets.at(-1);
//     console.log("recent_tweet",recent_tweet);
//     const bookName=review.bookId.title;
    
//     const tweet_added={
//       user:recent_tweet.userId,
//       bookId,
//       tweet:recent_tweet.tweet,
//       date:recent_tweet.timestamp,
//       bookName
//     }
//     console.log("tweet_added",tweet_added);
//     res.status(200).json({ message: "Tweet added successfully.", tweet_added });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add tweet.", error: error.message });
//   }
// };
exports.addTweet = async (req, res) => {
  try {
    const { bookId, userId, tweet } = req.body;

    if (!bookId || !userId || !tweet) {
      return res.status(400).json({ message: "Book ID, User ID, and tweet are required." });
    }

    // Add tweet to the book review
    const review = await Review.findOneAndUpdate(
      { bookId },
      { $push: { tweets: { userId, tweet, timestamp: new Date() } } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("bookId", "title");

    const recent_tweet = review?.tweets.at(-1);
    const bookName = review.bookId.title;

    // Fetch user details to include name and email
    const user = await User.findById(userId).select("name email");
    // console.log("addtweet user:",user);
    const tweet_added = {
      user: userId,
      name: user?.name || "Unknown",
      email: user?.email || "Unknown",
      bookId,
      bookName,
      tweet: recent_tweet?.tweet,
      date: recent_tweet?.timestamp,
    };

    res.status(200).json({ message: "Tweet added successfully.", tweet_added });
  } catch (error) {
    res.status(500).json({ message: "Failed to add tweet.", error: error.message });
  }
};

// fetch all tweets
exports.alltweets=async (req, res) => {
  try {
    const reviews = await Review.find().populate("bookId", "title");
    // console.log("reviews",reviews[0].tweets);
    // console.log(reviews);
    const tweets = await Promise.all(
      reviews.flatMap((review) =>
        review.tweets.map(async (tweet) => {
          const user = await User.findById(tweet.userId).select("name email");
          return {
            tweet: tweet.tweet,
            date: tweet.timestamp,
            user: tweet.userId,
            name: user?.name || "Unknown",
            email: user?.email || "Unknown",
            bookId: review.bookId?._id,
            bookName: review.bookId?.title,
          };
        })
      )
    );
    // console.log("tweets",tweets);
    const books = reviews.map((review) => ({
      bookId: review.bookId._id || null,
      bookName: review.bookId.title || null,
    }));
    // console.log("all tweets",{tweets,books});
    res.json({ tweets, books });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get reviews for a book
exports.getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    const review = await Review.findOne({ bookId }).populate("bookId", "title author");
    if (!review) {
      return res.status(404).json({ message: "No reviews found for this book." });
    }
    
    // res.status(200).json({ message: "Reviews retrieved successfully.", review });
    // Extract unique userIds from comments
    const uniqueUserIds = [...new Set(review.comments.map(comment => comment.userId.toString()))];
    
    // Fetch user info for all involved userIds
    const users = await User.find({ _id: { $in: uniqueUserIds } }).select("name email");
    
    // Map for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = {
        name: user.name,
        email: user.email
      };
    });
    
    // Attach username/email to each comment
    const commentsWithUser = review.comments.map(comment => ({
      ...comment.toObject(),
      name: userMap[comment.userId.toString()]?.name || "Unknown",
      email: userMap[comment.userId.toString()]?.email || "Unknown"
    }));
    
    // Return modified review with enriched comments
    const enrichedReview = {
      ...review.toObject(),
      comments: commentsWithUser
    };
    
    // console.log("review:",enrichedReview,"fuck it");
     res.status(200).json({
       message: "Reviews retrieved successfully.",
       review: enrichedReview
     });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews.", error: error.message });
  }
};


// Add a rating
// exports.addRating = async (req, res) => {
//   try {
//     const { bookId, userId, rating } = req.body;

//     if (!bookId || !userId || rating == null) {
//       return res.status(400).json({ message: "Book ID, User ID, and rating are required." });
//     }

//     // const review = await Review.findOneAndUpdate(
//     //   { bookId },
//     //   { $push: { ratings: { userId, value: rating, timestamp: new Date() } } },
//     //   { upsert: true, new: true, setDefaultsOnInsert: true }
//     // );
//     const review = await Review.findOneAndUpdate(
//         { bookId },
//         { $push: { ratings: { userId, rating, timestamp: new Date() } } },  // Use 'rating' instead of 'value'
//         { upsert: true, new: true, setDefaultsOnInsert: true }
//       );
//     // Recalculate average rating
//     // const allRatings = review.ratings.map(r => r.value);
//     // const averageRating = allRatings.reduce((sum, value) => sum + value, 0) / allRatings.length;
//     const allRatings = review.ratings.map(r => r.rating);  // Make sure to use 'rating' here
//     const averageRating = allRatings.length > 0
//       ? allRatings.reduce((sum, value) => sum + value, 0) / allRatings.length
//       : 0;
//     // Update the book's average rating
//     await Book.findByIdAndUpdate(bookId, { averageRating });

//     res.status(200).json({ message: "Rating added successfully.", review });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add rating.", error: error.message });
//   }
// };