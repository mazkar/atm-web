/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, {useState,useEffect} from 'react';
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid,Box } from '@material-ui/core';

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import {PrimaryHard} from "../../../assets/theme/colors";
import FilterProgress from "../../VendorManagement/Orders/common/FilterProgress";
import TableTemplate from "./common/TableTemplate";
import { doGetListIntermiten } from "../serviceMonitoring";

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

function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

const IntermittenAlert = () => {
  const classes = useStyles();
  const history = useHistory();

  const rowsPerPage = 10;
  const defaultDataHit = {
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    sortBy: "Id",
    sortType: "ASC",
  };
  const [data, setData] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isLoadTable, setIsLoadTable] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const itemSearch = [
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "location" },
    { text: "Detail", value: "detail" },
    { text: "FLM", value: "flm" },
    { text: "SLM", value: "slm" },
    { text: "Jarkom", value: "jarkom" },
    { text: "Problems", value: "problems" },
  ];
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null,
  });

  function loaderHandlerTable(loaderValue) {
    setIsLoadTable(loaderValue);
  }

  /* Methods */
  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  const handleFilterSubmit = (value) => {
    setIsFilterApplied(true);
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
  };

  const handleResetFilter = () => {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  };
  /* const tableData = [
    {
      id: "1222",
      location: "TGR-CRM-CBG-CLG",
      detail: "TGR-CRM-CBG-CLG",
      flm: "TAG",
      slm: "Datindo",
      jarkom: "Vsat Telkom",
      problem: "BNA Warning, Cashout",
      status: "Acknowledge",
      action: <Button className={classes.textButton} onClick={() => {history.push(`/monitoring/intermitten-alert/detail/1`);}}>Detail</Button>,
    }
  ]; */

  useEffect(() => {
    try {
      doGetListIntermiten(loaderHandlerTable, dataRequest)
        .then((response) => {
          console.log("____response", response);
          const dataToSet = [];
          const tableData = response?.content;
          setTotalPages(response?.totalPages);
          setTotalRows(response?.totalElements);
          tableData.map((item) => {
            const newRow = {
              atmId: item?.atmId,
              location: item?.location,
              detail: item?.detail,
              flm: item?.flm,
              slm: item?.slm,
              jarkom: item?.jarkom,
              problems: item?.problems,
              status:
                item?.status === "1" ? (
                  <Status
                    value="Acknowledge"
                    borderColor="#65D170"
                    textColor="#65D170"
                    fillColor="#D9FFDD"
                  />
                ) : null,
              action: (
                <Button
                  className={classes.textButton}
                  onClick={() => {
                    history.push(
                      `/monitoring/intermitten-alert/detail/${item?.atmId}`
                    );
                  }}
                >
                  Detail
                </Button>
              ),
            };
            dataToSet.push(newRow);
          });
          setData(dataToSet);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(`Fail to Send Remark..!\n ${err}`);
    }
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Intermitten Alert</Typography>
      <FilterProgress
        isOpening={false}
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
        itemSearch={itemSearch}
      />
      <ChkyTablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={totalPages}
        totalRows={totalRows}
        sortBy={tableConfig.sortBy}
        order={tableConfig.orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
        isLoadData={isLoadTable}
      />
    </div>
  );
};;

export default IntermittenAlert;
