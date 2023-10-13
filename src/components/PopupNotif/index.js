/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col, Divider } from 'antd';
import {
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from '@material-ui/core';
import constants from '../../helpers/constants';

import MailRed from '../../assets/icons/siab/mail.png';
import MailGray from '../../assets/icons/siab/mail-gray.png';
import { useAuthListener } from '../../helpers/firebase/useAuthListener';
import { equalTo, onValue, orderByChild, orderByKey, query, ref } from 'firebase/database';
import { db } from '../../helpers/firebase/config';
import ItemNotif from './ItemNotif';

const useStyles = makeStyles({
  body: {
    width: 420,
    // backgroundColor: 'red',
    maxHeight: '80vh',
    overflowY: 'scroll',
    scrollbarTrackColor: 'rgb(255,255,255,1)',
  },
  notifTitle: {
    fontFamily: 'Barlow',
    fontStyle: 'bold',
    fontWeight: '600',
    fontSize: '16px',
    color: 'dark',
  },
});

const useTabsStyles = makeStyles({
  root: {
    marginLeft: 60,
    marginTop: 10,
    height: 36,
    width: 296,
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
    height: 36,
    minWidth: 74,
    // padding: '7px 10px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const PopupNotif = ({data, counter, handleSelectNotif}) => {
  const classes = useStyles();
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

  const [selectedTab, setSelectedTab] = useState(0);
  const [dataToShow, setDataToShow] = useState([]);

  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  useEffect(() => {
    console.log("+++ dataNotif",data);
    setDataToShow(data);
  }, [data]);
  
  return (
    <div className={classes.body}>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col flex="auto" className={classes.notifTitle}>
          Notification
        </Col>
        <Col flex="10px" className={classes.notifTitle}>
          ({counter})
        </Col>
      </Row>
      <Tabs
        classes={tabsStyles}
        value={selectedTab}
        onChange={handleSelectedTab}
        centered
      >
        <Tab classes={tabItemStyles} label="All" />
        <Tab classes={tabItemStyles} label="Updates" />
        <Tab classes={tabItemStyles} label="News" />
        <Tab classes={tabItemStyles} label="Critical" />
      </Tabs>
      <div style={{ marginTop: 20 }}>
        {dataToShow.map((item)=>{
          return (
            <ItemNotif data={item} handleSelectNotif={handleSelectNotif}/>
          );
        })}
      </div>
    </div>
  );
};

PopupNotif.propTypes = {
  data: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
  handleSelectNotif: PropTypes.func.isRequired,
};

export default PopupNotif;
