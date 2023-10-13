import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Select, InputBase, MenuItem } from '@material-ui/core';
import { Input, AutoComplete, DatePicker, TimePicker } from 'antd';
import { PrimaryHard } from '../../../assets/theme/colors';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import { useContext } from 'react';
import { EditMasterCtx } from '../Edit';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { isMoment } from 'moment';
import isAlphanumeric from 'validator/es/lib/isAlphanumeric';
import { ChkyAutocomplete } from '../../../components';
import { listBankLain } from '../../../helpers/constants';
import { convertArrayObjToArrayStringATMBankList } from '../../../helpers/bankLainArrayConverter';

const inputStyle = {
  height: 40,
  borderRadius: 8,
  border: '1px solid #BCC8E7',
  fontSize: 16,
  backgroundColor: '#FFFFFF',
  width: '100%',
  '& .MuiSelect-icon': {
    top: 'calc(50% - 8px)',
    right: 8,
  },
};

const useStyles = makeStyles({
  inputForm: inputStyle,
});

const CommonInput = ({
  label,
  required,
  disabled,
  name,
  optName,
  options,
  onSelect,
  onSearch,
  onChangeAuto,
  onChangeDate,
  type,
  value,
}) => {
  const classes = useStyles();
  const { detailData, setDetailData, fieldOptions } = useContext(EditMasterCtx);
  function onChange(x, newValue) {
    if(type === 'banklain'){
      // console.log("+++ x",x);
      // console.log("+++ newValue",newValue);
      const newArr = convertArrayObjToArrayStringATMBankList(newValue);
      // console.log("+++ newArr",newArr);
      setDetailData({ 
        ...detailData, 
        aroundAtmBankList: newArr,
        aroundAtmBank: newValue,
        aroundAtmCount: newArr.length
      });
    }else{
      const nilai = isMoment(x) ? x : x.target.value; // supaya tidak ngebug hilang value
      // console.log(name, ':', nilai);
      let newData = {
        ...detailData,
        [name]: nilai === 'true' ? true : nilai === 'false' ? false : nilai,
      };
      if (type === 'date') {
        newData = { ...detailData, [name]: +nilai };
        if (onChangeDate) {
          onChangeDate(nilai);
        }
      } else if (type === 'time') {
        newData = { ...detailData, [name]: nilai.format('HH:mm') };
      } else if (name === 'provinceId') {
        newData = { ...detailData, [name]: nilai, cityId: null, districtId: null };
      } else if (name === 'cityId') {
        newData = { ...detailData, [name]: nilai, districtId: null };
      }
      if (type !== 'alphanumeric' || isAlphanumeric(nilai)) {
        setDetailData(newData);
      }
    }
    
  }
  function onValueChange(values) {
    setDetailData((old) => ({ ...old, [name]: values.floatValue }));
  }
  return (
    <Grid item xs={4}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <Typography
            style={{
              fontWeight: '500',
              fontSize: '15px',
              lineHeight: '18px',
              marginBottom: 5,
            }}
          >
            {label}
          </Typography>
        </Grid>
        {required && (
          <Grid item>
            <Typography
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: PrimaryHard,
              }}
            >
              *mandatory
            </Typography>
          </Grid>
        )}
      </Grid>
      <div>
        {type === 'auto' ? (
          <AutoComplete
            value={value}
            style={{ width: '100%' }}
            onChange={onChangeAuto}
            {...{ options, onSelect, onSearch, name }}
          >
            <Input style={inputStyle} />
          </AutoComplete>
        ) : type === 'select' ? (
          <Select
            fullWidth
            value={detailData[name] + ''}
            onChange={onChange}
            input={<BootstrapInput />}
            IconComponent={DropDownIcon}
            className={classes.inputForm}
            disabled={disabled}
          >
            {(options ? options : fieldOptions[optName ? optName : name])?.map((item, i) => {
              return (
                <MenuItem key={i} value={item.value + ''}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : type === 'number' || type === 'currency' ? (
          <NumberFormat
            customInput={Input}
            className={classes.inputForm}
            value={detailData[name]}
            thousandSeparator='.'
            decimalSeparator=','
            onValueChange={onValueChange}
            {...{ disabled }}
            prefix={type === 'currency' ? 'Rp.' : ''}
          />
        ) : type === 'time' ? (
          <TimePicker
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={detailData[name] ? moment(detailData[name], 'HH:mm') : null}
            format='HH:mm'
          />
        ) : type === 'date' ? (
          <DatePicker
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={detailData[name] ? moment(detailData[name]) : null}
            format='DD/MM/YYYY'
          />
        ) : type === 'alphanumeric' ? (
          <Input
            className={classes.inputForm}
            {...{ onChange, disabled, name }}
            type='text'
            value={detailData[name]}
          />
        ) : type === "banklain" ? (
          <ChkyAutocomplete
          item={listBankLain}
          value={detailData[name] || []}
          onChange={onChange}
          // setUnrendered={(e) => (otherBanks = e)}
          // isDisable={isDisableATMBankLain}
        />
        ) 
        : (
          <Input
            className={classes.inputForm}
            {...{ onChange, disabled, name, type }}
            value={detailData[name]}
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
    border: '1px solid #BCC8E7',
    fontSize: 16,
    paddingLeft: 5,
    paddingTop: 8,
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
