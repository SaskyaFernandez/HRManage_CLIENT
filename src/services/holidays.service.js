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
    },
    getHolidaysByUserID: async (tokenAtom, id) => {
        try {
            const response = await axiosInstance.get(`/api/holidays/${id}`, config(tokenAtom));
            return response.data.holidays;
        } catch (error) {
            console.error('Error fetching all holidays:', error);
            throw error;
        }
    },
    createHoliday: async (tokenAtom, startdateData,enddateData) => {
        try {
            const response = await axiosInstance.post(`/api/holidays/`, {
                startdate: startdateData, // Date de début corrigée
                enddate:  enddateData   // Date de fin corrigée
            }, config(tokenAtom));
            console.log(response);
            return response.data.holidays;
        } catch (error) {
            console.error('Error creating holiday:', error);
            throw error;
        }
    }

};

export default holidaysController;
