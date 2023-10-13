import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Grid, Typography } from "@material-ui/core";
import FilterData from "./FilterData";
import { ChkyTablePagination } from "../../../../components";
import { doGetSummarySurveyVendor } from "../../services";
import { doGetVendors } from "../../services";

const UseStyles = makeStyles((theme) => ({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "17px",
    color: "#2B2F3C",
  },
}));

const rowsPerPage = 10;

// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
  vendorName: "All",
  status: "All",
};

function NumberVendor() {
  const classes = UseStyles();

  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);

  // =====> DATA TABLE  <=====
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [tabelData, setTabelData] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(false);
  const [listVendor, setListVendor] = useState([]);

  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const titleTable = [
    "Vendor Name",
    "Jumlah Survey",
    "Survey Open",
    "Survey Tepat Waktu",
    "Survey Delay",
    "Survey Tidak Dikerjakan",
    "Survey Manual",
  ];
  const valueType = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
  ];
  const isSort = [true, true, true, true, true, true, true];
  const columnNameVar = [
    "vendorName",
    "jumlahSurvey",
    "surveyOpen",
    "surveyTepatWaktu",
    "surveyDelay",
    "surveyTidakDikerjakan",
    "surveyManual",
  ];

  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal = columnNameVar[titleTable.indexOf(property)];
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

  function handleFilterSubmit(value) {
    setResetPageCounter((prevCount) => prevCount + 1);
    console.log(value);
    if (value == null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...defaultDataHit,
        status: value.status,
        vendorName: value.vendorName,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  // get all vendors

  useEffect(() => {
    doGetVendors().then((response) => {
      if (response) {
        if (response.responseCode === "200") {
          const { vendorList } = response;
          setListVendor(vendorList);
        }
      }
    });
  }, []);

  // get all vendors

  useEffect(() => {
    doGetSummarySurveyVendor(loadDataHandler, dataRequest)
      .then((response) => {
        const dataRow = [];
        if (response.responseCode === "00") {
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
          console.log(response);
          const konten = response.content;
          konten.map((item) => {
            const newRow = {
              vendorName: item.vendorName,
              jumlahSurvey: item.jumlahSurvey,
              surveyOpen: item.surveyOpen,
              surveyTepatWaktu: item.surveyTepatWaktu,
              surveyDelay: item.surveyDelay,
              surveyTidakDikerjakan: item.surveyTidakDikerjakan,
              surveyManual: item.surveyManual,
            };
            dataRow.push(newRow);
          });
          setTabelData(dataRow);
        } else {
          setTabelData([]);
        }
      })
      .catch((err) => {
        console.log(`Error Fetching Data \n${err}`);
      });
  }, [dataRequest]);

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container>
          <Typography className={classes.title}>
            Jumlah Survey Media Promosi
          </Typography>
        </Grid>
        <div>
          <Grid container direction="column" justifyContent="space-between">
            <Grid item>
              <FilterData
                onFilterSubmit={handleFilterSubmit}
                isTable="status"
                listVendor={listVendor}
              />
            </Grid>
            <Grid item style={{ marginTop: -20 }}>
              <ChkyTablePagination
                data={tabelData}
                fields={titleTable}
                cellOption={valueType}
                isSort={isSort}
                changePage={handleChangePage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoadData}
                isUsingMuiSort
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

export default NumberVendor;
