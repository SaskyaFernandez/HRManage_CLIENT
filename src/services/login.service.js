import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})
export const login = async (email,password) => {

    const response = await axiosInstance.post('api/auth/login', {
        email: email,
        password: password
    }) 

    const data = response.data;
    return data;
};