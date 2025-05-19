// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTweets, addTweet } from "../features/tweets/tweetsSlice";
// import { fetchReviews } from "../features/reviews/reviewsSlice"; // Assuming reviews are fetched separately
// import Modal from "react-modal";

// const CommunityPage = () => {
//   const dispatch = useDispatch();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tweetText, setTweetText] = useState("");
//   const [showTagSearch, setShowTagSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);

//   // Fetch tweets and reviews on mount
//   useEffect(() => {
//     dispatch(fetchTweets());
//     dispatch(fetchReviews());
//   }, [dispatch]);

//   const tweets = useSelector((state) => state?.tweets?.allTweets);
//   const reviews = useSelector((state) => state.review?.allReviews);
//   // Extract books from reviews
//   const books = reviews.map((review) => ({
//     bookId: review.bookId._id,
//     bookName: review.bookId.title,
//   }));

//   // Filter books based on searchTerm
//   const filteredBooks = books.filter((book) =>
//     book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle adding tweet
//   const handleSubmitTweet = () => {
//     if (tweetText.trim() && selectedBook) {
//       dispatch(addTweet({ bookId: selectedBook.bookId, userId: "USER_ID", tweet: tweetText }));
//       setTweetText("");
//       setSelectedBook(null);
//       setIsModalOpen(false);
//     } else {
//       alert("Please enter a tweet and select a book.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Community Tweets</h1>
//       <button className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={() => setIsModalOpen(true)}>
//         Add Tweet
//       </button>

//       {/* Tweets List */}
//       <div className="mt-4 space-y-4">
//         {tweets.map((tweet, index) => (
//           <div key={index} className="p-3 border rounded bg-gray-100">
//             <p>{tweet.tweet}</p>
//             <small className="text-gray-500">Book: {tweet.bookName}</small>
//           </div>
//         ))}
//       </div>

//       {/* Add Tweet Modal */}
//       <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="p-6 bg-white rounded">
//         <h2 className="text-lg font-semibold">Post a Tweet</h2>
//         <textarea
//           className="w-full mt-2 p-2 border rounded"
//           placeholder="Write your tweet..."
//           value={tweetText}
//           onChange={(e) => setTweetText(e.target.value)}
//         />

//         {/* Add Hashtag Button */}
//         <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => setShowTagSearch(true)}>
//           Add #Tag
//         </button>

//         {/* Tag Search Input */}
//         {showTagSearch && (
//           <div className="relative mt-2">
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Search book name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <ul className="absolute left-0 w-full bg-white border rounded mt-1">
//               {filteredBooks.map((book) => (
//                 <li
//                   key={book.bookId}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() => {
//                     setSelectedBook(book);
//                     setShowTagSearch(false);
//                   }}
//                 >
//                   {book.bookName}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Selected Book */}
//         {selectedBook && (
//           <p className="mt-2 text-sm text-blue-600">Selected: {selectedBook.bookName}</p>
//         )}

//         {/* Submit Tweet */}
//         <button className="mt-4 p-2 bg-blue-600 text-white rounded" onClick={handleSubmitTweet}>
//           Post Tweet
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default CommunityPage;

// //v2
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTweets, addTweet } from "../features/tweets/tweetsSlice";
// import Modal from "react-modal";

// const CommunityPage = () => {
//   const dispatch = useDispatch();
//   const userId=useSelector((state)=>state.user.user._id);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tweetText, setTweetText] = useState("");
//   const [showTagSearch, setShowTagSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);

//   // Fetch tweets & books on mount
//   useEffect(() => {
//     dispatch(fetchTweets());
//   }, [dispatch]);

//   // Get tweets & books from Redux store
//   const { tweets, books } = useSelector((state) => state?.tweets || { tweets: [], books: [] });

