import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const ButtonLoading = (props) => {
  
  const { size, color } = props;
  const useStyles = makeStyles({
    loading: {
      marginTop: '5px',
      '& .MuiCircularProgress-colorPrimary': {
        color: color
      }
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress color='primary' style={{height:size, width:size}} />
    </div>
  );
};

ButtonLoading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

ButtonLoading.defaultProps = {
  size: '25px',
  color: '#fff'
};

export default ButtonLoading;