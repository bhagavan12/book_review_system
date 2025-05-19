import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Book } from 'lucide-react';

const BookshelfDetailsPage = () => {
  const navigate=useNavigate();
  const { shelfId } = useParams();
  const { shelves } = useSelector((state) => state.bookshelf);
  const shelf = shelves.find((s) => s._id === shelfId);
    console.log(shelf);
  const handleCardClick = (book) => {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    navigate(`/book-details/${book._id}`);
  };

  if (!shelf) return <p>Shelf not found</p>;

  const books = shelf.books;

  return (
    <div className="books-section" style={{"marginTop":"100px"}}>
      <div className="section-header">
        <Book size={24} />
        <h3>Books in "{shelf.name}"</h3>
      </div>

      {books && books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book._id} className="book-item" onClick={() => handleCardClick(book)}>
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} className="book-coverp" />
              ) : (
                <div className="book-cover-placeholder">
                  <Book size={32} />
                </div>
              )}
              <div className="book-detailsp">
                <h4>{book.title}</h4>
                {book.author && <p className="book-authorp">{book.author}</p>}
                {book.createdAt && (
                  <p style={{ fontSize: '4px' }}>
                    {new Date(book?.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-books">
          <Book size={32} />
          <p>No books in this shelf.</p>
        </div>
      )}
    </div>
  );
};

export default BookshelfDetailsPage;
