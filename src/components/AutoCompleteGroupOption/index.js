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

export default function AutoCompleteGroupOption({value = null, options = defOptions, onChange=(obj)=>console.log(obj), ...others}) {
  const classes = useStyles();

  return (
    <Autocomplete
      id="grouped-demo"
      options={options}
      groupBy={(option) => option.group}
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
    "group": "Group 1",
    "lable": "Category 1",
    "value": "2huD6RsCCd"
  },
  {
    "group": "Group 1",
    "lable": "Category 2",
    "value": "5zj9nAUJbZ"
  },
  {
    "group": "Group 1",
    "lable": "Category 3",
    "value": "7Bi29eNr5L"
  },
  {
    "group": "Group 2",
    "lable": "Category 1",
    "value": "7slBKVf2OK"
  },
  {
    "group": "Group 2",
    "lable": "Category 4",
    "value": "85fle47bUh"
  },
  {
    "group": "Group 3",
    "lable": "Category 5",
    "value": "9Ci6dvyun9"
  },
  {
    "group": "Group 3",
    "lable": "Category 6",
    "value": "fbbC5JcjaC"
  },
];
