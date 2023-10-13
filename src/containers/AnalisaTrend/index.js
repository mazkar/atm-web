/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ModalLoader from '../../components/ModalLoader';
import DynamicTablePagination from '../../components/DynamicTablePagination';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import * as ThemeColor from '../../assets/theme/colors';
import { ChkyTrendChart } from '../../components';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  tableContent: {marginTop: 20,},
}
);

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '90%',
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
  
const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: ThemeColor.Dark,
    fontSize: 24,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    opacity: 0.3,
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

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
    id: `content-tab-${index}`,
    'aria-controls': `content-tabpanel-${index}`,
  };
}

const trendTransactionData = [
  { date: 'Jan', transaction: 10_000_000 },
  { date: 'Feb', transaction: 12_000_000 },
  { date: 'Mar', transaction: 24_500_000 },
  { date: 'Apr', transaction: 13_800_000 },
  { date: 'May', transaction: 34_200_000 },
  { date: 'Jun', transaction: 19_100_000 },
  { date: 'Jul', transaction: 20_000_000 },
];

function AnalisaTrend() {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState(0);
  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // [1]getRenewalForecasting
  const [dataTrendUp, setDataTrendUp] = useState([]); // <--- init dataTrendUp array

  // [2]getTrendDown
  const [dataTrendDown, setDataTrendDown] = useState([]); // <--- init dataTrendDown array

  // init title and value type table for Data
  // [1]getTrendUp
  const titleTrendUp = ['ATM ID','City','Kecamatan','Cost/Year','Transaction','Total Issue','Target Transaction','Medical','Recommendation','Action',];
  const valueTrendUp = ['string','string','string','string','string','string','string','status_string','string','url',];

  // [2]getTrendDown
  const titleTrendDown = ['ATM ID','City','Kecamatan','Cost/Year','Transaction','Total Issue','Target Transaction','Medical','Recommendation','Action',];
  const valueTrendDown = ['string','string','string','string','string','string','string','status_string','string','url',];

  useEffect(async () => {
    const trendUpData = [];
    const trendDownData = [];
    
    // START [1]getRenewal
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/analisa/trend-up',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      }
      );
      try{
        // reconstruct data from DB to dataNewRBB
        const dataPre = result.data.data;
      
        // eslint-disable-next-line array-callback-return
        dataPre.map((row) => {
          const actionData = [
            { name: 'Details', url: `/analisa/trend-up-detail`}
          ];
          const newRow = {
            ...row,
            action : actionData
          };
          trendUpData.push(newRow);
        });
      }catch{
        setModalLoader(false);
        alert(`Error Re-Construct Data Trend Up Analisa...!`);
      }
      console.log(`========> Data AFTER RECONSTRUCTION ${JSON.stringify(trendUpData)}`);
      setDataTrendUp(trendUpData);
      setModalLoader(false);
    }
    catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Trend Up Analisa...! \n Message: ${error}`);
    }
    // END [1]getTrendUp

    // START [2]getTrendDown
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/analisa/trend-down',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      }
      );
      try{
        // reconstruct data from DB 
        const dataPre = result.data.data;
      
        // eslint-disable-next-line array-callback-return
        dataPre.map((row) => {
          const actionData = [
            { name: 'Details', url: `/analisa/trend-down-detail`}
          ];
          const newRow = {
            ...row,
            action : actionData
          };
          trendDownData.push(newRow);
        });
      }catch{
        setModalLoader(false);
        alert(`Error Re-Construct Data Trend Downd Data...!`);
      }
      console.log(`========> Data Termin AFTER RECONSTRUCTION ${JSON.stringify(trendDownData)}`);
      setDataTrendDown(trendDownData);
      setModalLoader(false);
    }
    catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Trend Down Data...! \n Message: ${error}`);
    }
    // END [2]getTrendDown

  }, []);

  // END FETCHING DATA =========> 

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer}>
        <Grid item>
          <Typography  className={classes.title}>Analisa</Typography>
        </Grid>
        <Grid item>
          {/* <ChkySearchBar placeholder="Search ... " width={290}/> */}
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid>
            <ContentTabs value={valueTab} onChange={handleChangeTab} aria-label="content tabs">
              <ContentTab label="Trend Up" {...a11yProps(0)} />
              <ContentTab label="Trend Down" {...a11yProps(1)} />
            </ContentTabs>
          </Grid>
          <Grid/>
        </Grid>
        <TabPanel value={valueTab} index={0} className={classes.tabContent}>
          <div className={classes.chartContent}>
            <ChkyTrendChart data={trendTransactionData} title="Trend Transaction"/>
          </div>
          <div className={classes.tableContent}>
            <DynamicTablePagination
              data={dataTrendUp}
              fields={titleTrendUp}
              cellOption={valueTrendUp}
            />
          </div>
          
        </TabPanel>
        <TabPanel value={valueTab} index={1} className={classes.tabContent}>
          <ChkyTrendChart data={trendTransactionData} title="Trend Transaction"/>
          <div className={classes.tableContent}>
            <DynamicTablePagination
              data={dataTrendDown}
              fields={titleTrendDown}
              cellOption={valueTrendDown}
            />
          </div>
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(AnalisaTrend))
);
