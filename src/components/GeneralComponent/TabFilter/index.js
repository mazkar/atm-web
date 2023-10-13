/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Tabs, Tab, IconButton, } from '@material-ui/core';
import moment from 'moment';
import constants from '../../../helpers/constants';

import YearController from '../YearController';

const useTabsStyles = makeStyles({
  root: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});
  
const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});
  
const TabsFilter = (props) => {
  const { handleSelectedTabFilter, selectedTab, valueTab, onChangeYear } = props;
  // const [selectedTab, setSelectedTab] = useState(0);
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };
  
  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };
  
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const handleDecreaseYear = () => setSelectedYear((prevValue) => prevValue - 1 );
  const handleIncreaseYear = () => setSelectedYear((prevValue) => prevValue + 1);
  
  useEffect(()=>{
    console.log('perubahan year',selectedYear);
    onChangeYear(selectedYear);
  },[selectedYear]);
  
  return (
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Grid item>
        <Tabs
          classes={tabsStyles}
          value={selectedTab}
          // valueTab={valueTab}
          onChange={handleSelectedTabFilter}
        >
          <Tab classes={tabItemStyles} label="Yearly" />
          <Tab classes={tabItemStyles} label="3 Month" />
          <Tab classes={tabItemStyles} label="4 Month" />
          <Tab classes={tabItemStyles} label="6 Month" />
          <Tab classes={tabItemStyles} label="9 Month" />
          <Tab classes={tabItemStyles} label="12 Month" />
        </Tabs>
      </Grid>
      {selectedTab === 0? 
        null:
        <Grid item>
          <YearController 
            selectedYear={selectedYear}
            handleIncreaseYear={handleIncreaseYear}
            handleDecreaseYear={handleDecreaseYear}/>
        </Grid>}
    </Grid>
  );
};

// TabsFilter.propTypes = {
//   handleSelectedTabFilter: PropTypes.func,
//   selectedTab: PropTypes.string,
//   onChangeYear : PropTypes.func,
// };

export default TabsFilter;