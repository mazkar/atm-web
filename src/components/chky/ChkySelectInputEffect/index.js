import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, makeStyles } from '@material-ui/styles';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const SelectInputCustom = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    height: 40,
  },
  input: {
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
  },
}))(InputBase);

const useStyles = makeStyles({
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
  }
});

function ChkySelectInputEffect(props) {
  const classes = useStyles();

  const {selectedValue, selectOptionData, selectFirstDummy, onSelectValueChange} = props;

  const [selectValue, setSelectValue] = useState(selectedValue);
  const handleSelectChange = (event) => {
    onSelectValueChange(event.target.value);
    setSelectValue(event.target.value);
  };
  useEffect(()=>{
    console.log(">>> Val From",selectedValue);
    setSelectValue(selectedValue);
  },[selectedValue]);
  return (
    <FormControl className={classes.root}>
      <Select
        id="filterBy"
        value={selectValue}
        onChange={handleSelectChange}
        input={<SelectInputCustom />}
        IconComponent={DropDownIcon}
        fullWidth
      >
        {selectFirstDummy === undefined ? null 
          : <MenuItem value='null' classes={{ selected: classes.selectedSelect }}  >{selectFirstDummy}</MenuItem>}
        {selectOptionData.map((item)=>{
          return (
            <MenuItem value={item.value} classes={{selected: classes.selectedSelect }} >{item.name}</MenuItem>
          );
        })}
        
      </Select>
    </FormControl>
  );
}

ChkySelectInputEffect.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectOptionData: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  selectFirstDummy: PropTypes.string.isRequired,
  onSelectValueChange: PropTypes.func,
};

ChkySelectInputEffect.defaultProps = {
  selectedValue: 'null',
  onSelectValueChange: (val)=>{console.log("Selected Value: ", val)},
};

export default ChkySelectInputEffect;

