import axios from 'axios';

const API_BASE_URL = 'http://localhost:5170';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Authorization/login`, {
            Email: email,
            Password: password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Authorization/register`, {
            Emri: userData.name,
            Mbiemri: userData.lastname,
            KlientiGjinia: userData.gender,
            KlientiQyteti: userData.city,
            Email: userData.email,
            Password: userData.password,
            ConfirmPassword: userData.confirmPassword
        });
        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error);
        throw error;
    }
};
