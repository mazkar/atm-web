/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination } from '../../../../components/chky';
import FilterRbb from '../FilterRBB';
import { RbbImpCtx } from '../index';
import ModalDraftRenewal from '../../../../components/Modal/ModalDraftRenewal';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const RenewalPanel = () => {
  const classes = useStyles();
  const [isLoadData, setIsLoadData] = useState(true);
  const { redirectFn } = useContext(RbbImpCtx);

  const [filterData, setFilterData] = useState([{ areaName: 'All', city: 'All' }]);
  const [selectedRow, setSelectedRow] = useState('');

  const [selectedIdSite, setSelectedIdSite] = useState('');
  // DRAFT Renewal Perpanjangan
  const [openModalCreateDraftRenew, setOpenModalCreateDraftRenew] = useState(false);
  const handleOpenModalCreateDraftRenew = () => setOpenModalCreateDraftRenew(true);
  const handleCloseModalCreateDraftRenew = () => setOpenModalCreateDraftRenew(false);
  const handleCreateDraftRenew = (data) => {
    if (!data.isDisable) {
      setSelectedIdSite(data.idSite);
      setSelectedRow(data.id);
      handleOpenModalCreateDraftRenew();
    }
  };
  // End Draft Renewal

  const handleDetail = (val) => {
    // console.log('~ val', val)
    const status = val.id === '6' ? '6s' : val.id;
    const idRow = val.row;
    const tabAsal = val.tabAsal;
    const atmId = val.atmId;
    if (tabAsal) {
      redirectFn(status, idRow, tabAsal, atmId);
    } else if (status == null) {
      alert('No progress');
    } else {
      redirectFn(status, idRow, undefined, atmId);
    }
  };

  // =========> FETCHING DATA
  // modalLoader
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  // [1]getDataNewRBB
  const [dataRenewalAtm, setDataRenewalAtm] = useState([]); // <--- init dataRenewalRBB array

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const dateConverter = (tanggal) => {
    const dateNya = moment(new Date(tanggal)).format('DD/MM/YYYY');
    return dateNya;
  };

  useEffect(() => {
    const renewalData = [];
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    const { picSiteId, progress, model, areaName, city } = filterData;
    const dataHitRenewal = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId: areaName || 'All',
      picSiteId,
      status: progress,
      cityId: city || 'All',
      model,
      ...(orderBy && { orderBy, orderDirection }),
    };
    // console.log("Cek data New", dataHitNew);
    try {
      setIsLoadData(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRenewalRbbImplementation`,
          dataHitRenewal,
          headers
        )
        .then((res) => {
          try {
            const dataPre = res.data.content;
            // console.log("ini datapre", res);
            setTotalPages(res.data.totalPages);
            setTotalRows(res.data.totalElements);

            dataPre.map((row) => {
              const actionSurat = [
                {
                  name: 'Surat Perpanjangan',
                  id: row.id,
                  idSite: row.idSite,
                  funct: handleCreateDraftRenew,
                  isDisable: row.renewalSent || row.status == 10 || row.status == 11,
                  // status: row.lastStatus
                  status: row.status,
                },
              ];
              const actionDetail = [
                {
                  name: 'Detail',
                  id: row.status,
                  funct: handleDetail,
                  row: row.idSite,
                  atmId: row.atmId,
                  tabAsal: 'renewal',
                },
              ];
              const newRow = {
                atmId: row.atmId,
                areaName: row.area,
                newLocation: row.locationName,
                deadLine: row.rentRemaining === null ? '-' : row.rentRemaining,
                dueDate: row.dueDate === null ? '-' : dateConverter(row.dueDate),
                lastStatus: row.status === null ? '-' : row.status === '6' ? '6s' : row.status,
                model: row.modelFinal,
                lastUpdate: row.lastUpdate === null ? '-' : dateConverter(row.lastUpdate),
                reason:
                  row?.renewalReason === undefined
                    ? '-'
                    : row.renewalReason === null
                    ? '-'
                    : row.renewalReason,
                reasonAuthor: row.renewalAuthorName,
                actionSurat,
                actionDetail,
              };
              renewalData.push(newRow);
            });
          } catch {
            alert(`Error Re-Construct Data Renewal Atm Implementation...!`);
          }
          setDataRenewalAtm(renewalData);
          // console.log("Ini Data request Renewal", res);
          setIsLoadData(false);
        })
        .catch((err) => {
          alert(err);
          setIsLoadData(false);
        });
    } catch (err) {
      alert(`Error Fetching Renewal Atm Data...! \n${err}`);
      setIsLoadData(false);
    }
  }, [
    filterData.areaName,
    filterData.city,
    filterData.picSiteId,
    filterData.progress,
    filterData.model,
    currentPage,
    orderDirection,
    orderBy,
  ]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleFilter(newValue) {
    setFilterData(newValue);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      const { titleArr, colNameArr } = sortArray[0];
      const colNumber = titleArr.indexOf(property);
      const columnName = colNameArr[colNumber];
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnName);
      setCurrentPage(0);
      setResetPageCounter((prevCount) => prevCount + 1);
    };
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <FilterRbb
          onFilterSubmit={handleFilter}
          type='Renewal'
          showPicSite
          showProgress
          showModel
        />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          fields={titleTableRenewal}
          data={dataRenewalAtm}
          cellOption={valueTypeRenewal}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadData}
          changePage={handleChangePageValue}
          leftAlignBody={[2]}
          resetPageCounter={resetPageCounter}
          isSort={isSortRenewal}
          isUsingMuiSort={true}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
        />
      </div>
      <ModalDraftRenewal
        // Surat Perpanjangan
        rowToShow={selectedRow}
        siteId={selectedRow} //  selectedIdSite
        isOpen={openModalCreateDraftRenew}
        onClose={handleCloseModalCreateDraftRenew}
        onLeave={() => {
          handleCloseModalCreateDraftRenew();
        }}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(RenewalPanel)));

// [2]getDataRenewal
const titleTableRenewal = [
  'ATM ID',
  'Area',
  'Location',
  'Habis Masa Sewa',
  'Tgl Jatuh Tempo',
  'Status Terakhir',
  'Model',
  'Last Update',
  'Reason',
  'Reason Author',
  '',
  // '',
  // "",
  'Action',
];

const valueTypeRenewal = [
  'string',
  'string',
  'string',
  'status_expire',
  'string',
  'statusRbb_Implementation',
  'string',
  'string',
  'string',
  'reasonAuthor',
  'modal_RBB',
  // 'modal_RBB',
  // 'child',
  'modal_RBB',
];

const isSortRenewal = [true, true, true, true, true, true, true, true, true, true];

const columnNameVarRenewal = [
  'atmId',
  'area',
  'locationName',
  'rentRemaining',
  'dueDate',
  'status',
  'modelFinal',
  'lastUpdate',
  'renewalReason',
  'renewalAuthorId',
];

const sortArray = [{ titleArr: titleTableRenewal, colNameArr: columnNameVarRenewal }];
