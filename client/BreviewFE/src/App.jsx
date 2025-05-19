// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "./ProtectedRoute";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/HomePage";
// import Navbar from "./components/Navbar";

// const App = () => {
//   const { user } = useSelector((state) => state.user); // Access user state from Redux
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Fetch userInfo from localStorage
//   const isAuthenticated = !!(user?.token || userInfo?.token); // Check if authenticated via Redux or localStorage

//   return (
//     <Router>
//       {isAuthenticated && <Navbar />} {/* Show Navbar if authenticated */}
//       <div className="app-container">
//         <Routes>
//           {/* Public Routes */}
//           <Route
//             path="/register"
//             element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />}
//           />
//           <Route
//             path="/login"
//             element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
//           />

//           {/* Protected Routes */}
//           <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
//           {/* Add more protected routes as needed */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import SearchAndUploadPage from './pages/SearchAndUploadPage';
import Register from './pages/Register';
import SignInUp from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import BookDetails from './components/BookDetails';
import BookshelvesPage from './pages/Bookshelves';
import BookshelfDetailsPage from './components/BookshelfDetailsPage';
import SetPassword from './components/SetPassword';
const App = () => {
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <SignInUp />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <HomePage />}/>
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/community" element={<ProtectedRoute element={<CommunityPage />} />} />
        <Route path="/search-upload" element={<ProtectedRoute element={<SearchAndUploadPage />} />} />
        <Route path="/book-details/:bookId" element={<ProtectedRoute element={<BookDetails />} />} />
        <Route path="/bookshelf" element={<ProtectedRoute element={<BookshelvesPage />} />} />
        <Route path="/bookshelf/:shelfId" element={<ProtectedRoute element={<BookshelfDetailsPage />} />}/>
        <Route path='/set-password' element={<ProtectedRoute element={<SetPassword/>}/>}/>
        {/* <Route path='/bookdetails' */}
      </Routes>
    </Router>
  );
};

export default App;
