import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/Button/styles/index.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import holidaysController from '../../services/holidays.service';

const RequestHolidays = () => {
   const today = new Date();
    const [value, setValue] = React.useState(["", ""]);
    const [getToken, _] = useLocalStorage();
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('.');
    }
    const createHolidayRequest = async (startDate, endDate) => {
        try {
            const createRequestHoliday = await holidaysController.createHoliday(getToken('token'), startDate, endDate);
            return createRequestHoliday;
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const dates = value.map(date => formatDate(date))
        console.log(dates);
        createHolidayRequest(dates[0],dates[1])
    };
    return (
        <div className='datePicker'>
            <h2> Request a holiday : </h2>
            <form onSubmit={handleSubmit}>
                <DateRangePicker
                    value={value}
                    onChange={setValue}
                    ranges={[]}
                    showOneCalendar
                    format="dd.MM.yyyy"
                    shouldDisableDate={(date) => date < today}
                    showHeader={false}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RequestHolidays;
