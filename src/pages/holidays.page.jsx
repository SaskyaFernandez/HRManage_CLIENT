import { useEffect, useState } from 'react';
import HolidaysTable from '../components/holidays/holidaysTable';
import RequestHolidays from '../components/holidays/requestHolidays';
import useLocalStorage from '../hooks/useLocalStorage';
import holidaysController from '../services/holidays.service';
import usersController from '../services/user.service';
import { TbSmartHome } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";

const Holidays = () => {

    const [user, setUser] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [error, setError] = useState('');
    const [succes , setSucces] = useState('')
    const [allHolidays, setAllHolidays] = useState([]);
    const [getLocalStorage, _] = useLocalStorage();
    const [isRotated, setIsRotated] = useState(false);
    const handleClick = () => {
        setIsRotated(true);
        setTimeout(() => {
            setIsRotated(false);
        }, 1000);
    };
    const token = getLocalStorage('token');

    const createHolidayRequest = async (startDate, endDate) => {
        try {
            const createRequestHoliday = await holidaysController.createHoliday(token, startDate, endDate);
            setHolidays(holidays => [...holidays, createRequestHoliday]);
            setSucces("The request was sent successfully!");
            setError('');
        } catch (error) {
            setSucces('');
            setError(error.response.data.error);
        }
    };

    const getHolidayUser = async () => {
        try {
            const holidayByID = await holidaysController.getHolidaysByUserID(token, getLocalStorage("id"));
            setHolidays(holidayByID);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    }

    const fetchHolidays = async () => {
        try {
            const holidaysData = await holidaysController.getAllHolidays(token);
            setAllHolidays(holidaysData);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    };
    const userById = async () => {
        try {
            const getuserById = await usersController.getUserByID(token, getLocalStorage('id'));
            setUser(getuserById);

        } catch (error) {
            console.error('Error fetching user by id:', error);

        }
    };
    useEffect(() => {
        fetchHolidays();
        getHolidayUser();
        userById();
    }, [token])


    return (
        <>
            <RequestHolidays succes={succes} error={error} onCreateHolidayRequest={createHolidayRequest} />
            {user.holidaysleft && (

                <div className={`holidaysLeft`}>
                    <div>
                        <h2>Holidays Left</h2>
                        <FiRefreshCw className={isRotated ? 'rotate-360' : ''} onClick={handleClick} />
                    </div>
                    <p><TbSmartHome /> {user.holidaysleft} Days </p>
                </div>

            )}
            <HolidaysTable title='My holidays requests' holidays={holidays} reload={getHolidayUser} />
            <HolidaysTable title='All holidays' holidays={allHolidays} />
        </>
    );
};

export default Holidays;
