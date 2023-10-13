/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button } from '@material-ui/core';

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import {PrimaryHard, PrimaryUltrasoft} from "../../../assets/theme/colors";
import FilterComponent from "../../MediaPromosi/MediaPromosiQuality/common/FilterComponent";
import TableTemplate from "./common/TableTemplate";
import ServiceQueryProblem from './service';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize"
  }
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "atmId",
  sortType: "ASC",
  atmId: "all",
  lokasi: "all",
  flm: "all",
  slm: "all",
  jarkom: "all",
  durasi: "all",
  downTime: "all",
  upTime: "all",
  startDate: "all",
  endDate: "all",
};

const QueryProblem = () => {
  const classes = useStyles();
  const history = useHistory();
  const { hitQueryProblemOverview } = ServiceQueryProblem();

  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "atmId",
      sortType: "ASC",
      atmId: "all"
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null
  });

  const itemSearch = [
    {text: "ID ATM", value: "atmId"},
    {text: "Location", value: "lokasi"},
    {text: "FLM", value: "flm"},
    {text: "SLM", value: "slm"},
    {text: "Jarkom", value: "jarkom"},
    {text: "Durasi Downtime", value: "durasi"},
    {text: "% Downtime", value: "downTime"},
    {text: "% Uptime", value: "upTime"},
  ]

  /* Methods */
  function handleFilterSubmit(value) {
    console.log(value)
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = tableConfig.sortBy === property && tableConfig.orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setTableConfig((prevValue) => ({
        ...prevValue,
        orderDirection: sortType,
        sortBy: property,
        dataRequest: {
          ...tableConfig.dataRequest,
          sortType,
          sortBy: sortByNewVal
        }
      }));
      setDataRequest({...dataRequest, sortBy: sortByNewVal, sortType: sortType})
    };
  }

  function handleChangePage(newPage) {
    setDataRequest({...dataRequest, pageNumber: newPage})
  }

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  useEffect(() => {
    setIsLoading(true)
    // const {dataRequest} = tableConfig
    hitQueryProblemOverview(dataRequest).then((res) => {
      const {data} = res
      const dataToSet = []
      data.queryProblems.map((item) => {
        const newRow = {
          "atmId": item.atmId,
          "lokasi": item.lokasi,
          "flm": item.flm,
          "slm": item.slm,
          "jarkom": item.jarkom,
          "durasi": item.durasi,
          "downTime": item.downTime,
          "upTime": item.upTime,
          "detail": <Button className={classes.textButton} onClick={()=>{history.push(`/monitoring/query-problem/detail/${item.atmId}`);}}>Detail</Button>
        }
        dataToSet.push(newRow)
      })
      setTableData(dataToSet)
      setTableConfig({...tableConfig, totalPages: data.totalPages, totalRows: data.totalElements})
      setIsLoading(false)
    }).catch((err) => {
      console.log(err) 
      setIsLoading(false)
    })
  },[dataRequest])

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Query Problem</Typography>
      <FilterComponent onFilterSubmit={handleFilterSubmit} handleReset={handleResetFilter} itemSearch={itemSearch} />
      <ChkyTablePagination
        data={tableData}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={tableConfig.totalPages}
        totalRows={tableConfig.totalRows}
        sortBy={tableConfig.sortBy}
        order={tableConfig.orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isLoadData={isLoading}
        isUsingMuiSort
      />
    </div>
  );
};

export default QueryProblem;
