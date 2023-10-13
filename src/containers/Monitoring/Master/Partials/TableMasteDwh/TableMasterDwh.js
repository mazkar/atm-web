/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Tabs, Tab, Paper } from "@material-ui/core";
import { PrimaryHard, GrayUltrasoft } from "../../../../../assets/theme/colors";
import TablePagination from "../../../../../components/chky/ChkyTablePagination";
import constants from "../../../../../helpers/constants";

import Filter from "../filter";

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
    padding: "5px 240px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
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
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  tabText: {
    textTransform: "none",
    
  },
});

// tab kd transaksi
const titleTable = [
  'ID',
  'Kode Transaksi',
  'Kategori Transaksi',
  'description'
];
const valueType = [
  'string',
  'string',
  'string',
  'string',
];
const columnNameVar = [
  'id',
  'codeTrx',
  'categoryTrx',
  'description'
];
const isSort = [
  true,
  true,
  true,
  true,

];

// tab kd respons
const titleTableRespon = [
  'ID',
  'Kode Respon',
  'Type Error',
  'Deskripsi'
];
const valueTypeRespon = [
  'string',
  'string',
  'string',
  'string',
];
const columnNameVarRespon = [
  'id',
  'codeResponse',
  'typeError',
  'description'
];

const isSortRespon = [
  true,
  true,
  true,
  true,

];

// tab status card

const titleStatusCard = [
  'ID',
  'Status Card',

  'Deskripsi'
];
const valueTypeStatusCard = [
  'string',
  'string',
  'string',
  'string',
];
const columnNameStatusCard = [
  'id',
  'statusCard',

  'description'
];

const isSortStatusCard = [
  true,
  true,
  true,

];
// tab Paycode

const titleStatusPaycode = [
  'ID',
  'Paycode Number',
  'Code Number',

  'Deskripsi'
];
const valueTypePaycode = [
  'string',
  'string',
  'string',
  'string',
];
const columnNamePaycode = [
  'id',
  'paycodeNumber',
  'codeNumber',

  'description'
];

const isSortPaycode = [
  true,
  true,
  true,
  true

];

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST

