import React, { useState, useEffect } from 'react';
import holidaysController from '../../services/holidays.service';
import useLocalStorage from '../../hooks/useLocalStorage';

const AllHolidays = () => {
    const [getToken, _] = useLocalStorage()
    const [holidays, setHolidays] = useState([]);
    const [orderedBy, setOrderedBy] = useState("");

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
    }, []);

    const orderBy = (sorting) => {
        if (orderedBy !== "ASC") {
            let holidaysASC = holidays.sort((a, b) => Reflect.get(a, sorting).localeCompare(Reflect.get(b, sorting)));
            setOrderedBy("ASC")
            return setHolidays([...holidaysASC])
        } else if (orderedBy !== "DESC") {
            let holidaysDESC = holidays.sort((a, b) => Reflect.get(b, sorting).localeCompare(Reflect.get(a, sorting)));
            setOrderedBy("DESC")
            return setHolidays([...holidaysDESC])
        }
        return setOrderedBy("")
    }
    return (
        <div className='holidaysParent'>
            <div>
                <table>
                    <caption>Holidays list</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className={`orderBy ${orderedBy}`} onClick={() => orderBy("startdate")}>Start date</th>
                            <th>End date</th>
                            <th className={`orderBy ${orderedBy}`} onClick={() => orderBy("isaccepted")}>Request status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holidays.map(({ id, startdate, enddate, isaccepted }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{startdate}</td>
                                <td>{enddate}</td>
                                <td className={isaccepted}>{isaccepted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllHolidays;
