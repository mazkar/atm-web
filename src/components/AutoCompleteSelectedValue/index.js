/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, makeStyles, withStyles } from '@material-ui/core';
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
      borderRadius: 8,
      height: 48,
      backgroundColor: Colors.White,
      padding: '7px 9px',
      border: '1px solid #b0bfd3',
      color: "#b0bfd3",
      '& fieldset': {
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

function AutoCompleteSelectedValue(props) {
  const { placeholder, onChange, selectedAtmId, onLoadedAtmIds, ...other } = props;
  const classes = useStyles();
  const [isLoadAtmIds,setIsLoadAtmIds] = useState(false);
  const [optionAtmIds,setOptionAtmIds] = useState([]);
  const [valueIndex,setValueIndex] = useState(null);

  useEffect(() => {
    console.log("+++ valueIndex",valueIndex);
  }, [valueIndex]);
  
  useEffect(() => {
    const fetchDataAtmId = () => {
      try {
        setIsLoadAtmIds(true);
        Axios.get(`${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAllAtmIdAndLocationName`)
          .then((res) => {
          // console.log("getAllAtmIdAndLocationName", res.data);
            const optionsSet = [];
            const dataPre = res.data.data;
            dataPre.map((item, index) => {
              optionsSet.push({value: item.atmId, locationName: item.locationName, locationId: item.locationId, index});

              if(item.atmId === selectedAtmId){
                setValueIndex(index);
              }

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
        // console.log("<<< value", value);
        onChange(value);
      }}
      value={valueIndex !== null ? optionAtmIds[valueIndex] : null}
      renderInput={(params) => {
        // eslint-disable-next-line no-unused-expressions
        if(isLoadAtmIds) {
          return ( 
            <AutoTextField
              {...params} 
              placeholder="Fetching data..."
              variant="outlined"  
              {...other} />);
        }
        return (
          <AutoTextField 
            {...params} 
            variant="outlined" 
            placeholder={placeholder}
            {...other} 
          />
        );
        
      }}/>
  );
}

AutoCompleteSelectedValue.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  selectedAtmId: PropTypes.string,
  onLoadedAtmIds: PropTypes.func.isRequired,
};

AutoCompleteSelectedValue.defaultProps  = {
  placeholder: 'Masukan ID Mesin',
  onChange: ()=>console.log('====> On Change'),
  selectedAtmId: null,
};

export default AutoCompleteSelectedValue;

