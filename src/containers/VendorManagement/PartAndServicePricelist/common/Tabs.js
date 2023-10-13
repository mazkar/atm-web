/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import { PrimaryHard } from "../../../../assets/theme/colors";

const useStyles = makeStyles({
  customTabs: {
    "& .MuiTab-wrapper": {
      textTransform: "capitalize",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: PrimaryHard,
      height: "3px",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TabsComponent = ({ data, currentTabs, ...others }) => {
  const classes = useStyles();

  return (
    <div>
      <Tabs value={currentTabs} className={classes.customTabs} {...others}>
        {/* Looping of Header props */}
        {data &&
          data.map(({ header }, index) => {
            return <Tab label={header} key={index} />;
          })}
      </Tabs>
      {/* Looping of Component props */}
      {data &&
        data.map(({ component }, index) => {
          return (
            <TabPanel value={currentTabs} index={index} key={index}>
              {component}
            </TabPanel>
          );
        })}
    </div>
  );
};

export default TabsComponent;
