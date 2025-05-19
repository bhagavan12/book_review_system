import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import api from "../services/api"
import axios from 'axios';
import { useSelector } from 'react-redux';
const App = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setTopB] = useState([]);
  const navigate = useNavigate();
  const utoken = useSelector((state) => state.user?.user?.token);
  console.log("utoken", utoken);
  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {

        const res = await axios.get(`${import.meta.env.VITE_API_BE}/api/books/books/topratings`);
        setTopB(res.data);
        console.log("Top Rated Books:", res.data);
      } catch (error) {
        console.error("Error fetching top-rated books:", error);
      }
    };

    fetchTopRatedBooks();
  }, [utoken]);
  console.log("books", books);
  const genres = [
    {
      id: 1,
      name: 'Fiction',
      image: 'https://public.readdy.ai/ai/img_res/6af9ae1accd37c5cdc216d10ab70ecbb.jpg',
      description: 'Explore imaginative worlds and compelling narratives'
    },
    {
      id: 2,
      name: 'Mystery',
      image: 'https://public.readdy.ai/ai/img_res/b89cf6f08c9327e6ec43813a86304e3b.jpg',
      description: 'Unravel intriguing puzzles and suspenseful tales'
    },
    {
      id: 3,
      name: 'Science Fiction',
      image: 'https://public.readdy.ai/ai/img_res/e8e3abd7a617d5c168c3bd5f69ef63df.jpg',
      description: 'Journey through space and future technologies'
    },
    {
      id: 4,
      name: 'Romance',
      image: 'https://public.readdy.ai/ai/img_res/2e83aa6e1c78d8e3235b3a6a24a6e59a.jpg',
      description: 'Experience love stories that touch the heart'
    }
  ];

  const featuredBooks = [
    {
      id: 1,
      title: 'The Quantum Paradox',
      author: 'Alexandra Richardson',
      image: 'https://public.readdy.ai/ai/img_res/47580fdb08b31985e313a0bf8350aa52.jpg',
      genre: 'Science Fiction'
    },
    {
      id: 2,
      title: 'Midnight in Manhattan',
      author: 'Jonathan Blake',
      image: 'https://public.readdy.ai/ai/img_res/49569cd2639aad712b05da4105f9d530.jpg',
      genre: 'Mystery'
    },
    {
      id: 3,
      title: 'Echoes of the Heart',
      author: 'Isabella Martinez',
      image: 'https://public.readdy.ai/ai/img_res/ab0531de7d7efd3a3250ae8a2b8694ee.jpg',
      genre: 'Romance'
    }
  ];
  const handleCardClick = (book) => {
    if (utoken) {
      localStorage.setItem('selectedBook', JSON.stringify(book));
      navigate(`/book-details/${book._id}`);
    }
  };
  const handleClicksr = () => {
    // localStorage.setItem('selectedBook', JSON.stringify(book));
    if (utoken) {
      navigate(`/search-upload`);
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        {/* <div className="header-container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-book-reader"></i>
              <span>BookVerse</span>
            </div>
            <nav className="main-nav">
              <a href="#">Home</a>
              <a href="#">Browse</a>
              <a href="#">New Releases</a>
              <a href="#">About</a>
            </nav>
            <div className="header-actions">
              <div className="search-container">
                <input type="text" placeholder="Search books..." />
                <i className="fas fa-search"></i>
              </div>
              <button className="sign-in-button">Sign In</button>
            </div>
          </div>
        </div> */}
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <img
            src="https://public.readdy.ai/ai/img_res/cd2ced79560e05ea563ed090bd8a7c0c.jpg"
            alt="Hero Background"
          />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Your Next Favorite Book</h1>
            <p>Explore thousands of books from various genres. Find the perfect story that speaks to you.</p>
            <button className="start-reading-button" onClick={() => handleClicksr()}>Start Reading</button>
          </div>
        </div>
      </div>

      {/* Genre Section */}
      <div className="genre-section">
        <h2>Browse by Genre</h2>
        <div className="genre-grid">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="genre-card"
              onClick={() => setSelectedGenre(genre.name)}
            >
              <div className="genre-image">
                <img src={genre.image} alt={genre.name} />
              </div>
              <div className="genre-info">
                <h3>{genre.name}</h3>
                <a href="#" data-readdy="true">
                  {genre.description}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="featured-section">
        <div className="featured-container">
          <h2>Featured Books</h2>
          <div className="featured-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card1" onClick={() => handleCardClick(book)}>
                <div className="book-image">
                  <img src={book.coverUrl} alt={book.title} />
                </div>
                <div className="book-info" >
                  <h3>{book.title}</h3>
                  <p>by {book.author} | {book.averageRating} Rated</p>
                  <span className="genre-tag">{book.genre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest book recommendations and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>About BookVerse</h3>
              <p>Your ultimate destination for discovering and enjoying books across all genres.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/search-upload">Search & Review</a></li>
                <li><a href="/profile">Profile</a></li>
              </ul>
            </div>
            {/* <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div> */}
            {/* <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div> */}
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 BookVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;