import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!userId) return <Navigate to="/login" />;
  
  return children;
};

export default ProtectedRoute;
