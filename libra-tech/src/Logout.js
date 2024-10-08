
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:5170/api/Authorization/logout');
                localStorage.clear();
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');

                console.log('localStorage was cleared');
                navigate('/');
                window.location.reload();
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;


