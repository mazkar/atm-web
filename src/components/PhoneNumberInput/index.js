import React from 'react';
import PropTypes from 'prop-types';
import Input from 'react-phone-number-input/input';
import { makeStyles } from '@material-ui/core/styles';
import * as Colors from '../../assets/theme/colors';

const useStyles = makeStyles({
  root:{  
    borderRadius: 6,
    position: 'relative',
    backgroundColor: 'white',
    fontSize: 15,
    width: '100%',
    padding: '5px 9px',
    border: '1px solid #BCC8E7',
    '&:focus': {
      borderColor: Colors.Dark,
    },
    '&:focus-visible': {
      outlineWidth: 0,
    },
  }
});

function PhoneNumberInput(props) {
  const classes = useStyles();
  const {onChange, value, disabled = false, ...other} = props;
  return (
    <Input
      className= {classes.root}
      style={{color: disabled && "#b4b4b4"}}
      country="ID"
      international
      withCountryCallingCode
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...other}/>
  );
}

PhoneNumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PhoneNumberInput;

