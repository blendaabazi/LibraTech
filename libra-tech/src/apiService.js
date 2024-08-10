import axios from 'axios';

const API_BASE_URL = 'http://localhost:5170';

// Staff API call
export const getStaff = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/GetStafi`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch staff:', error);
        throw error;
    }
};

// Authentication API calls
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/authorization/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const register = async (registerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/authorization/register`, registerData);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const assignRole = async (assignRoleData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/authorization/assign-role`, assignRoleData);
        return response.data;
    } catch (error) {
        console.error('Role assignment failed:', error);
        throw error;
    }
};
