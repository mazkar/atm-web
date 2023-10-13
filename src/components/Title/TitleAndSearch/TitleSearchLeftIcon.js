/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import LeftIconSearchBar from '../../Form/MuiSearchBar/LeftIconSearchBar';
import { ChkySearchBar } from '../../chky';

const useStyles = makeStyles(() => ({
  root:{
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  search_container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  }
}));

const index = (props) => {
  const classes = useStyles();
  const title = props.title;
  const searchPlaceholder = props.searchPlaceholder;
  return (
    <Grid container justify="space-between" className={classes.root}>
      <Grid item xs={6} className={classes.title}>
        {title}
      </Grid>
      <Grid item xs={6} className={classes.search_container}>
        {/* <LeftIconSearchBar placeholder={searchPlaceholder} onKeywordChange={props.handleKeyword}/> */}
        <ChkySearchBar 
          placeholder={searchPlaceholder}
          onKeywordChange={props.onKeywordChange}
          width={290}
        />
      </Grid>
    </Grid>
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,

};

index.defaultProps = {
  title: "Title",
  searchPlaceholder: "Pencarian"
};

export default index;
