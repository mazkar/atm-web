import React from 'react';
import { Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Constants from '../../../helpers/constants';

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    '&:hover': {
      color: Constants.color.dark,
      opacity: 1,
    },
    '&$selected': {
      color: Constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    'aria-controls': `content-tabpanel-${index}`,
  };
}

export default ContentTab;
