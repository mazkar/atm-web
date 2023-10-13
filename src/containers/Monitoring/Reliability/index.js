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
  circleStatus: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const Reliability = () => {
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

  const CircleStatus = ({ type }) => (
    <div
      className={classes.circleStatus}
      style={{ backgroundColor: type === "up" ? "#65D170" : "#DC241F" }}
    />
  );
  const StatusText = ({ type, label }) => (
    <Grid container alignItems="center">
      <CircleStatus type={type} />
      <Typography
        style={{
          marginLeft: "8px",
          fontSize: "13px",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Typography>
    </Grid>
  );

  const Progress = ({ value }) => (
    <div
      style={{
        background: "#FFF5F4",
        height: "16px",
        borderRadius: "5px",
        width: "50px",
      }}
    >
      <div
        style={{
          background: "#FF7774",
          height: "16px",
          borderRadius: "5px",
          width: `${value}%`,
        }}
      />
    </div>
  );

  const tableData = [
    {
      atmId: "1222",
      lokasi: "JKT.ABCD",
      machine: "SSDe",
      atmCash: "Rp. 150.000.000",
      status: <StatusText type="up" label="online" />,
      link: <StatusText type="up" label="up" />,
      dsf: <CircleStatus type="up" />,
      crc: <CircleStatus type="up" />,
      rp1: <CircleStatus type="down" />,
      jnl: <CircleStatus type="up" />,
      epf: <CircleStatus type="up" />,
      c1: <Progress value="80" />,
      c2: <Progress value="20" />,
      c3: <Progress value="100" />,
      c4: <Progress value="30" />,
      deviceFail: "Disp Fault",
      rat: "98%",
      lastTrx: "###",
      lastRCode: "Server is Down",
      statusEj: "Success",
      screen: "Complete",
      score: "18",
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
    },
    {
      atmId: "1222",
      lokasi: "JKT.ABCD",
      machine: "SSDe",
      atmCash: "Rp. 150.000.000",
      status: <StatusText type="down" label="not available" />,
      link: <StatusText type="down" label="Down" />,
      dsf: <CircleStatus type="up" />,
      crc: <CircleStatus type="up" />,
      rp1: <CircleStatus type="down" />,
      jnl: <CircleStatus type="up" />,
      epf: <CircleStatus type="up" />,
      c1: <Progress value="80" />,
      c2: <Progress value="20" />,
      c3: <Progress value="100" />,
      c4: <Progress value="30" />,
      deviceFail: "Disp Fault",
      rat: "98%",
      lastTrx: "###",
      lastRCode: "Server is Down",
      statusEj: "Success",
      screen: "Complete",
      score: "18",
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
    },
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Reliability</Typography>
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

export default Reliability;
