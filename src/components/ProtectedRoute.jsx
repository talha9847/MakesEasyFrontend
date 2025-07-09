// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useSessionValidation from '../hooks/Validation';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSessionValidation();

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Or show a spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
