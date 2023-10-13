/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import TitleAndSearch from '../../components/Title/TitleAndSearch/TitleSearchLeftIcon';
import LongCardSummary from '../../components/Card/MuiLongCard/LongCardSummary';
import Filter from '../../components/GeneralComponent/Filter';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import TableCellOption from '../../components/TabelCellOptions';
import ModalLoader from '../../components/ModalLoader';
import Tachometer from '../../assets/images/SideMenu/tachometer.svg';
import * as ThemeColor from "../../assets/theme/colors";
import {
  ChkyTablePagination,
} from '../../components/chky';
import FilterProcurement from './FilterProcurement';
import constansts from '../../helpers/constants';
import { a11yProps, ContentTab, ContentTabs, TabPanel } from '../../components/MaterialTabs';
import useRupiahConverterSecondary from '../../helpers/useRupiahConverterSecondary';
import ChildTieringList from '../../components/chky/TableChild/ChildTieringList';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },

  tableData: {
    marginTop: 10
  },
  titleSearch: { marginBottom: 15 },
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
});

const Overview = () => {
  const classes = useStyles();

  const [isOpenModalLoader, setModalLoarder] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [idLocation, setIdLocation] = useState();
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const history = useHistory();
  const [dataProcurement, setDataProcurement] = useState([]);
  const [dataProcurementApproved, setDataProcurementApproved] = useState([]);
  const [search, setSearch] = useState();
  const [selectedRow, setSelectedRow] = useState('');
  const [isLoadData, setIsLoadData] = useState(true);  // Init TABS Value
  const [valueTab, setValueTab] = useState(0);
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // default hit data
  const [dataHit, setDataHit] = useState({
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    cityId: "All",
    provinceId: "All",
    districtId: "All",
    locationName: null,
  });

  const titleTable = ['ATM ID', 'Location', 'Type', 'Harga Penawaran', 'Harga Kesepakatan', 'CAGR %', 'Status', 'Progress', 'Last Update', 'Requester', ''];

  const valueType = ['string', 'string', 'string', 'child', 'child', 'string', 'string', 'progress_procurement', 'string', 'string', 'modal'];

  const idrCurrencyFormat = (value, delimiter) => {
    return `Rp ${value.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
  };

  function testudo(data) {
    window.location.assign(`/procurement/detail?isApproved=false#${data}`);
    // console.log("ini loc",data);
  }
  function handleDetailApproved(data){
    window.location.assign(`/procurement/detail?isApproved=true#${data}`);
  }

  // check url hash
  const windowsHash = window.location.hash;
  useEffect(() => {
    // console.log("HASH: ",windowsHash);
    setOrderBy(null)
    setSortBy(null)
    setOrderDirection('ASC')
    switch (windowsHash) {
      case "#waiting":
        setValueTab(0);
        break;
      case "#approval":
        setValueTab(1);
        break;
      default:
        setValueTab(0);
      }
  }, [windowsHash]);

  useEffect(() => {
    const procureData = [];
    const fetchDataMaster = async () => {
      console.log("+++ HIT WAITING APPROVE");
      try {
        setModalLoarder(true);
        setIsLoadData(true);
        const result = await Axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getProcurementList`,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
          data: {
            ...dataHit,
            ...(orderBy && {orderBy, orderDirection})
          },
          method: "POST"
        });
        // console.log(`>>>> data ${JSON.stringify(dataPro)}  Fetched ${JSON.stringify(result)} `);
        // console.log('ini data result ', result);

        try {
          const dataNewProcure = result.data.content;
          // console.log('ini data newprocure', dataNewProcure);
          dataNewProcure.map((row) => {
            // console.log('ini data row', row);
            const actionData = [
              { name: 'Detail', id: row.idSiteNewAtm, funct: testudo },
            ];
            const newRow = {
              atmId: row.type == 'New ATM' || row.type == 'Reopen' ? '-' : row.atmId,
              locationName: row.locationName,
              statusType: row.type,
              hargaPenawaran: <ChildTieringList array={JSON.parse(row.yearlyRentCostList)} />,
              hargaKesepakatan: <ChildTieringList array={JSON.parse(row.negotiationDealCostList)} />,
              cagr: row.cagr.toFixed(2),
              status: constansts.getStatusProcurement(row.status),
              progress: constansts.progressProcurement(row.progress),
              lastUpdate: moment(row.lastUpdate).format('DD/MM/YYYY'),
              requester: row.requester,
              action: actionData
            };
            procureData.push(newRow);
          });

        } catch (err) {
          setModalLoarder(false);
          setIsLoadData(false);
          alert(`Error Re-Construct Data New...! \n${err}`);
        }
        setDataProcurement(procureData);
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);
        // setIdLocation(idLoc);
        setModalLoarder(false);
        setIsLoadData(false);
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoarder(false);
        setIsLoadData(false);
      }
    };

    // DATA APPROVED
    const fetchDataMasterApproved = async () => {
      console.log("+++ HIT APPROVED");
      try {
        setModalLoarder(true);
        setIsLoadData(true);
        const result = await Axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getProcurementApprovalList`,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
          data: {
            ...dataHit,
            ...(orderBy && {orderBy, orderDirection})
          },
          method: "POST"
        });
        // console.log(`>>>> data ${JSON.stringify(dataPro)}  Fetched ${JSON.stringify(result)} `);
        // console.log('ini data result ', result);

        try {
          const dataNewProcure = result.data.content;
          // console.log('ini data newprocure', dataNewProcure);
          dataNewProcure.map((row) => {
            // console.log('ini data row', row);
            const actionData = [
              { name: 'Detail', id: row.idSiteNewAtm, funct: handleDetailApproved },
            ];
            const newRow = {
              atmId: row.type == 'New ATM' || row.type == 'Reopen' ? '-' : row.atmId,
              locationName: row.locationName,
              statusType: row.type,
              hargaPenawaran: <ChildTieringList array={JSON.parse(row.yearlyRentCostList)} />,
              hargaKesepakatan: <ChildTieringList array={JSON.parse(row.negotiationDealCostList)} />,
              cagr: row.cagr,
              status: constansts.getStatusProcurement(row.status),
              progress: constansts.progressProcurement(row.progress),
              lastUpdate: moment(row.lastUpdate).format('DD/MM/YYYY'),
              requester: row.requester,
              action: actionData
            };
            procureData.push(newRow);
          });

        } catch (err) {
          setModalLoarder(false);
          setIsLoadData(false);
          alert(`Error Re-Construct Data New...! \n${err}`);
        }
        setDataProcurementApproved(procureData);
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);
        // setIdLocation(idLoc);
        setModalLoarder(false);
        setIsLoadData(false);
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoarder(false);
        setIsLoadData(false);
      }
    };

    if(valueTab === 0){
      fetchDataMaster();
    }else{
      fetchDataMasterApproved();
    }
  }, [dataHit, valueTab, orderBy, orderDirection]);

  function handleChangePageValue(newPage) {
    setDataHit({
      ...dataHit,
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
    });
  }

  function handleFilter(newValue) {
    setResetPageCounter(c=>c+1)
    if (newValue !== null) {
      // setMachineTypes(newValue.population);
      const newType = newValue.type
      setDataHit({
        pageNumber: 0,
        dataPerPage: rowsPerPage,
        provinceId: newValue.provinceId === "" ? 'All': newValue.provinceId,
        cityId: newValue.cityId === "" ? 'All': newValue.cityId,
        districtId: newValue.districtId === "" ? 'All': newValue.districtId,
        locationName: newValue.locationName === "" ? null : newValue.locationName,
        ...(newType !== 'All' ? {type: newType} : null)
      });
    }
    else{
      setDataHit({
        pageNumber: 0,
        dataPerPage: rowsPerPage,
        cityId: "All",
        provinceId: "All",
        districtId: "All",
        locationName: null,
      });
    }
    // console.log(newValue);
  }

  const handleChangeTab = (event, newValueTab) => {
    setResetPageCounter(prevCount=>prevCount+1);
    setValueTab(newValueTab);
    setDataHit(prevState => {
      return {...prevState, pageNumber: 0,};
    });
    // Inject Hash
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "waiting";
      setValueTab(0);
    }
    if (newValueTab === 1) {
      hashTab = "approval";
      setValueTab(1);
    }
    history.replace(`#${hashTab}`);
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
    };
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleSearch}>
        <Typography className={classes.title}>Procurement</Typography>
      </div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          {/* TABS */}
          <ContentTabs value={valueTab} onChange={handleChangeTab} aria-label="content tabs">
            <ContentTab label="Waiting Approval" {...a11yProps(0)} style={{minWidth:100}} />
            <ContentTab label="Approved" {...a11yProps(1)} style={{minWidth:100}}/>
          </ContentTabs>
        </Grid>
        {/* TAB PANEL CONTENT */}
        <Grid item style={{width: '-webkit-fill-available'}}>
          <TabPanel value={valueTab} index={0} className={classes.tabContent}>
            <div className={classes.filterContainer}>
              <FilterProcurement onFilterSubmit={handleFilter} />
            </div>
            <div className={classes.tableContent}>
              <ChkyTablePagination
                data={dataProcurement}
                fields={titleTable}
                cellOption={valueType}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoadData}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                leftAlignBody={[1]}
                isSort={isSort}
                isUsingMuiSort={true}
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
              />
            </div>
          </TabPanel>
          <TabPanel value={valueTab} index={1} className={classes.tabContent}>
            <div className={classes.filterContainer}>
              <FilterProcurement onFilterSubmit={handleFilter} />
            </div>
            <div className={classes.tableContent}>
              <ChkyTablePagination
                data={dataProcurementApproved}
                fields={titleTable}
                cellOption={valueType}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoadData}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                leftAlignBody={[1]}
                isSort={isSort}
                isUsingMuiSort={true}
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
              />
            </div>
          </TabPanel>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);

const isSort = [true, true, true, false, false, true, true, true, true, true,];

const columnNameVar = [
  'atm_id',
  'new_location',
  'opening_type',
  '',
  '',
  'cagr',
  'negotiation_status',
  'status',
  'last_update',
  'requester',
]