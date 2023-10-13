/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Tabs, Tab, Paper, Drawer } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { RootContext } from '../../../router';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../../components/ModalLoader';
import Constants from '../../../helpers/constants';
import UploadButton from '../../../components/Button/UploadButton';
import { ReactComponent as VendorIcon } from '../../../assets/icons/siab/vendor.svg';
import LongCardSummary from './CardKebersihan';
import Calculator from '../../../assets/images/calculator.png';
import {ReactComponent as CloseX} from '../../../assets/icons/siab/x-new.svg';
import { Row, Col, InputNumber, Select } from 'antd';
import { ChkyTablePagination } from '../../../components/chky';
import Divider from '@material-ui/core/Divider';
import ReportPerformanceVendor from './ReportPerformanceVendor';
import ColumnStackedBar from './ColumnStackedBars';
import TokenBefore from '../../../assets/images/token-before.jpg';
import TokenAfter from '../../../assets/images/token-after.jpg';

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
    containerPaper: {
        backgroundColor: Constants.color.white,
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        marginBottom: 40,
    },
    text12Normal: {
        fontSize: 12,
        fontWeight: 400,
    },
    text12Bold: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    text12Italic: {
        fontSize: 12,
        fontWeight: 400,
        fontStyle: 'italic',
    },
    filterSection: {
        padding: "10px 20px 10px 20px",
        borderRadius: 10,
        marginTop: '2%',
        marginBottom: '2%',
        zIndex: 6,
    },
    shortCard: {
      border: '1px solid #BCC8E7',
      borderRadius: 12,
      marginTop: '10px'
    },
    select: {
      top: 10,
      borderRadius: 8,
      width: 140,
      '& .ant-input-number-handler-wrap': {
        borderRadius: '0px 8px 8px 0px',
      },
      '& .ant-input-number-input': {
        height: 35,
        fontSize: 'medium',
      },
    },
    inputNumber: {
      top: 10,
      borderRadius: 8,
      width: 140,
      height: 33,
      padding: 2,
    },
    drawer: {
      '& .MuiDrawer-paper': {
        zIndex: 2,
        padding: '90px 0 0',
      },
      width: '400px',
    },
});

// TABS PANEL COMPONENT

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 3,
    '& > span': {
      width: '100%',
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
    
const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    '&:hover': {
      color: Constants.color.dark,
      opacity: 1,
    },
    '&$selected': {
      color: Constants.color.dark,
    },
  },
  selected: {},
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

