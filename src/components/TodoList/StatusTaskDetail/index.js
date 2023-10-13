/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import CachedIcon from '@material-ui/icons/Cached';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EventBusyIcon from '@material-ui/icons/EventBusy';

const useStyles = makeStyles({
  value: {
    fontSize: 15,
    fontWeight: 600
  },
});

function ChildStatus({color, value, valueCode}) {
  const classes = useStyles();
  return (
    <Box
      style={{
        textAlign: "center",
        border: "1px solid",
        borderColor: color,
        color,
        borderRadius: 8,
        width: "max-content",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Typography className={classes.value}>{value}</Typography>
      {{
        4: <EventBusyIcon style={{color, height: 24, marginLeft: 5}}/>,
        3: <CheckIcon style={{color, height: 24, marginLeft: 5}}/>,
        2: <CachedIcon style={{color, height: 24, marginLeft: 5}}/>,
        1: <AccessAlarmIcon style={{color, height: 24, marginLeft: 5}}/>,
        0: <CloseIcon style={{color, height: 24, marginLeft: 5}}/>
      }[valueCode]
      }
      {/* {valueCode === 1 ? (
        <CheckIcon style={{color, height: 24, marginLeft: 5}}/>
      ): (
        <CloseIcon style={{color, height: 24, marginLeft: 5}}/>
      ) } */}
    </Box>
  );
}

function StatusTaskDetail({status}) {
  switch (status) {
  case 0:
    return (
      <ChildStatus
        value="Mark Open"
        valueCode={status}
        color="#FF6A6A"
      />
    );
  case 1:
    return (
      <ChildStatus
        value="Mark Todo"
        valueCode={status}
        color="#BCC8E7"
      />
    );
  case 2:
    return (
      <ChildStatus
        value="Mark Ongoing"
        valueCode={status}
        color="#80bdff"
      />
    );
  case 3:
    return (
      <ChildStatus
        value="Mark Done"
        valueCode={status}
        color="#65D170"
      />
    );
  case 4:
    return (
      <ChildStatus
        value="Mark Overdue"
        valueCode={status}
        color="#FFB443"
      />
    );
    
  default:
    return (
      <ChildStatus
        value="No Status"
        valueCode={0}
        color="#FF6A6A"
      />
    );
  }
        
}

StatusTaskDetail.propTypes = {};

export default StatusTaskDetail;
