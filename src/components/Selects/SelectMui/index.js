import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import {InputAdornment, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles } from '@material-ui/styles';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const useStyles = makeStyles((theme) => createStyles({
  root: {
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
  input: {
    height: 47,
    borderRadius: 8,
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

function SelectMui(props) {
  const classes = useStyles();

  const {selectedValue, selectOptionData, onSelectValueChange, height, ...others} = props;

  const [selectValue, setSelectValue] = useState(selectedValue);
  const handleSelectChange = (event) => {
    onSelectValueChange(event.target.value);
    setSelectValue(event.target.value);
  };
  useEffect(()=>{
    // console.log(">>> Val From",selectedValue);
    setSelectValue(selectedValue);
  },[selectedValue]);
  return (
    <div className={classes.root}>
      <Select
        id="filterBy"
        value={selectValue}
        onChange={handleSelectChange}
        input={<Input className={classes.input} />}
        IconComponent={DropDownIcon}
        fullWidth
        style={{height}}
        {...others}
      >
        {selectOptionData.map((item)=>{
          return (
            <MenuItem value={item.value} classes={{selected: classes.selectedSelect }} >
              <Grid container direction='row' alignItems="center" spacing={1}>
                <Grid item>{item.icon}</Grid>
                <Grid item>{item.name}</Grid>
              </Grid>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}

SelectMui.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectOptionData: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onSelectValueChange: PropTypes.func,
  height: PropTypes.string
};

SelectMui.defaultProps = {
  selectedValue: null,
  onSelectValueChange: (val)=>{console.log("Selected Value: ", val);},
  height: "auto"
};

export default SelectMui;

