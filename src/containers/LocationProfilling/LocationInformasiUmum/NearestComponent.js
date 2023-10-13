import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: 15,
    borderRadius: 10,
    border: '1px solid #E6EAF3',
  },
  title: {fontSize: 13, fontWeight: 600},
});

const numberWithDot = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
};

const meterToKilometer = (num) => {
  const newNum = num / 1000;
  return newNum.toFixed(1);
};

function NearestComponent(props) {
  const classes = useStyles();
  const {title, id, machineType, address, condition, avgTransaction, distance} = props;

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography style={{fontSize: 11}}>
          {id === null || id === undefined ? '-' : `${id}`}
        </Typography>
        <Typography className={classes.title}>{title === null || title === undefined ? '-' : title}</Typography>
        <Grid container style={{marginTop: 3}}>
          
          <Typography style={{fontSize: 11, marginLeft: 5, color: '#DC241F'}}>
            {machineType === null || machineType === undefined ? '-' : machineType}
          </Typography>
        </Grid>
        <Typography style={{fontSize: 10, fontWeight: 400, marginTop: 8,}}>
          {address === null || address === undefined ? '-' : address}
        </Typography>
        <Typography style={{fontSize: 10, fontWeight: 400, marginTop: 8,}}>
          {distance === null || distance === undefined ? '-' : `${meterToKilometer(distance)} km`}
        </Typography>
        <Grid container style={{marginTop: 13, }} alignItems="center" justify="space-between">
          <Grid item>
            {condition === "Good"? 
              <Typography style={{fontSize: 11, padding: '2px 6px', color: '#65D170', borderRadius: 30, background: '#DEFFE1', border: '1px solid #65D170'}}>
                {condition === null || condition === undefined ? '-' : condition}
              </Typography>
              : 
              <Typography style={{fontSize: 11, padding: '2px 6px', color: '#FF6A6A', borderRadius: 30, background: '#FFF6F6', border: '1px solid #FF6A6A'}}>
                {condition === null || condition === undefined ? '-' : condition}
              </Typography>
            }
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="flex-end">
              <Typography style={{fontSize: 9}}>Avg Transaction</Typography>
              <Typography style={{fontSize: 13, color: '#DC241F'}}>
                {avgTransaction === null || avgTransaction === undefined ? '-' : numberWithDot(avgTransaction) }
              </Typography>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
}

NearestComponent.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  machineType: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  avgTransaction: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
};
  
export default NearestComponent;

