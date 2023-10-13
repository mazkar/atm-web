/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Axios from 'axios';
import moment from 'moment';
import { Box, Button, Link, Typography } from '@material-ui/core';
import ModalLoader from '../../../components/ModalLoader';

import { GrayBlue, GrayMedium } from '../../../assets/theme/colors';
import CommonTable from './CommonTable';
import FilterRbb from '../../SiteAndManagement/RbbImplementation/FilterRBB';
import FilterSelect from './FilterSelect';
import { ChkyTablePagination, StringAlign } from '../../../components';
import ModalNotFound from '../AnalyzeTargetDetail/ModalNotFound';
import { orderBy } from 'lodash';

const useStyles = makeStyles(() => ({}));

const UrlAction = ({ text, idAtm, handlingModal }) => {

  const [isOpenModalLoader, setModalLoader] = useState(false);

  const getDataDetail = async (atmIdJump) => {
    try {
      setModalLoader(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        {
          atmId: atmIdJump,
        },
        config
      );
    // console.log("<<< RESULT: ",result);
      if((result.data.message === "ATM ID NOT FOUND")||(result.data.data === null)){
        setModalLoader(false);
        handlingModal(true);
      }else{
        window.location.assign(`/trend-analisa/detail/${atmIdJump}`);
        setModalLoader(false);
      }
      setModalLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataBrand Select...! \n${err}`);
      setModalLoader(false);
    }
  };

  function actionDetails(atmIdJump){
    if(atmIdJump === null){
      handlingModal(true);
    }else{
      getDataDetail(atmIdJump);
      // window.location.assign(`/trend-analisa/detail/${atmIdJump}`);
    }
  }
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography style={{ fontSize: 13 }}>
          {
            idAtm == undefined || idAtm.trim() == "" ?
              <span style={{color: "#929191"}}>{text}</span>
            :
              <Link
                style={{ color: "#DC241F", textDecoration: "none" }}
                onClick={()=>{actionDetails(idAtm);}}
              >
                {text}
              </Link>
          }
          {/* // <Link
          //   style={{ color: "#DC241F", textDecoration: "none" }}
          //   onClick={()=>{actionDetails(idAtm);}}
          // >
          //   {text}
          // </Link> */}
        </Typography>
      </Box>
      <ModalLoader isOpen={isOpenModalLoader} />
    </Box>
  );
};
const TabPanelItem = props => {
  const classes = useStyles();
  const { index } = props
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [resetCounter, setResetCounter] = useState(0); // <--- init reset page counter
  const [orderDirection, setOrderDirection] = useState('asc');

  // >>>> FIND ATM ID FOR DETAIL
  const [isNotFound, setIsNotFound] = useState(false);
  function handleIsNotFound(bool){
    setIsNotFound(bool);
  };

  // const [filter, setFilter] = useState('Closest');
  const [filter, setFilter] = useState([
    { areaName: 'All', city: 'All' },
  ]);
  const [dataHit, setDataHit] = useState({
    currentTab: props.title,
    pageNumber: currentPage,
    dataPerPage: rowsPerPage,    
    areaId: "All",
    cityId: "All",
    dueDate: "",
    // status: "",
    status: "All",
    submissionDate: "",
    mesin: "All",
    atmId: "All",
    orderDirection: orderDirection,
    orderBy: sortBy
  });

  function handleFilterChange(newFilterValue) {
  // console.log("cek data dari hasil select filter ==> ", newFilterValue);
    setCurrentPage(0);
    setResetCounter(prevCounter=>prevCounter+1);
    setFilter(newFilterValue);
    setDataHit({
      currentTab: props.title,
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      areaId: newFilterValue.areaName,
      cityId: newFilterValue.city,
      dueDate: newFilterValue.dueDate === 'All' ? '' : newFilterValue.dueDate,
      // status: newFilterValue.status,
      status: newFilterValue.progress,
      submissionDate: newFilterValue.submission,
      mesin: newFilterValue.machine,
      atmId: newFilterValue.atmId,
      orderDirection: orderDirection,
      orderBy: sortBy
    });
  }

  useEffect(() => {
  // console.log('RBB CHECK JUDUL :', props.title);
    setDataHit({
      currentTab: props.title,
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,    
      areaId: "All",
      cityId: "All",
      dueDate: "",
      // status: "",
      status: "All",
      submissionDate: "",
      mesin: "All",
      atmId: "All",
      orderDirection: orderDirection,
      orderBy: sortBy
    });
  }, [props.title]);

  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataTable();
  }, [dataHit, currentPage, orderDirection, sortBy]);

  // API INTEGRATION
  const [dataTable, setDataTable] = useState([]);
  const fetchDataTable = async () => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // };
    const dataToSet = [];
    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    let dataHitApi = {
      pageNumber: dataHit.pageNumber,
      dataPerPage: dataHit.dataPerPage,    
      areaId: dataHit.areaId,
      cityId: dataHit.cityId,
    };
    if(dataHit.currentTab === 'Target New ATM'){
      dataHitApi = {
        ...dataHitApi,
        orderDirection: orderDirection,
        orderBy: getColumnId(sortBy),
        status: dataHit.status + '',
        mesin: dataHit.mesin
        // submissionDate: dataHit.submissionDate
      };
    }if(dataHit.currentTab === 'Target Renewal'){
      dataHitApi = {
        ...dataHitApi,
        // dueDate: dataHit.dueDate,
        atmId: dataHit.atmId,
        status: dataHit.status,
        orderDirection: orderDirection,
        orderBy: getColumnId(sortBy),
      };
    }if(dataHit.currentTab === 'Target Termin'){
      dataHitApi = {
        ...dataHitApi,
        atmId: dataHit.atmId,
        status: dataHit.status,
        orderDirection: orderDirection,
        orderBy: getColumnId(sortBy),
        // dueDate: dataHit.dueDate,
      };
    }
    const urlApiService = (option) => {
      if (option === 'Target New ATM') {
        return `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getNewRbbImplementation`;
      }
      if (option === 'Target Renewal') {
        // return `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/viewTargetRenewalAtm`;
        return `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRenewalRbbImplementation`;
      }
      // return `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/viewTargetTerminAtm`;
      return `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/terminRbbImpl`;
    };
    try {
      
      setModalLoader(true);
      const result = await Axios.post(
        `${urlApiService(dataHit.currentTab)}`,
        dataHitApi,
        headers
      );
      // reconstruct data from DB to dataMaps
      try {
        if (dataHit.currentTab === 'Target New ATM') {
          const dataPre = result.data.content;
          setTotalPages(result.data.totalPages);
          setTotalRows(result.data.totalElements);

          const hash = window.location.hash.substring(1);
          
          dataPre.map((row) => {
            const dateString = moment
              .unix(row.dueDate / 1000)
              .format('DD/MM/YYYY');

            const actionDetailsNewATM = [
              { name: 'Detail', id: row.status, funct: tesdetail, value: row.id, step: row.progress, isDisable: true },
            ];

            const newRow = {
              locationId: row.locationId,
              atmId: row.atmId,
              newCity: row.newCity,
              areaName: row.area,
              model: row.modelFinal,
              newLocation: <StringAlign value={row.newLocation} align="left"/>,
              submissionDate:
                row.submissionDate === null
                  ? '-'
                  : moment(row.submissionDate).format('DD/MM/YYYY'), // ini tgl submision
              machineType: row.machineType,
              progress:
                row.status === null
                  ? '-'
                  : row.status,
              lastUpdate:
                row.lastUpdate === null
                  ? '-'
                  : moment(row.lastUpdate).format('DD/MM/YYYY'), // ini last update
              onlineDate:
                row.onlineDate === null
                  ? '-'
                  : moment(row.onlineDate).format('DD/MM/YYYY'), // ini tgl online
              remark: row.remark,
              // actionDetailsNewATM,
              action: <UrlAction idAtm={row.atmId} handlingModal={handleIsNotFound} text="Lihat Detail"/>,
            };
            dataToSet.push(newRow);
          });
        } else if (dataHit.currentTab === 'Target Renewal') {
          const dataPre = result.data.content;
          setTotalPages(result.data.totalPages);
          setTotalRows(result.data.totalElements);

          const hash = window.location.hash.substring(1);

          dataPre.map((row) => {
            const newRow = {
              atmId: row.atmId,
              areaName: row.area,
              newLocation: <StringAlign value={row.locationName} align="left"/>,
              deadLine: row.rentRemaining === null ? '-' : row.rentRemaining,
              dueDate:
                row.dueDate === null
                  ? '-'
                  : moment(row.dueDate).format('DD/MM/YYYY'),
              lastStatus: row.status === null
                ? '-'
                : row.status,
              model: row.modelFinal,
              remark: row.renewalReason,
              action: <UrlAction idAtm={row.atmId} handlingModal={handleIsNotFound} text="Lihat Detail" />,
            };
            dataToSet.push(newRow);
          });
        } else {
          const dataPre = result.data.content;
          setTotalPages(result.data.totalPages);
          setTotalRows(result.data.totalElements);

          const hash = window.location.hash.substring(1);

          dataPre.map((row) => {
            const dateString = moment
              .unix(row.dueDate / 1000)
              .format('DD/MM/YYYY');
            const newRow = {
              atmId: row.atmId,
              areaName: row.areaName ? row.areaName : '-',
              newLocation: <StringAlign value={row.locationName} align="left"/>,
              deadLine: row.rentRemaining === null ? '-' : row.rentRemaining,
              dueDate:
                row.dueDate === null
                  ? '-'
                  : moment(row.dueDate).format('DD/MM/YYYY'),
              lastStatus: row.status === null
                ? '-'
                : row.status,
              model: row.modelFinal,
              remark: row.terminReason,
              action: <UrlAction idAtm={row.atmId} handlingModal={handleIsNotFound} text="Lihat Detail" />,
            };
            dataToSet.push(newRow);
          });
        }
      } catch (error) {
        setIsLoading(false);
        alert(`Error Refactor Data Table...! \n ${error}`);
      }
      setDataTable(dataToSet);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(`Error Fetching Data Table...! \n${err}`);
    }
  };

  // init data table Fields and valueTypes
  let titleTable; 
  let valueType; 
  let isSort;

  // titleTable = ['ATM ID', 'Lokasi', 'Remark', 'PIC', 'Due Date', ''];
  // valueType = ['string', 'string', 'string', 'string', 'string', 'child'];
  
  if (dataHit.currentTab === 'Target New ATM') {
    titleTable = [
      'ID Requester',
      'ID ATM',
      'City',
      'Area',
      'Propose Model',
      'New Location',
      'Tgl Submission',
      'Mesin',
      'Progress',
      'Last Update',
      'Tgl Online',
      'Remark',
      // 'Action',
      ''
    ];
    valueType = [
      'string',
      'string',
      'string',
      'string',
      'string',
      'child',
      'string',
      'string',
      'statusRbb_Implementation',
      'string',
      'string',
      'string',
      // 'modal_RBB',
      'child'
    ];
    isSort = [true, true, true, true, true, true, true, true, true, true, true, true];
  } else if (dataHit.currentTab === 'Target Renewal') {    
    titleTable = [
      'ATM ID',
      'Area',
      'Location',
      'Habis Masa Sewa',
      'Tgl Jatuh Tempo',
      'Status Terakhir',
      'Model',
      'Remark',
      , ''
    ];
    valueType = [
      'string',
      'string',
      'child',
      'status_expire',
      'string',
      'statusRbb_Implementation',
      'string',
      'string'
    ];
    isSort = [true, true, true, true, true, true, true, true];
  } else {
    titleTable = [
      'ATM ID',
      'Area',
      'Location',
      'Habis Masa Sewa',
      'Tgl Jatuh Tempo',
      'Status Terakhir',
      'Model',
      'Remark',
      ''
    ];
    valueType = [
      'string',
      'string',
      'child',
      'status_expire',
      'string',
      'statusRbb_Implementation',
      'string',
      'string',
      'child'
    ];
    isSort = [true, true, true, true, true, true, true, true];
  }

  const [sortBy, setSortBy] = useState(titleTable[0]);

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'asc';
      setOrderDirection(isActiveAndAsc ? 'desc' : 'asc');
      setSortBy(property);
    };
  }

  function getColumnId(columnLabel) {
    if(dataHit.currentTab === 'Target New ATM'){
      if (columnLabel === titleTable[0]) {
        return 'locationId';
      }
      if (columnLabel === titleTable[1]) {
        return 'atmId';
      }
      if (columnLabel === titleTable[2]) {
        return 'newCity';
      }
      if (columnLabel === titleTable[3]) {
        return 'area';
      }
      if (columnLabel === titleTable[4]) {
        return 'modelTeam';
      }
      if (columnLabel === titleTable[5]) {
        return 'newLocation';
      }
      if (columnLabel === titleTable[6]) {
        return 'submissionDate';
      }
      if (columnLabel === titleTable[7]) {
        return 'machineType';
      }
      if (columnLabel === titleTable[8]) {
        return 'status';
      }
      if (columnLabel === titleTable[9]) {
        return 'lastUpdate';
      }
      if (columnLabel === titleTable[10]) {
        return 'onlineDate';
      }
      if (columnLabel === titleTable[11]) {
        return 'remark';
      }
      return 'id';
    }else{
      if (columnLabel === titleTable[0]) {
        return 'atmId';
      }
      if (columnLabel === titleTable[1]) {
        if(index == 1){
          return 'area'
        }
        return 'areaName';
      }
      if (columnLabel === titleTable[2]) {
        return 'locationName';
      }
      if (columnLabel === titleTable[3]) {
        return 'rentRemaining';
      }
      if (columnLabel === titleTable[4]) {
        return 'dueDate';
      }
      if (columnLabel === titleTable[5]) {
        return 'status';
      }
      if (columnLabel === titleTable[6]) {
        return 'modelFinal';
      }
      if (columnLabel === titleTable[7]) {
        if(index == 1){
          return 'renewalReason'
        }
        return 'terminReason';
      }
      return 'id';
    }
  }

  function tesdetail(val) {
    // alert("Ini pop up Detail", val);
  // console.log('value', val[0].step);
    const status = val[0].step;
    if (status === 1) {
      goTo.push('/acquisition#savedlocation');
    } else if (status === 2) {
      goTo.push('/acquisition/profiling');
    } else if (status === 3) {
      goTo.push(`/negotiation/detail/${val[0].value}`);
    } else if (status === 4) {
      goTo.push(`/procurement-detail#${val[0].value}`);
    } else if (status === 5) {
      goTo.push(`/approval/detail/${val[0].value}`);
    } else if (status === 6) {
      goTo.push('/submission-tracking');
    } else if (status === 12) {
      goTo.push('/implementation');
    } else {
      alert("No progress");
    }
  }

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      pageNumber: newPage,
      dataPerPage: rowsPerPage,
      currentTab: props.title,
      areaId: dataHit.areaId,
      cityId: dataHit.cityId,
      dueDate: dataHit.dueDate,
      status: dataHit.status,
      submissionDate: dataHit.submissionDate,
    });
  }

  const optionsSelectFilter = [
    { value: 0, label: 'Closest' },
    { value: 1, label: 'Farthest' },
  ];
    
  let filterSearch;
  if (dataHit.currentTab === 'Target New ATM') {
    filterSearch = (
      <FilterRbb onFilterSubmit={handleFilterChange} showProgress showMachine type='New' />
    );
  } else if (dataHit.currentTab === 'Target Renewal') {
    filterSearch = (
      <FilterRbb onFilterSubmit={handleFilterChange} showATMID showProgress type='Renewal' />
    );
  } else {
    filterSearch = (
      <FilterRbb onFilterSubmit={handleFilterChange} showATMID showProgress type='Termin'/>
    );
  }

  return (
    <div>
      <Paper
        style={{
          // boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          // borderRadius: '10px',
          // padding: 16,
          marginBottom: 15,
        }}
      >
        {filterSearch}
      </Paper>
      <ChkyTablePagination
        data={dataTable}
        fields={titleTable}
        cellOption={valueType}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        changePage={handleChangePageValue}
        isLoadData={isLoading}
        resetPageCounter={resetCounter}
        isUsingMuiSort={true}
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
        isSort={isSort}
      />
      {/* <CommonTable header={tableHeaderContent} body={tableContent} /> */}
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
      <ModalNotFound isOpen={isNotFound} onClose={()=>handleIsNotFound(false)}/>
    </div>
  );
};

export default TabPanelItem;
