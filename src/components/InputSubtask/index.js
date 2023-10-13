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
import { makeStyles } from '@material-ui/core';
import * as Colors from '../../assets/theme/colors';

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

function InputSubtask(props) {
  const { ...others } = props;
  const classes = useStyles();

  return (
    <Paper elevation={0} component="form" className={classes.root}>
      <div className={classes.iconButton}>
        <ArrowForwardIosIcon style={{height: 12, color: "#DC241F"}} />
      </div>
      <InputBase
        className={classes.input}
        {...others}
      />
    </Paper>
  );
}

InputSubtask.propTypes = {
};

InputSubtask.defaultProps  = {
};

export default InputSubtask;

