/* Third Party Import */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, FormControl,Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Select } from "antd";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { TimePicker } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
/* Internal Import */
import LabelTextField from "../../../../../components/Form/LabelTextField";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";

const { Option } = Select;

const useStyles = makeStyles({
  root: {
    "& .ant-select-single .ant-select-selector": {
      height: "100%",
      border: "1px solid #DC241F",
      backgroundColor: "#ffffff",
      paddingTop: "5px",
      paddingBottom: "4px",
      color: " #DC241F",
      borderRadius: "6px 0px 0px 6px",
    },
    "& .ant-select-single .ant-select-arrow": {
      color: "#DC241F",
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    margin:"0px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
});

const SelectAndTextField = ({
  option,
  selectedOption,
  textValue,
  handleChangeSelectField,
  handleChangeTextField,
  handleStartTime,
  handleEndTime,
  startTime,
  endTime
}) => {
  const classes = useStyles();

  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item xs={3}>
        <FormControl className={classes.root} style={{ width: "100%" }}>
          <Select
            value={selectedOption}
            onChange={handleChangeSelectField}
            getPopupContainer={(node) => node.parentNode}
          >
            <Option value="all">All</Option>
            {option.map((data) => (
              <Option value={data.value}>{data.text}</Option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={9}>
        {selectedOption === "time" ? (
          <div>
            <Grid container style={{ flexWrap: "nowrap" }}>
              <Grid item>
                <TimePicker
                  format="HH:mm"
                  popupStyle={{ zIndex: 1500 }}
                  allowClear={false}
                  onChange={handleStartTime}
                  suffixIcon={<AccessTimeIcon />}
                  className={classes.datePicker}
                  placeholder="Start"
                  value={moment(startTime,"HH:mm")}
                />
              </Grid>
              <Grid item>-</Grid>
              <Grid item>
                <TimePicker
                  format="HH:mm"
                  popupStyle={{ zIndex: 1500 }}
                  allowClear={false}
                  onChange={handleEndTime}
                  suffixIcon={<AccessTimeIcon />}
                  className={classes.datePicker}
                  placeholder="End"
                  value={moment(endTime,"HH:mm")}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            <LabelTextField
              placeholder="Masukkan Parameter"
              value={textValue}
              onChange={handleChangeTextField}
              height="41px"
              style={{ borderLeft: "0px", borderRadius: "0px 6px 6px 0px" }}
              endIcon={<AccessTimeIcon />}
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

SelectAndTextField.propTypes = {
  option: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  startTime:PropTypes.string.isRequired,
  endTime:PropTypes.string.isRequired,
  handleChangeSelectField: PropTypes.func.isRequired,
  handleChangeTextField: PropTypes.func.isRequired,
  handleEndTime:PropTypes.func.isRequired,
  handleStartTime:PropTypes.func.isRequired
};
SelectAndTextField.defaultProps={
  endTime:moment("09:15:00","HH:mm"),
  startTime:moment("09:15:00","HH:mm")
}
export default SelectAndTextField;