//   // Filter books based on search term
//   const filteredBooks = books?.filter((book) =>
//     book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle adding tweet
//   const handleSubmitTweet = () => {
//     if (tweetText.trim() && selectedBook) {
//       dispatch(addTweet({ bookId: selectedBook.bookId, userId: userId, tweet: tweetText }));
//       console.log("added",{ bookId: selectedBook.bookId, userId: userId, tweet: tweetText });
//       setTweetText("");
//       setSelectedBook(null);
//       setIsModalOpen(false);
//     } else {
//       alert("Please enter a tweet and select a book.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Community Tweets</h1>
//       <button className="mt-2 p-2 bg-blue-600 text-white rounded" onClick={() => setIsModalOpen(true)}>
//         Add Tweet
//       </button>

//       {/* Tweets List */}
//       <div className="mt-4 space-y-4">
//         {tweets.map((tweet, index) => (
//           <div key={index} className="p-3 border rounded bg-gray-100">
//             <p>{tweet.tweet}</p>
//             <small className="text-gray-500">Book: {tweet.bookName}</small>
//           </div>
//         ))}
//       </div>

//       {/* Add Tweet Modal */}
//       <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="p-6 bg-white rounded">
//         <h2 className="text-lg font-semibold">Post a Tweet</h2>
//         <textarea
//           className="w-full mt-2 p-2 border rounded"
//           placeholder="Write your tweet..."
//           value={tweetText}
//           onChange={(e) => setTweetText(e.target.value)}
//         />

//         {/* Add Hashtag Button */}
//         <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={() => setShowTagSearch(true)}>
//           Add #Tag
//         </button>

//         {/* Tag Search Input */}
//         {showTagSearch && (
//           <div className="relative mt-2">
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="Search book name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <ul className="absolute left-0 w-full bg-white border rounded mt-1">
//               {filteredBooks.map((book) => (
//                 <li
//                   key={book.bookId}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() => {
//                     setSelectedBook(book);
//                     setShowTagSearch(false);
//                   }}
//                 >
//                   {book.bookName}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Selected Book */}
//         {selectedBook && <p className="mt-2 text-sm text-blue-600">Selected: {selectedBook.bookName}</p>}

//         {/* Submit Tweet */}
//         <button className="mt-4 p-2 bg-blue-600 text-white rounded" onClick={handleSubmitTweet}>
//           Post Tweet
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default CommunityPage;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTweets, addTweet } from "../features/tweets/tweetsSlice";
// import Modal from "react-modal";
// import { BookOpen } from 'lucide-react';
// import '../styles/CommunityPage.css';

// const CommunityPage = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.user.user._id);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tweetText, setTweetText] = useState("");
//   const [showTagSearch, setShowTagSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedBook, setSelectedBook] = useState(null);

//   useEffect(() => {
//     dispatch(fetchTweets());
//   }, [dispatch]);

//   const { tweets, books } = useSelector((state) => state?.tweets || { tweets: [], books: [] });

//   const filteredBooks = books?.filter((book) =>
//     book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSubmitTweet = () => {
//     if (tweetText.trim() && selectedBook) {
//       dispatch(addTweet({ bookId: selectedBook.bookId, userId: userId, tweet: tweetText }));
//       setTweetText("");
//       setSelectedBook(null);
//       setIsModalOpen(false);
//     } else {
//       alert("Please enter a tweet and select a book.");
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="community-container">
//       <h1 className="page-title">Community Tweets</h1>
//       <button className="add-tweet-btn" onClick={() => setIsModalOpen(true)}>
//         Share Your Thoughts
//       </button>

//       <div className="tweets-container">
//         {tweets.map((tweet, index) => (
//           <div key={index} className="tweet-card">
//             <div className="tweet-header">
//               <img
//                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.userId}`}
//                 alt="avatar"
//                 className="tweet-avatar"
//               />
//               <div className="tweet-user-info">
//                 <h3 className="tweet-username">@{tweet.user.slice(0, 8)}</h3>
//                 <p className="tweet-timestamp">{formatDate(tweet.date)}</p>
//               </div>
//             </div>
//             <p className="tweet-content">{tweet.tweet}</p>
//             <div className="tweet-book">
//               <BookOpen size={16} />
//               {tweet.bookName}
//             </div>
//           </div>
//         ))}
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         className="modal-content"
//         overlayClassName="modal-overlay"
//       >
//         <h2 className="modal-title">Share Your Thoughts</h2>
//         <textarea
//           className="tweet-textarea"
//           placeholder="What's on your mind about this book?"
//           value={tweetText}
//           onChange={(e) => setTweetText(e.target.value)}
//           maxLength={280}
//         />
//         <div className="character-count">
//           {tweetText.length}/280 characters
//         </div>

