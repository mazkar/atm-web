import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { ChkyTablePagination } from '../../../components/chky';
import FilterRbb from '../FilterRBB';
import Typography from '@material-ui/core/Typography';
import { PrimaryHard } from '../../../assets/theme/colors';
import moment from 'moment';
import { formatDateReplace } from '../../../helpers/useDateFormater';
import constansts from '../../../helpers/constants';

const useStyles = makeStyles({
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

const Replace = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoadData, setIsLoadData] = useState(true);
  const [filterData, setFilterData] = useState([{ areaId: 'All', city: 'All' }]);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataTable, setDataTable] = useState([]);
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  function handleClickEdit(id) {
    history.push(`rbb-edit-replace/${id}`);
  }

  const { picSiteId, progress, areaId, city } = filterData;

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setIsLoadData(true);
    axios
      .post(
        `${constansts.apiHost}/viewReplaceAtmData`,
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
            target: formatDateReplace(val.targetDate),
            completedDate: formatDateReplace(val.replaceCompleteDate),
            status: val.status + '',
            atmId: val.atmId,
            machineType: val.machineType,
            suratAction: (
              <Typography
                variant='a'
                component='a'
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: PrimaryHard,
                  whiteSpace: 'nowrap',
                }}
                onClick={() => handleClickEdit(val.id)}
              >
                Edit
              </Typography>
            ),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [areaId, picSiteId, city, progress, currentPage, orderDirection, orderBy]);

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
          withStatus
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
          leftAlignBody={[3]}
        />
      </div>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(Replace)));

// [5]replace
const titleTableReplace = [
  'ATM ID Lama',
  'Mesin Lama',
  'Area',
  'Location',
  'Target',
  'Tgl Selesai',
  'Status',
  'ATM ID Baru',
  'Mesin Baru',
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
];

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
];

const isSort = [true, true, true, true, true, true, true, true, true];

const sortArray = [{ titleArr: titleTableReplace, colNameArr }];
