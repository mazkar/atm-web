/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
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

const RbbData = () => {
  const history = useHistory();
  const roleName = window.sessionStorage.getItem('roleName');
  const classes = useStyles();

  // =========> FETCHING DATA
  // modalLoader
  const [isLoadDataUnplanRenewal, setIsLoadDataUnplanRenewal] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  // default year
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [currentAreaName, setCurrentAreaName] = useState('All');
  const [currentCity, setCurrentCity] = useState('All');
  const [currentDue, setCurrentDue] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);

  const [isOpenModalLoader2, setModalLoader2] = useState(false);
  const [isOpenUnplanApproveModal, setIsOpenApproveModal] = useState(false);
  const [unplanApproveMessage, setUnplanApproveMessage] = useState('');
  const [unplanApproveTitle, setUnplanApproveTitle] = useState('');
  const [modalType, setModalType] = useState('');

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
  const [dataUnplanRenewal, setDataUnplanRenewal] = useState([]); // <--- init dataUnplan array

  const matchRoleName = (value) => {
    if (value) {
      const result = value.toLowerCase().match(/planning/g) || [];
      if (result.length) {
        return result[0];
      }
      return value;
    }
  };

  const configNew = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const handleApproveUnplanRenewal = (id, status) => {
    const doApprove = async () => {
      if (window.confirm('Are you sure want to Approve this unplan renewal?')) {
        try {
          setModalLoader2(true);
          const result = await axios.post(
            `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/approveUnplanRenewal`,
            { id },
            configNew
          );
          // console.log("++++ approveUnplanTermin",JSON.stringify(result));
          if (result) {
            if (result.data.statusCode === 200) {
              setModalType('success');
              setUnplanApproveTitle('Approval Success');
              setUnplanApproveMessage('Unplan Renewal Aprove Successfully, Reload Page!');
              setIsOpenApproveModal(true);
            } else {
              setModalType('failed');
              setUnplanApproveTitle('Approval Failed');
              setUnplanApproveMessage('Unplan Renewal Aprove Failed, Please Try Again!');
              setIsOpenApproveModal(true);
            }
          } else {
            setModalType('failed');
            setUnplanApproveTitle('Approval Failed');
            setUnplanApproveMessage('Unplan Renewal Aprove Failed, Please Try Again!');
            setIsOpenApproveModal(true);
          }
          setModalLoader2(false);
        } catch (err) {
          setModalLoader2(false);
          setModalType('info');
          setUnplanApproveTitle('Something Wrong!');
          setUnplanApproveMessage('Unplan Renewal Aprove Failed, Please Try Again!');
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
    hitApiDataUnplanRenewal();
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
      setOrderBy(null)
      setOrderDirection('ASC')
      setSortBy(null)
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
    localStorage.setItem('rowIdEditUnplanRenewal', rowID);
    history.push(`rbb-edit-unplan-renewal/${id}`);
    //console.log("ini ID =", id);
  };

  // HIT UNPLAN RENEWAL
  const hitApiDataUnplanRenewal = async () => {
    setIsLoadDataUnplanRenewal(true);
    const unplanData = [];
    const { cityId, areaId, mesin, atmId } = dataHit;
    const dataHitUnplan = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId,
      cityId,
      dueDate: currentDue,
      ...(atmId && { atmId }),
      ...(orderBy && {orderBy, orderDirection})
    };
    // console.log("Cek data Unplan", dataHitUnplan);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/viewUnplannedRenewalAtmData`,
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
            atmId: row.atmId,
            picArea: row.areaName,
            picSite: row.picSite,
            location: row.locationName,
            tglJatuhTempo: dateConverter(row.dueDate),
            tglSelesaiRenewal: dateConverter(row.renewalCompletedDate),
            remark: row.remark,
            action: handleApproveUnplanRenewal(row.id, row.status),
            actionEdit: actionRenew
          };
          unplanData.push(newRow);
        });
      } catch (err) {
        setIsLoadDataUnplanRenewal(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
      setDataUnplanRenewal(unplanData);
      setIsLoadDataUnplanRenewal(false);
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadDataUnplanRenewal(false);
    }
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTableUnplan.indexOf(property)]);
      handleChangePageValue(0)
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FilterRbb onFilterSubmit={handleFilter} withAtmId type='Termin' />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataUnplanRenewal}
          fields={titleTableUnplan}
          cellOption={valueTypeUnplan}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadDataUnplanRenewal}
          changePage={handleChangePageValue}
          resetPageCounter={resetCounter}
          isSort={isSort}
          isUsingMuiSort={true}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
          leftAlignBody={[3]}
        />
      </div>
      <ModalInfo
        message={unplanApproveMessage}
        title={unplanApproveTitle}
        isOpen={isOpenUnplanApproveModal}
        onClose={() => {
          setIsOpenApproveModal(false);
        }}
        onNext={() => {
          if (unplanApproveTitle === 'Approval Success') {
            window.location.reload();
          } else {
            setIsOpenApproveModal(false);
          }
        }}
        modalType={modalType}
      />
      <ModalLoader isOpen={isOpenModalLoader2} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(RbbData)));

// [5]getDataUnplan
const titleTableUnplan = [
  'ATM ID',
  'PIC Area',
  'PIC Site',
  'Location',
  'Tgl Jatuh Tempo',
  'Tgl Selesai Renewal',
  'Remark',
  '',
  '',
];

const valueTypeUnplan = [
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

const isSort = [true, true, true, true, true, true, true];

const columnNameVar = [
'atmId',
'areaName',
'picSite',
'locationName',
'dueDate',
'activityDate',
'remark',
];
