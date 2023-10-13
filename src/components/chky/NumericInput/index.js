/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NumberFormat from 'react-number-format';

function NumericInput(props) {
  const {onValueChange, onChange, placeholder, separator , value, prefix, disabled, ...other } = props;
  const useStyles = makeStyles({
    numberInput: {
      border: '1px solid #BCC8E7',
      borderRadius: 4,
      fontSize: 13,
      height: 32,
      width: "100%",
      fontFamily: 'Barlow',
      padding: '7px 9px',    
      '&:focus': {
        border: '1px solid #88ADFF',
        outlineStyle: 'none',
      },
    },
  });
  const classes = useStyles();
  return (
    <NumberFormat
      className={classes.numberInput}
      style={{cursor: disabled ? 'no-drop' : 'text'}}
      placeholder={placeholder}
      onValueChange={onValueChange}
      onChange={onChange}
      value={value}
      prefix={prefix}
      thousandSeparator={separator}
      decimalSeparator=","
      thousandsGroupStyle="thousand"
      disabled={disabled}
      {...other }
    />
  );
}

NumericInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  separator: PropTypes.string,
};
NumericInput.defaultProps = {
  placeholder: "0",
  value: 0,
  onValueChange: (val)=>{console.log("Value: ", val);},
  prefix: '',
  disabled: false,
  separator: ".",
};

export default NumericInput;

