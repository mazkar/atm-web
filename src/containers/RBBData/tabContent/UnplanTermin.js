/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Link } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination, ModalInfo, StringAlign } from '../../../components/chky';
import FilterRbb from '../FilterRBB';
import { ReactComponent as GreenCheckIcon } from '../../../assets/icons/general/green_check_circle.svg';
import ModalLoader from '../../../components/ModalLoader';
import ApprovedChip from '../components/ApprovedChip';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/planning/g) || [];
    if (result.length) {
      return result[0];
    }
    return value;
  }
};

const RbbData = () => {
  const history = useHistory();
  const roleName = window.sessionStorage.getItem('roleName');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');
  const classes = useStyles();

  const [isOpenUnplanApproveModal, setIsOpenApproveModal] = useState(false);
  const [unplanApproveMessage, setUnplanApproveMessage] = useState('');
  const [unplanApproveTitle, setUnplanApproveTitle] = useState('');
  const [modalType, setModalType] = useState('');

  // =========> FETCHING DATA
  // modalLoader
  const [isLoadDataUnplan, setIsLoadDataUnplan] = useState(false);
  const [isOpenModalLoader2, setModalLoader2] = useState(false);
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
  // [[5]getDataUnplanTerminRBB
  const [dataUnplan, setDataUnplan] = useState([]); // <--- init dataUnplan array
  const configNew = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handleApproveUnplanTermin = (id, status) => {
    // console.log(matchRoleName(roleName));
    // alert(id);
    const doApprove = async () => {
      if (window.confirm('Are you sure want to Approve this unplan termin?')) {
        try {
          setModalLoader2(true);
          const result = await axios.post(
            `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/approveUnplanTermin`,
            { id },
            configNew
          );
          // console.log("++++ approveUnplanTermin",JSON.stringify(result));
          if (result) {
            if (result.data.statusCode === 200) {
              setModalType('success');
              setUnplanApproveTitle('Approval Success');
              setUnplanApproveMessage('Unplan Termin Aprove Successfully, Reload Page!');
              setIsOpenApproveModal(true);
            } else {
              setModalType('failed');
              setUnplanApproveTitle('Approval Failed');
              setUnplanApproveMessage('Unplan Termin Aprove Failed, Please Try Again!');
              setIsOpenApproveModal(true);
            }
          } else {
            setModalType('failed');
            setUnplanApproveTitle('Approval Failed');
            setUnplanApproveMessage('Unplan Termin Aprove Failed, Please Try Again!');
            setIsOpenApproveModal(true);
          }
          setModalLoader2(false);
        } catch (err) {
          setModalLoader2(false);
          setModalType('info');
          setUnplanApproveTitle('Something Wrong!');
          setUnplanApproveMessage('Unplan Termin Aprove Failed, Please Try Again!');
          setIsOpenApproveModal(true);
        }
      }
    };
    return (
      <div>
        {status === 0 ? (
          <Link
            component='button'
            onClick={matchRoleName(roleName) === 'planning' ? doApprove : () => {}}
            style={{
              color: matchRoleName(roleName) === 'planning' ? '#DC241F' : '#dddd',
              textDecoration: 'none',
              fontSize: 13,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Approve
          </Link>
        ) : (
          <ApprovedChip />
        )}
      </div>
    );
  };

  useEffect(() => {
    hitApiDataUnplan();
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

  const handleEditRenew = (id) => {
    let rowID = { idRow: id };
    rowID = JSON.stringify(rowID);
    localStorage.setItem('rowIdEditUnplanTermin', rowID);
    history.push(`rbb-edit-unplan-termin/${id}`);
    //console.log("ini ID =", id);
  };

  const hitApiDataUnplan = async () => {
    setIsLoadDataUnplan(true);
    const unplanData = [];
    const { cityId, areaId, mesin, atmId } = dataHit;
    const dataHitUnplan = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId,
      cityId,
      mesin: mesin || 'All',
      dueDate: currentDue,
      ...(atmId && { atmId }),
      ...(orderBy && { orderBy, orderDirection }),
    };
    // console.log("Cek data Unplan", dataHitUnplan);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewUnplannedCloseAtmData`,
        dataHitUnplan,
        configNew
      );
      // console.log("ini data unplan", result);

      try {
        const dataUnplanRBB = result.data.content;
        // console.log('ini data unplan pre', dataUnplanRBB);
        setTotalPages(result.data.totalPages);
        setTotalRows(result.data.totalElements);

        dataUnplanRBB.map((row) => {
          const actionRenew = [
            {
              name: 'Edit',
              id: row.id,
              funct: handleEditRenew,
            },
          ];
          const newRow = {
            machineType: row.machineType,
            atmId: row.atmId,
            locationName: <StringAlign align='left' value={row.locationName} />,
            cityName: row.city,
            areaName: row.areaName,
            closingRbbReason: row.closingRbbReason,
            jaboOut: row.jaboOut,
            machineRevokeDate: dateConverter(row.machineRevokeDate),
            biClosingReportDate: dateConverter(row.biClosingReportDate),
            dueDate: dateConverter(row.dueDate),
            remark: row.remark,
            action: handleApproveUnplanTermin(row.id, row.status),
            actionEdit: actionRenew
          };
          unplanData.push(newRow);
        });
      } catch (err) {
        setIsLoadDataUnplan(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
      setDataUnplan(unplanData);
      setIsLoadDataUnplan(false);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadDataUnplan(false);
    }
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTableUnplan.indexOf(property)]);
    };
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <FilterRbb onFilterSubmit={handleFilter} type='Termin' withAtmId withMesin />
        </div>
        <div className={classes.tableContent}>
          <ChkyTablePagination
            data={dataUnplan}
            fields={titleTableUnplan}
            cellOption={valueTypeUnplan}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            isLoadData={isLoadDataUnplan}
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
      <ModalInfo
        message={unplanApproveMessage}
        title={unplanApproveTitle}
        isOpen={isOpenUnplanApproveModal}
        onClose={() => {
          handleApprovalUnplanModal(false);
        }}
        onNext={() => {
          if (unplanApproveTitle === 'Approval Success') {
            window.location.reload();
          } else {
            handleApprovalUnplanModal(false);
          }
        }}
        modalType={modalType}
      />
      <ModalLoader isOpen={isOpenModalLoader2} />
    </>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(RbbData)));

// [5]getDataUnplan
const titleTableUnplan = [
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
  '',
];

const valueTypeUnplan = [
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
  'child',
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
