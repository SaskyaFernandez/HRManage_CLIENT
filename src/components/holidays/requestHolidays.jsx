import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/Button/styles/index.css';

const RequestHolidays = ({ onCreateHolidayRequest, error, succes }) => {
    const today = new Date();
    const [value, setValue] = React.useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const dates = value.map(date => formatDate(date));
        setValue('');
        onCreateHolidayRequest(dates[0], dates[1]);
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
                    placeholder="request a holiday"
                    shouldDisableDate={(date) => date - 1 < today}
                    showHeader={false}
                />
                {error && (<p>{error}</p>)}
                {succes && (<p>{succes}</p>)}
                <button id='submit' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RequestHolidays;
