/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    background: '#ffffff',
    color: '#99CC00',
    border: '1px solid #99CC00',
    borderRadius: '6px',
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '14px',
  },
}));

const WhiteGreenButton = (props) => {
  const { title, onClick, buttonStyle } = props;
  const classes = useStyles();

  return (
    <Button style={buttonStyle} onClick={onClick} className={classes.button}>
      {title}
    </Button>
  );
};

export default WhiteGreenButton;
