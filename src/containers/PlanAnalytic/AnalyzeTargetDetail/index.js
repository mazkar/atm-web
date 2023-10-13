/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Typography,
  AppBar,
  Tab,
  Tabs,
  Box,
} from '@material-ui/core';

import { Result } from 'antd';
import { ReactComponent as BackIcon } from '../../../assets/icons/general/arrow_back_red.svg';
import AtmInfoDetail from './AtmInfoDetail';
import PaperTransaction from '../../../components/GeneralComponent/PaperTransaction';
import PaperCost from '../../../components/GeneralComponent/PaperCost';
import PaperLocation from './PaperLocation';
import PaperMedical from '../../../components/GeneralComponent/PaperMedical';
import constansts from '../../../helpers/constants';
import ModalLoader from '../../../components/ModalLoader';
import * as ThemeColor from '../../../assets/theme/colors';
import RupiahConverter from '../../../helpers/useRupiahConverter';

import ImgcimbBank from '../../../assets/images/cimb-atm.png';
import ImgcimbAtm from '../../../assets/images/cimb-forecasting.png';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/siab/arrow-left.svg';
import ModalNotFound from './ModalNotFound';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': { padding: '20px 0px 10px 0px' },
    '& .MuiPaper-elevation1': { boxShadow: 0 },
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    marginBottom: 10,
  },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      textTransform: 'none',
      backgroundColor: 'unset',
    },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
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
      '& .MuiButton-label': {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  customBar: {
    borderRadius: 10,
    padding: 10,
    boxShadow: 'none',
  },
}));

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: ThemeColor.Dark,
    fontSize: 17,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    opacity: 0.3,
    '&:focus': {
      opacity: 1,
      fontWeight: 'bold',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const AnalyzeTargetDetail = () => {
  // GET ID from URL
  const { id } = useParams();
  const rowID = { atmId: id.toString() };
  // console.log(rowID);
  // alert(`ini${id}`);

  // styling
  const classes = useStyles();
  const tabStyles = useTabStyles();
  // init tabs
  const [tabValue, setTabValue] = useState(0);
  // State
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [atmDetail, setAtmDetail] = useState([]); // Info Detail ATM
  const [costDetail, setCostDetail] = useState([]); // Info Detail Cost
  const [locationDetail, setLocationDetail] = useState([]); // Info Detail Location
  const [position, setPosition] = useState([]);
  const [look, setLook] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState([]);
  const [transactionDetailYear, setTransactionDetailYear] = useState([]); // Info Detail Transaction
  const [medicalDetail, setMedicalDetail] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function handleIsNotFound(bool){
    setIsNotFound(bool);
  };

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = { headers: { 'Content-Type': 'application/json' } };
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        rowID
      )
      .then((res) => {
        if(res.data.data === null){
          handleIsNotFound(true);
        }
        const dataInfo = res.data.data.infoAtm[0];
        console.log('Data Info :', dataInfo);
        const newInfo = {
          atmId: dataInfo.rowID,
          kondisi: dataInfo.openingType,
          lokasiId: dataInfo.newLocation,
          alamat: dataInfo.address,
          roArea: dataInfo.area,
          cabang: dataInfo.branch,
          picCabang: dataInfo.branchPicName,
          picPemilik: dataInfo.ownerPicName,
          picOnLocation: dataInfo.locationPicName,
          populasiATM: dataInfo.countAtm,
          jenisLokasi: dataInfo.boothType,
          aksesibilitas: dataInfo.workingHour,
          aksesPublik: dataInfo.publicAccessibility,
          luasArea: dataInfo.buildingLarge,
          jumlahAtmBankLain: dataInfo.aroundAtmCount,
          tipeAtm: dataInfo.typeAtm,
          ruangAtm: dataInfo.boothType,
          komunikasi: dataInfo.commType,
          images: dataInfo.locationPhotosList,
          dueDate: dataInfo.dueDate,
        };
        // set constructed data
        setAtmDetail(newInfo);
        console.log(atmDetail);
        setModalLoader(false);

        if (tabValue === 0) {
          setModalLoader(true);
          const dataOnChart = [];
          const dataOnChartYear = [];
          axios
            .get(
              `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailTransactionChart?year=2020&atmId=${rowID.atmId}`,
              config
            )
            .then((res) => {
              console.log(res);
              const dataTransaction = res.data.data.monthlyData;
              // eslint-disable-next-line array-callback-return
              dataTransaction.map((item) => {
                const totalAmount = {
                  date: item.month,
                  transaction: item.totalAmount * 10,
                  type: 'totalAmount',
                };
                dataOnChart.push(totalAmount);
                const totalRevenue = {
                  date: item.month,
                  transaction: item.revenueTotal * 10,
                  type: 'revenueTotal',
                };
                dataOnChart.push(totalRevenue);
              });
              setTransactionDetail(dataOnChart);
              // Chart Year
              const dataTransactionYear = res.data.data.yearlyData;
              // eslint-disable-next-line array-callback-return
              dataTransactionYear.map((item) => {
                const totalAmount = {
                  date: item.year,
                  transaction: item.totalAmount * 10,
                  type: 'totalAmount',
                };
                dataOnChartYear.push(totalAmount);
                const totalRevenue = {
                  date: item.year,
                  transaction: item.revenueTotal * 10,
                  type: 'revenueTotal',
                };
                dataOnChartYear.push(totalRevenue);
              });
              setTransactionDetailYear(dataOnChartYear);
              setModalLoader(false);
            })
            .catch((err) => {
              console.log(err);
              // alert(`===> Error When Fetch Data${err}`);
            });
        } else if (tabValue === 2) {
          setModalLoader(true);
          const dataCost = res.data.data.cost;
          setCostDetail(dataCost);
          // console.log(costDetail);
          setModalLoader(false);
        } else if (tabValue === 3) {
          const dataOnMedical = [];
          setModalLoader(true);
          const dataMedical = Object.values(res.data.data.medicalRecordHistory);
          setMedicalDetail(dataMedical);
          console.log('get medical', medicalDetail);
          setModalLoader(false);
        } else if (tabValue === 1) {
          setModalLoader(true);
          const newDataLocation = res.data.data.location.atmPoints;
          const locationData = newDataLocation.map((item, index) => {
            const newLocation = {
              locationName:
                item.locationName === null ? '-' : item.locationName,
              condition: item.condition === null ? '-' : item.condition,
              atmId: item.atmId === null ? '-' : item.atmId,
              locationType:
                item.locationType === null ? '-' : item.locationType,
              locationAddress:
                item.locationAddress === null ? '-' : item.locationAddress,
              rentPeriod: item.rentPeriod === null ? '-' : item.rentPeriod, // ini response sementara
              endRentDate: item.endRentDate === null ? '-' : item.endRentDate, // ini response sementara
              openingType: item.openingType === null ? '-' : item.openingType, // ini response sementara
              averageTransaction:
                item.averageTransaction === null
                  ? '-'
                  : item.averageTransaction, // ini response sementara
              cassaAmount: item.cassaAmount === null ? '-' : item.cassaAmount, // ini response sementara
              revenueAmount:
                item.revenueAmount === null ? '-' : item.revenueAmount, // ini response sementara
              latitude: item.latitude,
              distanceInMeter: item.distanceInMeter,
              longitude: item.longitude,
            };
            return newLocation;
          });
          const mapView = res.data.data.infoAtm;
          const viewLoc = mapView.map((item, i) => {
            const newViewLoc = {
              viewLat: item.latitude,
              viewLong: item.longitude,
            };
            return newViewLoc;
          });
          // console.log(viewLoc);
          const lookLoc = viewLoc.map((value) => {
            return { view: [value.viewLat, value.viewLong] };
          });
          const Loc = locationData.map((val) => {
            return {
              loc: [val.latitude, val.longitude],
              name: val.locationName,
              distance: val.distanceInMeter,
            };
          });
          console.log(Loc);
          // set constructed data
          setLocationDetail(locationData);
          setModalLoader(false);
          setLook(lookLoc);
          setPosition(Loc);
        }
      })

      .catch((err) => {
        console.log(err);
        setModalLoader(false);
        // alert(`===> Error When Fetch Data${err}`);
      });
  }, [tabValue]);
  // END HIT API

  const handleChangeYear = (data) => {
    console.log('ini tahun', data);
    setModalLoader(true);
    const dataOnChart = [];
    const dataOnChartYear = [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: {},
    };

    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailTransactionChart?year=${data}&atmId=${rowID.atmId}`,
        config
      )
      .then((res) => {
        console.log(res);
        const dataTransaction = res.data.data.monthlyData;
        // eslint-disable-next-line array-callback-return
        dataTransaction.map((item) => {
          const totalAmount = {
            date: item.month,
            transaction: item.totalAmount * 10,
            type: 'totalAmount',
          };
          dataOnChart.push(totalAmount);
          const totalRevenue = {
            date: item.month,
            transaction: item.revenueTotal * 10,
            type: 'revenueTotal',
          };
          dataOnChart.push(totalRevenue);
        });
        setTransactionDetail(dataOnChart);
        // Chart Year
        const dataTransactionYear = res.data.data.yearlyData;
        // eslint-disable-next-line array-callback-return
        dataTransactionYear.map((item) => {
          const totalAmount = {
            date: item.year,
            transaction: item.totalAmount * 10,
            type: 'totalAmount',
          };
          dataOnChartYear.push(totalAmount);
          const totalRevenue = {
            date: item.year,
            transaction: item.revenueTotal * 10,
            type: 'revenueTotal',
          };
          dataOnChartYear.push(totalRevenue);
        });
        setTransactionDetailYear(dataOnChartYear);
        setModalLoader(false);
      })
      .catch((err) => {
        console.log(err);
        // alert(`===> Error When Fetch Data${err}`);
      });
  };

  useEffect(() => {
    if (window.location.hash === '#medicalrecord') {
      setTabValue(3);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => window.history.back()}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </Grid>

        <Grid item>
          <AtmInfoDetail atmDetail={atmDetail} atmID={rowID} />
        </Grid>

        <Grid item>
          <div className={useTabStyles.root}>
            <AppBar
              position="static"
              color="white"
              className={tabStyles.customBar}
            >
              <ContentTabs
                value={tabValue}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <ContentTab label="Transaction" {...a11yProps(0)} />
                <ContentTab label="Location" {...a11yProps(1)} />
                <ContentTab label="Cost" {...a11yProps(2)} />
                <ContentTab label="Medical Record" {...a11yProps(3)} />
              </ContentTabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
              <PaperTransaction
                data={transactionDetail}
                year={transactionDetailYear}
                onChangeYear={handleChangeYear}
                type="Forecast"
                chartLegendLabel={["Trend Transaction","Forecast"]}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <PaperLocation
                dataLocation={locationDetail}
                position={position}
                view={look}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <PaperCost cost={costDetail} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <PaperMedical steps={medicalDetail} />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
      <ModalNotFound isOpen={isNotFound} onClose={() => window.history.back()}/>
    </div>
  );
};

export default withRouter(AnalyzeTargetDetail);
