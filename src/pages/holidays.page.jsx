import AllHolidays from '../components/holidays/allHolidays';
import HolidaysByUserID from '../components/holidays/holidaysByUserID';
import RequestHolidays from '../components/holidays/requestHolidays';

const Holidays = () => {
  
    return (
        <>
            <RequestHolidays />
            <HolidaysByUserID />
            <AllHolidays />
        </>
    );
};

export default Holidays;
