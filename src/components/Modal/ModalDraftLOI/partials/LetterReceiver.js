/* eslint-disable no-restricted-syntax */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

const LetterReceiver = props => {
  // const { username, location } = dummyData
  const { margin, fontSize, username, location } = props;

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }
      
  return (
    <Grid item className={margin}>
      <Typography className={fontSize}>Kepada Yth : </Typography>
      <Grid container direction='row'>
        <Typography className={fontSize}>Bapak/Ibu </Typography>
        <Typography className={fontSize} style={{ fontWeight: 700 }}>&nbsp; {!username ? '-' : username}</Typography>
      </Grid>
      <Grid container direction='row'>
        {/* <Typography className={fontSize}>Pemilik/ Pengelola Lokasi </Typography> */}
        <Typography className={fontSize} style={{ fontWeight: 700 }}>{!location ? '-' : location}</Typography>
      </Grid>
    </Grid>
  );
};

export default LetterReceiver;