import { useEffect, useState } from "react";
import HolidaysTable from "../components/holidays/holidaysTable";
import AllUsers from "../components/users/allUsers";
import useLocalStorage from "../hooks/useLocalStorage";
import holidaysController from "../services/holidays.service";
import UserByID from "../components/users/usersByID";


const Dashboard = () => {
    const [allHolidays, setAllHolidays] = useState([]);
    const [getLocalStorage, _] = useLocalStorage();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isSlided, setIsSlided] = useState(false);

    const handleClickUser = (userId) => {
        setSelectedUserId(userId);
        setIsSlided(true);
        setTimeout(() => {
            setIsSlided(false);
        }, 499);
    };

    const token = getLocalStorage('token');
    const fetchHolidays = async () => {
        try {
            const holidaysData = await holidaysController.getAllHolidays(token);
            setAllHolidays(holidaysData);
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    };

    useEffect(() => {
        fetchHolidays();
    }, [token])
    
    return (
        <>
            <AllUsers handleClickUser={handleClickUser} />

            {selectedUserId && <UserByID isSlided={isSlided} userId={selectedUserId} />}

            <HolidaysTable title='All holidays'  holidays={allHolidays} />
        </>
    );
};

export default Dashboard;
