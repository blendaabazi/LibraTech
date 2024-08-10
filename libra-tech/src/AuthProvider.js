import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    id: null,
    emri: '',
    mbiemri: '',
    klientiGjinia: '',
    klientiQyteti: '',
    email: '',
    password: '',
    roli: '',
    token: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const roli = localStorage.getItem('Roli');
    const id = localStorage.getItem('ID');
    const emri = localStorage.getItem('Emri');
    const mbiemri = localStorage.getItem('Mbiemri');
    const klientiGjinia = localStorage.getItem('KlientiGjinia');
    const klientiQyteti = localStorage.getItem('KlientiQyteti');
    const email = localStorage.getItem('Email');
    const password = localStorage.getItem('Password');

    if (token && roli && id && emri && mbiemri && klientiGjinia && klientiQyteti && email && password) {
      setIsAuthenticated(true);
      setUser({
        token,
        roli,
        id,
        emri,
        mbiemri,
        klientiGjinia,
        klientiQyteti,
        email,
        password
      });
    }
  }, []);

  const updateUser = (userData) => {
  
    const { emri, mbiemri, email, klientiQyteti, klientiGjinia } = userData;
  
    
    if (!emri || !mbiemri || !email || !klientiQyteti || !klientiGjinia) {
     
      console.error('Missing required fields');
      return; // Exit the function without updating the user state
    }
  
   
    setUser({
      ...user, 
      emri: emri,
      mbiemri: mbiemri,
      email: email,
      klientiQyteti: klientiQyteti,
      klientiGjinia: klientiGjinia
    });
  };
  
  const login = (token, roli, userData) => {
    localStorage.setItem('Token', token);
    localStorage.setItem('Roli', roli);
    localStorage.setItem('ID', userData.id);
    localStorage.setItem('Emri', userData.emri);
    localStorage.setItem('Mbiemri', userData.mbiemri);
    localStorage.setItem('KlientiGjinia', userData.klientiGjinia);
    localStorage.setItem('KlientiQyteti', userData.klientiQyteti);
    localStorage.setItem('Email', userData.email);
    localStorage.setItem('Password', userData.password);

   

    setIsAuthenticated(true);
    setUser({
      token,
      roli,
      id: userData.id,
      emri: userData.emri,
      mbiemri: userData.mbiemri,
      klientiGjinia: userData.klientiGjinia,
      klientiQyteti: userData.klientiQyteti,
      email: userData.email,
      password: userData.password
    });
  };

  const logout = () => {
    localStorage.clear(); // Clear all local storage items

    setIsAuthenticated(false);
    setUser({
      id: null,
      emri: '',
      mbiemri: '',
      klientiGjinia: '',
      klientiQyteti: '',
      email: '',
      password: '',
      roli: '',
      token: ''
    });
  };
  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};




export const useAuth = () => {
  return useContext(AuthContext);
};

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState({
//     id: null,
//     emri: '',
//     mbiemri: '',
//     klientiGjinia: '',
//     klientiQyteti: '',
//     email: '',
//     password: '',
//     roli: '',
//     token: ''
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('Token');
//     const roli = localStorage.getItem('Roli');
//     const id = localStorage.getItem('ID');
//     const emri = localStorage.getItem('Emri');
//     const mbiemri = localStorage.getItem('Mbiemri');
//     const klientiGjinia = localStorage.getItem('KlientiGjinia');
//     const klientiQyteti = localStorage.getItem('KlientiQyteti');
//     const email = localStorage.getItem('Email');
//     const password = localStorage.getItem('Password');

//     if (token && roli && id && emri && mbiemri && klientiGjinia && klientiQyteti && email && password) {
//       setIsAuthenticated(true);
//       setUser({
//         token,
//         roli,
//         id,
//         emri,
//         mbiemri,
//         klientiGjinia,
//         klientiQyteti,
//         email,
//         password
//       });
//     }
//   }, []);

//   const updateUser = (userData) => {
  
//     const { emri, mbiemri, email, klientiQyteti, klientiGjinia } = userData;
  
    
//     if (!emri || !mbiemri || !email || !klientiQyteti || !klientiGjinia) {
     
//       console.error('Missing required fields');
//       return; // Exit the function without updating the user state
//     }
  
   
//     setUser({
//       ...user, 
//       emri: emri,
//       mbiemri: mbiemri,
//       email: email,
//       klientiQyteti: klientiQyteti,
//       klientiGjinia: klientiGjinia
//     });
//   };
  
//   const login = (token, roli, userData) => {
//     localStorage.setItem('Token', token);
//     localStorage.setItem('Roli', roli);
//     localStorage.setItem('ID', userData.id);
//     localStorage.setItem('Emri', userData.emri);
//     localStorage.setItem('Mbiemri', userData.mbiemri);
//     localStorage.setItem('KlientiGjinia', userData.klientiGjinia);
//     localStorage.setItem('KlientiQyteti', userData.klientiQyteti);
//     localStorage.setItem('Email', userData.email);
//     localStorage.setItem('Password', userData.password);

   

//     setIsAuthenticated(true);
//     setUser({
//       token,
//       roli,
//       id: userData.id,
//       emri: userData.emri,
//       mbiemri: userData.mbiemri,
//       klientiGjinia: userData.klientiGjinia,
//       klientiQyteti: userData.klientiQyteti,
//       email: userData.email,
//       password: userData.password
//     });
//   };

//   const logout = () => {
//     localStorage.clear(); // Clear all local storage items

//     setIsAuthenticated(false);
//     setUser({
//       id: null,
//       emri: '',
//       mbiemri: '',
//       klientiGjinia: '',
//       klientiQyteti: '',
//       email: '',
//       password: '',
//       roli: '',
//       token: ''
//     });
//   };
  
  

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// export const useAuth = () => {
//   return useContext(AuthContext);
// };
