import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import * as Colors from '../../../assets/theme/colors';

const styles = ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: (props) => props.width,
    borderRadius: 6,
    backgroundColor: Colors.GrayUltrasoft,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: Colors.GrayMedium,
  },
  iconButton: {
    padding: 10,
    color: Colors.GrayMedium,
  },
  divider: {
    height: 28,
    margin: 4,
  }
});

const MuiSearchBar = (props) => {
  const { classes, placeholder } = props;
  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
};

MuiSearchBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};

MuiSearchBar.defaultProps  = {
  // eslint-disable-next-line react/default-props-match-prop-types
  width: 400,
  placeholder: 'search',
};

export default withStyles(styles)(MuiSearchBar);