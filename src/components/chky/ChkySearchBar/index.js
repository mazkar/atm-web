/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core';
import * as Colors from '../../../assets/theme/colors';

const useStyles =  makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: (width) => width,
    borderRadius: 6,
    backgroundColor: Colors.White,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    height: 40,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    color: '#BCC8E7',
    fontSize: 13,
    '& ::placeholder':{
      color: '#BCC8E7',
      opacity: 1,
      fontStyle: 'italic',
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  divider: {
    height: 28,
    margin: 4,
  }
});

function ChkySearchBar(props) {
  const { placeholder, onKeywordChange, width, value } = props;
  const classes = useStyles(width);
  const [keywords, setKeyword] = useState(''); // <--- init default keyword

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
  
  function onSearch(e){
    e.preventDefault();
    onKeywordChange(keywords);
  }

  return (
    <Paper component="form" className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={keywords}
        onKeyDown={onSubmitKeyword}
        onChange={onChangeValue}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
}

ChkySearchBar.propTypes = {
  onKeywordChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.number,
};
ChkySearchBar.defaultProps  = {
  onKeywordChange: ()=>console.log('====> Keyword changed'),
  placeholder: 'search',
  width: 400,
};

export default ChkySearchBar;

