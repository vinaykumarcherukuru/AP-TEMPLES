import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const TwoMonthsDatePicker = () => {
  const [dates, setDates] = useState(null);
  const [isDateMode, setIsDateMode] = useState(true);

  const onPanelChange = (value, mode) => {
    setIsDateMode(mode[0] === 'date' && mode[1] === 'date');
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
  const disabledDate = (current) => {
    // Disable Saturdays and Sundays
    return current && (current.day() === 6 || current.day() === 0);
  };

  return (<>
    <RangePicker
      value={dates}
      onChange={setDates}
      disabledDate={disabledDate}
      // Inline style to add CSS to the calendar popup
      dropdownClassName="custom-range-picker"
      cellRender={cellRender}
      onPanelChange={onPanelChange}
    />
    <style jsx global>
      {`
          /* Default color blue for all days */
          .ant-picker-cell.ant-picker-cell-in-view .ant-picker-cell-inner.ant-picker-cell-blue { background-color: green; color:white  }

          /* Override colors for Saturday and Sunday */
          .ant-picker-cell.ant-picker-cell-in-view .ant-picker-cell-inner.ant-picker-cell-sa {  background-color: red; color:white }
          .ant-picker-cell.ant-picker-cell-in-view .ant-picker-cell-inner.ant-picker-cell-su { background-color: red; color:white }

          /* Styles for out-of-view cells */
          .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner.ant-picker-cell-sa {  background-color: red; color:white}
          .ant-picker-cell:not(.ant-picker-cell-in-view) .ant-picker-cell-inner.ant-picker-cell-su {  background-color: red; color:white}

          /* Completely remove the navigation icons */
        .ant-picker-header-super-prev-btn,
        .ant-picker-header-prev-btn,
        .ant-picker-header-next-btn,
        .ant-picker-header-super-next-btn {
          visibility: hidden !important;
          pointer-events: none !important; /* Prevent any clicks on the icons */
        `}
    </style>
  </>
  );
};

export default TwoMonthsDatePicker;
