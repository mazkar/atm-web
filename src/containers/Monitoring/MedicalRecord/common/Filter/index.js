/* Third Party Import */
import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from '@material-ui/core';
import PropTypes from "prop-types";

/* Internal Import */
import LabelTextField from '../../../../../components/Form/LabelTextField';
import MuiButton from '../../../../../components/Button/MuiButton';

const useStyles = makeStyles({
  root: {
    padding: "16px 20px",
    background: "#ffffff",
    borderRadius: "6px",
    flexWrap: "unset",
    margin: "24px 0px"
  },
  cell : {
    display: "flex",
    marginRight: "20px",
    alignItems: "center"
  },
  label: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#2B2F3C",
    whiteSpace: "nowrap",
    marginRight: "5px",
  }
});

const Filter = ({onChange, value, onApply, boolVal}) => {
  const classes = useStyles();
  const onApplyHandler = () => {
    onApply(!boolVal)
  }
  return (
    <Grid container alignItems='center' justifyContent="space-between" className={classes.root}>
      <Grid container alignItems="center">
        <div style={{marginRight: "20px"}}>
          <Typography style={{fontSize: "16px", fontWeight: 500, color: "#2B2F3C"}}>Show: </Typography>
        </div>
        <div className={classes.cell}>
          <Typography className={classes.label}>ATM ID </Typography>
          <LabelTextField
            placeholder="ATM ID"
            onChange={(event)=>{onChange(event.target.value, "atmId");}}
            value={value.atmId}
            height="40px"
          />
        </div>
        <div className={classes.cell}>
          <Typography className={classes.label}>Location </Typography>
          <LabelTextField
            placeholder="Location"
            onChange={(event)=>{onChange(event.target.value, "location");}}
            value={value.location}
            height="40px"
          />
        </div>
      </Grid>
      <MuiButton label="Apply" height="40px" onClick={onApplyHandler} />
    </Grid>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  boolVal: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default Filter;
