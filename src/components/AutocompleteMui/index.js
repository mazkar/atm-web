/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/styles";
import { TextField } from '@material-ui/core';

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
      '& fieldset': {
        padding: '7px 9px',
        border: '1px solid #BCC8E7',
      },
      '&:hover fieldset': {
        borderColor: '#749BFF',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #2B2F3C',
      },
    },
  },
}))(TextField);

function AutocompleteMui(props) {
  const {options, placeholder, ...other} = props;
  return (
    <Autocomplete 
      options={options} {...other} 
      renderInput={(params) => <AutoTextField {...params} variant="outlined" placeholder={placeholder} />}/>
  );
}

AutocompleteMui.propTypes = {
  options: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AutocompleteMui;

