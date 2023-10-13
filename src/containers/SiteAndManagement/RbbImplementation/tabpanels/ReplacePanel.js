import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import moment from 'moment';
import { ChkyTablePagination } from '../../../../components/chky';
import FilterRbb from '../FilterRBB';
import Typography from '@material-ui/core/Typography';
import { PrimaryHard } from '../../../../assets/theme/colors';
import DraftPenggantianMesin from '../../../../components/Modal/DraftPenggantianMesin';
import DraftIjinPenggantianMesin from '../../../../components/Modal/DraftIjinPenggantianMesin';
import { RbbImpCtx } from '../index';
import ModalLoader from '../../../../components/ModalLoader';
import { formatDateReplace } from '../../../../helpers/useDateFormater';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const ReplacePanel = () => {
  const classes = useStyles();
  const { redirectFn } = useContext(RbbImpCtx);
  const history = useHistory();
  const [isLoadData, setIsLoadData] = useState(true);
  const [filterData, setFilterData] = useState([{ areaName: 'All', city: 'All' }]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenModalIjin, setisOpenModalIjin] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataTable, setDataTable] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);

  function clickDetail(val) {
    console.log('clickDetail', val);
    if (val?.row?.status && val?.row?.id) {
      //if (val.step) {
      redirectFn(val.row.status, val.row.id, 'replace');
    }
    // alert("Tidak ada progress");
  }

  function clickDetailAnalytic(val){
    console.log('clickDetail', val);
    if (val?.row?.oldAtmId) {
      history.push(`trend-analisa/detail/${val.row.oldAtmId}`);
    }
    // alert(`Detail Analityc ${val.atmId}`);
  }

  function openModalSuratReplace(id) {
    setisOpenModal(true);
    setSelectedId(id);
  }

  function handleCloseModal() {
    setisOpenModal(false);
    setSelectedId('');
  }

  function handleSave() {
    setisOpenModal(false);
    setisOpenModalIjin(true);
  }

  const { picSiteId, status, areaName, city } = filterData;

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setIsLoadData(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getReplaceRbbImplementation`,
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
        // console.log(res.data);
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
            suratAction: (
              <Typography
                variant='a'
                component='a'
                disabled={val.status} // karena Replace setelah upload master data mula2 statusnya null, setelah kirim PDF statusnya 6
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: val.status ? null : PrimaryHard,
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
                funct: !val.status? clickDetailAnalytic:clickDetail,
                row: val,
                tabAsal: 'replace',
              },
            ],
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [areaName, picSiteId, city, status, currentPage, orderDirection, orderBy]);

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
          showPicSite
          showStatus
          type='Replace' //Replace
        />
      </div>
      <div className={classes.tableContent}>
        <ChkyTablePagination
          data={dataTable}
          fields={titleTableReplace}
          cellOption={valueTypeReplace}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadData}
          changePage={handleChangePageValue}
          leftAlignBody={[2]}
          resetPageCounter={resetPageCounter}
          isSort={isSort}
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
          isUsingMuiSort={true}
        />
      </div>
      <DraftPenggantianMesin
        isOpen={isOpenModal}
        onClose={handleCloseModal}
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

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(ReplacePanel)));

// [5]replace
const titleTableReplace = [
  'ATM ID Lama',
  'Mesin Lama',
  'Area',
  'Location',
  'PIC Area',
  'Target',
  'Status Terakhir',
  'ATM ID Baru',
  'Mesin Baru',
  '',
  '',
];
const valueTypeReplace = [
  'string',
  'string',
  'string',
  'string',
  'string',
  'string',
  'statusRbb_Implementation',
  'string',
  'string',
  'child',
  'modal_RBB',
];

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
];

const isSort = [true, true, true, true, true, true, true, true, true];

const sortArray = [{ titleArr: titleTableReplace, colNameArr }];
