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
    const [tokenExpiration, setTokenExpiration] = useState(null);

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
        const expiration = localStorage.getItem('TokenExpiration');

        if (token && roli && id && emri && mbiemri && klientiGjinia && klientiQyteti && email && password && expiration) {
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

    const login = (token, roli, userData) => {
        const expiration = new Date().getTime() + 120000; 

        localStorage.setItem('Token', token);
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, tokenExpiration }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
