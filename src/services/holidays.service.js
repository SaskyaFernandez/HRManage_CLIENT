import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const config = (tokenAtom) => ({
    headers: { Authorization: `Bearer ${tokenAtom}` }
});

const holidaysController = {
    getAllHolidays: async (tokenAtom) => {
        try {
            const response = await axiosInstance.get('/api/holidays/all', config(tokenAtom));
            return response.data.holidays;
        } catch (error) {
            console.error('Error fetching all holidays:', error);
            throw error;
        }
    }
};

export default holidaysController;
