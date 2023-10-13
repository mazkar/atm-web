import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { ChkyTablePagination } from '../../../components/chky';
import FilterRbb from '../FilterRBB';
import { PrimaryHard } from '../../../assets/theme/colors';
import ModalLoader from '../../../components/ModalLoader';
import constants from '../../../helpers/constants';
import { formatDateReplace } from '../../../helpers/useDateFormater';
import ApprovedChip from '../components/ApprovedChip';
import constansts from '../../../helpers/constants';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const RbbImplementation = () => {
  const classes = useStyles();
  const history = useHistory();
  const roleName = window.sessionStorage.getItem('roleName');
  const [isLoadData, setIsLoadData] = useState(true);
  const [filterData, setFilterData] = useState([{ areaId: 'All', city: 'All' }]);

  // =========> FETCHING DATA
  // modalLoader
  const [dataTable, setDataTable] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  function handleClickEdit(id) {
    history.push(`rbb-edit-unplan-replace/${id}`);
  }

  const { picSiteId, progress, model, areaId, city } = filterData;

  const isDisableRole = (value) => {
    const role = value.toLowerCase();
    // console.log(">>> roleName",role);
    const planRole = role.includes('plan');
    // console.log(">>> !planRole",!planRole);
    return !planRole;
  };

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setIsLoadData(true);
    axios
      .post(
        `${constansts.apiHost}/viewUnplannedReplaceAtmData`,
        {
          pageNumber: currentPage,
          dataPerPage: rowsPerPage,
          picSiteId,
          progress,
          areaId,
          cityId: city || 'All',
          ...(orderBy && { orderBy, orderDirection }),
        },
        { config: { headers } }
      )
      .then((res) => {
        const GenericLink = ({ action, label, disabled }) => (
          <div style={{textAlign: 'center'}}>
            <Typography
              variant='a'
              component='a'
              disabled={disabled}
              style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: disabled ? null : PrimaryHard,
                whiteSpace: 'nowrap',
              }}
              onClick={() => action()}
            >
              {label}
            </Typography>
          </div>
        );
        setIsLoadData(false);
        setTotalPages(res.data.totalPages);
        setTotalRows(res.data.totalElements);
        setDataTable(
          res.data.content.map((val) => ({
            oldAtmId: val.oldAtmId,
            oldMachineType: val.oldMachineType,
            areaName: val.areaName,
            locationName: val.locationName,
            target: formatDateReplace(val.targetDate),
            completedDate: formatDateReplace(val.replaceCompleteDate),
            status: `${val.status}`,
            atmId: val.atmId,
            machineType: val.machineType,
            remark: val.remark,
            approveLink:
              val.unplannedApprovalStatus ? (
                <ApprovedChip />
              ) : (
                <GenericLink
                  label='Approve'
                  action={() => approve(val.id, val.oldAtmId)}
                  disabled={isDisableRole(roleName)}
                />
              ),
            suratAction: <GenericLink label='Edit' action={() => handleClickEdit(val.id)} />,
          }))
        );
      })
      .catch((err) => {
        console.log('~ err', err);
      });
  }, [areaId, picSiteId, city, progress, model, currentPage, orderDirection, orderBy]);

  function approve(id, atmId = 'Unknown') {
    if (window.confirm(`You are going to approve ATM ID ${atmId}. Proceed?`)) {
      setIsOpenModalLoader(true);
      axios({
        method: 'POST',
        url: `${constants.apiHost}/approveUnplanReplace`,
        data: {
          id,
        },
      })
        .then((res) => {
          setIsOpenModalLoader(false);
          alert('Unplan Replace Approved.');
          location.reload();
        })
        .catch((err) => {
          console.log('~ err', err);
          setIsOpenModalLoader(false);
        });
    }
  }

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
        <FilterRbb onFilterSubmit={handleFilter} showPicSite withStatus type='Replace' />
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
          isUsingMuiSort
          handleSort={handleSort}
          sortBy={sortBy}
          order={orderDirection}
          leftAlignBody={[3]}
        />
      </div>
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
  'Target',
  'Tgl Selesai',
  'Status',
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
  'child',
];

const isSort = [true, true, true, true, true, true, true, true, true, true];

const colNameArr = [
  'oldAtmId',
  'oldMachineType',
  'areaName',
  'locationName',
  'target',
  'completedDate',
  'status',
  'atmId',
  'machineType',
  'remark',
];

const sortArray = [{ titleArr: titleTable, colNameArr }];