const TableDwh = () => {
  const classes = useStyles();

  // SET DATA

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows

  const [orderBy, setOrderBy] = useState('id');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [sortBy, setSortBy] = useState(null);
  const [orderByTableRespon, setOrderByTableRespon] = useState('id');
  const [orderDirectionTableRespon, setOrderDirectionTableRespon] = useState('asc');
  const [sortByTableRespon, setSortByTableRespon] = useState(null);
  const [orderByTableStatus, setOrderByTableStatus] = useState('id');
  const [orderDirectionTableStatus, setOrderDirectionTableStatus] = useState('asc');
  const [sortByTableStatus, setSortByTableStatus] = useState(null);
  const [orderByTablePaycode, setOrderByTablePaycode] = useState('id');
  const [orderDirectionTablePaycode, setOrderDirectionTablePaycode] = useState('asc');
  const [sortByTablePaycode, setSortByTablePaycode] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [filterData, setFilterData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  // filter kd transaksi

  const [dataFilter, setDataFilter] = useState(null);
  const defaultDataHit = {
    sortType: orderDirection,
    sortBy: orderBy,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };

  // Tab Handle 

  // Fetch Data table

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
    },};

  // Tab KD Transaksi
  async function getDataMasterDwhTrasnsaksi() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getListTrxDwh`,
    
        {...dataRequest, ...(dataFilter && dataFilter)},
        configNew
    
      );
      console.log('response dwh transkasi', result.data);
      setData(
    
        result.data.content.map((val) => ({

          id: val.id,
          codeTrx: val.codeTrx,
          categoryTrx: val.categoryTrx,
          description: val.description,
   
        })
        )
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching DWH Transkasi ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // fetch data tab status card
  async function getDataMasterDwhStatusTransaksi() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getListCardDwh`,
        {...dataRequest, ...(dataFilter && dataFilter)},
        configNew
      );
      console.log('response dwh transkasi card', result.data);
      setData(
    
        result.data.content.map((val) => ({

          id: val.id,
          statusCard: val.statusCard,
         
          description: val.description,
   
        })
        )
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching DWH status ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Tab KD Respons

  async function getDataMasterDwhRespon() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getListResponseDwh`,
        {...dataRequest, ...(dataFilter && dataFilter)},
        configNew
   
      );
      console.log('response dwh kdRespon', result.data);
      setData(
    
        result.data.content.map((val) => ({

          id: val.id,
          codeResponse: val.codeResponse,
          typeError: val.typeError,
          description: val.description,
   
        })
        )
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching DWH kdRespon ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // Tab KD Paycode

  async function getDataMasterDwhPaycode() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.MONITORING_SERVICE}/getListPayCode`,
        {...dataRequest, ...(dataFilter && dataFilter)},
        configNew
      
      );
      console.log('response dwh Paycode', result.data);
      setData(
    
        result.data.content.map((val) => ({

          id: val.id,
          paycodeNumber: val.paycodeNumber,
          codeNumber: val.codeNumber,
          description: val.description,
   
        })
        )
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching DWH kdRespon ...! \n${err}`);
    }
    setIsLoading(false);
  }

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  // SORT

  function handleSort(property) {
    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
 
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderDirection);
 
    };

  }

  function handleSortTableRespon(property) {
    return function actualFn() {
      const isActiveAndAsc = sortByTableRespon === property && orderDirectionTableRespon === 'ASC';
      setOrderDirectionTableRespon(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortByTableRespon(property);
      setOrderByTableRespon(columnNameVarRespon[titleTableRespon.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderByTableRespon);
    };
  }
  function handleSortTableStatus(property) {
    return function actualFn() {
      const isActiveAndAsc = sortByTableStatus === property && orderDirectionTableStatus === 'ASC';
      setOrderDirectionTableStatus(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortByTableStatus(property);
      setOrderByTableStatus(columnNameStatusCard[titleStatusCard.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderByTableStatus);
    };
  }
  function handleSortTablePaycode(property) {
    return function actualFn() {
      const isActiveAndAsc = sortByTablePaycode === property && orderDirectionTablePaycode === 'ASC';
      setOrderDirectionTablePaycode(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortByTablePaycode(property);
      setOrderByTablePaycode(columnNamePaycode[titleStatusPaycode.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderByTablePaycode);
    };
  }

  // Set Filter
  const itemSearch = [
    { text: 'ID', value: 'id' },
    { text: 'Kode Transaksi', value: 'codeTrx' },
    { text: 'Kategori Transaksi', value: 'categoryTrx' },
    { text: 'Deskripsi', value: 'description' },
    
  ];
  const itemSearchTableRespon = [
    { text: 'ID', value: 'id' },
    { text: 'Kode Respon', value: 'codeResponse' },
    { text: 'Type Error', value: 'typeError' },
    { text: 'Deskripsi', value: 'description' },
    
  ];
  const itemSearchTablePaycode = [
    { text: 'ID', value: 'id' },
    { text: 'Paycode Number', value: 'paycodeNumber' },
    { text: 'Code Number', value: 'codeNumber' },
    { text: 'Deskripsi', value: 'description' },
    
  ];
  const itemSearchTableStatus = [
    { text: 'ID', value: 'id' },
    { text: 'Status Card', value: 'statusCard' },

    { text: 'Deskripsi', value: 'description' },
    
  ];


  // Set Filter
  function onFilterSubmit(filter){
    // console.log('~ filter', filter)
    const newFilter = {...filter};
    delete newFilter.status;
    // console.log('~ newFilter', newFilter)
    setDataFilter(_.isEmpty(newFilter) ? null : newFilter);
    setDataRequest(old=>({...old, pageNumber: 0}));
    console.log(filter);
  }

  function handleResetFilter(){
    setDataRequest({
      ...defaultDataHit,
      pageNumber: 0,
    });
    setDataFilter(null);
  }

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    handleResetFilter();
  };



  useEffect(()=>{
    setDataRequest(old=>({...old,  
      sortType: orderDirection,
      sortBy:orderBy,
      pageNumber: 0,
      dataPerPage: rowsPerPage,}));
  },[orderDirection]

  );
  useEffect(()=>{
    setDataRequest(old=>({...old,  
      sortType: orderDirectionTableStatus,
      sortBy:orderByTableStatus,
      pageNumber: 0,
      dataPerPage: rowsPerPage,}));
  },[orderDirectionTableStatus]

  );
  useEffect(()=>{
    setDataRequest(old=>({...old,  
      sortType: orderDirectionTableRespon,
      sortBy:orderByTableRespon,
      pageNumber: 0,
      dataPerPage: rowsPerPage,}));
  },[orderDirectionTableRespon]

  );
  useEffect(()=>{
    setDataRequest(old=>({...old,  
      sortType: orderDirectionTablePaycode,
      sortBy:orderByTablePaycode,
      pageNumber: 0,
      dataPerPage: rowsPerPage,}));
  },[orderDirectionTablePaycode]

  );

  useEffect(() => {
    if(selectedTab === 0) {
      getDataMasterDwhTrasnsaksi();
    } else if(selectedTab === 2) {
      getDataMasterDwhRespon();
    }  else if(selectedTab === 1) {
      getDataMasterDwhStatusTransaksi();
    }
    else if(selectedTab === 3) {
      getDataMasterDwhPaycode();
    }
  }, [currentPage, dataRequest,selectedTab,dataFilter]);

  return (
    <div>
      <div>
        
        <Filter
          isOpening={false}
          itemSearch={selectedTab === 0 ? (itemSearch) : selectedTab === 2 ? (itemSearchTableRespon) : selectedTab === 1 ?(itemSearchTableStatus) : selectedTab === 3 ?(itemSearchTablePaycode) : (null)}
          onFilterSubmit={onFilterSubmit}
          handleReset={handleResetFilter}
        />
      </div>
      <Paper className={classes.filterSection}>
        {" "}
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            label="KdTranskasi"
            style={{ fontWeight: "500", fontSize: 16 }}
            className={classes.tabText}
            value={0}
          />
          <Tab
            label="StatusCard ID"
            style={{ fontWeight: "500", fontSize: 16 }}
            className={classes.tabText}
            value={1}
          />
          <Tab
            label="KdRespon"
            style={{ fontWeight: "500", fontSize: 16 }}
            className={classes.tabText}
            value={2}
          />
          <Tab
            label="PayCode"
            style={{ fontWeight: "500", fontSize: 16 }}
            className={classes.tabText}
            value={3}
          />
        </Tabs>
      </Paper>
      {selectedTab === 0 && (
        <>
       
          <div>
            <TablePagination
              data={data}
              fields={titleTable}
              cellOption={valueType}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
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
          </div>
         
        </>
      )}
      {selectedTab === 1 && (
        <>
          <TablePagination
            data={data}
            fields={titleStatusCard}
            cellOption={valueTypeStatusCard}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isWithCheck={false}
            isSort={isSortStatusCard}
            isUsingMuiSort
            handleSort={handleSortTableStatus}
            sortBy={sortByTableStatus}
            order={orderDirectionTableStatus}
       
            // handleSort={handleSort}
            // sortBy={sortBy}
            // order={orderDirection}
            isLoadData={isLoading}
          />
        </>
      )}
      {selectedTab === 2 && (
        <>
          <TablePagination
            data={data}
            fields={titleTableRespon}
            cellOption={valueTypeRespon}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isWithCheck={false}
            isSort={isSortRespon}
            isUsingMuiSort
            handleSort={handleSortTableRespon}
            sortBy={sortByTableRespon}
            order={orderDirectionTableRespon}
       
            // handleSort={handleSort}
            // sortBy={sortBy}
            // order={orderDirection}
            isLoadData={isLoading}
          />
        </>
      )}
      {selectedTab === 3 && (
        <>
          <TablePagination
            data={data}
            fields={titleStatusPaycode}
            cellOption={valueTypePaycode}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
            isWithCheck={false}
            isSort={isSortPaycode}
            isUsingMuiSort
            handleSort={handleSortTablePaycode}
            sortBy={sortByTablePaycode}
            order={orderDirectionTablePaycode}
       
            // handleSort={handleSort}
            // sortBy={sortBy}
            // order={orderDirection}
            isLoadData={isLoading}
          />
        </>
      )}
    </div>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(TableDwh))
);
