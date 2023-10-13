/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
// import { Link as Routerlink } from 'react-router-dom';
// import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography,  Tabs, Tab } from '@material-ui/core';
import { ChkyTablePagination } from '../../../components/chky';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
// import BtnGroupItem from './BtnGroupItem';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/siab/arrow-left.svg';
import image from '../../../assets/images/atmcimb.png';
import constants from '../../../helpers/constants';
import CardPhoto from '../../../components/Card/CardPhoto';
// import LoadingView from '../../../../components/Loading/LoadingView';
import { ReactComponent as Check } from '../../../assets/icons/siab/check-green.svg';
import { ReactComponent as Sync } from '../../../assets/icons/siab/sync-alt.svg';
// import { TabPanel } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  container: {
    marginTop: 25,
  },
  paper: {
    padding: 45,
    borderRadius: 10,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },

  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,    
    width: "fit-content",
    position: "relative",
  },
  tabsIndicator: {
    display: 'none',
  },  
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: 'none',
  },
});

// Tab Panel
function TabPanel(props) {
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
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

const DetailKebarsihan = () => {
  const {
    root,
    container,
    paper,
  } = useStyles();
  const classes = useStyles();
  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };
  const titleJarkom = [
    'Kondisi',
    'Status',
  ];
  const tableType = [
    'string', 'string'
  ];
  const dataTable = [
    {
      Kondisi: 'AC',
      Status: 'Sejuk',
    },
    {
      Kondisi: 'Status ATM',
      Status: 'online',
    }
  ];

  return (
    <div className={root}>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              //   onClick={() => window.location.assign('/')}
              buttonIcon={<ArrowLeft />}
            />
          </div>
          <Typography className={classes.title}>Hasil Survey</Typography>
        </Grid>
      </Grid>
      <Typography className={classes.title}>Sebelum Dibersihkan</Typography>
      <Grid container direction='row' justify='space-around'>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Kotor"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Kotor"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Kotor"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Kotor"/>
        </Grid>
      </Grid>
      <Typography className={classes.title}>Sesudah Dibersihkan</Typography>
      <Grid container direction='row' justify='space-around'>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Bersih"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Bersih"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Bersih"/>
        </Grid>
        <Grid item>
          <CardPhoto title="Kondisi Mesin" description="Bersih"/>
        </Grid>
      </Grid>
      <div className={container}>
        <div className={classes.container}>
          <div className={classes.tableContent}>
            <ChkyTablePagination
              // data={dataNewRBB}
              fields={titleJarkom}
              data={dataTable}
              cellOption={tableType}
              //   isLoadData={isLoadData}
            />
          </div>
        </div>
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default DetailKebarsihan;
