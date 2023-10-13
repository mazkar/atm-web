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
    height: 40,
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
    height: 40,
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

function DoubleSelector(props) {
  const classes = useStyles();

  const {selectedLeftValue, selectLeftOptionData, onSelectLeftValueChange, selectedValue, selectOptionData, onSelectValueChange} = props;

  const [selectValue, setSelectValue] = useState(selectedValue);
  const [selectLeftValue, setSelectLeftValue] = useState(selectedLeftValue);

  const handleSelectLeftChange = (event) => {
    onSelectLeftValueChange(event.target.value);
    setSelectLeftValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    onSelectValueChange(event.target.value);
    setSelectValue(event.target.value);
  };

  useEffect(()=>{
    // console.log("+++ selectedLeftValue",selectedLeftValue);
    // onSelectLeftValueChange(selectedLeftValue);
    setSelectLeftValue(selectedLeftValue);
  },[selectedLeftValue]);

  useEffect(()=>{
    // console.log(">>> Val From",selectedValue);
    setSelectValue(selectedValue);
  },[selectedValue]);
  return (
    <FormControl className={classes.root}>
      <Grid container direction="row">
        <Grid item>
          <Select
            id="leftSelector"
            value={selectLeftValue}
            onChange={handleSelectLeftChange}
            input={<Input className={classes.inputLeft} />}
            IconComponent={DropDownIcon}
            fullWidth
          >
            {selectLeftOptionData.map((item)=>{
              return (
                <MenuItem value={item.value} classes={{selected: classes.selectedSelect }} >{item.name}</MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs>
          <Select
            id="filterBy"
            value={selectValue}
            onChange={handleSelectChange}
            input={<Input className={classes.input} />}
            IconComponent={DropDownIcon}
            fullWidth
          >
            {selectOptionData.map((item)=>{
              return (
                <MenuItem value={item.value} classes={{selected: classes.selectedSelect }} >{item.name}</MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </FormControl>
  );
}

DoubleSelector.propTypes = {
  selectedLeftValue: PropTypes.string,
  selectLeftOptionData: PropTypes.array.isRequired,
  onSelectLeftValueChange: PropTypes.func,
  selectOptionData: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onSelectValueChange: PropTypes.func,
};

DoubleSelector.defaultProps = {
  selectedLeftValue: null,
  onSelectLeftValueChange: (val)=>{console.log("Selected Left Value: ", val);},
  selectedValue: null,
  onSelectValueChange: (val)=>{console.log("Selected Value: ", val);},
};

export default DoubleSelector;

