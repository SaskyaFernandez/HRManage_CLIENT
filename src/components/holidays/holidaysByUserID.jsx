import React, { useState, useEffect } from 'react';
import holidaysController from '../../services/holidays.service';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useContext } from 'react';
import Context from '../../contexts/CurrentUserContext';

    const HolidaysByUserID = () => {
        const [getToken, _] = useLocalStorage()
        const [holidays, setHolidays] = useState([]);
        const [orderedBy, setOrderedBy] = useState("");
        const currentUserContext = useContext(Context);
        
        useEffect(() => {
            async () => {
                try {
                    const holidayByID = await holidaysController.getHolidaysByUserID(getToken('token'), currentUserContext.user.id);
                    console.log("1");
                    console.log(holidayByID);
                    return setHolidays(holidayByID);
                } catch (error) {
                    console.error('Error fetching holidays:', error);
                }
            };
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
            <h1>My holidays requests </h1>
            <table>
                <thead>
                    <tr>
                        <th className={`orderBy ${orderedBy}`} onClick={() => orderBy("startdate")}>Start date</th>
                        <th>End date</th>
                        <th className={`orderBy ${orderedBy}`} onClick={() => orderBy("isaccepted")}>Request status</th>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map(({ id, startdate, enddate, isaccepted }) => (
                        <tr key={id}>
                            <td>{startdate}</td>
                            <td>{enddate}</td>
                            <td className={isaccepted}>{isaccepted}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HolidaysByUserID;
