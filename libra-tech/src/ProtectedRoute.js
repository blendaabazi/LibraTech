
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ requiredRoli,children }) => {
  const { isAuthenticated, user } = useAuth();
debugger
  if (!isAuthenticated) {
    return <Navigate to="/" />;  
  }


  if (requiredRoli && user.roli !== requiredRoli) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;





