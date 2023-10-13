/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Row} from 'antd';
import SearchBar from '../../SearchBar';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'NunitoRegular',
    fontWeight: '600',
    fontSize: '28px',
    color: '#364449',
  },
}));

const TitleAndSearch = ({ title, titleStyle}) => {
  const classes = useStyles();

  return (
    <div>
      <Row style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className={classes.title} style={titleStyle}>
          {title}
        </div>
        <Grid item>
          <SearchBar placeholder="Pencarian berdasarkan lokasi atau ATM ID" width={340} />
        </Grid>
      </Row>
    </div>
  );
};

export default TitleAndSearch;
