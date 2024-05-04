import React, { useState, useEffect } from 'react';
import holidaysController from '../services/holidays.service';
import useLocalStorage from '../hooks/useLocalStorage';

const Holidays = () => {
    const [token, _] = useLocalStorage()
    
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const holidaysData = await holidaysController.getAllHolidays(token);
                setHolidays(holidaysData);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };

        fetchHolidays();
    }, [token]);

    return (
        <div className='holidaysParent'>
            <h1>Liste des vacances</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Statut de la demande</th>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map(({ id, userid, startdate, enddate, isaccepted }, index) => (
                        <tr key={index}>
                            <td>{id}</td>
                            <td>{userid}</td>
                            <td>{startdate}</td>
                            <td>{enddate}</td>
                            <td>{isaccepted == 'Approved' ? 'Approved' : isaccepted == "Rejected" ? 'Rejected' : "Pending"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Holidays;
