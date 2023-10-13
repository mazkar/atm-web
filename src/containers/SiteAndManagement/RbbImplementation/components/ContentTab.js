import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tab } from '@material-ui/core';
import * as ThemeColor from '../../../../assets/theme/colors';

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: ThemeColor.Dark,
    fontSize: 17,
    fontWeight: 600,
    opacity: 0.3,
    minWidth: 0,
    padding: '6px 16px',
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default ContentTab;
