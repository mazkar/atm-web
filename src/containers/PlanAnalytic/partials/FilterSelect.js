/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import { ChkyButtons } from '../../../components';
import {
  GrayBlue,
  GrayMedium,
  PrimaryHard,
  RedHard,
} from '../../../assets/theme/colors';

const useStyles = makeStyles(() => ({
  selectFormCtrl: {
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 8,
    },
  },
  selectRoot: { fontSize: '13px', lineHeight: '16px' },
  selectBtn: { paddingTop: 11, paddingBottom: 11, paddingLeft: 11 },
  btnFilterRoot: {
    backgroundColor: PrimaryHard,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: '6px',
    padding: '10px 0',
    width: 140,
  },
  btnFilterContained: {
    '&:hover': {
      backgroundColor: RedHard,
    },
  },
  btnFilterLabel: {
    textTransform: 'capitalize',
  },
}));

const FilterSelect = (props) => {
  const classes = useStyles();

  const [selectVal, setSelectVal] = useState(
    props.isManualUpdateValue ? props.value : props.options[0].label
  );
  function handleFilterChange(e) {
    if (props.isManualUpdateValue) {
      props.onChange(e);
    }
    setSelectVal(e.target.value);
  }
  const changeDataFilter = () => {
    props.onApplyBtnSubmit(selectVal);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.type === 'Analisis' ? (
          <Typography style={{ fontSize: '13px', lineHeight: '16px' }}>
            <b style={{ marginRight: 10 }}>Showing:</b> Due Date :&nbsp;
          </Typography>
        ) : null}
        <FormControl variant="outlined" className={classes.selectFormCtrl}>
          <Select
            value={selectVal}
            classes={{ root: classes.selectRoot, select: classes.selectBtn }}
            input={<BootstrapInput />}
            IconComponent={DropDownIcon}
            onChange={handleFilterChange}
          >
            {props.options.map((item, i) => {
              return (
                <MenuItem key={i} value={item.label}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {props.type === 'Analisis' ? (
        <div>
          <ChkyButtons
            classes={{
              root: classes.btnFilterRoot,
              contained: classes.btnFilterContained,
              label: classes.btnFilterLabel,
            }}
            onClick={changeDataFilter}
          >
            Apply Filter
          </ChkyButtons>
        </div>
      ) : null}
    </div>
  );
};

export default FilterSelect;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${GrayMedium}`,
    fontSize: 13,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 8,
      borderColor: GrayBlue,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
