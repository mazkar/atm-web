/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Link, Button } from "@material-ui/core";
import axios from "axios";

import moment from "moment";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import TablePagination from "../../../../../components/chky/ChkyTablePagination";
import constants from "../../../../../helpers/constants";
import { GrayUltrasoft, PrimaryHard } from "../../../../../assets/theme/colors";
import { TableCheckPagination } from '../../../../../components';
import Filter from '../filter';
import { Barlow13 } from "../../../../../components/Typography/BarlowWithSize";

// eslint-disable-next-line import/extensions
// import { doFetchTicketing } from "../../../../ApiServices";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: GrayUltrasoft,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  backLabel: {
    fontSize: 13,
    color: constants.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  filterContainer: { marginBottom: 15 },
});

const rowsPerPage = 10; // <--- init default rowsPerPage

const TableTicketing = () => {
  const classes = useStyles();

  // SET DATA
  const [data, setData] = useState([]);

  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState(null);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [orderBy, setOrderBy] = useState("id");

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [sortBy, setSortBy] = useState('id');
  const [resetPageCounter, setResetPageCounter] = useState(0);

  const [selectedSearch, setSelectedSearch] = useState('All');
  const [inputSearch, setInputSearch] = useState('');
  const [selectedKebutuhan, setSelectedKebutuhan] = useState('All');

  const [dataFilter, setDataFilter] = useState(null);

  const defaultDataHit = {
    sortType: orderDirection,
    sortBy: orderBy,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };


  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type.toUpperCase(),
      sortBy: column,
    });
  };
  const itemSearch = [
    { text: 'Ticket ID', value: 'id' },
    { text: 'ATM ID', value: 'atmId' },
    { text: 'Lokasi', value: 'location' },
    { text: 'Detail', value: 'detailLocation' },
    { text: 'Problem', value: 'detailProblem' },
    { text: 'Tanggal', value: 'dateNumber' },
    { text: 'Bulan', value: 'monthNumber' },
    { text: 'Start', value: 'startDate' },
    { text: 'Selesai', value: 'endDate' },
    { text: 'Durasi', value: 'durationTime' },
    { text: 'Type Mesin', value: 'machineType' },
    { text: 'Nameing', value: 'nameing' },
   
  ];

  const titleTableNew = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Ticket ID' },
    { id: 'atmId', numeric: false, disablePadding: false, label: 'ATM ID' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Lokasi'},
    { id: 'detailLocation', numeric: false, disablePadding: false, label: 'Detail' },
    { id: 'detailProblem', numeric: false, disablePadding: false, label: 'Problem' },
    { id: 'dateNumber', numeric: false, disablePadding: false, label: 'Tanggal' },
    { id: 'monthNumber', numeric: false, disablePadding: false, label: 'Bulan' },
    { id: 'startDate', numeric: false, disablePadding: false, label: 'Start' },
    { id: 'endDate', numeric: false, disablePadding: false, label: 'Selesai' },
    { id: 'durationTime', numeric: false, disablePadding: false, label: 'Durasi' },
    { id: 'machineType', numeric: false, disablePadding: false, label: 'Type Mesin' },
    { id: 'nameing', numeric: false, disablePadding: false, label: 'Nameing' },
    { id: 'action', numeric: false, disablePadding: false, label: '' },

  ];
  const titleTable = [
    "Ticket ID",
    "ATM ID",
    "Lokasi",
    "Detail",
    "Problem",
    "Tgl",
    "Bulan",
    "Start",
    "Selesai",
    "Durasi",
    "Type Mesin",
    "Nameing",
    "",
  ];

  const valueTypeTableNew = [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    ''
  ];

  const columnNameVar = [
    'id',
    'atmId',
    'location',
    'detailLocation',
    'detailProblem',
    'dateNumber',
    'monthNumber',
    'startDate',
    'endDate',
    'durationTime',
    'machineType',
    'nameing',
    ''
  ];

  const isSort = [true, true, true, true, true, true,true,true,true,true,true,false];


  const [dataRequest, setDataRequest] = useState({
    sortType: orderDirection,
    sortBy:orderBy,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  });

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },}
  
  
  async function getDataMasterMonitoring() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getListMasterEsq`,
        {...dataRequest, ...(dataFilter && dataFilter)},
        configNew
  
      );
      console.log('res master esq', result.data);
      setData(
    
        result.data.content.map((val) => ({

          id: val.id,
          atmId: val.atmId,
          location: val.location,
          detailLocation: val.detailLocation,
          detailProblem: val.detailProblem,
          dateNumber: val.dateNumber,
          monthNumber: val.monthNumber,
          startDate: moment(
            val.startDate
          
          ).format("DD/MM/YYYY"),
          endDate: moment(
            val.endDate
         
          ).format("DD/MM/YYYY"),
          durationTime: val.durationTime,
          machineType: val.machineType,
          nameing: val.nameing ? val.nameing : "-",
          action: (
          <Button 
            style={{ 
              fontWeight: 400, 
              fontSize: 13, 
              color: constants.color.primaryHard,
              textTransform: "none", 
            }} 
            onClick={()=>{
              history.push(`/monitoring/master/edit/${val.id}`)
            }}
          >
            Edit
          </Button>
          )
   
        })
        )
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // SORT
 
  function handleSort(property) {
  
    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderBy);
      console.log(orderDirection,"od");
       
    };
  }
  
  // Set Filter
  function onFilterSubmit(filter){
    // console.log('~ filter', filter)
    const newFilter = {...filter};
    delete newFilter.status;
    // console.log('~ newFilter', newFilter)
    setDataFilter(_.isEmpty(newFilter) ? null : newFilter);
    setDataRequest(old=>({...old, pageNumber: 0}));
    console.log(filter)
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
  }

  function handleResetFilter(){
    setDataRequest({
      ...defaultDataHit,
      pageNumber: 0,
    });
    setDataFilter(null);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
  }

  useEffect(()=>{
    setDataRequest(old=>({...old,  
      sortType: orderDirection,
      sortBy:orderBy,
      pageNumber: 0,
      dataPerPage: rowsPerPage,}));
  },[orderDirection]

  );

  useEffect(() => {
    getDataMasterMonitoring();
  }, [currentPage,dataRequest,dataFilter]);

  return (
    <><div className={classes.filterContainer}>
      <Filter
        isOpening={false}
        itemSearch={itemSearch}
        onFilterSubmit={onFilterSubmit}
        handleReset={handleResetFilter}
      />
    </div><div style={{ overflow: 'auto' }}>
      {/* <TableCheckPagination
        data={data}
        fields={titleTableNew}
        cellOption={valueTypeTableNew}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        changePage={handleChangePageValue}
        isWithCheck={false}
        isLoadData={isLoading}
        sorting={handleSorting}
        // leftAlignBody={[1]}
        isSort /> */}
      <TablePagination
        data={data}
        fields={titleTable}
        cellOption={valueTypeTableNew}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        resetPageCounter={resetPageCounter}
        changePage={handleChangePageValue}
        isWithCheck={false}
        isSort={isSort}
        isUsingMuiSort
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
       
        // handleSort={handleSort}
        // sortBy={sortBy}
        // order={orderDirection}
        isLoadData={isLoading}
      />
    </div></>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(TableTicketing))
);
