import React from 'react';
import Calendar from 'react-calendar';
import './AvailabilityCalendar.css';
import 'react-calendar/dist/Calendar.css';

const AvailabilityCalendar = ({ availability }) => {
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return availability.some(
        ({ checkIn, checkOut }) => date >= checkIn && date <= checkOut
      );
    }
    return false;
  };

  return (
    <Calendar tileDisabled={tileDisabled} />
  );
};

export default AvailabilityCalendar;
