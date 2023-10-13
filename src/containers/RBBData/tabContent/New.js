/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination, StringAlign } from '../../../components/chky';
import FilterRbb from '../FilterRBB';

const useStyles = makeStyles({
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
  // modalLoader
  const [isLoadDataNew, setIsLoadDataNew] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  // default year
  const rowsPerPage = 10; // <--- init default rowsPerPage

  const [currentDue, setCurrentDue] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  // default hit data
  const [dataHit, setDataHit] = useState({
    dataPerPage: rowsPerPage,
    dueDate: currentDue,
  });

  const [dataNewRBB, setDataNewRBB] = useState([]);

  const configNew = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handleEditNewATM = (id) => {
    let rowID = { idRow: id };
    rowID = JSON.stringify(rowID);
    localStorage.setItem('rowIdEditNewAtm', rowID);
    history.push(`rbb-edit-new/${id}`);
    // console.log(` ini ID = ${id}`);
  };

  useEffect(() => {
    hitApiDataNew();
    // console.log('~ dataHit', dataHit);
  }, [dataHit, orderBy, orderDirection, currentPage]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleFilter(newValue) {
    // console.log('~ newValue', newValue);
    setResetCounter((prevVal) => prevVal + 1);
    handleChangePageValue(0);
    if (newValue) {
      setDataHit(newValue);
      setCurrentPage(0);
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

  const hitApiDataNew = async () => {
    setIsLoadDataNew(true);
    const newData = [];
    const { mesin, status, areaId, cityId } = dataHit;
    const dataHitNew = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId,
      cityId,
      mesin: mesin || 'All',
      status: status ? status + '' : 'All',
      ...(orderBy && { orderBy, orderDirection }),
    };
    // console.log("Cek data New", dataHitNew);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewNewAtmData`,
        dataHitNew,
        configNew
      );
      // console.log("Data request New", result);

      try {
        const { content } = result.data;
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);
        content.map((row) => {
          const actionNew = [
            {
              name: 'Edit',
              id: row.id,
              funct: handleEditNewATM,
            },
          ];
          const newRow = {
            id: row.atmId || '-',
            oldLocation: <StringAlign align='left' value={row.oldLocation} />,
            city: row.newCity,
            areaName: row.areaName,
            newRbbReason: row.newRbbReason,
            newLocation: <StringAlign align='left' value={row.newLocation} />,
            submissionDate: dateConverter(row.submissionDate),
            biOpeningReportDate: dateConverter(row.biOpeningReportDate),
            machineType: row.machineType,
            status: row.status === null ? '-' : `${row.status}`,
            oldCity: row.oldCity,
            remark: row.remark,
            action: actionNew,
          };
          newData.push(newRow);
        });
      } catch (err) {
        setIsLoadDataNew(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
      setDataNewRBB(newData);
      setIsLoadDataNew(false);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadDataNew(false);
    }
  };

  const isSort = [true, true, true, true, true, true, true, true, true, true, true, true];

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTableNew.indexOf(property)]);
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FilterRbb onFilterSubmit={handleFilter} type='New' withMesin withStatus />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataNewRBB}
          fields={titleTableNew}
          cellOption={valueTypeNew}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadDataNew}
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

// [2]getDataNewRBB
const titleTableNew = [
  'Old ID',
  'Old Location',
  'City',
  'PIC',
  'Alasan Masuk RBB',
  'New Location',
  'Tgl Submission',
  'Tgl Lapor BI',
  'Mesin',
  'Status',
  'City Asli',
  'Remark',
  '',
];

const columnNameVar = [
  'locationId',
  'oldLocation',
  'newCity',
  'areaName',
  'newRbbReason',
  'newLocation',
  'submissionDate',
  'biOpeningReportDate',
  'machineType',
  'status',
  'oldCity',
  'remark',
];

const valueTypeNew = [
  'string',
  'child',
  'string',
  'string',
  'string',
  'child',
  'string',
  'string',
  'string',
  'statusRbb_Implementation', // utk status yang belum ada data dan jika ada bisa diubah
  'string',
  'string',
  'modal',
];
