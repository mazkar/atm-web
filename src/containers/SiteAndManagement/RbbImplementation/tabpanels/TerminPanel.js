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
import ModalLoader from '../../../../components/ModalLoader';
import FilterRbb from '../FilterRBB';
import { RbbImpCtx } from '../index';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const RbbImplementation = () => {
  const classes = useStyles();
  const { redirectFn } = useContext(RbbImpCtx);
  const [isLoadData, setIsLoadData] = useState(true);

  const [filterData, setFilterData] = useState([{ areaName: 'All', city: 'All' }]);

  const handleAjukanTerm = (data) => {
    // console.log("ke klik");
    if (!data.isDisable) {
      try {
        // console.log("ajukan termin lolos IF");
        setModalLoader2(true);
        const req = { id: data.id };
        // const req = { id: 549 };
        const config = {
          headers: {
            'Content-Type': 'application/json;;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
        };
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitTermination`,
            req,
            config
          )
          .then((res) => {
            // console.log("response ajukan termin", res.data);
            if (res.status == 200) {
              setModalLoader2(false);
              if (res.data.statusCode == 200) {
                alert('Successfully submitted Termin');
              } else {
                alert(res.data.message);
              }
              // alert("SUKSES AJUKAN TERMIN");
              // alert(res.data.message);
              window.location.reload();
            } else {
              setModalLoader2(false);
              alert('Failed to submit Termin');
            }
          })
          .catch((err) => {
            alert(err);
            setModalLoader2(false);
          });
      } catch (err) {
        // console.log(`Error Fetching Renewal Atm Data...! \n${err}`);
        setModalLoader2(false);
      }
    }
  };
  // END CLOSE Kerjasama

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
  const [isOpenModalLoader2, setModalLoader2] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  // [1]getDataNewRBB
  const [dataTerminAtm, setDataTerminAtm] = useState([]); // <--- init dataTerminRBB array

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const dateConverter = (tanggal) => {
    const dateNya = moment(new Date(tanggal)).format('DD/MM/YYYY');
    return dateNya;
  };

  useEffect(() => {
    const terminData = [];
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    const { picSiteId, progress, machine, model, areaName, city } = filterData;
    const dataHitTermin = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      ...(areaName && areaName !== 'All' && { areaId: areaName }),
      ...(city && city !== 'All' && { cityId: city }),
      picSiteId,
      status: progress,
      model,
      ...(orderBy && { orderBy, orderDirection }),
    };
    // console.log("Cek data New", dataHitNew);
    try {
      setIsLoadData(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/terminRbbImpl`,
          dataHitTermin,
          headers
        )
        .then((res) => {
          try {
            const dataPre = res.data.content;
            // console.log("ini datapre", dataPre);
            setTotalPages(res.data.totalPages);
            setTotalRows(res.data.totalElements);

            dataPre.map((row) => {
              const actionAjukanTerm = [
                {
                  name: 'Ajukan Terminisasi',
                  id: row.id,
                  funct: handleAjukanTerm,
                  isDisable: row.status ? true : false,
                  isApprove: row.isApproval,
                  status: row.status,
                },
              ];
              const actionDetailsTerm = [
                {
                  name: 'Detail',
                  id: row.status,
                  funct: handleDetail,
                  row: row.idSite,
                  atmId: row.atmId,
                  isDisable: row.isApproval == 1 ? true : false,
                  tabAsal: 'termin',
                },
              ];
              const newRow = {
                atmId: row.atmId,
                areaName: row.areaName,
                newLocation: row.locationName,
                deadLine: row.rentRemaining === null ? '-' : row.rentRemaining,
                dueDate: row.dueDate === null ? '-' : dateConverter(row.dueDate),
                lastStatus: row.status,
                model: row.modelFinal,
                closingAtmDate:
                  row.closingAtmDate !== null ? dateConverter(row.closingAtmDate) : '-',
                reason: row.terminReason == null ? '-' : row.terminReason,
                reasonAuthor: row.terminAuthorName,
                actionAjukanTerm,
                // actionMassageTerm,
                actionDetailsTerm,
              };
              terminData.push(newRow);
            });
          } catch {
            alert(`Error Re-Construct Data Termin Atm Implementation...!`);
          }
          setDataTerminAtm(terminData);
          setIsLoadData(false);
        })
        .catch((err) => {
          alert(err);
          setIsLoadData(false);
        });
    } catch (err) {
      alert(`Error Fetching Termin Atm Data...! \n${err}`);
      setIsLoadData(false);
    }
  }, [
    filterData.areaName,
    filterData.city,
    filterData.picSiteId,
    filterData.progress,
    filterData.machine,
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
        <FilterRbb onFilterSubmit={handleFilter} type='Termin' showPicSite showProgress showModel />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataTerminAtm}
          fields={titleTableTermin}
          cellOption={valueTypeTermin}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadData}
          changePage={handleChangePageValue}
          leftAlignBody={[2]}
          resetPageCounter={resetPageCounter}
          isSort={isSortTermin}
          isUsingMuiSort={true}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
        />
      </div>
      <ModalLoader isOpen={isOpenModalLoader2} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RbbImplementation))
);

// [3]getDataTermin
const titleTableTermin = [
  'ATM ID',
  'Area',
  'Location',
  'Habis Masa Sewa',
  'Tgl Jatuh Tempo',
  'Status Terakhir',
  'Model',
  'Tgl Terminasi',
  'Reason',
  'Reason Author',
  '',
  // 'Action',
  '',
];
const valueTypeTermin = [
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
  'modal_RBB',
];

const isSortTermin = [true, true, true, true, true, true, true, true, true, true];

const columnNameVarTermin = [
  'atmId',
  'areaName',
  'locationName',
  'rentRemaining',
  'dueDate',
  'status',
  'modelFinal',
  'closingAtmDate',
  'terminReason',
  'terminAuthorId',
];

const sortArray = [{ titleArr: titleTableTermin, colNameArr: columnNameVarTermin }];
