import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
} from '../../../assets/theme/colors';

const BtnGroupItem = withStyles((theme) => ({
  root: {
    fontSize: 12,
    textTransform: 'capitalize',
    backgroundColor: GrayUltrasoft,
    color: GrayMedium,
    border: 'none!important',
    borderRadius: "0px 7px 7px 0px",
    padding: '6px 15px',
  },
  label: {
    whiteSpace: 'nowrap',
  },
  contained: {
    '&.Mui-disabled': {
      color: 'white',
      backgroundColor: PrimaryHard,
    },
    '&:hover': {
      color: 'white',
    },
  },
}))(Button);

export default BtnGroupItem;
