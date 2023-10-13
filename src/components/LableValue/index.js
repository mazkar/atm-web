import React from 'react';
import {Typography, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';

function LabelValue({lable, value}) {
  return (
    <div style={{width: "100%", marginTop: 7, marginBottom: 7}}>
      <Grid container direction='row' spacing={1}>
        <Grid item xs={5}>
          <Typography style={{fontWeight: 400, color: '#2B2F3C', wordWrap: "break-word"}}>{lable}</Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography>:</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography style={{fontWeight: 600, color: '#2B2F3C', wordWrap: "break-word"}}>{value}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

LabelValue.propTypes = {
  lable: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

};

export default LabelValue;

