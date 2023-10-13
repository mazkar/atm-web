/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Grid, Tab, Tabs, Typography, Paper } from '@material-ui/core';
import * as ThemeColor from '../../assets/theme/colors';

import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import { ChkySearchBar, ChkyTablePagination } from '../../components/chky';
import { ChkyTrendChart } from '../../components';
import LoadingView from '../../components/Loading/LoadingView';
import Constants from '../../helpers/constants';
import { thousandFormat } from '../../helpers/useFormatter';
import useRupiahConverterSecondary from '../../helpers/useRupiahConverterSecondary';
import TrendTabContent from './TrendTabContent';
import FilterTrend from './FilterTrend';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
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
  },
  tableContent: { marginTop: 20 },
});
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
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: '24px 0px 0px 0px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const defaultFilterValue = {
  areaId: '',
  cityId: '',
  selectedTab: 'up',
};

function AnalyticData({ atmId }) {
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataForecast, setDataForecast] = useState([]); // <--- init Data Forecast
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [dataFilter, setDataFilter] = useState(defaultFilterValue);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const history = useHistory();
  const handleDetailAtm = (newValue) => {
    // console.log("atm id", newValue);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        {
          atmId: newValue,
        },
        config
      )
      .then((res) => {
        setModalLoader(false);
        if (res.data.statusCode === 200) {
          const dataInfo = res.data.data.infoAtm[0];
          localStorage.setItem('infoAtmDetail', JSON.stringify(dataInfo));
          history.push(`/trend-analisa/detail/${newValue}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setModalLoader(false);
        console.log('error', err);
        alert('Atm Id not available');
      });
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchDataForecast(0);
    setResetPageCounter((i) => i + 1);
  }, [atmId]);

  useEffect(() => {
    fetchDataForecast(currentPage);
  }, [dataFilter, orderBy, orderDirection, atmId, currentPage]);

  const fetchDataForecast = async (pageNumber) => {
    const forecastTable = [];
    // HIT API Data Forecast
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { districtId, cityId, medical } = dataFilter;

    const params = qs.stringify({
      pageNumber,
      dataPerPage: rowsPerPage,
      atmId,
      districtId,
      cityId,
      orderBy,
      orderDirection,
      medical
    })

    try {
      setModalLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/forecasting?${params}`,
        config
      );

      // console.log(result);
      const dataNewForecast = result.data.data.content;
      setTotalPages(result.data.data.totalPages);
      setTotalRows(result.data.data.totalElements);
      // eslint-disable-next-line array-callback-return
      dataNewForecast.map((row) => {
        const actionDetails = [{ name: 'Details', id: row.atmId, funct: handleDetailAtm }];
        const newForecast = {
          atmId: row.atmId,
          city: row.city,
          kecamatan: row.district,
          costYear: useRupiahConverterSecondary(row.costPerYear),
          transaction: thousandFormat(row.transaction),
          totalIssue: row.issue,
          targetTransaction: thousandFormat(row.targetTransaction),
          medical: row.medical,
          action: actionDetails,
        };
        // set constructed data
        forecastTable.push(newForecast);
      });
      setDataForecast(forecastTable);
      setModalLoader(false);
      // console.log(dataForecast);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setModalLoader(false);
    }
  };
  
  function handleFilter(filterNewValue) {
    // console.log(`===> Data Filter : ${JSON.stringify(filterNewValue)}`);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (filterNewValue === null) {
      setDataFilter(defaultFilterValue);
    } else {
      setDataFilter(filterNewValue);
    }
  }

  useEffect(() => {
    // console.log(`==> FORECAST${JSON.stringify(dataForecast)}`);
  }, [dataForecast]);

  const titleForecast = [
    'ATM ID',
    'City',
    'Kecamatan',
    'Cost/Year',
    'Transaction',
    'Total Issue',
    'Target Transaction',
    'Medical',
    'Action',
  ];
  const valueForecast = [
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

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleForecast.indexOf(property)]);
    };
  }

  return (
    <>
      <FilterTrend onFilterSubmit={handleFilter} />
      <ChkyTablePagination
        data={dataForecast}
        fields={titleForecast}
        cellOption={valueForecast}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        isLoadData={isOpenModalLoader}
        changePage={handleChangePage}
        resetPageCounter={resetPageCounter}
        isSort={isSort}
        isUsingMuiSort={true}
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
      />
    </>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(AnalyticData)));

const columnNameVar = [
  'atmId',
  'city',
  'district',
  'costPerYear',
  'transaction',
  'issue',
  'targetTransaction',
  'medical',
];

const isSort = [true, true, true, true, true, true, true, true];
