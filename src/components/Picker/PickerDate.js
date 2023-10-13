import React from "react";
import { DatePicker } from "antd";
import { ReactComponent as CalendarIcon } from "../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as CalendarGrayIcon } from "../../assets/icons/task/calendarGray.svg";
import { Grid } from "@material-ui/core";
import { GrayUltrasoft, White } from "../../assets/theme/colors";

const PickerDate = (props) => {
  return (
    <Grid item>
      {props.disable ? (
        <DatePicker
          className="DateSelect"
          onChange={props.onChange}
          clearIcon
          style={{
            height: props.height,
            width: props.width,
            borderColor: GrayUltrasoft,
            backgroundColor: White,
          }}
          placeholder={props.holder}
          suffixIcon={<CalendarGrayIcon />}
          allowClear={false}
          disabled
        />
      ) : (
        <DatePicker
          className="DateSelect"
          onChange={props.onChange}
          clearIcon
          placeholder={props.holder}
          suffixIcon={<CalendarIcon />}
          allowClear={false}
          style={{ height: props.height, width: props.width, marginLeft: 5 }}
          getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
          }}
        />
      )}
    </Grid>
  );
};

PickerDate.defaultProps = {
  height: 34,
  width: 150,
};

export default PickerDate;
