/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import {  makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Tabs, Tab } from "@material-ui/core";
import * as Colors from '../../../assets/theme/colors';

const useStyles = makeStyles({
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: Colors.GrayUltrasoft,
    borderRadius: 10,
    color: Colors.GrayMedium,
    position: 'relative',
  },
  tabsIndicator: {
    display: 'none',
  },  
  rootItemTabs: {
    minHeight: 40,
    padding: '7px 10px',
    minWidth: (props)=>props.minWidth,
  },
  selectedTabItem: {
    backgroundColor: Colors.PrimaryHard,
    color: Colors.White,
  },
  wrapperTabItem: {
    textTransform: 'none',
  },
});

function ChkyTabsAsOption(props) {
  const classes = useStyles(props);

  const {currentTab, dataTab, handleChangeTab, resetCounter} = props;

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  // TABS
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    handleChangeTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);
  return (
    <Tabs
      classes={tabsStyles}
      value={selectedTab} 
      onChange={handleSelectedTab}
      variant="fullWidth"
    >
      {dataTab.map((item,index)=>{
        return (
          <Tab key={index} classes={tabItemStyles} label={item}  />
        );
      })}
    </Tabs>
  );
}

ChkyTabsAsOption.propTypes = {
  currentTab: PropTypes.number,
  dataTab: PropTypes.array,
  handleChangeTab: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  minWidth: PropTypes.number,
  resetCounter: PropTypes.number,
};

ChkyTabsAsOption.defaultProps  = {
  currentTab: 0,
  dataTab: ["Ya", "Tidak"],
  handleChangeTab : ()=>{console.log('Tab Value Changed');},
  minWidth: 50, 
  resetCounter: 0,
};

export default ChkyTabsAsOption;

