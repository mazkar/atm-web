/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, IconButton, } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import constants from '../../../helpers/constants';

const useSwitchStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 15,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  chartContainer: {
    height: 280,
  },
  yearControllerContainer: {
    border: '1px solid #E6EAF3',
    borderRadius: 8,
  },
  yearControllerButton: {
    padding: '7px 10px',
    color: constants.color.primaryHard,
  },
});

const YearController = (props) => {
  const { selectedYear, handleIncreaseYear, handleDecreaseYear } = props;
  const { yearControllerContainer, yearControllerButton } = useSwitchStyles();
  
  return (
    <Grid container alignItems="center" className={yearControllerContainer}>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleDecreaseYear}
        >
          <ChevronLeft />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="body1" component="p">
          {selectedYear}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          className={yearControllerButton}
          onClick={handleIncreaseYear}
        >
          <ChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};
  
YearController.propTypes = {
  // selectedYear : PropTypes.string,
  handleIncreaseYear : PropTypes.func,
  handleDecreaseYear : PropTypes.func,
};

export default YearController;