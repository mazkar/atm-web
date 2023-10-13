/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, FormControl, MenuItem, ButtonGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import moment from 'moment';
import { Typography, Select, DatePicker } from "antd";
import MuiButton from "../../../../components/Button/MuiButton";
import ChkyButtons from "../../../../components/chky/ChkyButtons";
import * as Colors from "../../../../assets/theme/colors";
import constansts from "../../../../helpers/constants";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import AutoCompleteSelect from "../../../../components/AutoCompleteSelect";

const { Option } = Select;

const styles = () => ({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  titleTextFilter: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
    paddingRight: 5,
  },
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  wrapperInputSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: (width) => width,
    borderRadius: 6,
    backgroundColor: Colors.White,
    height: 35,
    border: `1px solid ${constansts.color.grayMedium}`,
    boxShadow: "none",
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
    color: "#BCC8E7",
    fontSize: 13,
    width: 100,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: 2,
    borderColor: constansts.color.grayMedium,
  },
  inputFieldSelect:{
    border: '1px solid #A8B6DB',
    borderRadius: '0px 6px 6px 0px',
    boxSizing: 'border-box',
    padding: '10px',
    // color: '#A8B6DB',
    fontFamily: 'Barlow',
    width: 320,
    height: '41px',
    '& ::placeholder': {
      color: '#A8B6DB'
    },
    '& ::selection': {
      background: '#FF6130'
    },
    '&:hover': {
      border: '1px solid #A8B6DB',
    },
  },
  selectKonven: {
    "& .ant-select-single .ant-select-selector": {
      height: '100%',
      border: '1px solid #BCC8E7',
      backgroundColor: "#DC241F",
      paddingTop: '5px',
      paddingBottom: '4px',
      color: "#FFFF",
      borderRadius: '6px 0px 0px 6px',
      minWidth: 150
    },
    "& .ant-select-single .ant-select-arrow": {
      color: "#FFFF",
      transition: 'transform 0.2s ease-in'
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: 'rotate(180deg)',
      transition: 'transform 0.2s ease-in'
    }
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    '& .ant-picker-input > input::placeholder': {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: 'ellipsis !important',
      fontSize: 12,
    }
  }
});

const FilterComponent = (props) => {
  const {
    onFilterSubmit,
    handleReset,
    usersOption,
    classes,
  } = props;

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignTo, setAssignTo] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);

  function resetFilter(){
    setIsFilterActive(false);
    setStartDate('');
    setEndDate('');
    setCreatedBy(null);
    setAssignTo(null);
    handleReset();
  }

  const onChangeFilter = () => {
    const newDataFilter = {
      startDate: startDate? moment(startDate).format('YYYY-MM-DD'): undefined,
      endDate: endDate? moment(endDate).format('YYYY-MM-DD'): undefined,
      asignBy: assignTo? assignTo.value : "All",
      createdBy: createdBy? createdBy.value : "All",
    };
    onFilterSubmit(newDataFilter);
  };

  return (
    <Paper className={classes.filterSection}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography className={classes.titleTextFilter}>
              Filter by :{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Grid item container alignItems="center">
                <Grid item><Typography className={classes.label}>Date Start</Typography></Grid>
                <Grid item>
                  <DatePicker
                    format="DD/MM/YYYY"
                    popupStyle={{ zIndex: 1500 }}
                    allowClear={false}
                    suffixIcon={<CalendarIcon />}
                    className={classes.datePicker}
                    placeholder="Select Date"
                    value={startDate? moment(startDate): ""}
                    onChange={(newDate)=>{
                      let valDate = "";
                      if(newDate === null){
                        valDate = "";
                      }else{
                        valDate = newDate.unix() * 1000;
                      }
                      setStartDate(valDate);
                    }} 
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container alignItems="center">
                <Grid item><Typography className={classes.label}>Date End</Typography></Grid>
                <Grid item>
                  <DatePicker
                    format="DD/MM/YYYY"
                    popupStyle={{ zIndex: 1500 }}
                    allowClear={false}
                    suffixIcon={<CalendarIcon />}
                    className={classes.datePicker}
                    placeholder="Select Date"
                    value={endDate? moment(endDate): ""}
                    onChange={(newDate)=>{
                      let valDate = "";
                      if(newDate === null){
                        valDate = "";
                      }else{
                        valDate = newDate.unix() * 1000;
                      }
                      setEndDate(valDate);
                    }} 
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container alignItems="center">
                <Grid item><Typography className={classes.label}>Assign</Typography></Grid>
                <Grid item>
                  <AutoCompleteSelect 
                    value={assignTo}
                    onChange={(obj)=>{
                      setAssignTo(obj);
                    }} 
                    options={usersOption}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container alignItems="center">
                <Grid item><Typography className={classes.label}>Create By</Typography></Grid>
                <Grid item>
                  <AutoCompleteSelect 
                    value={createdBy}
                    onChange={(obj)=>{
                      setCreatedBy(obj);
                    }} 
                    options={usersOption}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify='flex-end'>
            <ChkyButtons
              onClick={resetFilter}
              height={41}
              buttonType='redOutlined'
              style={{ textTransform: "capitalize", visibility: isFilterActive ? 'visible' : 'hidden', marginTop: 11}}
            >
                Reset
            </ChkyButtons>
            <MuiButton 
              label="Apply" 
              style={{height: '41px'}} 
              onClick={()=>{
                onChangeFilter();
                setIsFilterActive(true);
              }} 
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
FilterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilterSubmit: PropTypes.func,
  handleReset: PropTypes.object,
  usersOption: PropTypes.array,
};

FilterComponent.defaultProps = {
  onFilterSubmit: ()=>{},
  handleReset: ()=>{},
  usersOption: [],
};

export default withStyles(styles)(FilterComponent);