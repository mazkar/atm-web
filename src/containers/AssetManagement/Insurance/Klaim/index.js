/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Grid,
  Link,
  Typography,
  Tab,
  Tabs,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import { RootContext } from "../../../../router";
import Constants from "../../../../helpers/constants";
import { GrayMedium, PrimaryHard } from "../../../../assets/theme/colors";

import { ChkyTablePagination } from "../../../../components";
import TableTemplate from "./common/TableTemplate";
import FilterComponent from "./common/FilterComponent";
import constansts from "../../../../helpers/constants";
import { doGetKlaimEEI } from "../../ApiServiceAsset";
import moment from "moment";
import { ReactComponent as ExclamationIcon } from "../../../../assets/icons/duotone-red/exclamation-circle.svg";

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
  titleContainer: {
    marginBottom: 25,
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  tableContent: {
    marginTop: 20,
  },
  containerPaper: {
    backgroundColor: Constants.color.white,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  text12Normal: {
    fontSize: 12,
    fontWeight: 400,
  },
  text12Bold: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text12Italic: {
    fontSize: 12,
    fontWeight: 400,
    fontStyle: "italic",
  },
  filterContainer: { marginBottom: 15 },
  paramButton: {
    width: "max-content",
    color: Constants.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: Constants.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
  responseStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    padding: "4px 10px",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  sortBy: "noTicket",
  sortType: "ASC",
  dataPerPage: 10,
  pageNumber: 0,
};

const itemSearch = [
  { text: "No Klaim", value: "id" },
  { text: "Status", value: "status" },
  { text: "Tipe Klaim", value: "type" },
  { text: "Tgl Input", value: "tglInput" },
  { text: "SN Mesin", value: "snMesin" },
];

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: constansts.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constansts.color.grayMedium,
    "&:hover": {
      color: constansts.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constansts.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

// DEFAULT EXPORT
const Klaim = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);

  // =====> DATA TABLE  <=====
  const [dataEEI, setDataEEI] = useState([]);
  const [dataMoney, setDataMoney] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  // Tabs
  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "eei";
    }
    if (newValueTab === 1) {
      hashTab = "money-insurance";
    }
    history.replace(`#${hashTab}`);
  };

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

  function handleFilterSubmit(value) {
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("+++ Filter Value: ",value);
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
    });
  }

  useEffect(() => {
    doGetKlaimEEI(loadingHandler, dataRequest)
      .then((res) => {
        const arrPush = [];
        if (res.status === 200) {
          const arrData = res.data.data.content;
          arrData.map((item) => {
            arrPush.push({
              noTicket: item.noTicket,
              status:
                item.status === 0 ? (
                  <div
                    className={classes.responseStatus}
                    style={{
                      background: "#FFF7F7",
                      border: "1px solid #FF6A6A",
                      color: "#FF6A6A",
                    }}
                  >
                    Unpaid
                  </div>
                ) : (
                  item.status === 1 && (
                    <div
                      className={classes.responseStatus}
                      style={{
                        background: "#DEFFE1",
                        border: "1px solid #1DD519",
                        color: "#1DD519",
                      }}
                    >
                      Paid
                    </div>
                  )
                ),
              typeKlaim: item.typeKlaim,
              tglPengajuan: item.tglPengajuan
                ? moment(item.tglPengajuan).format("DD/MM/YYYY")
                : "-",
              snMesin: item.snMesin,
              idMesin: item.idMesin,
              lokasi: item.lokasi,
              keteranganKerugian: item.keteranganKerugian,
              tglKejadian: item.tglKejadian
                ? moment(item.tglKejadian).format("DD/MM/YYYY")
                : "-",
              slaPengajuan:
                item.slaPengajuan > 9 ? (
                  <Typography
                    style={{
                      fontWeight: 400,
                      color: constansts.color.primaryMedium,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.slaPengajuan} Days{" "}
                    <ExclamationIcon style={{ marginLeft: 10 }} />
                  </Typography>
                ) : (
                  <Typography
                    style={{ fontWeight: 400, color: "#65D170", fontSize: 13 }}
                  >
                    {item.slaPengajuan} Days
                  </Typography>
                ),
              totalKerugian: item.totalKerugian,
              emailPenawaran: item.emailPenawaran,
              category: item.category,
              flm: item.flm,
              slm: item.slm,
              cctv: item.cctv,
              slaVerifikasi:
                item.slaVerifikasi > 9 ? (
                  <Typography
                    style={{
                      fontWeight: 400,
                      color: constansts.color.primaryMedium,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.slaVerifikasi} Days{" "}
                    <ExclamationIcon style={{ marginLeft: 10 }} />
                  </Typography>
                ) : (
                  <Typography
                    style={{ fontWeight: 400, color: "#65D170", fontSize: 13 }}
                  >
                    {item.slaVerifikasi} Days
                  </Typography>
                ),
              action: (
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 400,
                    color: constansts.color.primaryHard,
                  }}
                >
                  Detail
                </Button>
              ),
            });
          });
          setDataEEI(arrPush);
          setTotalPages(res.data.data.totalPage);
          setTotalRows(res.data.data.totalElements);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("+++ dataRequest", dataRequest);
    // doFetchListSchedules(loadingHandler, dataRequest)
    //   .then((response) => {
    //     // console.log("+++ response", response);
    //     if(response){
    //       if(response.responseCode === "200"){
    //         const {content} = response;
    //         setTotalRows(response.totalElements);
    //         setTotalPages(response.totalPages);
    //         const dataToSet = [];

    //         content.map((item) => {
    //           const newRow =
    //             {
    //               atmId: item.atmId,
    //             };
    //           dataToSet.push(newRow);
    //         });

    //         setData(dataToSet);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     // console.log("Error Fetch Data Orders", err);
    //     alert(`Terjadi Kesalahan:${err}`);
    //   });
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Klaim</Typography>
        </Grid>
      </Grid>

      <div style={{ marginTop: 50 }}>
        {/* TABS */}
        <ContentTabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="content tabs"
        >
          <ContentTab label="EEI" {...a11yProps(0)} style={{ minWidth: 180 }} />
          <ContentTab
            label="Money Insurance"
            {...a11yProps(1)}
            style={{ minWidth: 180 }}
          />
        </ContentTabs>
      </div>

      <Grid container>
        <Grid item xs={12}>
          <FilterComponent
            onFilterSubmit={handleFilterSubmit}
            itemSearch={itemSearch}
            handleReset={handleResetFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={valueTab} index={0} className={classes.tabContent}>
            <ChkyTablePagination
              data={dataEEI}
              fields={TableTemplate.titleTable}
              cellOption={TableTemplate.valueType}
              changePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoading}
              isSort={TableTemplate.isSort}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
            />
          </TabPanel>
          <TabPanel value={valueTab} index={1} className={classes.tabContent}>
            <ChkyTablePagination
              data={dataMoney}
              fields={TableTemplate.titleTable}
              cellOption={TableTemplate.valueType}
              changePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoading}
              isSort={TableTemplate.isSort}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Klaim;
