import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import constants from '../../helpers/constants';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0,
    marginTop: 10,
    marginLeft: 10,
    // marginTop: 10,
    // minHeight: 40,
    // maxWidth: 230,
  },
});

const useTabsStyles = makeStyles({
  root: {
    marginTop: 10,
    minHeight: 40,
    maxWidth: 230,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 6,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const buttonWidth = 76

const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: buttonWidth,
    padding: '7px 10px',
    fontSize: '13px',
    fontWeight: 500
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

function Location({ onChangeLocationMode, locationMode }) {
  const { root } = useStyles();
  const [selectedTab, setSelectedTab] = useState("ON");
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

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    console.log(newValue);
    onChangeLocationMode(newValue);
  };

  useEffect(()=>{
    var useGetDraft = localStorage.getItem("useGetDraft");
    if(useGetDraft){
      var getItem = localStorage.getItem('dataGetDraftDetail');
      if(getItem){
        var parseItem = JSON.parse(getItem);
        // if(parseItem.checkStatus){
            setSelectedTab(parseItem.locationMode !== null ? parseItem.locationMode : "ON");
            // parseItem.checkStatus = false;
            localStorage.setItem('dataGetDraftDetail', JSON.stringify(parseItem));
        // };
      };
    };
  }, []);

  useEffect(() => {
    if(locationMode){
      setSelectedTab(locationMode);
    };
  }, [locationMode]);

  return (
    <>
      <div className={root}>
        {/* <Grid container xs={12} spacing={2}>
          <Grid item xs={6} spacing={2}> */}
        <label style={{ fontSize: '13px', fontWeight: 400 }}>Lokasi :</label>
        <Tabs
          classes={tabsStyles}
          value={selectedTab}
          onChange={handleSelectedTab}
        >
          <Tab classes={tabItemStyles} label="ON" value="ON" />
          <Tab classes={tabItemStyles} label="OFF" value="OFF"/>
          <Tab classes={tabItemStyles} label="DL" value="DL"/>
        </Tabs>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Label label="Branch" />
          <Label label="Off Premises" />
          <Label label="Digital Lounge" />
        </div>
        {/* </Grid>
        </Grid> */}
      </div>
    </>
  );
}

export default Location;

const Label = ({ label }) => (
  <label
    style={{
      width: buttonWidth,
      padding: 0,
      fontSize: 13,
      textAlign: 'center',
      color: '#8D98B4',
    }}
  >
    {label}
  </label>
);