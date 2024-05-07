import React, { useState } from 'react';
import clsx from 'clsx';
import { FiRefreshCw } from "react-icons/fi";
const HolidaysTable = ({ title, holidays, reload }) => {
    const [isRotated, setIsRotated] = useState(false);
    const [orderedBy, setOrderedBy] = useState("");
    const [field, setField] = useState("");

    const handleOrderField = (field) => {
        setField(field);
        if (orderedBy === '' || orderedBy === 'DESC') {
            setOrderedBy('ASC');
        }
        else {
            setOrderedBy('DESC');
        }
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const handleClick = () => {
        reload()
        setIsRotated(true);
        setTimeout(() => {
            setIsRotated(false);
        }, 1000);
    };
    let holidaysDisplay;
    if (field && orderedBy !== "ASC") {
        holidaysDisplay = holidays.sort((a, b) => Reflect.get(a, field).localeCompare(Reflect.get(b, field)));

    } else if (field && orderedBy !== "DESC") {
        holidaysDisplay = holidays.sort((a, b) => Reflect.get(b, field).localeCompare(Reflect.get(a, field)));
    }
    else {
        holidaysDisplay = holidays;
    }


    return (
        <div className='holidaysParent'>
            <div>
                {reload && (
                    <div className='reload'>
                        <caption >{title} </caption>
                        <FiRefreshCw className={isRotated ? 'rotate-360' : ''} onClick={handleClick} />
                    </div>
                )}
                <table>
                    {!reload && (
                        <caption>{title} </caption>
                    )}
                    <thead>
                        <tr>
                            <th className={clsx('orderBy', field === 'startdate' && orderedBy)}
                                onClick={() => handleOrderField("startdate")}>Start date</th>
                            <th className={clsx('orderBy', field === 'enddate' && orderedBy)}
                                onClick={() => handleOrderField("enddate")}>End date</th>
                            <th className={clsx('orderBy', field === 'isaccepted' && orderedBy)}
                                onClick={() => handleOrderField("isaccepted")}>Request status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holidaysDisplay.map(({ id, startdate, enddate, isaccepted }) => (
                            <tr key={id}>
                                <td>{formatDate(startdate)}</td>
                                <td>{formatDate(enddate)}</td>
                                <td className={isaccepted}>{isaccepted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HolidaysTable;
