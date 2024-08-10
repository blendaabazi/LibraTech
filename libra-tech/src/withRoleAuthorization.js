import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const withRoleAuthorization = (allowedRoles) => (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // You can decode the token here manually if needed
        const decodedToken = decodeToken(token);
        const userRole = decodedToken ? decodedToken.Roli : null;
        setUserRole(userRole);
      }
    }, []);

    if (!isAuthenticated || !allowedRoles.includes(userRole)) {
      return <div>You do not have permission to access this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

// Mock decodeToken function
const decodeToken = (token) => {
  // You can implement your own token decoding logic here if needed
  return null; // Return null for simplicity
};
