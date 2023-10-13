/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Checkbox, Grid, makeStyles, Typography } from '@material-ui/core';
import { Button, DatePicker, Dropdown, Menu, Popover } from 'antd';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import { ReactComponent as IconChecklist } from '../../../assets/icons/general/check-grey.svg';
import { ReactComponent as IconUnchecklist } from '../../../assets/icons/general/uncheck.svg';
import { ReactComponent as IconMenu } from '../../../assets/icons/duotone-gray/ellipsis-h.svg';
import { ReactComponent as FlagIcon } from "../../../assets/icons/general/flag.svg";
import { ReactComponent as FlagRedIcon } from "../../../assets/icons/general/flag-red.svg";
import { ReactComponent as FlagYellowIcon } from "../../../assets/icons/general/flag-yellow.svg";
import { ReactComponent as FlagGreenIcon } from "../../../assets/icons/general/flag-green.svg";
import * as Colors from '../../../assets/theme/colors';
import { stringLimit } from '../../../helpers/useFormatter';
import constansts from '../../../helpers/constants';

const useStyles =  makeStyles({
  iconButton: {
    // padding: 5,
    color: Colors.GrayMedium
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input: {
    // marginLeft: 8,
    minWidth: 250,
    flex: 1,
    color: '#BCC8E7',
    fontSize: 13,
    '& ::placeholder':{
      color: '#BCC8E7',
      opacity: 1,
      fontStyle: 'italic',
    },
  },
});

const CheckBox = withStyles({
  root: {
    color: constansts.color.grayMedium,
    "&$checked": {
      color: constansts.color.grayMedium,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const renderPriority= (key)=>{
  const styleItemContainer = {
    display: "flex",
    alignItems: "center",
  };
  const styleItem = {
    fontWeight: 400,
    color: "#2B2F3C",
    paddingLeft: 5,
    textAlign: "center"
  };
  switch (key) {
  case 2:
    return (
      <div style={styleItemContainer}>
        <div style={{paddingTop: 10}}><FlagRedIcon/></div>
        <div><Typography style={styleItem}>High</Typography></div>
      </div>
    );
  case 1:
    return (
      <div style={styleItemContainer}>
        <div style={{paddingTop: 10}}><FlagYellowIcon/></div>
        <div><Typography style={styleItem}>Medium</Typography></div>
      </div>
    );
  case 0:
    return (
      <div style={styleItemContainer}>
        <div style={{paddingTop: 10}}><FlagGreenIcon/></div>
        <div><Typography style={styleItem}>Low</Typography></div>
      </div>
    );
  
  default:
    return (
      <div><FlagIcon/></div>
    );
  }
};
function ChecklistSubTask(props) {
  const {value, onChange} = props;
  const classes = useStyles();

  const menu = (
    <Menu
      style={{
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 16,
        color: "#2B2F3C",
        padding: 10,
      }}
      items={[
        {
          key: 2,
          label: 'High',
          icon: <FlagRedIcon />,
        },
        {
          key: 1,
          label: 'Medium',
          icon: <FlagYellowIcon />,
        },
        {
          key: 0,
          label: 'Low',
          icon: <FlagGreenIcon />,
        },
      ]}
      selectable
      selectedKeys={value.subTaskPriority}
      onSelect={(item)=>onChange(parseInt(item.key), "subTaskPriority")}
    />
  );

  return (
    <Grid container className={classes.root} spacing={2} alignItems="center">
      <Grid item>
        <div className={classes.iconButton}>
          <CheckBox 
            style={{padding:0}}
            checked={value.subTaskStatus === 1}
            onChange={(e)=>onChange(e.target.checked? 1 : 0, 'subTaskStatus')}/>
          {/* {value.subTaskStatus === 1 ? <IconChecklist style={{height: 18}} /> : <IconUnchecklist style={{height: 18}} />} */}
        </div>
      </Grid>
      <Grid item>
        {/* <Typography style={{fontWeight: 400, fontSize: 15,color: "#2B2F3C"}}>{stringLimit(value.subTaskName, 40)}</Typography> */}
        <InputBase
          placeholder="Sub Task"
          className={classes.input}
          onChange={(e) =>{
            const {value} = e.target;
            // console.log("+++ value",value);
            onChange(value, "subTaskName");
          }}
          value={value.subTaskName}
        />
      </Grid>
      <Grid item style={{marginLeft: 5}}>
        <Popover
          content={
            <div style={{minWidth: 250}}>
              <Dropdown overlay={menu} placement="top">
                {renderPriority(value.subTaskPriority)}
              </Dropdown>
              <Grid container style={{marginTop: 10}}>
                <Grid item xs={6}><Typography>Start Date </Typography></Grid>
                {/* <Grid item xs={6}><Typography>: {value.subTaskStartDate} </Typography></Grid> */}
                <Grid item xs={6}>
                  <DatePicker 
                    value={value.subTaskStartDate? moment(value.subTaskStartDate): ""} 
                    onChange={(date, stringDate)=>
                      onChange(stringDate, "subTaskStartDate")}
                    fullscreen={false} />
                </Grid>
              </Grid>
              <Grid container style={{marginTop: 10}}>
                <Grid item xs={6}><Typography>End Date </Typography></Grid>
                {/* <Grid item xs={6}><Typography>: {value.subTaskEndDate} </Typography></Grid> */}
                <Grid item xs={6}>
                  <DatePicker 
                    value={value.subTaskEndDate? moment(value.subTaskEndDate): ""} 
                    onChange={(date, stringDate)=>
                      onChange(stringDate, "subTaskEndDate")}
                    fullscreen={false} />
                </Grid>
              </Grid>
            </div>
          }
          placement="topLeft"
        >
          <Button style={{border: "0px"}} icon={<IconMenu/>} />
        </Popover>
      </Grid>
    </Grid>
  );
}

ChecklistSubTask.propTypes = {
};

ChecklistSubTask.defaultProps  = {
};

export default ChecklistSubTask;

