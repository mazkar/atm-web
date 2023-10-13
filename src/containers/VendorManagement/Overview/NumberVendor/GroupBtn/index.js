import React from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {GrayUltrasoft,GrayMedium,PrimaryHard} from '../../../../../assets/theme/colors'


const GroupBtn = withStyles((theme) => ({
  root: {
    fontSize: 12,
    textTransform: "capitalize",
    backgroundColor: GrayUltrasoft,
    color: GrayMedium,
    border: "none!important",
    padding: "6px 15px",
  },
  label: {
    whiteSpace: "nowrap",
  },
  contained: {
    "&.Mui-disabled": {
      color: "white",
      backgroundColor: PrimaryHard,
    },
    "&:hover": {
      color: "white",
    },
  },
}))(Button);
export default GroupBtn