// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkBook, addBook } from '../features/books/booksSlice';
// import BookCard from '../components/BookCard';
// import BookForm from '../components/BookForm';

// const SearchAndUpload = () => {
//   const dispatch = useDispatch();
//   const { books, loading, error } = useSelector((state) => state.books);
  
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleSearch = () => {
//     dispatch(checkBook(searchQuery));
//     setIsFormVisible(false); // Hide form when search is triggered
//   };

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleAddBook = (bookData) => {
//     dispatch(addBook(bookData));
//     setSearchQuery(''); // Reset search input after adding book
//     setIsFormVisible(false); // Hide form after submitting
//   };

//   return (
//     <div>
//       <h2>Search and Upload Book</h2>
//       <div>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleInputChange}
//           placeholder="Enter full title"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}

//       {books.length > 0 ? (
//         <div>
//           <h3>Matched Books</h3>
//           <div style={{ display: 'flex', overflowX: 'scroll' }}>
//             {books.map((book) => (
//               <BookCard key={book._id} book={book} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           {isFormVisible ? (
//             <BookForm onSubmit={handleAddBook} />
//           ) : (
//             <button onClick={() => setIsFormVisible(true)}>No match found, upload a new book</button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchAndUpload;


//v1 - 10-2-25 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkBook, addBook } from '../features/books/booksSlice';
import { Search, Upload, Loader } from 'lucide-react';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import '../styles/SearchAndUpload.css';
import Modal from 'react-modal';
const SearchAndUpload = () => {
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  console.log("searched books",books)
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = () => {
    dispatch(checkBook(searchQuery));
    setIsFormVisible(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddBook = (bookData) => {
    dispatch(addBook(bookData));
    setSearchQuery('');
    setIsFormVisible(false);
  };

  return (
    <div className="search-upload-container">
      <div className="search-section">
        <h2>Search and Upload Book</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Enter full title"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            {loading ? <Loader className="spin" /> : <Search />}
            <span>Search</span>
          </button>
          <button onClick={() => setIsFormVisible(true)} className="upload-button">
              <Upload size={20} />
              <span>Upload a new book</span>
            </button>
        </div>

        {error && <div className="error-message">Error: {error}</div>}
      </div>

      <div className="results-section" style={{marginTop:"0px"}}>
        {books.length > 0 ? (
          <div className="books-container">
            <h3>Matched Books</h3>
            <div className="books-grid">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-results">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* <Modal
        isOpen={isFormVisible}
        onRequestClose={() => setIsFormVisible(false)}
        style={customStyles}
        contentLabel="Add Book Modal"
      > */}
        <BookForm
          onSubmit={handleAddBook}
          isOpen={isFormVisible}
          onRequestClose={() => setIsFormVisible(false)}
        />
      {/* </Modal> */}
    </div>
  );
};

export default SearchAndUpload;
{/* <div className="results-section">
  {books.length > 0 ? (
    <div className="books-container">
      <h3>Matched Books</h3>
      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  ) : (
    <div className="no-results">
      {isFormVisible ? (
        <BookForm onSubmit={handleAddBook} />
      ) : (
        <div className="upload-prompt">
          <p>No books found matching your search.</p>
          <button onClick={() => setIsFormVisible(true)} className="upload-button">
            <Upload size={20} />
            <span>Upload a new book</span>
          </button>
        </div>
      )}
    </div>
  )}
</div> */}