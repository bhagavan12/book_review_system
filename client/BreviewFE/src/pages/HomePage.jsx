// 

// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/user/userSlice';
import { checkBook } from '../features/books/booksSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
      // Optionally, fetch books here
    }
  }, []);

  return (
    <div>
      <h1>Welcome {user ? user.name : 'Guest'}</h1>
      {/* Display list of books or user's profile info */}
    </div>
  );
};

export default HomePage;
