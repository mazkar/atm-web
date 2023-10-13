/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from "@material-ui/core";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import FilterProgress from "../../VendorManagement/Orders/common/FilterProgress";
import TableTemplate from "./common/TableTemplate";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const ReliabilityReport = () => {
  const classes = useStyles();
  const history = useHistory();

  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
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

  /* Methods */
  function handleFilterSubmit(value) {
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
  }

  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc =
        tableConfig.sortBy === property && tableConfig.orderDirection === "ASC";
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
          sortBy: sortByNewVal,
        },
      }));
    };
  }

  function handleChangePage(newPage) {
    setTableConfig({
      dataRequest: {
        ...tableConfig.dataRequest,
        pageNumber: newPage,
      },
    });
  }

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  const tableData = [
    {
      atmid: "A00",
      location: "JKT.ABCD",
      machine: "SSDe",
      denom: "100",
      link: "Telkom",
      flm: "TAO",
      slm: "NCF",
      bulan3: "97%",
      bulan2: "99%",
      bulan1: "##",
      bulan0: "##",
      downtime: "0%",
      lc: "1",
      df: "0.2",
      cf: "0.2",
      rf: "0.2",
      jf: "0.2",
      co: "0.2",
      trx3: "1.208",
      trx2: "1.208",
      trx1: "1.208",
      trx0: "1.208",
      rev3: "1.208",
      rev2: "1.208",
      rev1: "1.208",
      rev0: "1.208",
      action: (
        <Button
          className={classes.textButton}
          onClick={() => {
            history.push(`/monitoring/reliability/detail/1`);
          }}
        >
          Medical Record
        </Button>
      ),
    }
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Reliability Report</Typography>
      <FilterProgress isOpening={false} />
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
        isUsingMuiSort
      />
    </div>
  );
};

export default ReliabilityReport;
