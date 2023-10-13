import React from 'react';
import { Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Constants from '../../../helpers/constants';

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 3,
    '& > span': {
      width: '100%',
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);    

export default ContentTabs;