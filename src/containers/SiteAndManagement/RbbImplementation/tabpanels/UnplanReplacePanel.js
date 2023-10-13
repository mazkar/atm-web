import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination } from '../../../../components/chky';
import FilterRbb from '../FilterRBB';
import DraftPenggantianMesin from '../../../../components/Modal/DraftPenggantianMesin';
import DraftIjinPenggantianMesin from '../../../../components/Modal/DraftIjinPenggantianMesin';
import Typography from '@material-ui/core/Typography';
import { PrimaryHard } from '../../../../assets/theme/colors';
import { RbbImpCtx } from '../index';
import ModalLoader from '../../../../components/ModalLoader';
import { formatDateReplace } from '../../../../helpers/useDateFormater';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const RbbImplementation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoadData, setIsLoadData] = useState(true);
  const { redirectFn } = useContext(RbbImpCtx);
  const [filterData, setFilterData] = useState([{ areaName: 'All', city: 'All' }]);
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);

  // =========> FETCHING DATA
  // modalLoader
  const [dataTable, setDataTable] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenModalIjin, setisOpenModalIjin] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const rowsPerPage = 10; // <--- init default rowsPerPage
  // [1]getDataNewRBB

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  function openModalSuratReplace(id) {
    setisOpenModal(true);
    setSelectedId(id);
  }

  function handleSave() {
    setisOpenModal(false);
    setisOpenModalIjin(true);
  }

  function clickDetail(val) {
    console.log('clickDetail', val);
    if (val?.row?.status && val?.row?.id) {
      //if (val.step) {
      redirectFn(val.row.status, val.row.id, 'replace');
    }
    // alert("Tidak ada progress");
  }

  const { picSiteId, status, model, areaName, city } = filterData;

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setIsLoadData(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/unplanReplaceRbbImpl`,
        {
          pageNumber: currentPage,
          dataPerPage: rowsPerPage,
          picSiteId,
          status,
          areaId: areaName || 'All',
          cityId: city || 'All',
          ...(orderBy && { orderBy, orderDirection }),
        },
        { config: { headers } }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoadData(false);
        setTotalPages(res.data.totalPages);
        setTotalRows(res.data.totalElements);
        setDataTable(
          res.data.content.map((val) => ({
            oldAtmId: val.oldAtmId,
            oldMachineType: val.oldMachineType,
            areaName: val.areaName,
            locationName: val.locationName,
            picAreaName: val.picAreaName,
            target: formatDateReplace(val.target),
            status: val.status + '',
            atmId: val.atmId,
            machineType: val.machineType,
            remark: val.remark,
            suratAction: (
              <Typography
                variant='a'
                component='a'
                disabled={val.isApproval != 1 || val.status * 1 >= 6}
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: val.isApproval != 1 || val.status * 1 >= 6 ? null : PrimaryHard,
                  whiteSpace: 'nowrap',
                }}
                onClick={() => openModalSuratReplace(val.id)}
              >
                Surat Replace Mesin
              </Typography>
            ),
            detail: [
              {
                name: 'Detail',
                funct: clickDetail,
                row: val,
                isDisable: !val.status,
                tabAsal: 'replace',
              },
            ],
          }))
        );
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }, [areaName, picSiteId, city, status, model, currentPage, orderDirection, orderBy]);

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
    <div>
      <div className={classes.filterContainer}>
        <FilterRbb
          onFilterSubmit={handleFilter}
          showStatus
          showPicSite
          type='Replace'
        />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataTable}
          fields={titleTable}
          cellOption={valueTypeNew}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadData}
          changePage={handleChangePageValue}
          resetPageCounter={resetPageCounter}
          isSort={isSort}
          isUsingMuiSort={true}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
        />
      </div>
      <DraftPenggantianMesin
        isOpen={isOpenModal}
        onClose={() => setisOpenModal(false)}
        rowToShow={selectedId}
        handleSave={handleSave}
      />
      <DraftIjinPenggantianMesin
        isOpen={isOpenModalIjin}
        onClose={() => setisOpenModalIjin(false)}
        rowToShow={selectedId}
        setModalLoader={setIsOpenModalLoader}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RbbImplementation))
);

// [1]getDataNew
const titleTable = [
  'ATM ID Lama',
  'Mesin Lama',
  'Area',
  'Location',
  'PIC Area',
  'Target',
  'Status Terakhir',
  'ATM ID Baru',
  'Mesin Baru',
  'Remark',
  '',
  '',
];

const valueTypeNew = [
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'statusRbb_Implementation',
  'string',
  'string',
  'string',
  'child',
  'modal_RBB',
];

const isSort = [true, true, true, true, true, true, true, true, true, true];

const colNameArr = [
  'oldAtmId',
  'oldMachineType',
  'areaName',
  'locationName',
  'picAreaName',
  'target',
  'status',
  'atmId',
  'machineType',
  'remark',
];

const sortArray = [{ titleArr: titleTable, colNameArr }];
