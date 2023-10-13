import React from 'react';
import { InputBase, Paper, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import constants from '../../helpers/constants';

const useStyles = makeStyles({
  container: {
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  icon: {
    height: 24,
  },
  searchInput: {
    paddingLeft: 10,
    height : 24,
    color: constants.color.grayMedium,
  },
});

const SearchIcon = ({ color }) => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchBar = ({ width, placeholder }) => {
  const { container, searchInput, icon } = useStyles();

  return (
    <Paper className={container}>
      <Grid container alignItems="center">
        <Grid item>
          <Box className={icon}>
            <SearchIcon color={constants.color.grayMedium} />
          </Box>
        </Grid>
        <Grid item>
          <InputBase
            className={searchInput}
            placeholder={placeholder}
            style={{ width }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

SearchIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

SearchBar.propTypes = {
  width: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
