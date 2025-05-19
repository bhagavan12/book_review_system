// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from '../features/user/userSlice';
// import { getBooksByUser } from '../features/books/booksSlice';
// import '../styles/Profile'
// const ProfilePage = () => {
//   const dispatch = useDispatch();
  
//   // Get user and books data from Redux store
//   const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
//   const { profilebooks, loading: booksLoading, error: booksError } = useSelector((state) => state.books);

//   // Get user ID from localStorage
//   const userId = user?._id || JSON.parse(localStorage.getItem('user'))?._id;
//     console.log("userId",userId);
//   useEffect(() => {
//     if (userId) {
//       dispatch(getUserProfile()); // Fetch user details
//       dispatch(getBooksByUser(userId)); // Fetch books created by the user
//     }
//   }, [dispatch, userId]);

//   if (userLoading || booksLoading) return <div>Loading...</div>;
//   if (userError || booksError) return <div>Error: {userError || booksError}</div>;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {user && (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       )}
      
//       <h3>Books Created by {user?.name}</h3>
//       {profilebooks && profilebooks.length > 0 ? (
//         <ul>
//           {profilebooks.map((book) => (
//             <li key={book._id}>{book.title}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No books created yet.</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/user/userSlice';
import { getBooksByUser } from '../features/books/booksSlice';
import { Loader, User, Book } from 'lucide-react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user, loading: userLoading, error: userError } = useSelector((state) => state.user);
  const { profilebooks, loading: booksLoading, error: booksError } = useSelector((state) => state.books);

  const userId = user?._id || JSON.parse(localStorage.getItem('user'))?._id;
  const handleCardClick = (book) => {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    navigate(`/book-details/${book._id}`);
  };
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile());
      dispatch(getBooksByUser(userId));
    }
  }, [dispatch, userId]);

  if (userLoading || booksLoading) {
    return (
      <div className="loading-container">
        <Loader className="spin" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (userError || booksError) {
    return (
      <div className="error-container">
        <p>Error: {userError || booksError}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={40} />
        </div>
        <h2>User Profile</h2>
      </div>

      {user && (
        <div className="profile-info">
          <div className="info-card">
            <div className="info-item">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="books-section">
        <div className="section-header">
          <Book size={24} />
          <h3>Books Created by {user?.name}</h3>
        </div>

        {profilebooks && profilebooks.length > 0 ? (
          <div className="books-grid">
            {profilebooks.map((book) => (
              <div key={book._id} className="book-item" onClick={()=>handleCardClick(book)}>
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="book-coverp" />
                ) : (
                  <div className="book-cover-placeholder">
                    <Book size={32} />
                  </div>
                )}
                <div className="book-detailsp">
                  <h4>{book.title}</h4>
                  {book.author && <p className="book-authorp">{book.author}</p> }
                  {book.createdAt && <p className="" style={{fontSize:"4px"}}>{new Date(book?.createdAt).toLocaleDateString()}</p> }

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-books">
            <Book size={32} />
            <p>No books created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;