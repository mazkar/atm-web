/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as CloseIcon } from "../../../../assets/icons/duotone-red/times-circle.svg";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/duotone-gray/minus-circle.svg";

const useStyles = makeStyles({
  root: {
    width: 'max-content',
    margin: 'auto',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

const ChildIsChecked=(props)=> {
  const classes = useStyles();
  const {value} = props;
      
  return (
    <div className={classes.root}>
      {value === 'minus' ? <MinusIcon className={classes.icon}/>  : value === 'true' ? <CheckIcon className={classes.icon}/> : <CloseIcon className={classes.icon}/> }
    </div>
  );
};

ChildIsChecked.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default ChildIsChecked;

