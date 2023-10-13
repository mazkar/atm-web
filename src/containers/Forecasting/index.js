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
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import ModalUpload from "./ModalUpload";
import ModalLoader from '../../components/ModalLoader';
import DynamicTablePagination from '../../components/DynamicTablePagination';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import * as ThemeColor from '../../assets/theme/colors';
import { ChkyFilterRenewalForecast, ChkyFilterTerminForecast, ChkySearchBar } from '../../components';

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

function Forecasting() {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState(0);
  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  const [filterRenewalData, setFilterRenewalData] = useState([]);
  function handleValueFilter(newValue) {
    setFilterRenewalData(newValue);
  }
  useEffect(() => console.log(`====> filterRenewalData ${JSON.stringify(filterRenewalData)}`), [filterRenewalData]);

  const [filterTerminData, setFilterTerminData] = useState([]);
  function handleValueFilterTermin(newValue) {
    setFilterTerminData(newValue);
  }
  useEffect(() => console.log(`====> filterTerminData ${JSON.stringify(filterTerminData)}`), [filterTerminData]);

  // MODAL UPLOAD MASTER DATA
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);
  const handleOpenModalUpload = () => setIsOpenModalUpload (true);
  const handleCloseModalUpload = () => setIsOpenModalUpload(false);

  const handleUploadMasterData = () => {
    handleOpenModalUpload();
    // alert('Button New RBB Clicked');
  };

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // [1]getRenewalForecasting
  const [dataRenewalForecasting, setDataRenewalForecasting] = useState([]); // <--- init dataRenewalForecasting array

  // [2]getTerminForecasting
  const [dataTerminForecasting, setDataTerminForecasting] = useState([]); // <--- init dataTerminForecasting array

  // init title and value type table for Forecasting Data
  // [1]getRenewalForecasting
  const titleRenewalForecasting = ['ATM ID','Province','Kecamatan','Cost/Year','Jumlah/Quantity','Target Transaction','Action',];
  const valueRenewalForecasting = ['string','string','string','string','string','string','url',];

  // [2]getTerminForecasting
  const titleTerminForecasting = ['ATM ID','City','Kecamatan','Cost/Year','Transaction','Total Issue','Target Transaction','Medical','Recommendation','Action',];
  const valueTerminForecasting = ['string','string','string','string','string','string','string','status_string','string','url',];

  useEffect(async () => {
    const renewData = [];
    const terminData = [];
    
    // START [1]getRenewalForecasting
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/forecasting/renewal',
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
            { name: 'Details', url: `/forecasting/renewal-detail`}
          ];
          const newRow = {
            ...row,
            action : actionData
          };
          renewData.push(newRow);
        });
      }catch{
        setModalLoader(false);
        alert(`Error Re-Construct Data Renewal...!`);
      }
      console.log(`========> Data AFTER RECONSTRUCTION ${JSON.stringify(renewData)}`);
      setDataRenewalForecasting(renewData);
      setModalLoader(false);
    }
    catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Renewal Forecasting...! \n Message: ${error}`);
    }
    // END [1]getRenewalForecasting

    // START [2]getTerminForecasting
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/forecasting/termin',
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
            { name: 'Details', url: `/forecasting/termin-detail`}
          ];
          const newRow = {
            ...row,
            action : actionData
          };
          terminData.push(newRow);
        });
      }catch{
        setModalLoader(false);
        alert(`Error Re-Construct Data Renewal...!`);
      }
      console.log(`========> Data Termin AFTER RECONSTRUCTION ${JSON.stringify(terminData)}`);
      setDataTerminForecasting(terminData);
      setModalLoader(false);
    }
    catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Termin Forecasting...! \n Message: ${error}`);
    }
    // END [2]getTerminForecasting

  }, []);

  // END FETCHING DATA =========> 

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer}>
        <Grid item>
          <Typography  className={classes.title}>Forecasting</Typography>
        </Grid>
        <Grid item>
          <ChkySearchBar placeholder="Search ... " width={290}/>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid>
            <ContentTabs value={valueTab} onChange={handleChangeTab} aria-label="content tabs">
              <ContentTab label="Renewal ATM" {...a11yProps(0)} />
              <ContentTab label="Termin ATM" {...a11yProps(1)} />
            </ContentTabs>
          </Grid>
          <Grid>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <MuiIconLabelButton
                style={{ marginBottom: 20, width: 300, right: 0 }}
                label="Upload Master Data Transaction"
                iconPosition="startIcon"
                onClick={() => {handleUploadMasterData();}}
                buttonIcon={<PlusWhite />}
              />
            </div>
          </Grid>
        </Grid>
        <TabPanel value={valueTab} index={0} className={classes.tabContent}>
          <ChkyFilterRenewalForecast onFilterSubmit={handleValueFilter}/>
          <div className={classes.tableContent}>
            <DynamicTablePagination
              data={dataRenewalForecasting}
              fields={titleRenewalForecasting}
              cellOption={valueRenewalForecasting}
            />
          </div>
          
        </TabPanel>
        <TabPanel value={valueTab} index={1} className={classes.tabContent}>
          <ChkyFilterTerminForecast onFilterSubmit={handleValueFilterTermin}/>
          <div className={classes.tableContent}>
            <DynamicTablePagination
              data={dataTerminForecasting}
              fields={titleTerminForecasting}
              cellOption={valueTerminForecasting}
            />
          </div>
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      <ModalUpload
        isOpen={isOpenModalUpload}
        onClose={handleCloseModalUpload}
        onLeave={() => {
          handleCloseModalUpload();
        }}
        mode= "Master Data Transaction"
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Forecasting))
);
