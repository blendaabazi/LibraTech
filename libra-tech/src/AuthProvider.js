import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';

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
        roli: '',
        token: '',
        refreshToken: ''
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
        const expiration = localStorage.getItem('TokenExpiration');
    
        if (token && refreshToken && roli && id && emri && mbiemri && klientiGjinia && klientiQyteti && email && expiration) {
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
                });
                setTokenExpiration(expiration);
            } else {
                logout();
            }
        }
    }, []);
    

    const login = (token, refreshToken, roli, userData) => {
        if (!userData || !userData.id) {
            console.error('User data is invalid:', userData);
            return; 
        }
    
        const expiration = new Date().getTime() + 900000; 
    
        console.log('Logging in user:', userData);
        console.log('Token:', token);
        console.log('Expiration time:', expiration); 
    
        localStorage.setItem('Token', token);
        localStorage.setItem('refreshtoken', refreshToken);
        localStorage.setItem('Roli', roli);
        localStorage.setItem('ID', userData.id);
        localStorage.setItem('Emri', userData.emri);
        localStorage.setItem('Mbiemri', userData.mbiemri);
        localStorage.setItem('KlientiGjinia', userData.klientiGjinia);
        localStorage.setItem('KlientiQyteti', userData.klientiQyteti);
        localStorage.setItem('Email', userData.email);
        localStorage.setItem('TokenExpiration', expiration); 
      
        console.log('Token stored:', localStorage.getItem('Token'));
        console.log('RefreshToken stored:', localStorage.getItem('refreshtoken'));
        console.log('TokenExpiration stored:', localStorage.getItem('TokenExpiration'));
    
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
          
        });
        setTokenExpiration(expiration);
    };
    

    const refreshToken = async () => {
        const token = localStorage.getItem('Token');
        const refreshToken = localStorage.getItem('refreshtoken');

        try {
            const response = await axios.post('http://localhost:5170/api/Authorization/refresh-token', {
                token,
                refreshToken
            });

          
            if (response.data.Token) {
                console.log('Token rifreskuar me sukses:', response.data);
                login(response.data.Token, response.data.RefreshToken, user.roli, user);
                return true;
            }
        } catch (error) {
            console.error('Error gjatë rifreskimit të token-it:', error);
            return false;
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
            roli: '',
            token: '',
            refreshToken: ''
        });
        setTokenExpiration(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, tokenExpiration, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
