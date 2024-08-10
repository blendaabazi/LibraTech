
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider';

// const PrivateRoute = ({ children, roles, userIds }) => {
//   const { isAuthenticated, user } = useAuth();

//   console.log('PrivateRoute: isAuthenticated', isAuthenticated);
//   console.log('PrivateRoute: user', user);
//   console.log('PrivateRoute: roles', roles);
//   console.log('PrivateRoute: userIds', userIds);

//   if (!isAuthenticated) {
//     console.log('User is not authenticated, redirecting to login.');
//     return <Navigate to="/" />;
//   }

//   if (roles && roles.indexOf(user.roli) === -1) {
//     console.log('User does not have the required role, redirecting to not authorized page.');
//     return <Navigate to="/notauthorized" />;
//   }

//   if (userIds && userIds.indexOf(user.id) === -1) {
//     console.log('User ID is not in the allowed list, redirecting to not authorized page.');
//     return <Navigate to="/notauthorized" />;
//   }

//   console.log('User is authenticated and has the required role, rendering children.');
//   return children;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children, roles, userIds }) => {
  const { isAuthenticated, user } = useAuth();
  console.log('PrivateRoute: isAuthenticated', isAuthenticated);
  console.log('PrivateRoute: user', user);
  console.log('PrivateRoute: roles', roles);
  console.log('PrivateRoute: userIds', userIds);

  if (!isAuthenticated) {
    console.log('User is not authenticated, redirecting to login.');
    return <Navigate to="/" />;
  }

  if (roles && roles.indexOf(user.roli) === -1) {
    return <Navigate to="/notauthorized" />;
  }
  console.log('User is authenticated and has the required role, rendering children.');
  return children;
};

export default PrivateRoute;



// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('token');

//   return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to="/" />;
// };

// export default PrivateRoute;


