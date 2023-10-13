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

function SearchBarFilter(props) {
  const { placeholder, onChangeEffect, height, width, keywordFromParent, icon, paddingLeft, borderRadius } = props;
  const propsStyle = { heightInput: height, widthInput: width };
  const useStyles =  makeStyles({
    root: props => ({
      display: 'flex',
      alignItems: 'center',
      borderRadius: borderRadius,
      backgroundColor: Colors.White,
      boxShadow: 'unset',
      height: props.heightInput,
      width: props.widthInput,
      border: '1px solid #BCC8E7',
    }),
    input: {
      paddingRight: 5,
      paddingLeft: paddingLeft, 
      flex: 1,
      color: '#BCC8E7',
      fontSize: 12,
      '& ::placeholder':{
        color: '#BCC8E7',
        opacity: 1,
        fontStyle: 'italic',
      },
    },
    iconButton: {
      padding: '0px 5px',
      color: Colors.GrayMedium,
      display: 'flex',
      alignItems: 'center'
    },
  });
  const classes = useStyles(propsStyle);
  // const [keywords, setKeyword] = useState(keywordFromParent); // <--- init default keyword

  function onChangeValue(event){
    // setKeyword(event.target.value);
    onChangeEffect(event.target.value);
  }

  // useEffect(()=>{
  //   onChangeEffect(keywords);
  // },[keywords]);

  return (
    <Paper component="form" className={classes.root}>
      {icon ? (
        <div className={classes.iconButton}>
          <SearchIcon style={{height: 25}}/>
        </div>
      ) : null}
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={keywordFromParent}
        onChange={onChangeValue}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  );
}

SearchBarFilter.propTypes = {
  onChangeEffect: PropTypes.func,
  placeholder: PropTypes.string,
  // height: PropTypes.number,
  width: PropTypes.number,
  keywordFromParent: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  paddingLeft: PropTypes.number,
  borderRadius: PropTypes.string
};
SearchBarFilter.defaultProps  = {
  onChangeEffect: ()=>console.log('====> Keyword changed'),
  placeholder: 'search',
  height: 34,
  width: 120,
  icon: true,
  paddingLeft: 0,
  borderRadius: '8px'
};

export default SearchBarFilter;

