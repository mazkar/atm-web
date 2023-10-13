/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NumberFormat from 'react-number-format';

function IdrNumberInput(props) {
  const {onValueChange, onChange, placeholder, value, prefix, disabled, style, ...other } = props;
  const useStyles = makeStyles({
    numberInput: {
      border: '1px solid #BCC8E7',
      borderRadius: 4,
      fontSize: 13,
      height: 32,
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
      disabled={disabled ? true : false}
      className={classes.numberInput}
      style={{cursor: disabled ? 'no-drop' : 'text', ...style}}
      placeholder={placeholder}
      onValueChange={onValueChange}
      onChange={onChange}
      value={value}
      prefix={prefix}
      thousandSeparator="."
      decimalSeparator=","
      thousandsGroupStyle="thousand"
      {...other }
    />
  );
}

IdrNumberInput.propTypes = {
  placeholder: PropTypes.string,
  // value: PropTypes.number,
  onValueChange: PropTypes.func,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  disabled: PropTypes.bool
};
IdrNumberInput.defaultProps = {
  placeholder: "Ex: 1.000.000",
  value: '',
  onValueChange: (val)=>{console.log("Value: ", val);},
  prefix: '',
  disabled: false
};

export default IdrNumberInput;

