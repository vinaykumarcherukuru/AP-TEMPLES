import React, { useState } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const TwoMonthsDatePicker = () => {
  const [dates, setDates] = useState(null);
  const [isDateMode, setIsDateMode] = useState(true);

  const onPanelChange = (value, mode) => {
    setIsDateMode(mode[0] === 'date' && mode[1] === 'date');
  };

  const onCalendarChange = (dates) => {
    if (dates && dates[0]) {
      // If only start date is selected, set the end date to the same value as the start date
      setDates([dates[0], dates[0]]);
    }
  };


  const cellRender = (current) => {
    let className = 'ant-picker-cell-inner';
    if (!isDateMode) return current.originNode;

    // Set the default color to blue for all days
    className += ' ant-picker-cell-blue';

    if (current.day() === 6) className += ' ant-picker-cell-sa';
    if (current.day() === 0) className += ' ant-picker-cell-su';

    return <div className={className}>{current.date()}</div>;
  };

  // Disable weekends and highlight them with red color
  // const disabledDate = (current) => {
  //   // Disable Saturdays and Sundays
  //   return current && (current.day() === 6 || current.day() === 0);
  // };

  const disabledDate = (current) => {
    // Disable weekends (Saturday and Sunday)
    const isWeekend = current.day() === 0 || current.day() === 6; // 0 is Sunday, 6 is Saturday

    // Only allow November and December 2024, and disable weekends
    const allowedMonths = ['2024-11', '2024-12']; // Only allow Nov and Dec 2024
    const isDisabledMonth = !allowedMonths.includes(current.format('YYYY-MM')); // Disable non-allowed months

    return isWeekend || isDisabledMonth; // Disable weekends and non-allowed months
  };

  const dateRender = (current) => {
    // Change the color of weekends to red
    const isWeekend = current.day() === 0 || current.day() === 6;
    if (isWeekend) {
      return (
        <div style={{ color: 'red' }}>
          {current.date()}
        </div>
      );
    }
    return current.date(); // Return normal date for weekdays
  };

  return (<>
    {/* <RangePicker
      value={dates}
      onCalendarChange={onCalendarChange}
      //disabledDate={disabledDate}
      // Inline style to add CSS to the calendar popup
      // dropdownClassName="custom-range-picker"
      // cellRender={cellRender}
      // onPanelChange={onPanelChange}      
      disabledDate={disabledDate} // Disable weekends and non-allowed months
      picker="date" // Picker set to 'date' to show specific days
      dateRender={dateRender} // Customize the appearance of weekends
      placeholder={['Select Date', 'Select End Date']}
      format="DD-MM-YYYY"
    /> */}


     
      <DatePicker
        format="DD/MM/YYYY"
        disabledDate={disabledDate}
        dateRender={dateRender}
      /> 
  </>
  );
};

export default TwoMonthsDatePicker;
