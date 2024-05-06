import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const config = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

const usersController = {
    getAllUsers: async (token) => {
        try {
            const response = await axiosInstance.get('/api/users/', config(token));
            return response.data.users;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    },
    getUserByID: async (token, id) => {
        try {
            const response = await axiosInstance.get(`/api/users/${id}`, config(token));
            return response.data.userById;
        } catch (error) {
            console.error('Error fetching user by id:', error);
            throw error;
        }
    },
    getUserByEmail: async (token, email) => {
        try {
            const response = await axiosInstance.get(`/api/users/${email}`, config(token));
            return response.data.userByEmail;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

};

export default usersController;