// END TABS PANEL COMPONENT

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId } = useContext(RootContext);

  // INIT TABLE
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage

  // INIT DATA HIT
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
  });

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerToken, setOpenDrawerToken] = useState(false);
  const toggleOpenDrawer = () => setOpenDrawer(true);
  const toggleCloseDrawer = () => setOpenDrawer(false);
  const toggleOpenDrawerToken = () => setOpenDrawerToken(true);
  const toggleCloseDrawerToken = () => setOpenDrawerToken(false);
    
  // Init TABS Value
  const [valueTab, setValueTab] = useState(0);

  
  const [isHidden, setIsHidden] = useState(false);
  const [isVisiblePerformance, setVisiblePerformance] = useState(false);
  const [isVisibleStackedBar, setIsVisibleStackedBar] = useState(false);

  // check url hash
  useEffect(()=>{
    const windowsHash = window.location.hash;
    console.log("HASH: ",windowsHash);
    if(windowsHash){
      switch(windowsHash) {
      case '#vendor':
        setValueTab(0);
        setIsHidden(false);
        setVisiblePerformance(false);
        setIsVisibleStackedBar(false);
        break;
      case '#listATM':
        setValueTab(1);
        setIsHidden(true);
        setVisiblePerformance(false);
        setIsVisibleStackedBar(false);
        break;
      case '#taskList':
        setValueTab(2);
        setIsHidden(true);
        setVisiblePerformance(false);
        setIsVisibleStackedBar(true);
        break;
      case '#pengisianToken':
        setValueTab(3);
        setIsHidden(true);
        setVisiblePerformance(false);
        setIsVisibleStackedBar(false);
        break;
      case '#reportPerformanceVendor':
        setValueTab(4);
        setIsHidden(true);
        setVisiblePerformance(true);
        setIsVisibleStackedBar(false);
        break;
      default:
        setValueTab(0);
      }
    }else{
      setValueTab(0);
    }
  },[]);

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = '';
    if(newValueTab === 0){
      hashTab = 'vendor';
      setValueTab(0);
      setIsHidden(false);
      setVisiblePerformance(false);
      setIsVisibleStackedBar(false);
    }
    if(newValueTab === 1){
      hashTab = 'listATM';
      setValueTab(1);
      setIsHidden(true);
      setVisiblePerformance(false);
      setIsVisibleStackedBar(false);
    }
    if(newValueTab === 2){
      hashTab = 'taskList';
      setValueTab(2);
      setIsHidden(true);
      setVisiblePerformance(false);
      setIsVisibleStackedBar(true);
    }
    if(newValueTab === 3){
      hashTab = 'pengisianToken';
      setValueTab(3);
      setIsHidden(true);
      setVisiblePerformance(false);
      setIsVisibleStackedBar(false);
    }
    if(newValueTab === 4){
      hashTab = 'reportPerformanceVendor';
      setValueTab(4);
      setIsHidden(true);
      setVisiblePerformance(true);
      setIsVisibleStackedBar(false);
    }
    history.replace(`#${hashTab}`);
  };

  // Init data table = Implementation
  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array
  const [dataImplementationTermin, setDataImplementationTermin] = useState([]); // <--- init dataImplementation array
  const [dataImplementationReplace, setDataImplementationReplace] = useState([]); // <--- init dataImplementation array
  const [dataImplementationMigrasi, setDataImplementationMigrasi] = useState([]); // <--- init dataImplementation array
  
  // set handler loader when call Implementation API Service
  function loaderHandler(loaderValue){
    setModalLoader(loaderValue);
  }
  // do fetch / hit api when value tab changed
  useEffect(()=>{
    // reset dataImplementation to empty array
    const newDataHit = {
      pageNumber: dataHit.pageNumber,
      dataPerPage: dataHit.dataPerPage,
    };
    setDataImplementationNew([]);
    setDataImplementationTermin([]);
    setDataImplementationReplace([]);
    setDataImplementationMigrasi([]);
    const dataToHit={};
    if(valueTab === 0){
    //   console.log(">>>> doFetchImplementationNew");
    //   doFetchImplementationNew(loaderHandler, dataToHit).then(response=>{
    //     console.log(">>>> doFetchImplementationNew",JSON.stringify(response));
    //     if(response){
    //       setDataImplementationNew(response);
    //     }else{
    //       setDataImplementationNew([]);
    //     }
    //   });
    }
    if(valueTab === 1){
    //   console.log(">>>> doFetchImplementationTermin");
    //   doFetchImplementationTermin(loaderHandler, dataToHit).then(response=>{
    //     console.log(">>>> doFetchImplementationTermin",JSON.stringify(response));
    //     if(response){
    //       setDataImplementationTermin(response);
    //     }else{
    //       setDataImplementationTermin([]);
    //     }
    //   });
    }
    if(valueTab === 2){
    //   console.log(">>>> doFetchImplementationReplace");
    //   doFetchImplementationReplace(loaderHandler, dataToHit).then(response=>{
    //     console.log(">>>> doFetchImplementationReplace",JSON.stringify(response));
    //     if(response){
    //       setDataImplementationReplace(response);
    //     }else{
    //       setDataImplementationReplace([]);
    //     }
    //   });
    }
    if(valueTab === 3){
    //   console.log(">>>> doFetchImplementationMigrasi");
    //   doFetchImplementationMigrasi(loaderHandler, dataToHit).then(response=>{
    //     console.log(">>>> doFetchImplementationMigrasi",JSON.stringify(response));
    //     if(response){
    //       setDataImplementationMigrasi(response);
    //     }else{
    //       setDataImplementationMigrasi([]);
    //     }
    //   });
    }
  }, [valueTab, dataHit]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
    });
  }

  const dataTransaksionJenisNasabah = {
    "transactionCustomerTypeYearly":[
       {
          "casaTransaction":4.201,
          "grabTransaction":4.201,
          "rekponTransaction":4.201,
          "ofUsTranssaction":4.201
       }
    ],
  };

  function renderViewTrxNasabah(title, data){
    if (data !== null) {
      switch (title) {
        case 'Labitrans':
            return {
              title,
              count: data.transactionCustomerTypeYearly[0].casaTransaction,
            };
        case 'Royal':
            return {
              title,
              count: data.transactionCustomerTypeYearly[0].grabTransaction,
            };
        case 'TAM':
            return {
              title,
              count: data.transactionCustomerTypeYearly[0].rekponTransaction,
            };
        case 'MKMA':
            return {
              title,
              count: data.transactionCustomerTypeYearly[0].ofUsTranssaction,
            };
        case 'MKMA':
            return {
              title,
              count: data.transactionCustomerTypeYearly[0].ofUsTranssaction,
            };
        default:
          return { title, count: '0' };
      }
    }
    return { title, count: '0' };
  };

  const typeSuggestions = [
    { id: 1, value: 'Januari' },
    { id: 2, value: 'Februari' },
    { id: 3, value: 'Maret' },
    { id: 4, value: 'April' },
    { id: 5, value: 'Mei' },
    { id: 6, value: 'Juni' },
    { id: 7, value: 'Juli' },
    { id: 8, value: 'Agustus' },
    { id: 9, value: 'September' },
    { id: 10, value: 'Oktober' },
    { id: 11, value: 'November' },
    { id: 12, value: 'Desember' },
  ];

  const monthsInd = {
    Januari: '01',
    Februari: '02',
    Maret: '03',
    April: '04',
    Mei: '05',
    Juni: '06',
    Juli: '07',
    Agustus: '08',
    September: '09',
    Oktober: '10',
    November: '11',
    Desember: '12',
  };

  function getMonthMM(m) {
    return monthsInd[m];
  }

  function handleMonthChange(e) {
    var getM = getMonthMM(e);
    console.log('changed month', getM);
  }

  const today = new Date();
  const year = today.getFullYear();

  const handleShowingOnChange = (value, defaultValue) => {
    console.log('changed year', value);
  };

  function handleDetailPage() {
    alert("Action Clicked");
  };

  function detailSurvey() {
    window.location.assign('/maintenance/kebersihan/hasil-survey');
  };

  const handleDetail = [
    { name: 'Update', id: '#1025', funct: handleDetailPage },
  ];

  const handleDetail2 = [
    { name: 'Detail', id: '#1025', funct: toggleOpenDrawer },
  ];

  const handleDetail3 = [
    { name: 'Detail', id: '#1025', funct: detailSurvey },
  ];

  const handleDetail4 = [
    { name: 'Detail', id: '#1025', funct: toggleOpenDrawerToken },
  ];

  const handleChangePage = () => {};

  const titleVendor = [
    'ID ATM',
    'Lokasi',
    'Tahun',
    'Bulan',
    'Tgl Mulai',
    'Jumlah Kunjungan',
    'Nama Vendor',
    'User ID Operator',
    'Nama Operator',
    'Area',
    'Kota',
    '',
  ];

  const titleListATM = [
    'ID ATM',
    'Lokasi',
    'Address',
    'Nama Vendor',
    'Frekuensi Kunjungan',
    'Keterangan',
    'Status',
    'Task List',
  ];

  const titleTaskList = [
    'ID ATM',
    'Lokasi',
    'Nama Vendor',
    'Nama Operator',
    'Tgl Kunjungan',
    'Waktu Kunjungan',
    'Durasi Kunjungan',
    'Status',
    'Hasil Survey',
  ];

  const titleToken = [
    'ID ATM',
    'Lokasi',
    'Jenis Listrik',
    'No Meteran',
    'Sisa Token (Kwh)',
    'Tgl Pengisian',
    'Token Setelah Pengisian (Kwh)',
    'PIC Pengisian',
    'Action',
  ];

  const dummyDataVendor = [
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      Tahun: '2020',
      Bulan: 'Juni',
      TglMulai: '10/10/2020',
      JumlahKunjungan: '24',
      NamaVendor: 'Labitrans',
      UserIDOperator: '1029918271',
      NamaOperator: 'Suwandi',
      Area: '-',
      Kota: '-',
      action: handleDetail,
    },
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      Tahun: '2020',
      Bulan: 'Juni',
      TglMulai: '10/10/2020',
      JumlahKunjungan: '24',
      NamaVendor: 'Labitrans',
      UserIDOperator: '1029918271',
      NamaOperator: 'Suwandi',
      Area: '-',
      Kota: '-',
      action: handleDetail,
    },
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      Tahun: '2020',
      Bulan: 'Juni',
      TglMulai: '10/10/2020',
      JumlahKunjungan: '24',
      NamaVendor: 'Labitrans',
      UserIDOperator: '1029918271',
      NamaOperator: 'Suwandi',
      Area: '-',
      Kota: '-',
      action: handleDetail,
    },
  ];

  const dummyDataListATM = [
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      Address: 'Jl. Imam Bonjol',
      NamaVendor: 'Royal',
      FrekuensiKunjungan: '2 hari sekali',
      Keterangan: 'Lancar',
      Status: 'Aktif',
      action: handleDetail2,
    },
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      Address: 'Jl. Imam Bonjol',
      NamaVendor: 'Royal',
      FrekuensiKunjungan: '2 hari sekali',
      Keterangan: 'Lancar',
      Status: 'Aktif',
      action: handleDetail2,
    },
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      Address: 'Jl. Imam Bonjol',
      NamaVendor: 'Royal',
      FrekuensiKunjungan: '2 hari sekali',
      Keterangan: 'Lancar',
      Status: 'Aktif',
      action: handleDetail2,
    },
  ];

  const dummyDataTaskList = [
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      NamaVendor: 'Labitrans',
      NamaOperator: 'Suwandi',
      TglKunjungan: '10/10/2020',
      WaktuKunjungan: '16:18:00',
      DurasiKunjungan: '18:21',
      Status: 'Done',
      HasilSurvey: handleDetail3
    },
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      NamaVendor: 'Labitrans',
      NamaOperator: 'Suwandi',
      TglKunjungan: '10/10/2020',
      WaktuKunjungan: '16:18:00',
      DurasiKunjungan: '18:21',
      Status: 'Open',
      HasilSurvey: handleDetail3
    },
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      NamaVendor: 'Labitrans',
      NamaOperator: 'Suwandi',
      TglKunjungan: '10/10/2020',
      WaktuKunjungan: '16:18:00',
      DurasiKunjungan: '18:21',
      Status: 'Delay',
      HasilSurvey: handleDetail3
    },
    {
      idATM: '1101',
      Lokasi: 'Lokasi',
      NamaVendor: 'Labitrans',
      NamaOperator: 'Suwandi',
      TglKunjungan: '10/10/2020',
      WaktuKunjungan: '16:18:00',
      DurasiKunjungan: '18:21',
      Status: 'Manual',
      HasilSurvey: handleDetail3
    },
  ];

  const dummyDataToken = [
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      JenisListrik: 'Kategori',
      NoMeteran: '2019928182717727172',
      SisaToken: '21.23',
      TglPengisian: '20/12/2020',
      SetelahPengisian: '21.032.23',
      PIC: 'Subagyo',
      Action: handleDetail4
    },
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      JenisListrik: 'Kategori',
      NoMeteran: '2019928182717727172',
      SisaToken: '21.23',
      TglPengisian: '20/12/2020',
      SetelahPengisian: '21.032.23',
      PIC: 'Subagyo',
      Action: handleDetail4
    },
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      JenisListrik: 'Kategori',
      NoMeteran: '2019928182717727172',
      SisaToken: '21.23',
      TglPengisian: '20/12/2020',
      SetelahPengisian: '21.032.23',
      PIC: 'Subagyo',
      Action: handleDetail4
    },
    {
      idATM: '1101',
      Lokasi: 'Citra Mall',
      JenisListrik: 'Kategori',
      NoMeteran: '2019928182717727172',
      SisaToken: '21.23',
      TglPengisian: '20/12/2020',
      SetelahPengisian: '21.032.23',
      PIC: 'Subagyo',
      Action: handleDetail4
    },
  ];

  const valueType = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'modal',
  ];
  
  const valueType2 = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'modal',
  ];

  const valueType3 = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'status_kebersihan',
    'modal',
  ];

  const valueType4 = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'modal',
  ];

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Kebersihan</Typography>
        </Grid>
        <Grid item>
          <UploadButton
            style={{
              marginBottom: 20,
              width: 150,
              height: 40,
              right: 0,
            }}
            hidden={isHidden}
            label="Upload File"
            onClick={() => {
            //   handleUpload();
            alert("CLICKED");
            }}
          />
        </Grid>
      </Grid>

      <div className={classes.container}>
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="content tabs"
            >
              <ContentTab
                label="Vendor"
                {...a11yProps(0)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="List ATM"
                {...a11yProps(1)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Task List"
                {...a11yProps(2)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Pengisian Token"
                {...a11yProps(3)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Report Performance Vendor"
                {...a11yProps(4)}
                style={{ minWidth: 100 }}
              />
            </ContentTabs>
      </div>

      <Paper elevation={3} className={classes.filterSection} hidden={isHidden}>
        <Grid container direction="row" spacing={1} justify='space-between'>

            <Grid item>
                <Grid container direction="row" spacing={1}>
                    <Grid item style={{marginTop: '12px'}}>
                        <VendorIcon />
                    </Grid>
                    <Grid item style={{marginTop: '14px'}}>
                        <label style={{fontSize:'15px', fontWeight: 500}}>Vendor</label>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container direction="row" spacing={1}>
                    <Grid item style={{marginTop: '14px'}}>
                        <label style={{fontSize:'13px', fontWeight: 500}}>Periode Bulan :</label>
                    </Grid>
                    <Grid item>
                      <Select
                        className={classes.select}
                        getPopupContainer={(trigger) => trigger.parentNode}
                        size="medium"
                        defaultValue="Januari"
                        onChange={handleMonthChange}
                        options={typeSuggestions}
                      />
                    </Grid>
                    <Grid item>
                      <InputNumber
                        className={classes.inputNumber}
                        min={year - 10}
                        max={year + 1}
                        defaultValue={year}
                        onChange={handleShowingOnChange}
                      />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>

        <Row
            gutter={16}
            style={{
              padding: '10px 0 10px 0',
              justifyContent: 'space-between',
              marginTop: '10px'
            }}
          >
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  summaryOptions={renderViewTrxNasabah(
                    'Labitrans',
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  summaryOptions={renderViewTrxNasabah(
                    'Royal',
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  summaryOptions={renderViewTrxNasabah(
                    'TAM',
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  summaryOptions={renderViewTrxNasabah(
                    'MKMA',
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className={classes.shortCard}>
                <LongCardSummary
                  isShort
                  summaryOptions={renderViewTrxNasabah(
                    'MKMA',
                    dataTransaksionJenisNasabah
                  )}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={Calculator}
                  imgStyle={{ height: '40px', width: '40px' }}
                  currency=""
                />
              </div>
            </Col>
          </Row>
      </Paper>

      { isVisiblePerformance ? <ReportPerformanceVendor /> : null }
      { isVisibleStackedBar ? <ColumnStackedBar /> : null }

      <Drawer
        className={classes.drawer}
        open={openDrawer}
        anchor="right"
        onClose={toggleCloseDrawer}
        elevation={0}
        variant="persistent"
      >
        <div className={classes.drawer}>
          <Grid container direction='row' justify='space-between'>
            <Grid item style={{padding: 10}}>
              <Typography style={{fontWeight: 500, fontSize: '24px'}}>
                Detail Task List
              </Typography>
            </Grid>
            <Grid item style={{padding: 10, marginTop: '8px'}} onClick={toggleCloseDrawer}>
              <CloseX />
            </Grid>
          </Grid>

          <Grid container direction='row' justify='space-between' style={{marginTop: '20px'}}>
            <Grid item style={{padding: 10}}>
              <Typography style={{fontWeight: 600, fontSize: '13px'}}>
                Nama Petugas
              </Typography>
            </Grid>
            <Grid item style={{padding: 10}}>
              <Typography style={{fontWeight: 600, fontSize: '13px'}}>
                Tanggal Visit
              </Typography>
            </Grid>
          </Grid>

          {/* MAP THIS LATER */}
          <div>
            <Grid container direction='row' justify='space-between'>
              <Grid item style={{padding: 10}}>
                <Typography style={{fontWeight: 400, fontSize: '13px'}}>
                  Subagyo
                </Typography>
              </Grid>
              <Grid item style={{padding: 10}}>
                <Typography style={{fontWeight: 400, fontSize: '13px'}}>
                  01/10/2020
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" light="true" />
          </div>
        </div>
      </Drawer>

      <Drawer
        className={classes.drawer}
        open={openDrawerToken}
        anchor="right"
        onClose={toggleCloseDrawerToken}
        elevation={0}
        variant="persistent"
      >
        <Grid container direction='row' justify='space-between'>
            <Grid item style={{padding: 10}}>
              <Typography style={{fontWeight: 500, fontSize: '24px'}}>
                Foto Pengisian Token
              </Typography>
            </Grid>
            <Grid item style={{padding: 10, marginTop: '8px'}} onClick={toggleCloseDrawerToken}>
              <CloseX />
            </Grid>
          </Grid>

          <Grid container direction='column' spacing={4}>
            <Grid item style={{marginLeft: '10px', marginRight: '10px'}}>
              <Typography style={{fontWeight: 600, fontSize: '13px'}}>
                Foto Sebelum Pengisian
              </Typography>
              <img src={TokenBefore} alt='token' style={{ margin: 'auto', height: '180px', width: '340px', marginTop: '15px' }}/>
            </Grid>
            <Grid item style={{marginLeft: '10px', marginRight: '10px'}}>
              <Typography style={{fontWeight: 600, fontSize: '13px'}}>
                Foto Setelah Pengisian
              </Typography>
              <img src={TokenAfter} alt='token' style={{ margin: 'auto', height: '180px', width: '340px', marginTop: '15px' }}/>
            </Grid>
          </Grid>
      </Drawer>

      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          {/* TAB PANEL CONTENT */}
          <Grid item style={{ width: "-webkit-fill-available" }}>
            {/* NEW */}
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <ChkyTablePagination
                fields={titleVendor}
                data={dummyDataVendor}
                cellOption={valueType}
                changePage={handleChangePage}
              />
            </TabPanel>
            {/* TERMIN */}
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <ChkyTablePagination
                fields={titleListATM}
                data={dummyDataListATM}
                cellOption={valueType2}
                changePage={handleChangePage}
              />
            </TabPanel>
            {/* REPLACE */}
            <TabPanel value={valueTab} index={2} className={classes.tabContent}>
              <ChkyTablePagination
                fields={titleTaskList}
                data={dummyDataTaskList}
                cellOption={valueType3}
                changePage={handleChangePage}
              />
            </TabPanel>
            {/* MIGRASI */}
            <TabPanel value={valueTab} index={3} className={classes.tabContent}>
              <ChkyTablePagination
                fields={titleToken}
                data={dummyDataToken}
                cellOption={valueType4}
                changePage={handleChangePage}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Main))
);
