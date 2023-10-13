/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'block ruby',
    width: '-webkit-fill-available',
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
  },
  selectedSelect: {
    backgroundColor: '#FFF5F4 !important',
    color: '#DC241F',
  },
  inputLeft: {
    height: 47,
    borderRadius: "8px 0px 0px 8px",
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #DC241F',
    fontSize: 13,
    padding: '9px 12px 9px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  input: {
    height: 47,
    width: "100%",
    borderRadius: "0px 8px 8px 0px",
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '9px 12px 9px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
}));

function SelectWithInputValue(props) {
  const classes = useStyles();

  const {leftValue, leftSugestion, onLeftChange, value, onChange, placeholder} = props;

  return (
    <FormControl className={classes.root}>
      <Grid container direction="row">
        <Grid item>
          <Select
            id="leftSelector"
            value={leftValue}
            onChange={onLeftChange}
            input={<Input className={classes.inputLeft} />}
            IconComponent={DropDownIcon}
            fullWidth
          >
            {leftSugestion.map((item)=>{
              return (
                <MenuItem value={item.value} classes={{selected: classes.selectedSelect }} >{item.name}</MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs>
          <Input className={classes.input} value={value} onChange={onChange} placeholder={placeholder}/>
        </Grid>
      </Grid>
    </FormControl>
  );
}

SelectWithInputValue.propTypes = {
  leftValue: PropTypes.string,
  leftSugestion: PropTypes.array.isRequired,
  onLeftChange: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SelectWithInputValue.defaultProps = {
  leftValue: null,
  onLeftChange: (val)=>{console.log("Selected Left Value: ", val);},
  value: null,
  placeholder: "Input Value"
};

export default SelectWithInputValue;

