/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
      
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};
      
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;