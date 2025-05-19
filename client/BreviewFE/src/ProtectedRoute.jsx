// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  if (!user) {
    return <Navigate to="/login" replace />; // If no user, redirect to login page
  }

  return element; // If user exists, render the protected route element
};

export default ProtectedRoute;
