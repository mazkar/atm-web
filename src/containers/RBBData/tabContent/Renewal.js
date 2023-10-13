/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination, StringAlign } from '../../../components/chky';
import constansts from '../../../helpers/constants';
import FilterRbb from '../FilterRBB';

const useStyles = makeStyles({
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constansts.color.dark,
  },
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const defYear = moment().year();

const RbbData = () => {
  const classes = useStyles();
  const history = useHistory();
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  // =========> FETCHING DATA
  // modalLoader
  const [isLoadDataRenewal, setIsLoadDataRenewal] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  // default year
  const [currentYear, setCurrentYear] = useState(defYear);

  const rowsPerPage = 10; // <--- init default rowsPerPage

  const [currentAreaName, setCurrentAreaName] = useState('All');
  const [currentCity, setCurrentCity] = useState('All');
  const [currentDue, setCurrentDue] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  // default hit data
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
    year: currentYear,
    areaName: currentAreaName,
    dueDate: currentDue,
    city: currentCity,
  });

  const [dataRenewal, setDataRenewal] = useState([]);

  const configNew = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handleEditRenew = (id) => {
    let rowID = { idRow: id };
    rowID = JSON.stringify(rowID);
    localStorage.setItem('rowIdEditRenew', rowID);
    history.push(`rbb-edit-renew/${id}`);
    // console.log(` ini ID = ${id}`);
  };

  useEffect(() => {
    hitApiDataRenewal();
  }, [dataHit, orderBy, orderDirection]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
      year: currentYear,
    });
  }

  function handleFilter(newValue) {
    console.log('~ newValue', newValue);
    setResetCounter((prevVal) => prevVal + 1);
    handleChangePageValue(0);
    if (newValue) {
      setCurrentYear(newValue?.tahun || defYear);
      setCurrentPage(0);
      setDataHit(newValue);
      setCurrentAreaName(newValue.areaName);
      setCurrentCity(newValue.city);
      setCurrentDue(newValue.dueDate);
    }
  }

  const dateConverter = (tanggal) => {
    if (tanggal) {
      const timestamp = moment.unix(tanggal / 1000);
      return timestamp.format('DD/MM/YYYY');
    }
    return '-';
  };

  const hitApiDataRenewal = async () => {
    setIsLoadDataRenewal(true);
    const renewalData = [];
    const { cityId, areaId, atmId } = dataHit;
    const dataHitRenew = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId,
      cityId,
      dueDate: currentDue,
      ...(orderBy && { orderBy, orderDirection }),
      ...(atmId && { atmId }), // opo iki maksud.e???
    };
    // console.log("Cek data Renewal", dataHitRenew);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewRenewalAtmData`,
        dataHitRenew,
        configNew
      );
      // console.log("ini data result renewal", result);

      try {
        const dataRenewRBB = result.data.content;
        // console.log('ini data renewal pre', dataRenewRBB);
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);

        dataRenewRBB.map((row) => {
          const actionRenew = [
            {
              name: 'Edit',
              id: row.id,
              funct: handleEditRenew,
            },
          ];
          const newRow = {
            atmId: row.atmId,
            areaName: row.areaName,
            picSite: row.picSite,
            locationName: <StringAlign align='left' value={row.locationName} />,
            dueDate: dateConverter(row.dueDate),
            renewalCompletedDate:
              row.renewalCompletedDate === null ? '-' : dateConverter(row.renewalCompletedDate),
            remark: row.remark,
            action: actionRenew,
          };
          renewalData.push(newRow);
        });
      } catch (err) {
        setIsLoadDataRenewal(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
      setDataRenewal(renewalData);
      setIsLoadDataRenewal(false);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadDataRenewal(false);
    }
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTableRenewal.indexOf(property)]);
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FilterRbb onFilterSubmit={handleFilter} type='Renewal' withAtmId />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataRenewal}
          fields={titleTableRenewal}
          cellOption={valueTypeRenewal}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadDataRenewal}
          changePage={handleChangePageValue}
          resetPageCounter={resetCounter}
          isSort={isSort}
          isUsingMuiSort={true}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
        />
      </div>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(RbbData)));

const titleTableRenewal = [
  'ATM ID',
  'PIC Area',
  'PIC Site',
  'Location',
  'Tgl Jatuh Tempo',
  'Tgl Selesai Renewal',
  'Remark',
  '',
];

const valueTypeRenewal = [
  'string',
  'string',
  'string',
  'child',
  'string',
  'string',
  'string',
  'modal',
];

const isSort = [true, true, true, true, true, true, true];

const columnNameVar = [
  'atmId',
  'areaName',
  'picSite',
  'locationName',
  'dueDate',
  'renewalCompletedDate',
  'remark',
];
