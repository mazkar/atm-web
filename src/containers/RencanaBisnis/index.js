/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  List,
} from '@material-ui/core';
import axios from 'axios';
import { map } from 'lodash';
import TitleAndSearch from '../../components/Title/TitleAndSearch/TitleSearchLeftIcon';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import * as ThemeColor from '../../assets/theme/colors';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';
import {
  dataTablePembukaan,
  dataTablePenutupan,
  dataTableHistories,
  dataTableSummary,
} from './dataDummy';
import DynamicTableSummary from '../../components/DynamicTableSummary';
import DynamicTablePagination from '../../components/DynamicTablePagination';
import { ReactComponent as HistoryIcon } from '../../assets/images/icon_history_red.svg';
import HistoryItem from '../../components/HistoryItem';
import ModalUpload from './ModalUpload';
import ModalLoader from '../../components/ModalLoader';
import { ChkyTablePagination } from '../../components/chky';
import constansts from '../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  tabContent: {
    '& .MuiBox-root': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  historyContainer: {
    padding: 10,
    height: '100%',
  },
  historyTitle: {
    display: 'flex',
  },
  historyList: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
  },
  tombolAdd: { textAlign: 'right' },
});

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

const RencanaBisnis = () => {
  const classes = useStyles();

  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  // MODAL UPLOAD NEW
  const [OpenModalUploadNew, setOpenModalUploadNew] = React.useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);

  // MODAL UPLOAD TERMIN
  const [OpenModalUploadTermin, setOpenModalUploadTermin] = React.useState(
    false
  );
  const handleOpenModalUploadTermin = () => setOpenModalUploadTermin(true);
  const handleCloseModalUploadTermin = () => setOpenModalUploadTermin(false);

  const handleUploadNewRBB = () => {
    // eslint-disable-next-line no-console
    handleOpenModalUploadNew();
    // alert('Button New RBB Clicked');
  };

  const handleUploadTermin = () => {
    // eslint-disable-next-line no-console
    handleOpenModalUploadTermin();
    // alert('Button Termin ATM Clicked');
  };

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // [1]getDataNewMaster
  const [dataNewMaster, setDataNewMaster] = useState([]); // <--- init dataNewMaster array
  useEffect(() => {
    const fetchDataMaster = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewNewAtmData`,
          {
            pageNumber: 0,
            dataPerPage: 10,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        alert(JSON.stringify(result));
      } catch (err) {
        alert(err);
      }
    };
    fetchDataMaster();
  }, []);

  useEffect(async () => {
    const dataTable = [];
    const dataHit = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
    };
    // START [1]getDataNewMaster
    try {
      console.log(`<<< CEKPoint A`);
      setModalLoader(true);
      const result = await axios.post(`${constansts.apiHost}/viewNewAtmData`, {
        pageNumber: 0,
        dataPerPage: 10,
      });
      console.log(`<<< CEKPoint B => ${JSON.stringify(result)}`);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data New Master...! \n ${error}`);
    }
    // END [1]getDataNewMaster
  }, []);

  // =========> START FETCHING DATA
  // [1]getDataNewRBB
  const [dataNewRBB, setDataNewRBB] = useState([]); // <--- init dataNewRBB array
  // [2]getDataTerminRBB
  const [dataTerminRBB, setDataTerminRBB] = useState([]); // <--- init dataTerminRBB array
  // [3]getDataHistories
  const [dataHistories, setDataHistories] = useState([]); // <--- init dataHistories array
  // [[4]getDataSummary
  const [dataSummary, setDataSummary] = useState([]); // <--- init dataSummary array

  // init title and value type table for New Master Data
  // [1]getDataNewRBB
  const titleTableNew = [
    'ID',
    'Old Location',
    'City',
    'PIC',
    'Alasan Masuk RBB',
    'New Location',
    'Tgl Submission',
    'Tgl Lapor BI',
    'Mesin',
    'City Asli',
    '',
  ];
  const valueTypeNew = [
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
    'menu',
  ];

  // [2]getDataTerminRBB
  const titleTableTermin = [
    'Mesin',
    'ID',
    'Location',
    'City',
    'PIC',
    'Simple Reason',
    'Jabo/Out',
    'Tgl Tarik Ramlan',
    'Tgl Lapor BI',
    'Due',
    '',
  ];
  const valueTypeTermin = [
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
    'menu',
  ];

  // [3]getDataHistories
  const titleTableHistories = [
    'Date',
    'Time',
    'PIC',
    'New Loc',
    'Reopen',
    'New Branch/DL',
  ];
  const valueTypeHistories = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
  ];

  // [4]getDataSummary
  const titleTableSummary = [
    'Row Labels',
    'Target',
    'Sisa Target',
    'Submission',
    'Sudah Lapor BI',
    'Sisa Lapor BI',
  ];

  useEffect(async () => {
    const newData = [];
    const terminData = [];

    // START [1]getDataNewRBB
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/masterData/new',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      });
      try {
        // reconstruct data from DB to dataNewRBB
        const dataNewPre = result.data.data;

        // eslint-disable-next-line array-callback-return
        dataNewPre.map((row) => {
          const actionPembukaan = [
            // { name: 'View Detail', url: `/rencana-bisnis/detail-pembukaan/${row.id}`, type:'view' },
            {
              name: 'Update',
              url: `/rencana-bisnis/new/update/${row.id}`,
              type: 'edit',
            },
            {
              name: 'Delete',
              url: `/rencana-bisnis/new/delete/${row.id}`,
              type: 'delete',
            },
          ];
          const newRow = {
            ...row,
            action: actionPembukaan,
          };
          newData.push(newRow);
        });
      } catch {
        setModalLoader(false);
        alert(`Error Re-Construct Data New...!`);
      }
      console.log(
        `========> Data AFTER RECONSTRUCTION ${JSON.stringify(newData)}`
      );
      setDataNewRBB(newData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data New...!`);
    }
    // END [1]getDataNewRBB

    // START [2]getDataTerminRBB
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/masterData/termin',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      });
      try {
        // reconstruct data from DB to dataTerminRBB
        const dataTerminPre = result.data.data;

        // eslint-disable-next-line array-callback-return
        dataTerminPre.map((row) => {
          const actionPenutupan = [
            // { name: 'View Detail', url: `/rencana-bisnis/detail-penutupan/${row.id}`, type:'view' },
            {
              name: 'Update',
              url: `/rencana-bisnis/termin/update/${row.id}`,
              type: 'edit',
            },
            {
              name: 'Delete',
              url: `/rencana-bisnis/termin/delete/${row.id}`,
              type: 'delete',
            },
          ];
          const newRow = {
            ...row,
            action: actionPenutupan,
          };
          terminData.push(newRow);
        });
      } catch {
        setModalLoader(false);
        alert(`Error Re-Construct Data Termin...!`);
      }
      console.log(
        `========> Data TERMIN AFTER RECONSTRUCTION ${JSON.stringify(
          terminData
        )}`
      );
      setDataTerminRBB(terminData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Termin...!`);
    }
    // END [2]getDataTerminRBB

    // START [3]getDataHistories
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/masterData/histories',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      });
      const dataHistoriesPre = result.data.data;
      setDataHistories(dataHistoriesPre);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Histories...!`);
    }
    // END [3]getDataHistories

    // START [4]getDataSummary
    try {
      setModalLoader(true);
      const result = await axios({
        url: 'https://atmbusiness.getsandbox.com:443/masterData/summary',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        data: {},
      });
      const dataSummaryPre = result.data.data;
      setDataSummary(dataSummaryPre);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      alert(`Error Fetching Data Histories...!`);
    }
    // END [4]getDataSummary
  }, []);

  // END FETCHING DATA =========>

  return (
    <div className={classes.root}>
      <TitleAndSearch
        title="Master Data"
        searchPlaceholder="Pencarian berdasarkan lokasi atau ATM ID"
      />
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid>
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="content tabs"
            >
              <ContentTab label="New ATM" {...a11yProps(0)} />
              <ContentTab label="Termin ATM" {...a11yProps(1)} />
              <ContentTab label="History" {...a11yProps(2)} />
              <ContentTab label="Summary" {...a11yProps(3)} />
            </ContentTabs>
          </Grid>
          <Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {valueTab === 0 && (
                <MuiIconLabelButton
                  style={{ marginBottom: 20, width: 175, right: 0 }}
                  label="Upload New RBB"
                  iconPosition="startIcon"
                  onClick={() => {
                    handleUploadNewRBB();
                  }}
                  buttonIcon={<PlusWhite />}
                />
              )}
              {valueTab === 1 && (
                <MuiIconLabelButton
                  style={{ marginBottom: 20, width: 175, right: 0 }}
                  label="Upload Termin RBB"
                  iconPosition="startIcon"
                  onClick={() => {
                    handleUploadTermin();
                  }}
                  buttonIcon={<PlusWhite />}
                />
              )}
            </div>
          </Grid>
        </Grid>
        <TabPanel value={valueTab} index={0} className={classes.tabContent}>
          <ChkyTablePagination
            data={dataNewRBB}
            fields={titleTableNew}
            cellOption={valueTypeNew}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1} className={classes.tabContent}>
          <DynamicTablePagination
            data={dataTerminRBB}
            fields={titleTableTermin}
            cellOption={valueTypeTermin}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={2} className={classes.tabContent}>
          <DynamicTablePagination
            data={dataHistories}
            fields={titleTableHistories}
            cellOption={valueTypeHistories}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={3} className={classes.tabContent}>
          <DynamicTableSummary
            data={dataTableSummary}
            fields={titleTableSummary}
          />
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      <ModalUpload
        isOpen={OpenModalUploadNew}
        onClose={handleCloseModalUploadNew}
        onLeave={() => {
          handleCloseModalUploadNew();
        }}
        mode="New"
      />

      <ModalUpload
        isOpen={OpenModalUploadTermin}
        onClose={handleCloseModalUploadTermin}
        onLeave={() => {
          handleCloseModalUploadTermin();
        }}
        mode="Termin"
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RencanaBisnis))
);
