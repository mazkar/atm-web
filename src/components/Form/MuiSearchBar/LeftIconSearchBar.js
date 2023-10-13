/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Colors from '../../../assets/theme/colors';

const styles = {
  root: {
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    width: (props) => props.width,
    height: (props) => props.height,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  input: {
    marginLeft: 4,
    flex: 1,
    color: Colors.GrayMedium,
    fontSize: 13,
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

const MuiSearchBar = (props) => {
  const { placeholder, onKeywordChange, value ,classes} = props;
  const [keywords, setKeyword] = useState('');

  function onSubmitKeyword(event){
    if(event.key === 'Enter') {
      onKeywordChange(event.target.value);
      event.preventDefault();
      setKeyword('');
    }
  }

  function onChangeValue(event){
    setKeyword(event.target.value);
  }
  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={keywords}
        onKeyDown={onSubmitKeyword}
        onChange={onChangeValue}
      />
    </Paper>
  );
};

MuiSearchBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  onKeywordChange: PropTypes.func,
  placeholder: PropTypes.string,
};

MuiSearchBar.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  width: 290,
  height: 40,
  placeholder:"Pencarian"
};

export default withStyles(styles)(MuiSearchBar);
