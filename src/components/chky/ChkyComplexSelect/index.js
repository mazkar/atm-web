import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { InputBase } from '@material-ui/core';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';

const SelectInputCustom = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
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

const useStyles = makeStyles((theme) => ({
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:5,
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Bank Mandiri',
  'Bank Negara Indonesia (BNI)',
  'Bank Rakyat Indonesia (BRI)',
  'Bank Tabungan Negara (BTN)',
  'Bank BRI Agroniaga',
  'Bank Anda',
  'Bank Central Asia (BCA)',
  'Bank CIMB Niaga',
  'Bank Danamon Indonesia',
  'Bank Maybank Indonesia',
];

function getStyles(name, personName) {
  return {
    color:
      personName.indexOf(name) === -1
        ? '#000'
        : '#DC241F',
  };
}

export default function ChkyComplexSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.root}>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          IconComponent={DropDownIcon}
          input={<SelectInputCustom id="select-multiple-chip" multiline/>}
          renderValue={(selected) => (
            <div className={classes.chips}>
              <Typography>{selected.length} , (</Typography>
              {selected.map((value, i) => (
                <Typography>{value} { i === ((selected.length)-1) ? null : ',' } </Typography>
              ))}
              <Typography>)</Typography>
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
