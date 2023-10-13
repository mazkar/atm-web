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
import Filter from './FilterTrend';
import LoadingView from '../../components/Loading/LoadingView';
import Constants from '../../helpers/constants';
import { thousandFormat } from '../../helpers/useFormatter';
import useRupiahConverterSecondary from '../../helpers/useRupiahConverterSecondary';

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

const defaultFilterValue = {
  areaId: '',
  cityId: '',
  selectedTab: 'up',
};

function AnalyticData({ atmId }) {
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  const [dataFilter, setDataFilter] = useState(defaultFilterValue);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchDataTrend(0);
    setResetPageCounter((i) => i + 1);
  }, [atmId]);

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
    fetchDataTrend(currentPage);
  }, [dataFilter, orderBy, orderDirection, atmId, currentPage]);

  const fetchDataTrend = async (pageNumber) => {
    const dataToSet = [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const { districtId, cityId, selectedTab, medical } = dataFilter;

    const params = qs.stringify({
      pageNumber,
      dataPerPage: rowsPerPage,
      atmId,
      districtId,
      cityId,
      trendCategory: selectedTab,
      orderBy,
      orderDirection,
      medical
    });

    // HIT API Data Trend
    try {
      setModalLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/trends?${params}`,
        config
      );

      // console.log(result);
      const dataNewPre = result.data.data.content;
      setTotalPages(result.data.data.totalPages);
      setTotalRows(result.data.data.totalElements);
      // eslint-disable-next-line array-callback-return
      dataNewPre.map((row) => {
        const actionDetails = [{ name: 'Details', id: row.atmId, funct: handleDetailAtm }];
        const newRow = {
          atmId: row.atmId,
          city: row.cityName,
          kecamatan: row.districtName,
          transaction: thousandFormat(row.totalAmount),
          totalIssues: row.totalIssue,
          targetTransaction: thousandFormat(row.targetTransaction),
          medical: row.medical,
          trend: row.trend,
          action: actionDetails,
        };
        // set constructed data
        dataToSet.push(newRow);
      });
      setDataTable(dataToSet);
      setModalLoader(false);
      // console.log(dataTable);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setModalLoader(false);
    }
  };

  const titleTable = [
    'ATM ID',
    'City',
    'Kecamatan',
    'Transaction',
    'Total Issue',
    'Target Transaction',
    'Medical',
    'Trend',
    'Action',
  ];
  const valueType = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'trendData',
    'modal',
  ];

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
    };
  }

  return (
    <>
      <Filter withUpDown onFilterSubmit={handleFilter} />
      <ChkyTablePagination
        data={dataTable}
        fields={titleTable}
        cellOption={valueType}
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
  'cityName',
  'districtName',
  'totalAmount',
  'totalIssue',
  'targetTransaction',
  'medical',
  'trend',
];

const isSort = [true, true, true, true, true, true, true, true];
