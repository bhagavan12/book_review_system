// // import React from 'react';

// // const BookDetails = ({ book }) => {
// //   return (
// //     <div>
// //       <h2>{book.title}</h2>
// //       <p><strong>Author:</strong> {book.author}</p>
// //       <p><strong>Description:</strong> {book.description}</p>
// //       <button onClick={() => alert('Book added to library')}>Add to Library</button>
// //     </div>
// //   );
// // };

// // export default BookDetails;
// import React,{useState,useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReviews, addComment,editComment,addRating } from "../features/reviews/reviewsSlice";
// const BookDetails = () => {
//   const { bookId } = useParams();
//   const book=JSON.parse(localStorage.getItem("selectedBook"));
//   console.log(book);
//   const dispatch = useDispatch();
//   const userId=useSelector((state)=>state.user.user._id);
//   const reviews = useSelector((state) => state?.review?.reviews[bookId]); // Get reviews for this book
//   const [comment, setComment] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editedComment, setEditedComment] = useState("");
//   const [rating, setRating] = useState(null);

//   useEffect(() => {
//     dispatch(fetchReviews(bookId)); // Fetch comments when page loads
//   }, [dispatch, bookId]);

//   const handleAddComment = () => {
//     if (comment.trim() !== "") {
//       dispatch(addComment({ bookId, userId: userId, comment })); // Replace USER_ID_HERE with the actual user ID
//       setComment(""); // Clear input after adding comment
//     }
//   };
//   const handleEditClick = (commentId, currentText) => {
//     setEditingCommentId(commentId);
//     setEditedComment(currentText);
//   };

//   const handleSaveEdit = (commentId) => {
//     if (editedComment.trim() !== "") {
//       dispatch(editComment({ bookId, commentId, userId, newComment: editedComment }));
//       setEditingCommentId(null);
//     }
//   };
//   const handleRating = (selectedRating) => {
//     setRating(selectedRating);
//     dispatch(addRating({ bookId, userId, rating: selectedRating }));
//   };
//   if (!book) {
//     return <div>Book not found</div>;
//   }
//   useEffect(() => {
//     if (reviews?.ratings?.length > 0) {
//       const userRating = reviews.ratings.find(r => r.userId === userId)?.rating;
//       if (userRating) {
//         setRating(userRating);
//       }
//     }
//   }, [reviews, userId]);
//   const averageRating =
//     reviews?.ratings?.length > 0
//       ? (
//           reviews.ratings.reduce((sum, r) => sum + r.rating, 0) /
//           reviews.ratings.length
//         ).toFixed(1)
//       : "No ratings yet";
//   return (
//     <div className="book-details">
//       <h3>{book.title}</h3>
//       <img src={book.coverUrl} alt={book.title} />
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Description:</strong> {book.description}</p>
//       <p><strong>Genre:</strong> {book.genre}</p>
//       <p>Rating (Average: {averageRating})</p>
//       <h3>Rating</h3>
//       <div>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             style={{ cursor: "pointer", color: rating >= star ? "gold" : "gray" }}
//             onClick={() => handleRating(star)}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//       {rating && <p>Your rating: {rating}</p>}
//       <h3>Comments</h3>
//       {reviews && reviews.comments?.length > 0 ? (
//         <ul>
//           {reviews.comments.map((comment) => (
//             <li key={comment._id}>
//               <strong>{comment.userId}</strong>:  
//               {editingCommentId === comment._id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editedComment}
//                     onChange={(e) => setEditedComment(e.target.value)}
//                   />
//                   <button onClick={() => handleSaveEdit(comment._id)}>Save</button>
//                   <button onClick={() => setEditingCommentId(null)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   {comment.comment}
//                   {comment.userId === userId && (
//                     <button onClick={() => handleEditClick(comment._id, comment.comment)}>
//                       Edit
//                     </button>
//                   )}
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No comments yet.</p>
//       )}

//       {/* Add Comment Input */}
//       <div>
//         <input
//           type="text"
//           placeholder="Write a comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button onClick={handleAddComment}>Add Comment</button>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;

// // return (
// //   <div className="book-details">
// //     <h3>{book.title}</h3>
// //     <img src={book.coverUrl} alt={book.title} />
// //     <p><strong>Author:</strong> {book.author}</p>
// //     <p><strong>Description:</strong> {book.description}</p>
// //     <p><strong>Genre:</strong> {book.genre}</p>
// //     <h3>Comments</h3>
// //     {reviews && reviews.comments?.length > 0 ? (
// //       <ul>
// //         {reviews.comments.map((comment, index) => (
// //           <li key={index}>
// //             <strong>{comment.userId}</strong>: {comment.comment}
// //           </li>
// //         ))}
// //       </ul>
// //     ) : (
// //       <p>No comments yet.</p>
// //     )}

// //     {/* Add comment input */}
// //     <div>
// //       <input
// //         type="text"
// //         placeholder="Write a comment..."
// //         value={comment}
// //         onChange={(e) => setComment(e.target.value)}
// //       />
// //       <button onClick={handleAddComment}>Add Comment</button>
// //     </div>
// //   </div>

