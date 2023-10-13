/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as CloseIcon } from "../../../../assets/icons/duotone-red/times-circle.svg";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/duotone-gray/minus-circle.svg";
import { ReactComponent as RefreshIcon } from "../../../../assets/icons/siab/refresh-blue.svg";

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

const ChildCardStatus=(props)=> {
  const classes = useStyles();
  const {value} = props;
  function renderIcon(val){
    switch (val) {
    case 1:
      return <CloseIcon className={classes.icon}/>;
    case 2:
      return <CheckIcon className={classes.icon}/>;
    case 3:
      return <RefreshIcon className={classes.icon}/>;
    case 4:
      return <MinusIcon className={classes.icon}/> ;
    default:
      return <CloseIcon className={classes.icon}/> ;
    }
  }
      
  return (
    <div className={classes.root}>
      {renderIcon(value)}
    </div>
  );
};

ChildCardStatus.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default ChildCardStatus;