//         <button className="tag-button" onClick={() => setShowTagSearch(true)}>
//           Add Book Tag
//         </button>

//         {showTagSearch && (
//           <div className="search-container">
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search for a book..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="search-results">
//               {filteredBooks.map((book) => (
//                 <div
//                   key={book.bookId}
//                   className="search-item"
//                   onClick={() => {
//                     setSelectedBook(book);
//                     setShowTagSearch(false);
//                   }}
//                 >
//                   {book.bookName}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {selectedBook && (
//           <div className="selected-book">
//             <BookOpen size={16} />
//             Selected: {selectedBook.bookName}
//           </div>
//         )}

//         <button
//           className="post-button"
//           onClick={handleSubmitTweet}
//           disabled={!tweetText.trim() || !selectedBook}
//         >
//           Post Tweet
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default CommunityPage;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets, addTweet } from "../features/tweets/tweetsSlice";
import Modal from "react-modal";
import { BookOpen } from 'lucide-react';
import '../styles/CommunityPage.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const CommunityPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tweetText, setTweetText] = useState("");
  const [showTagSearch, setShowTagSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const { tweets, books } = useSelector((state) => state?.tweets || { tweets: [], books: [] });
  console.log("{ tweets, books }",{ tweets, books });
  const filteredBooks = books?.filter((book) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTweet = () => {
    if (tweetText.trim() && selectedBook) {
      dispatch(addTweet({ bookId: selectedBook.bookId, userId: userId, tweet: tweetText }));
      setTweetText("");
      setSelectedBook(null);
      setIsModalOpen(false);
    } else {
      alert("Please enter a tweet and select a book.");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="community-container">
      <h1 className="page-title">Community Tweets</h1>
      <button className="add-tweet-btn" onClick={() => setIsModalOpen(true)}>
        Share Your Thoughts
      </button>

      <div className="tweets-container">
        {tweets
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((tweet, index) => (
          <div key={index} className="tweet-card">
            <div className="tweet-header">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tweet.user}`}
                alt="avatar"
                className="tweet-avatar"
              />
              <div className="tweet-user-info">
                <h3 className="tweet-username">@{tweet.name}</h3>
                <p className="tweet-timestamp">{formatDate(tweet.date)}</p>
              </div>
            </div>
            <p className="tweet-content">{tweet.tweet}</p>
            <div className="tweet-book">
              <BookOpen size={16} />
              {tweet.bookName}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <h2 className="modal-title">Share Your Thoughts</h2>
        <textarea
          className="tweet-textarea"
          placeholder="What's on your mind about this book?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          maxLength={280}
        />
        <div style={{ display: "flex" ,}}>

          <button className="tag-button" onClick={() => setShowTagSearch(true)}>
            Add Book Tag
          </button>
          <div className="character-count">
            {tweetText.length}/280 characters
          </div>
        </div>

        {showTagSearch && (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-results">
              {filteredBooks.map((book) => (
                <div
                  key={book.bookId}
                  className="search-item"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowTagSearch(false);
                  }}
                >
                  {book.bookName}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedBook && (
          <div className="selected-book">
            <BookOpen size={16} />
            Selected: {selectedBook.bookName}
          </div>
        )}

        <button
          className="post-button"
          onClick={handleSubmitTweet}
          disabled={!tweetText.trim() || !selectedBook}
        >
          Post Tweet
        </button>
      </Modal>
    </div>
  );
};

export default CommunityPage;