/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import PropTypes from "prop-types";

import { ReactComponent as CalendarIcon } from "../../../assets/images/calendar-alt.svg";

const dateFormat = "DD/MM/YYYY";
const DateSelect = ({ value, handleChange, width, popupStyle, formatView }) => {
  return (
    <DatePicker
      className="DateSelect"
      // defaultValue={moment(defaultValue, dateFormat)}
      selected={moment(value, dateFormat)}
      format={formatView}
      onChange={handleChange}
      popupStyle={popupStyle}
      style={{ width: `${width}` }}
      clearIcon
      suffixIcon={<CalendarIcon className="DateSelect__icon" />}
      allowClear={false}
    />
  );
};

DateSelect.propTypes = {
  // defaultValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  // popupStyle: PropTypes.string,
};

export default DateSelect;