// // );


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addComment, editComment, addRating } from "../features/reviews/reviewsSlice";
import { Pencil, Check, X, MessageSquare, Star } from 'lucide-react';
import '../styles/BookDetails.css';
import Modal from "react-modal";
import { addBookToShelf, createBookshelf } from "../features/bookshelves/bookshelfSlice";
Modal.setAppElement('#root');
const BookDetails = () => {
  const { bookId } = useParams();
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  console.log("book=>", book._id);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const reviews = useSelector((state) => state?.review?.reviews[bookId]);
  const shelves = useSelector((state) => state.bookshelf.shelves);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [rating, setRating] = useState(null);

  /*modal*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShelves, setFilteredShelves] = useState([]);
  const [newShelfName, setNewShelfName] = useState("");
  const token = useSelector((state) => state.user.user.token);

  /*modal*/
  useEffect(() => {
    dispatch(fetchReviews(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    if (reviews?.ratings?.length > 0) {
      const userRating = reviews.ratings.find(r => r.userId === userId)?.rating;
      if (userRating) {
        setRating(userRating);
      }
    }
  }, [reviews, userId]);
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredShelves(Object.values(shelves));
    } else {
      const results = Object.values(shelves).filter((shelf) =>
        shelf.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredShelves(results);
    }
  }, [searchTerm, shelves]);

  const handleShelfSelect = (shelfId) => {
    const shelf = shelves.find((shelf) => shelf._id === shelfId);
    const alreadyAdded = shelf?.books?.some(
      (b) => b._id?.toString() === book._id?.toString()
    );
    console.log("alreadyAdded", alreadyAdded, shelves, shelfId);
    if (!alreadyAdded) {
      dispatch(addBookToShelf({ shelfId, bookId: book._id, token }));
    } else {
      alert("Book already exists in this shelf.");
    }
    setIsModalOpen(false);
  };
  const handleCreateShelf = () => {
    if (newShelfName.trim() !== "") {
      dispatch(createBookshelf({ name: newShelfName, token }));
      setNewShelfName("");
    }
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      dispatch(addComment({ bookId, userId: userId, comment }));
      setComment("");
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedComment(currentText);
  };

  const handleSaveEdit = (commentId) => {
    if (editedComment.trim() !== "") {
      dispatch(editComment({ bookId, commentId, userId, newComment: editedComment }));
      setEditingCommentId(null);
    }
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    dispatch(addRating({ bookId, userId, rating: selectedRating }));
  };

  if (!book) {
    return <div className="not-found">Book not found</div>;
  }

  const averageRating = reviews?.ratings?.length > 0
    ? (reviews.ratings.reduce((sum, r) => sum + r.rating, 0) / reviews.ratings.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="book-details">
      <div className="book-container">
        <div className="book-image-section">
          <img src={book.coverUrl} alt={book.title} className="book-cover1" />
        </div>

        <div className="book-info-section">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">by {book.author}</h2>
          <div className="book-genre">{book.genre}</div>

          <div className="rating-section">
            <div className="average-rating">
              Average Rating: {averageRating}
            </div>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            {rating && <p className="user-rating">Your rating: {rating}</p>}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="add-comment-button" style={{ padding: '10px' }}>
            + Add to Shelf
          </button>

          <p className="book-description">{book.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comments-container">
          {reviews && reviews.comments?.length > 0 ? (
            reviews.comments.map((comment) => (
              <div key={comment._id} className="comment">
                {editingCommentId === comment._id ? (
                  <div className="edit-comment">
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="edit-input"
                    />
                    <div className="edit-actions">
                      <button onClick={() => handleSaveEdit(comment._id)} className="icon-button">
                        <Check size={16} />
                      </button>
                      <button onClick={() => setEditingCommentId(null)} className="icon-button">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="comment-header">
                      {comment.userId === userId ? (<strong>You</strong>) : (<strong>{comment.name}</strong>)}

                    </div>
                    <p className="comment-text">{comment.comment}</p>
                    {comment.userId === userId && (
                      <button
                        onClick={() => handleEditClick(comment._id, comment.comment)}
                        className="icon-button"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet.</p>
          )}
        </div>

        <div className="add-comment">
          <div className="input-container">
            <MessageSquare size={20} className="comment-icon" />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
          </div>
          <button onClick={handleAddComment} className="add-comment-button">
            Add Comment
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Add to Shelf</h2>
          {/* <button onClick={() => setIsModalOpen(false)} className="close-btn">✖</button> */}
        </div>
        <div className="search-section1">
          <input
            type="text"
            placeholder="New shelf name..."
            value={newShelfName}
            onChange={(e) => setNewShelfName(e.target.value)}
            className="search-input"
          />
          <button onClick={handleCreateShelf} className="tag-button">Create</button>
        </div>
        <div className="search-section1">
          <input
            type="text"
            placeholder="Search shelves..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>


        <div className="shelves-list">
          {filteredShelves.length > 0 ? (
            filteredShelves.map((shelf) => (
              <div key={shelf._id} className="shelf-item" onClick={() => handleShelfSelect(shelf._id)}>
                {shelf.name}
              </div>
            ))
          ) : (
            <p>No matching shelves found.</p>
          )}
        </div>
      </Modal>

    </div>
  );
};

export default BookDetails;