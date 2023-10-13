import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {  makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {fontSize: 13, fontWeight: 400, color: 'red', position: 'absolute'},
});

function ErrorComponent(props) {
  const {label} = props;
  const classes = useStyles();
  return (
    <Typography className={classes.root} {...props} >
      {label}
    </Typography>
  );
}

ErrorComponent.propTypes = {
  label: PropTypes.string
};
ErrorComponent.defaultProps = {
  label: "! Required",
};

export default ErrorComponent;