/* eslint-disable no-plusplus */
/* eslint-disable for-direction */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import constants from '../../../helpers/constants';

const useStyles = makeStyles ({
  paperWrapper: {},
  root: {
    padding: '15px 15px', 
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    fontWeight: 'bold',
    marginRight: 2,
    marginLeft: 10,
  },
  col: {
    display:'flex',
    flexWrap:'wrap',
    alignItems: 'center',
  },
  caption: {fontSize: 13,},
  select: {
    padding: 10,
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
  },
  yearControllerContainer: {
    border: '1px solid #BCC8E7',
    fontSize: 13,
    borderRadius: 8,
    padding: 3,
  },
  yearControllerButton: {
    padding:0,
    color: constants.color.primaryHard,
  },
});

const ChkyFilterMaster = (props) => {
  const classes = useStyles();
  const {onFilterSubmit, currentYear} = props;
  const [dataFilter, setDataFilter] = useState(null);
  const [yearValue, setYearValue] = useState(currentYear);

  const handleDecreaseYear = () => {
    setYearValue(yearValue - 1);
  };
  const handleIncreaseYear = () => {
    setYearValue(yearValue + 1);
  };

  useEffect(()=>{
    setDataFilter({
      "tahun": yearValue,
    });
  },[yearValue]);

  useEffect(() => { onFilterSubmit(dataFilter); } , [dataFilter]);

  useEffect(() => console.log(`Value status ${yearValue}`), [yearValue]);
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>

        {/* ===> Start Select Status */}
        <div className={classes.col}>
          <div>
            <Typography className={classes.caption}>Showing : </Typography>
          </div>
          <div item style={{marginLeft: 10,}}>
            {/* Year decrease increase */}
            <Grid container alignItems="center" className={classes.yearControllerContainer}>
              <Grid item>
                <IconButton
                  className={classes.yearControllerButton}
                  onClick={handleDecreaseYear}
                >
                  <ChevronLeft />
                </IconButton>
              </Grid>
              <Grid item alignItems="center" >
                <Typography variant="body1" component="p">
                  {yearValue}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.yearControllerButton}
                  onClick={handleIncreaseYear}
                >
                  <ChevronRight />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </div>
  );
};
ChkyFilterMaster.propTypes = {
  onFilterSubmit: PropTypes.func,
  currentYear: PropTypes.number,
};

ChkyFilterMaster.defaultProps = {
  onFilterSubmit: ()=>console.log('====> JOM onFilterSubmit Clicked'),
  currentYear:  new Date().getFullYear(),
};

export default ChkyFilterMaster;
