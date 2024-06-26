import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const config = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

const holidaysController = {
    getAllHolidays: async (token) => {
        try {
            const response = await axiosInstance.get('/api/holidays/all', config(token));
            return response.data.holidays;
        } catch (error) {
            console.error('Error fetching all holidays:', error);
            throw error;
        }
    },
    getHolidaysByUserID: async (token, id) => {
        try {
            console.log('ID SERVICE:' , id);
            const response = await axiosInstance.get(`/api/holidays/${id}`, config(token));
            return response.data.holidaysByUserID;
        } catch (error) {
            console.error('Error fetching all holidays:', error);
            throw error;
        }
    },
    createHoliday: async (token, startdateData,enddateData) => {
        try {
            const response = await axiosInstance.post(`/api/holidays/`, {
                startdate: startdateData,
                enddate:  enddateData 
            }, config(token));
            return response.data.newHoliday;
        } catch (error) {
            console.error('Error creating holiday:', error);
            throw error;
        }
    }

};

export default holidaysController;
