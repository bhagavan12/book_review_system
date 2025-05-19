import React, { useEffect, useState } from "react";
import api from "../api"; // Import the Axios instance

const BooksByGenre = ({genre}) => {
  const [books, setBooks] = useState([]);
  genre = "Fantasy"; // Change this dynamically if needed

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const response = await api.get(`/api/books/books/genre/${genre}`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooksByGenre();
  }, []);

  return (
    <div>
      <h2>Books in {genre} Genre</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <img src={book.coverUrl} alt={book.title} width="100" />
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Rating:</strong> {book.averageRating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksByGenre;
