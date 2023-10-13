/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import { Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import useRupiahConverterSecondary from '../../../../helpers/useRupiahConverterSecondary';

const useStyles = makeStyles({
  root: {width: "max-content"},
  text: {
    fontSize: 13,
    fontWeight: 400,
    width: 90,
  },
  textVal: {
    fontSize: 13,
    fontWeight: 400,
  },
});

const ChildHargaPenawaran=(props)=>{
  const classes = useStyles();
  const { lowest, middle, hihgest } = props;
  
  return(
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Grid container direction="row">
          <Grid item>
            <Typography className={classes.text} >Nilai Terendah </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textVal} >: {useRupiahConverterSecondary(lowest)}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <Typography className={classes.text} >Nilai Tengah </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textVal} >: {useRupiahConverterSecondary(middle)}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <Typography className={classes.text} >Nilai Tertinggi </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textVal} >: {useRupiahConverterSecondary(hihgest)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      
      {/* <Typography className={classes.text} >Nilai Tengah : {useRupiahConverterSecondary(middle)}</Typography>
      <Typography className={classes.text} >Nilai Tertinggi : {useRupiahConverterSecondary(hihgest)}</Typography> */}
    </Grid>
  );
};
  
ChildHargaPenawaran.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  lowest: PropTypes.number.isRequired,
  middle: PropTypes.number.isRequired,
  hihgest: PropTypes.number.isRequired,
};

export default ChildHargaPenawaran;