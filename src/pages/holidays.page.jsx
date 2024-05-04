import React, { useState, useEffect } from 'react';
import holidaysController from '../services/holidays.service';
import useLocalStorage from '../hooks/useLocalStorage';

const Holidays = () => {
    const [getToken, _] = useLocalStorage()
    const [holidays, setHolidays] = useState([]);
    const [orderByAsc, setOrderByAsc] = useState("");

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const holidaysData = await holidaysController.getAllHolidays(getToken('token'));
                setHolidays(holidaysData);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };
        fetchHolidays();
        const postHolidays = async (startDate,endDate) => {
            try {
                const createRequestHoliday = await holidaysController.createHoliday(getToken('token'), startDate,endDate);
                return createRequestHoliday;
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };
    }, []);

    const orderBy = () => {
        if (orderByAsc !== "ASC") {
            let holidaysASC = holidays.sort((a, b) => a.isaccepted.localeCompare(b.isaccepted));
            setOrderByAsc("ASC")
            return setHolidays([...holidaysASC])
        } else if (orderByAsc !== "DESC") {
            let holidaysDESC = holidays.sort((a, b) => b.isaccepted.localeCompare(a.isaccepted));
            setOrderByAsc("DESC")
            return setHolidays([...holidaysDESC])
        }
        return setOrderByAsc("")
    }
    return (
        <div className='holidaysParent'>
            <h1>Holidays list</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th className={`orderBy ${orderByAsc === "ASC" ? "ASC" : orderByAsc === "DESC" ? "DESC" : ""}`} onClick={orderBy}>Statut de la demande</th>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map(({ id, userid, startdate, enddate, isaccepted }, index) => (
                        <tr key={index}>
                            <td>{id}</td>
                            <td>{startdate}</td>
                            <td>{enddate}</td>
                            <td className={isaccepted}>{isaccepted == 'Approved' ? 'Approved' : isaccepted == "Rejected" ? 'Rejected' : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Holidays;
