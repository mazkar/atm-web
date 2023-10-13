import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, Grid, InputBase, makeStyles, Paper } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button, DatePicker, Dropdown, Menu, Popover, Typography } from 'antd';
import { CalendarFilled, CalendarOutlined, FlagOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ReactComponent as PlusAddIcon } from "../../../assets/icons/general/plus.svg";
import { ReactComponent as FlagIcon } from "../../../assets/icons/general/flag.svg";
import { ReactComponent as FlagRedIcon } from "../../../assets/icons/general/flag-red.svg";
import { ReactComponent as FlagYellowIcon } from "../../../assets/icons/general/flag-yellow.svg";
import { ReactComponent as FlagGreenIcon } from "../../../assets/icons/general/flag-green.svg";
import * as Colors from '../../../assets/theme/colors';

const useStyles =  makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.White,
    minHeight: 40,
    border: '1px solid #DC241F',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: '#2B2F3C',
    fontSize: 13,
    '& ::placeholder':{
      color: '#BCC8E7',
      opacity: 1,
      fontStyle: 'italic',
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium
  },
  divider: {
    height: 28,
    margin: 4,
  }
});
  
const defTempSubTask = {
  subTaskName: "",
  subTaskStatus: 0,
  subTaskPriority: null,
  subTaskStartDate: null,
  subTaskEndDate: null
};

const renderPriority= (key)=>{
  switch (key) {
  case 2:
    return <FlagRedIcon style={{marginTop: 6}} height={17}/>;
  case 1:
    return <FlagYellowIcon style={{marginTop: 6}} height={17}/>;
  case 0:
    return <FlagGreenIcon style={{marginTop: 6}} height={17}/>;
  
  default:
    return <FlagIcon style={{marginTop: 6}} height={17}/>;
  }
};

function disabledDate(current) {
  return current < moment().startOf("day");
}

function AddSubTask({onSubmit}) {
  const classes = useStyles();
  const [tempSubTask, setTempSubTask] = useState(defTempSubTask);
  // useEffect(() => {
  //   console.log("+++ useEffect tempSubTask",tempSubTask);
  // }, [tempSubTask]);

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
      selectedKeys={tempSubTask.subTaskPriority}
      onSelect={(item)=>
        setTempSubTask((prev)=>{
          // eslint-disable-next-line radix
          return {...prev, subTaskPriority: parseInt(item.key)};
        })}
    />
  );

  return (
    <Grid container alignItems='center'>
      <Grid item xs>
        <Paper elevation={0} component="form" className={classes.root}>
          <div className={classes.iconButton}>
            <ArrowForwardIosIcon style={{height: 12, color: "#DC241F"}} />
          </div>
          <InputBase
            placeholder="Sub Task"
            className={classes.input}
            onChange={(e) =>{
              const {value} = e.target;
              // console.log("+++ value",value);
              setTempSubTask((prev)=>{
              //   console.log("+++ prev",prev);
                return {...prev, subTaskName: value};
              });
            }}
            value={tempSubTask.subTaskName}
          />
          <Dropdown overlay={menu} placement="top">
            <Button style={{border: "0px"}} icon={renderPriority(tempSubTask.subTaskPriority)} />
          </Dropdown>
            
          <Popover
            content={
              <div>
                <Typography>Start Date: </Typography>
                <DatePicker 
                  value={tempSubTask.subTaskStartDate? moment(tempSubTask.subTaskStartDate): ""} 
                  onChange={(date, stringDate)=>
                    setTempSubTask((prev)=>{
                      return {...prev, subTaskStartDate: stringDate};
                    })}
                  disabledDate={disabledDate}
                  fullscreen={false} />
              </div>
            }
            placement="top"
          >
            <Button style={{border: "0px"}} icon={<CalendarOutlined style={{color: tempSubTask.subTaskStartDate? "#75D37F" : "#BCC8E7"}} />} />
          </Popover>
          <Popover
            content={
              <div>
                <Typography>End Date: </Typography>
                <DatePicker 
                  value={tempSubTask.subTaskEndDate? moment(tempSubTask.subTaskEndDate): ""} 
                  onChange={(date, stringDate)=>
                    setTempSubTask((prev)=>{
                      return {...prev, subTaskEndDate: stringDate};
                    })}
                  disabledDate={disabledDate}
                  fullscreen={false} />
              </div>
            }
            placement="top"
          >
            <Button style={{border: "0px"}} icon={<CalendarFilled style={{color: tempSubTask.subTaskEndDate? "#75D37F" : "#BCC8E7"}} />} />
          </Popover>
        </Paper>
      </Grid>
      <Grid item xs="auto">
        <ButtonBase
          style={{position: "relative", paddingLeft: 10, paddingRight: 10}} 
          onClick={()=>{
            const emptyValues = new Set(["", null, undefined]);
            const countNull = Object.values(tempSubTask).filter(x => emptyValues.has(x)).length;
            // console.log("+++ countNull",countNull);
            if(countNull > 0){
              alert('Harap lengkapi informasi sub task!');
            }else{
              onSubmit(tempSubTask);
              setTempSubTask(defTempSubTask);
            }
          }}>
          <PlusAddIcon/>
        </ButtonBase>
      </Grid>
    </Grid>
  );
}

AddSubTask.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddSubTask;
