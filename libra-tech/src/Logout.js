
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.post('http://localhost:5170/api/Authorization/logout'); // Call the backend logout endpoint
                localStorage.clear(); // Clear all local storage items
                localStorage.removeItem('token');
localStorage.removeItem('refreshToken');

                console.log('localStorage was cleared');
                navigate('/'); // Navigate to the login page
                window.location.reload(); // Reload the page to ensure state is reset
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };
        
        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;


