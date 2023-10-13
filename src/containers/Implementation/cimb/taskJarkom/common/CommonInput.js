import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Select, InputBase, MenuItem } from '@material-ui/core';
import { Input, AutoComplete, Select as AntSelect, DatePicker } from 'antd';
import {
  Dark,
  GrayHard,
  GrayMedium,
  GrayUltrasoft,
  PrimaryHard,
} from '../../../../../assets/theme/colors';
import { ReactComponent as DropDownIcon } from '../../../../../assets/icons/general/dropdown_red.svg';
import { useContext } from 'react';
import NumberFormat from 'react-number-format';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = AntSelect;

const disabledStyle = {
  backgroundColor: 'white',
  borderColor: GrayUltrasoft,
  color: Dark,
};

const inputStyle = {
  height: 40,
  borderRadius: 8,
  border: '1px solid ' + GrayMedium,
  fontSize: '13px',
  lineHeight: '16px',
  backgroundColor: '#FFFFFF',
  resize: 'none',
  width: '100%',
  '& .MuiSelect-icon': {
    top: 'calc(50% - 8px)',
    right: 8,
  },
  '&.ant-input[disabled],&.Mui-disabled': disabledStyle,
  '&.ant-picker.ant-picker-disabled': {
    ...disabledStyle,
    '& .ant-picker-input > input[disabled]': {
      ...disabledStyle,
    },
  },
};

const useStyles = makeStyles({
  inputForm: inputStyle,
  doubleSelect: {
    '& .ant-select:not(.ant-select-customize-input) .ant-select-selector': {
      borderColor: GrayMedium,
      padding: '0 12px',
      height: 40,
      '& .ant-select-selection-search-input': {
        height: 40,
      },
    },
    '&.ant-input-group.ant-input-group-compact > *:first-child,&.ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector,': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&.ant-input-group.ant-input-group-compact > *:last-child,&.ant-input-group.ant-input-group-compact > .ant-select:last-child > .ant-select-selector,': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '& .ant-select-single .ant-select-selector': {
      alignItems: 'center',
    },
    '& .ant-select-selection-item': {
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '16px',
    },
    '&.ant-input-group.ant-input-group-compact > *:first-child .ant-select-selection-item': {
      color: PrimaryHard,
    },
    '& .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector': {
      backgroundColor: 'white',
      color: Dark,
      borderColor: GrayUltrasoft,
    },
  },
});

const CommonInput = ({
  label,
  required,
  disabled,
  name,
  name2,
  optName,
  options,
  options2,
  value,
  value2,
  onChange,
  onChange2,
  onSelect,
  onSearch,
  onChangeAuto,
  type,
  xs,
}) => {
  // console.log('~ options', options)
  const classes = useStyles();
  return (
    <Grid item xs={xs}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography
            style={{
              fontWeight: '600',
              fontSize: '13px',
              lineHeight: '16px',
              color: GrayHard,
              marginBottom: 10,
            }}
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
      <div>
        {type === 'select' ? (
          <Select
            fullWidth
            value={value + ''}
            onChange={onChange}
            input={<BootstrapInput />}
            IconComponent={disabled ? () => <span></span> : DropDownIcon}
            className={classes.inputForm}
            disabled={disabled}
            name={name}
          >
            {options?.map((item, i) => {
              return (
                <MenuItem key={i} value={item.value + ''}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : type === 'textArea' ? (
          <TextArea
            rows={3}
            className={classes.inputForm}
            {...{ onChange, disabled, name, value }}
          />
        ) : type === 'doubleSelect' ? (
          <Input.Group compact className={classes.doubleSelect}>
            <AntSelect
              value={value ? value + '' : ''}
              style={{ width: '70px' }}
              suffixIcon={disabled ? null : <DropDownIcon />}
              {...{ onChange, disabled, name }}
            >
              {options.map((item) => {
                return <Option value={item.value + ''}>{item.name}</Option>;
              })}
            </AntSelect>
            <AntSelect
              value={value2 ? value2 + '' : ''}
              style={{ width: 'calc(100% - 70px)' }}
              suffixIcon={disabled ? null : <DropDownIcon />}
              disabled={disabled}
              name={name2}
              onChange={onChange2}
              {...{ disabled }}
            >
              {options2.map((item) => {
                return <Option value={item.value + ''}>{item.name}</Option>;
              })}
            </AntSelect>
          </Input.Group>
        ) : type === 'date' ? (
          <DatePicker
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={value ? moment(value) : null}
            format='DD/MM/YYYY'
          />
        ) : (
          <Input
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={value}
          />
        )}
      </div>
    </Grid>
  );
};

export default CommonInput;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  },
  input: {
    height: 23,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: '13px',
    lineHeight: '16px',
    paddingLeft: 5,
    paddingTop: 8,
    '&.Mui-disabled': {
      backgroundColor: 'white',
      borderColor: GrayUltrasoft,
      color: Dark,
    },
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
