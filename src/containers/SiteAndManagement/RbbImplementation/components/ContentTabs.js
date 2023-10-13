import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import * as ThemeColor from '../../../../assets/theme/colors';

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '70%',
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export default ContentTabs;
