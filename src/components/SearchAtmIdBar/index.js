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
import * as Colors from '../../assets/theme/colors';

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

function SearchAtmIdBar(props) {
  const { placeholder, getKeywordValue, width, onSubmit } = props;
  const classes = useStyles(width);
  const [keyword, setKeyword] = useState(''); // <--- init default keyword

  function handleKeyDown(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(keyword);
      console.log('Do search');
    }
  }
  function handleIconClick(e){
    e.preventDefault();
    onSubmit(keyword);
    console.log('Do search');
  }

  function onChangeValue(event){
    setKeyword(event.target.value);
  }
  useEffect(() => {
    getKeywordValue(keyword);
  }, [keyword]);

  return (
    <Paper component="form" className={classes.root}>
      <IconButton onClick={handleIconClick} type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={keyword}
        onKeyDown={handleKeyDown}
        onChange={onChangeValue}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
}

SearchAtmIdBar.propTypes = {
  getKeywordValue: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  onSubmit: PropTypes.func,
};
SearchAtmIdBar.defaultProps  = {
  getKeywordValue: ()=>console.log('====> Keyword changed'),
  onSubmit: ()=>console.log('====> Search submitted'),
  placeholder: 'search',
  width: 400,
};

export default SearchAtmIdBar;

