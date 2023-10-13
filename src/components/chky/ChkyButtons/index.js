import React from "react";
import Button from "@material-ui/core/Button";
import {  makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import * as Colors from '../../../assets/theme/colors';

const useStyles = makeStyles({
  buttonRootDefault: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    height: (props) => props.height,
    borderRadius: 10,
    backgroundColor: Colors.PrimaryHard,
    color: Colors.White,
    '&:hover': {
      backgroundColor: Colors.PrimaryHard,
      opacity: 0.7,
    },
    '&:disabled,&[disabled]':{
      backgroundColor: 'rgba(0,0,0,.26)',
    }
  },
  buttonRootOrange: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    height: (props) => props.height,
    borderRadius: 10,
    backgroundColor: Colors.SecondaryMedium,
    color: Colors.White,
    '&:hover': {
      backgroundColor: Colors.SecondaryMedium,
      opacity: 0.7,
    },
    '&:disabled,&[disabled]':{
      backgroundColor: 'rgba(0,0,0,.26)',
    }
  },
  buttonRootGreen: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    height: (props) => props.height,
    borderRadius: 10,
    backgroundColor: Colors.Green,
    color: Colors.White,
    '&:hover': {
      backgroundColor: Colors.Green,
      opacity: 0.7,
    },
    '&:disabled,&[disabled]':{
      backgroundColor: 'rgba(0,0,0,.26)',
    }
  },
  buttonRootRedOutline: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    height: (props) => props.height,
    borderRadius: 10,
    backgroundColor: Colors.White,
    border: `1px solid ${Colors.PrimaryHard}`,
    color: Colors.PrimaryHard,
    '&:hover': {
      backgroundColor: Colors.White,
      border: `1px solid ${Colors.PrimaryHard}`,
      opacity: 0.7,
    },
    '&:disabled,&[disabled]':{
      border: `1px solid rgba(0,0,0,.26)`,
    }
  }
});

const ChkyButtons = (props) => {
  const { buttonType, children, ...other } = props;
  const classes = useStyles(props);

  // handler for button type styling
  function renderClassNameStyle(btnType){
    if(btnType === 'redFilled'){
      return classes.buttonRootDefault; 
    }
    if(btnType === 'redOutlined'){
      return classes.buttonRootRedOutline; 
    }
    if(btnType === 'orangeFilled'){
      return classes.buttonRootOrange; 
    }
    if(btnType === 'greenFilled'){
      return classes.buttonRootGreen; 
    }
    return classes.buttonRootDefault; 
  }
  return (
    <Button className={renderClassNameStyle(buttonType)} {...other}>
      {children || 'Button'}
    </Button>
  );
};

ChkyButtons.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  buttonType: PropTypes.string,
  // height: PropTypes.string,
};

ChkyButtons.defaultProps  = {
  buttonType: 'redFilled',
  height: 37,
};

export default ChkyButtons;
