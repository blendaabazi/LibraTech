import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
        token: '',
        refreshToken:''
    });
    const [tokenExpiration, setTokenExpiration] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        const refreshToken = localStorage.getItem('refreshtoken');
        const roli = localStorage.getItem('Roli');
        const id = localStorage.getItem('ID');
        const emri = localStorage.getItem('Emri');
        const mbiemri = localStorage.getItem('Mbiemri');
        const klientiGjinia = localStorage.getItem('KlientiGjinia');
        const klientiQyteti = localStorage.getItem('KlientiQyteti');
        const email = localStorage.getItem('Email');
        const password = localStorage.getItem('Password');
        const expiration = localStorage.getItem('TokenExpiration');

        if (token && refreshToken && roli && id && emri && mbiemri && klientiGjinia && klientiQyteti && email && password && expiration) {
            const now = new Date().getTime();
            if (now < expiration) {
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
                setTokenExpiration(expiration);
            } else {
                logout();
            }
        }
    }, []);

    const login = (token,refreshToken, roli, userData) => {
        if (!userData || !userData.id) {
            console.error('User data is invalid:', userData);
            return;
        }
    
        const expiration = new Date().getTime() + 12000; 

        localStorage.setItem('Token', token);
        localStorage.setItem('refreshtoken', refreshToken);
        localStorage.setItem('Roli', roli);
        localStorage.setItem('ID', userData.id);
        localStorage.setItem('Emri', userData.emri);
        localStorage.setItem('Mbiemri', userData.mbiemri);
        localStorage.setItem('KlientiGjinia', userData.klientiGjinia);
        localStorage.setItem('KlientiQyteti', userData.klientiQyteti);
        localStorage.setItem('Email', userData.email);
        localStorage.setItem('Password', userData.password);
        localStorage.setItem('TokenExpiration', expiration);

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
        setTokenExpiration(expiration);
    };
    const refreshToken = async () => {
        const token = localStorage.getItem('Token'); // Merr token-in e aksesit
        const refreshToken = localStorage.getItem('refreshtoken'); // Merr refresh token-in
    
        try {
            const response = await axios.post('http://localhost:5170/api/Authorization/refresh-token', { 
                token, // Dërgo token-in e aksesit
                refreshToken // Dërgo refresh token-in
            });
    
            if (response.data.Token) {
                login(response.data.Token, response.data.RefreshToken, user.roli, user);
                return true; // Indiko që rinovimi ishte i suksesshëm
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            return false; // Indiko që rinovimi dështoi
        }
    };
    

    const logout = () => {
        localStorage.clear();
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
        setTokenExpiration(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, tokenExpiration,refreshToken }}>
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
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState({
//         id: null,
//         emri: '',
//         roli: '',
//         token: ''
//     });
//     const [tokenExpiration, setTokenExpiration] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('Token');
//         const roli = localStorage.getItem('Roli');
//         const id = localStorage.getItem('ID');
//         const emri = localStorage.getItem('Emri');
//         const expiration = localStorage.getItem('TokenExpiration');

//         if (token && roli && id && emri && expiration) {
//             const now = new Date().getTime();
//             if (now < expiration) {
//                 setIsAuthenticated(true);
//                 setUser({
//                     token,
//                     roli,
//                     id,
//                     emri
//                 });
//                 setTokenExpiration(expiration);
//             } else {
//                 logout();
//             }
//         }
//     }, []);

//     const login = (token, roli, userData) => {
//         const expiration = new Date().getTime() + 120000; // Set appropriate expiration time

//         localStorage.setItem('Token', token);
//         localStorage.setItem('Roli', roli);
//         localStorage.setItem('ID', userData.id);
//         localStorage.setItem('Emri', userData.emri);
//         localStorage.setItem('TokenExpiration', expiration);

//         setIsAuthenticated(true);
//         setUser({
//             token,
//             roli,
//             id: userData.id,
//             emri: userData.emri
//         });
//         setTokenExpiration(expiration);
//     };

//     const logout = () => {
//         localStorage.removeItem('Token');
//         localStorage.removeItem('Roli');
//         localStorage.removeItem('ID');
//         localStorage.removeItem('Emri');
//         localStorage.removeItem('TokenExpiration');

//         setIsAuthenticated(false);
//         setUser({
//             id: null,
//             emri: '',
//             roli: '',
//             token: ''
//         });
//         setTokenExpiration(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, login, logout, tokenExpiration }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
