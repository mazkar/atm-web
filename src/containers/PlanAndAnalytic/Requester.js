import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import constants from '../../helpers/constants';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0,
    // marginTop: 10,
  },
  label: {
    fontSize: '13px',
    fontWeight: 400
  }
});

const useTabsStyles = makeStyles({
  root: {
    marginTop: 10,
    minHeight: 40,
    maxWidth: 480,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 6,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});

const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 120,
    fontSize: '13px',
    fontWeight: 500
    // padding: '7px 7px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

function Requester({ onChangeRequester, requester }) {
  const { root, label } = useStyles();
  const [selectedTab, setSelectedTab] = useState("ATM Business");
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
    console.log("RAW : ", newValue);
    onChangeRequester(newValue);
  };

  useEffect(()=>{
    var useGetDraft = localStorage.getItem("useGetDraft");
    if(useGetDraft){
      var getItem = localStorage.getItem('dataGetDraftDetail');
      if(getItem){
        var parseItem = JSON.parse(getItem);
        if(parseItem.requester){
            setSelectedTab(parseItem.requester !== null || parseItem.requester !== undefined ? parseItem.requester : "ATM Business");
            // parseItem.checkStatus = false;
            localStorage.setItem('dataGetDraftDetail', JSON.stringify(parseItem));
        };
      };
    }
  }, []);

  useEffect(() => {
    if(requester){
      setSelectedTab(requester);
    };
  }, [requester]);

  return (
    <>
      <div className={root}>
        <Grid container xs={12} spacing={2} style={{ marginTop: 0 }}>
          <Grid item xs={12} spacing={2}>
            <label className={label}>Requester :</label>
            <Tabs
              classes={tabsStyles}
              value={selectedTab}
              onChange={handleSelectedTab}
            >
              <Tab
                classes={tabItemStyles}
                label="ATM Business"
                value="ATM Business"
              />
              <Tab classes={tabItemStyles} label="Branch" value="Branch" />
              <Tab classes={tabItemStyles} label="Other BU" value="Other BU" />
              <Tab classes={tabItemStyles} label="Special" value="Special" />
            </Tabs>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Requester;
