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
import { ChkyTablePagination, StringAlign } from '../../../components/chky';
import constansts from '../../../helpers/constants';
import moment from 'moment';
import FilterRBB from '../FilterRBB';

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

const RbbData = () => {
  const classes = useStyles();
  const history = useHistory();
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  // =========> FETCHING DATA
  const [isLoadDataTermin, setIsLoadDataTermin] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  // default year
  const rowsPerPage = 10; // <--- init default rowsPerPage

  const [currentAreaName, setCurrentAreaName] = useState('All');
  const [currentCity, setCurrentCity] = useState('All');
  const [currentDue, setCurrentDue] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  // default hit data
  const [dataHit, setDataHit] = useState({
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,
    areaName: currentAreaName,
    dueDate: currentDue,
    city: currentCity,
  });

  // =========> START FETCHING DATA
  // [1]getDataOverview
  // [[4]getDataTerminRBB
  const [dataTermin, setDataTermin] = useState([]); // <--- init dataTermin array

  // init title and value type table for New Master Data

  const configNew = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handleEditTermin = (id) => {
    let rowID = { idRow: id };
    rowID = JSON.stringify(rowID);
    localStorage.setItem('rowIdEditTermin', rowID);
    history.push(`rbb-edit-termin/${id}`);
    // console.log(` ini ID = ${id}`);
  };

  useEffect(() => {
    hitApiDataTermin();
  }, [dataHit, orderBy, orderDirection]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
    });
  }

  function handleFilter(newValue) {
    // console.log('~ newValue', newValue)
    setResetCounter((prevVal) => prevVal + 1);
    handleChangePageValue(0);
    if (newValue) {
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

  const hitApiDataTermin = async () => {
    setIsLoadDataTermin(true);
    const terminData = [];
    const { areaId, cityId, atmId, mesin } = dataHit;
    const dataHitTerm = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId,
      cityId,
      ...(atmId && { atmId }),
      ...(mesin && { mesin }),
      dueDate: currentDue,
      ...(orderBy && { orderBy, orderDirection }),
    };
    // console.log("Cek data Termin", dataHitTerm);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewCloseAtmData`,
        dataHitTerm,
        configNew
      );
      // console.log("ini data termin", result);

      try {
        const dataTerminPre = result.data.content;
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);

        dataTerminPre.map((row) => {
          const actionTermin = [
            {
              name: 'Edit',
              id: row.id,
              funct: handleEditTermin,
            },
          ];
          const newRow = {
            machineType: row.machineType,
            atmId: row.atmId,
            locationName: <StringAlign align='left' value={row.locationName} />,
            city: row.city,
            areaName: row.areaName,
            closingRbbReason: row.closingRbbReason,
            jaboOut: row.jaboOut,
            machineRevokeDate: dateConverter(row.machineRevokeDate),
            biClosingReportDate: dateConverter(row.biClosingReportDate),
            dueDate: dateConverter(row.dueDate),
            remark: row.remark,
            action: actionTermin,
          };
          terminData.push(newRow);
        });
      } catch (err) {
        setIsLoadDataTermin(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
      setDataTermin(terminData);
      setIsLoadDataTermin(false);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadDataTermin(false);
    }
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTableTermin.indexOf(property)]);
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FilterRBB onFilterSubmit={handleFilter} type='Termin' withAtmId withMesin />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataTermin}
          fields={titleTableTermin}
          cellOption={valueTypeTermin}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadDataTermin}
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

// [4]getDataTermin
const titleTableTermin = [
  'Mesin',
  'ATM ID',
  'Location',
  'City',
  'PIC',
  'Reason',
  'Jabo/Out Region',
  'Tgl Tarik Mesin',
  'Tgl Lapor BI',
  'Tgl Jatuh Tempo',
  'Remark',
  '',
];

const valueTypeTermin = [
  'string',
  'string',
  'child',
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

const isSort = [true, true, true, true, true, true, true, true, true, true, true];

const columnNameVar = [
  'machineType',
  'atmId',
  'locationName',
  'city',
  'areaName',
  'closingRbbReason',
  'jaboOut',
  'machineRevokeDate',
  'biClosingReportDate',
  'dueDate',
  'remark',
];
