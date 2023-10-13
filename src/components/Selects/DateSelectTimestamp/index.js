/* eslint-disable react/prop-types */
import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import locale from 'antd/es/date-picker/locale/id_ID';
import PropTypes from "prop-types";

import { ReactComponent as CalendarIcon } from "../../../assets/icons/duotone-red/calendar.svg";

const DateSelectTimestamp = ({ value, handleChange, width, popupStyle, placeholder='Choose Date', format = "DD MMMM YYYY", ...others }) => {
  return (
    <DatePicker
      className="DateSelect"
      popupStyle={popupStyle}
      style={{ width: `${width}` }}
      clearIcon
      allowClear={false}
      locale={locale} 
      suffixIcon={<CalendarIcon className="DateSelect__icon"/>}
      value={value? moment(value): ""}
      onChange={(newDate)=>{
        let valDate = "";
        if(newDate === null){
          valDate = "";
        }else{
          valDate = newDate.unix() * 1000;
        }
        handleChange(valDate);
      }} 
      placeholder={placeholder}
      format={format}
      {...others}
    />
  );
};

DateSelectTimestamp.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  // popupStyle: PropTypes.string,
};

export default DateSelectTimestamp;
