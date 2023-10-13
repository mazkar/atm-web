import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Switch } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RedSwitch = withStyles({
  switchBase: {
    color: red[300],
    '&$checked': {
      color: red[500],
    },
    '&$checked + $track': {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {
    backgroundColor: red[500],
  },
})(Switch);

const CustomSwitch = ({ title, checked, onChange }) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel control={<RedSwitch {...{ checked, onChange }} />} />
      </Grid>
    </Grid>
  );
};

export default CustomSwitch;
