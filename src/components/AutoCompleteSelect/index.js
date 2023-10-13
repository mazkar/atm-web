/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import { ReactComponent as KeyboardArrowDownIcon } from "../../assets/icons/general/dropdown_red.svg";

const useStyles =  makeStyles(() => ({
  root: {
    width: "100%",
    '& .MuiOutlinedInput-root': {
      fontSize: 12,
      paddingLeft: 5,
      padding: 0,
      borderRadius: 8,
      height: 40,
      '& fieldset': {
        padding: '7px 9px',
        border: '1px solid #BCC8E7',
      },
      '&:hover fieldset': {
        borderColor: '#749BFF',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #2B2F3C',
      },
    },
  },
  groupLabel: {
    fontSize: 13,
  },
  option: {
    fontSize: 12,
  },
}));

export default function AutoCompleteSelect({value = null, options = defOptions, onChange=(obj)=>console.log(obj), ...others}) {
  const classes = useStyles();
  const optionsSelect = options.map((option) => {
    const firstLetter = option.lable[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
  return (
    <Autocomplete
      id="grouped-demo"
      //   options={options}
      //   groupBy={(option) => option.group}
      options={optionsSelect.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.lable}
      value={value}
      classes={{
        root: classes.root,
        option: classes.option,
        groupLabel: classes.groupLabel,
      }}
      onChange={(e, selectedObj)=>{
        onChange(selectedObj);
      }}
      renderInput={(params) => <TextField {...params} placeholder="Select one" variant="outlined" />}
      popupIcon={<KeyboardArrowDownIcon/>}
      {...others}
    />
  );
}

const defOptions = [
  {
    "lable": "Category 1",
    "value": "2huD6RsCCd"
  },
  {
    "lable": "Category 2",
    "value": "5zj9nAUJbZ"
  },
  {
    "lable": "Category 3",
    "value": "7Bi29eNr5L"
  },
  {
    "lable": "Category 1",
    "value": "7slBKVf2OK"
  },
  {
    "lable": "Category 4",
    "value": "85fle47bUh"
  },
  {
    "lable": "Category 5",
    "value": "9Ci6dvyun9"
  },
  {
    "lable": "Category 6",
    "value": "fbbC5JcjaC"
  },
];
