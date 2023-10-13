import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TitleAndSearch from '../../components/Title/TitleAndSearch';

const useStyles = makeStyles({
  root: {
    padding: '30px 50px 20px 30px',
  },
});

function detailPenutupan(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TitleAndSearch
        title="Detail Penutupan"
        searchPlaceholder="Pencarian berdasarkan lokasi atau ATM ID"
      />
      <Typography>Detail Rencana Bisnis</Typography>
    </div>
  );
}

detailPenutupan.propTypes = {

};

export default detailPenutupan;

