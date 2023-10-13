/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, InputAdornment, makeStyles, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as Colors from '../../assets/theme/colors';

const useStyles =  makeStyles({
  rootAuto: {
    width: "100%",
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
});
const AutoTextField = withStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      fontSize: 13,
      padding: 5,
      borderRadius: 8,
      height: 48,
      backgroundColor: Colors.White,
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
      '& fieldset': {
        padding: '7px 9px',
        border: 0,
      },
      '&:hover fieldset': {
        borderColor: '#749BFF',
      },
      '&.Mui-focused fieldset': {
        border: 0,
      },
    },
  },
}))(TextField);

function SearchBarAutoComplete(props) {
  const { placeholder, getKeywordValue, onSubmit, ...other } = props;
  const classes = useStyles();
  const [isLoadAtmIds,setIsLoadAtmIds] = useState(false);
  const [optionAtmIds,setOptionAtmIds] = useState(false);
  const [idSearch, setIdSearch] = useState('');

  function handleIconClick(e){
    e.preventDefault();
    onSubmit(idSearch);
  }
  function handleKeyDown(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(idSearch);
    }
  }
  useEffect(() => {
    const fetchDataAtmId = () => {
      try {
        setIsLoadAtmIds(true);
        Axios.get(`${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAllAtmIdAndLocationName`)
          .then((res) => {
          // console.log("getAllAtmIdAndLocationName", res.data);
            const optionsSet = [];
            const dataPre = res.data.data;
            dataPre.map((item) => {
              optionsSet.push({value: item.atmId, locationName: item.locationName});
            });
            setOptionAtmIds(optionsSet);
            setIsLoadAtmIds(false);
          })
          .catch((err) => {
            alert(err);
            setIsLoadAtmIds(false);
          });
      } catch (error) {
        // console.log(error);
        alert("Gagal load data atm id", error);
        setIsLoadAtmIds(false);
      }
    };
    // DO FETCH ALL DATA ATM IDS
    fetchDataAtmId();
  }, []);
  return (
    <Autocomplete 
      className={classes.rootAuto}
      options={optionAtmIds}
      disabled={isLoadAtmIds}
      getOptionLabel={(option) => `${option.value} - ${option.locationName}`}
      onChange={(event, value)=>{
        console.log(">>> value", value);
        if(value===null){
          setIdSearch("");
        }else{
          setIdSearch(value.value);
        }
      }}
      renderInput={(params) => <AutoTextField 
        {...params} 
        variant="outlined" 
        onKeyDown={handleKeyDown}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <>
              <InputAdornment position="start">
                <IconButton className={classes.iconButton} onClick={handleIconClick}>
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
              {params.InputProps.startAdornment}
            </>
          )
        }}
        placeholder={isLoadAtmIds?"Fetching data ATM ID...":"ATM ID / Location Name..."}
        {...other} 
      />}/>
  );
}

SearchBarAutoComplete.propTypes = {
  getKeywordValue: PropTypes.func,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
};

SearchBarAutoComplete.defaultProps  = {
  getKeywordValue: ()=>console.log('====> Keyword changed'),
  onSubmit: ()=>console.log('====> Search submitted'),
  placeholder: 'search',
};

export default SearchBarAutoComplete;

