/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, useContext } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Box, Grid, Typography, Tabs, Tab, Button } from "@material-ui/core";
import { RootContext } from "../../../../router";
// import { ReactComponent as ResultPage } from "../../Digitalisasi/CheclistResult";
import Constants, { routeRef } from "../../../../helpers/constants";
import TablePagination from "../../../../components/chky/ChkyTablePagination";
import FilterData from "./common/FilterComponent";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/general/download-white.svg";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import TablePaginationDigitalisasi from "../../../../components/Table/TablePaginationDigitalisasi";
import TicketingNew from "../../../../components/NewOrder/TicketingNew";
import {
  doFetchTicketing,
  doFetchResult,
  doFetchCountChecklistResult,
} from "../../ApiServices";
import ButtonLink from "../../../../components/Button/ButtonLink";
import ModalLoader from "../../../../components/ModalLoader";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/linear-red/upload-cloud.svg";
import ModalUploadSurvey from "../../../../components/Modal/ModalUploadSurvey";
import SummaryCardDigitalasi, {
  defaultDataSummary,
} from "../../../../components/SummaryCardDigitalasi";
import SummaryCardDigitalasiResult from "../../../../components/SummaryCardDigitalasiResult";
import SummaryCardDigitalisasiTicketing from "../../../../components/SummaryCardDigitalisasiTicketing";
import moment from "moment";

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
  backLabel: {
    fontSize: 13,
    color: Constants.color.primaryHard,
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
  filterContainer: { marginBottom: 15 },
});

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}
// dummy res
const dataDummyResult = [
  {
    TicketId: 12,
    ATMId: 123,
    Lokasi: "Test",
    CheklistVendor: "FLM",
    VendorName: "PT.TRIAS",
    userVend: "Robert",
    StartDate: "12/12/2022",
    EndDate: "12/12/2023",
    Durasi: "60 menit",
    editFuction: <a> Detail</a>,
  },
  {
    TicketId: 13,
    ATMId: 132,
    Lokasi: "Test",
    CheklistVendor: "FLM",
    VendorName: "PT.TRIAS",
    userVend: "Roy",
    StartDate: "12/12/2022",
    EndDate: "12/12/2023",
    Durasi: "60 menit",
    editFuction: <a> Detail</a>,
  },
];
const dummyDataTicketing = [
  {
    ticketId: "C-21234",
    atmId: 1222,
    lokasi: "JKT.48.jakarta",
    vendorName: "PT. TRIAS",
    userVendor: "USER TRIAS",
    category: "FLM",
    question: "Camera cctv",
    kondisi: "tertutup",
    startDate: "12/11/2022",
    status: "Done",
  },
]; // INIT TABLE
const defaultType = "ASC";
const defaultColumn = "id";
// <--- init default totalRows
const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  sortType: defaultType,
  sortBy: defaultColumn,
  pageNumber: 0,
  dataPerPage: rowsPerPage,
};

const MainTicketing = () => {
  const classes = useStyles();
  const history = useHistory();
  const page = new URLSearchParams(window.location.search).get("page");
  const windowsHash = window.location.hash;

  // get userID
  const { userId, userRoleName } = useContext(RootContext);
  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  // result tab
  const [dataResult, setData] = useState([]);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // ticketing
  const [dataTicketing, setDataTicketing] = useState([]);
  const [dataRequestTicketing, setDataRequestTicketing] =
    useState(defaultDataHit);
  const [totalPagesTicketing, setTotalPagesTicketing] = useState(0);
  const [totalRowsTicketing, setTotalRowsTicketing] = useState(0);
  const [ticketNew, setTicketNew] = useState({
    ticketId: null,
    mesinId: null,
  });
  const [orderDirectionTicketing, setOrderDirectionTicketing] = useState("ASC");
  const [sortByTicketing, setSortByTicketing] = useState(null);
  const [resetPageCounterTicketing, setResetPageCounterTicketing] = useState(0);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const [dataSummary, setDataSummary] = useState(defaultDataSummary);
  const [loadSummary, setLoadSummary] = useState(false);

  // set handler loader when call Approval API Service
  function loaderSummary(loaderValue) {
    setLoadSummary(loaderValue);
  }

  // Inits Tabs Value
  const [valueTab, setValueTab] = useState(0);

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  // linkassign

  const assignTicket = (ticketingId, atmId, locationName, locationId) => {
    setOpenModalNewOrder(true);
    setTicketNew({
      ticketId: ticketingId,
      mesinId: atmId,
      locationName,
      locationId,
    });
  };

  // linkDetail
  const linkDetail = (id, checklistVendor) => {
    // console.log("helloh")
    const urlRoute = routeRef.find((val) => val.type === checklistVendor);
    // console.log("+++ urlRoute", urlRoute);
    if (urlRoute) {
      if (userRoleName.toLowerCase().includes("vendor")) {
        window.location.assign(`${urlRoute.urlVendor}/${id}`);
      } else {
        window.location.assign(`${urlRoute.url}/${id}`);
      }
    } else {
      alert("Route vendor checlist tidak dikenali!");
    }
  };
  // FETCH DATA RESULT
  useEffect(() => {
    doFetchResult(loaderHandler, dataRequest)
      .then((response) => {
        // console.log("~response result",response)
        // console.log("dataHit", dataRequest);
        if (isFilterApplied) {
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
        }
        setData(
          response.content.map((item) => ({
            resultId: item.id,
            atmId: item.atmId,
            location: item.location,
            checklistVendor: item.checklistVendor,
            nameVendor: item.vendorName,
            userVendor: item.userId,
            startDate: item.startDate
              ? moment(item.startDate).format("DD-MM-YYYY")
              : "",
            endDate: item.endDate
              ? moment(item.endDate).format("DD-MM-YYYY")
              : "",
            durasi: item.durasi,
            status: item.status,
            ...{
              detail: (
                <>
                  <ButtonLink
                    disabled={item.status === 1 ? true : false}
                    title="Detail"
                    onClick={() => linkDetail(item.id, item.checklistVendor)}
                  />
                </>
              ),
            },
          }))
        );
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);
  // FETCH DATA TICKETING
  useEffect(() => {
    doFetchTicketing(loaderHandler, dataRequestTicketing)
      .then((response) => {
        // console.log("~data response", response);
        // console.log("dataHit", dataRequestTicketing);
        setTotalPagesTicketing(response.totalPages);
        setTotalRowsTicketing(response.totalElements);
        setDataTicketing(
          response.content.map((item) => ({
            ticketId: item.id,
            atmId: item.atmId,
            location: item.location,
            vendorName: item.vendorName,
            userVendor: item.userId,
            category: item.surveyCategory,
            question: item.surveyQuestion,
            boothCondition: item.boothCondition,
            startDate: item.startDate,
            status: item.status,

            ...{
              assign: (
                <Grid item className={classes.backAction}>
                  <ButtonLink
                    title="Assign"
                    onClick={() =>
                      assignTicket(
                        item.id,
                        item.atmId,
                        item.location,
                        item.locationId
                      )
                    }
                  />
                </Grid>
              ),
            },
          }))
        );
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequestTicketing]);

  // FETCH SUMARRY DATA
  useEffect(() => {
    const dataHit = valueTab === 0 ? "result" : "ticketing";
    doFetchCountChecklistResult(loaderSummary, dataHit)
      .then((response) => {
        // console.log("+++ data response", response);
        if (response) {
          // Result
          const { resultCheklist, vendor } = response;
          const indexOpen = resultCheklist.findIndex(
            (item) => item.status == 1
          );
          const indexDone = resultCheklist.findIndex(
            (item) => item.status == 2
          );
          const indexSurvey = resultCheklist.findIndex(
            (item) => item.status == 3
          );
          const indexNotSurvey = resultCheklist.findIndex(
            (item) => item.status == 4
          );
          const indexManual = resultCheklist.findIndex(
            (item) => item.status == 5
          );

          const openResult = resultCheklist[indexOpen]
            ? resultCheklist[indexOpen].totalTask
            : 0;
          const doneResult = resultCheklist[indexDone]
            ? resultCheklist[indexDone].totalTask
            : 0;
          const surveyDelayResult = resultCheklist[indexSurvey]
            ? resultCheklist[indexSurvey].totalTask
            : 0;
          const notSurveyResult = resultCheklist[indexNotSurvey]
            ? resultCheklist[indexNotSurvey].totalTask
            : 0;
          const manualResult = resultCheklist[indexManual]
            ? resultCheklist[indexManual].totalTask
            : 0;

          // Ticketing
          const indexOpenTicketing = resultCheklist.findIndex(
            (item) => item.status == 0
          );
          const indexAssignTicketing = resultCheklist.findIndex(
            (item) => item.status == 2
          );
          const indexCloseTicketing = resultCheklist.findIndex(
            (item) => item.status == 1
          );

          const openTicketing = resultCheklist[indexOpenTicketing]
            ? resultCheklist[indexOpenTicketing].totalTask
            : 0;
          const assignTicketing = resultCheklist[indexAssignTicketing]
            ? resultCheklist[indexAssignTicketing].totalTask
            : 0;
          const closeTicketing = resultCheklist[indexCloseTicketing]
            ? resultCheklist[indexCloseTicketing].totalTask
            : 0;

          const leftCard =
            valueTab === 0
              ? {
                  total:
                    openResult +
                    doneResult +
                    surveyDelayResult +
                    notSurveyResult +
                    manualResult,
                  open: openResult,
                  done: doneResult,
                  surveyDelay: surveyDelayResult,
                  notSurvey: notSurveyResult,
                  manual: manualResult,
                  // assigned: resultCheklist.assToVendor,
                  // close: resultCheklist.close
                }
              : {
                  total: openTicketing + assignTicketing + closeTicketing,
                  open: openTicketing,
                  assign: assignTicketing,
                  close: closeTicketing,
                };
          const middleCard = [];

          vendor.slice(0, 5).map((item) => {
            middleCard.push({
              label: item.checklist_vendor,
              value: item.totalVendor,
            });
          });

          const rightCard = [];
          vendor.slice(5, vendor.length).map((item) => {
            rightCard.push({
              label: item.checklist_vendor,
              value: item.totalVendor,
            });
          });

          console.log(leftCard);
          setDataSummary({
            leftCard,
            middleCard,
            rightCard,
          });
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [valueTab]);

  // handler result
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  // hanlde ticket
  function handleChangePageTicketing(newPage) {
    setDataRequestTicketing({
      ...dataRequestTicketing,
      pageNumber: newPage,
    });
  }
  // sorting result
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
  // sorting ticketing
  function handleSortTicketing(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        columnNameVarTicketing[titleTableTicketing.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirectionTicketing(sortType);
      setSortByTicketing(property);
      // setOrderBy(sortByNewVal);
      setDataRequestTicketing({
        ...dataRequestTicketing,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }
  // filter ticketing
  function handleFilterSubmit(value) {
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequestTicketing(defaultDataHit);
    } else {
      // console.log("value",value);
      setDataRequestTicketing({
        ...defaultDataHit,
        ...value,
      });
    }
    // console.log("filter", dataRequestTicketing);
  }
  // filter result
  function handleFilterResult(value) {
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...defaultDataHit,
        ...value,
      });
      // console.log("Filter result", dataRequest);
    }
  }
  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequestTicketing({
      ...defaultDataHit,
    });
    if (valueTab === 0) {
      setTotalPages(0);
      setTotalRows(0);
    }
  }

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "result";
    }
    if (newValueTab === 1) {
      hashTab = "ticketing";
    }
    history.replace(`#${hashTab}`);
  };
  // check url hash

  useEffect(() => {
    const windowHash = window.location.hash;
    if (windowHash) {
      switch (windowHash) {
        case "#result":
          setValueTab(0);
          break;
        case "#ticketing":
          setValueTab(1);
          break;
        default:
          setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, [dataRequest]);

  // Tab Result
  const isSort = [true, true, true, true, true, true, true, true, true, false];
  const isSortTicketing = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
  ];
  const titleTable = [
    "Result ID",
    "ATM ID",
    "Lokasi",
    "Checklist Vendor",
    "Vendor Name",
    "Vendor User",
    "Start Date",
    "End Date",
    "Durasi",
    "Status",
    "",
  ];
  const columnNameVar = [
    "id",
    "atmId",
    "location",
    "checklistVendor",
    "vendorName",
    "userId",
    "startDate",
    "endDate",
    "durasi",
    "status",

    "",
  ];
  const valueType = [
    "limit20",
    "limit20",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "statusResult",

    "node",
  ];
  const titleTableTicketing = [
    "Ticket ID",
    "ATM ID",
    "Lokasi",
    "Vendor Name",
    "User Vendor",
    "Category",
    "Question",
    "Kondisi",
    "Start Date",
    "Status",
    "",
  ];
  const valueTypeTicketing = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "statusTicketNum",
    "node",
  ];
  const columnNameVarTicketing = [
    "id",
    "atmId",
    "location",
    "vendorName",
    "userId",
    "surveyCategory",
    "surveyQuestion",
    "boothCondition",
    "startDate",
    "status",
    "",
  ];
  const itemSearch = [
    { text: "Result ID", value: "id" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "location" },
    { text: "Checklist Vendor", value: "checklistVendor" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "Vendor User", value: "userVendor" },
    { text: "Start Date", value: "tanggalMulai" },
    { text: "End Date", value: "tanggalSelesai" },
    { text: "Durasi", value: "durasi" },
    { text: "Status", value: "status" },
  ];
  const itemSearchTicket = [
    { text: "Ticket ID", value: "id" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "location" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "User Vendor", value: "userVendor" },
    { text: "Category", value: "surveyCategory" },
    { text: "Question", value: "surveyQuestion" },
    { text: "Kondisi", value: "boothCondition" },
    { text: "Start Date", value: "tanggalMulai" },
    { text: "Status", value: "status" },
  ];
  const handleDownload = () => {
    setIsModalLoaderOpen(true);
    axios({
      url: `${process.env.REACT_APP_API_VENDORS}/downloadChecklistData`,
      responseType: "blob",
      method: "GET",
    })
      .then((res) => {
        // console.log(res.data);
        setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Result Checklist.xlsx");
        document.body.appendChild(link);
        link.addEventListener(
          "click",
          function () {
            setTimeout(() => {
              URL.revokeObjectURL(url);
              link.removeEventListener("click", this);
            }, 150);
          },
          false
        );
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        // console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      {valueTab === 0 ? (
        <div>
          <Grid
            container
            justify="space-between"
            className={classes.titleContainer}
          >
            <Grid item>
              <Typography className={classes.title}>
                Digital Checklist Results{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <MuiIconLabelButton
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #DC241F",
                      boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
                      marginRight: 5,
                      color: "#DC241F",
                    }}
                    iconPosition="startIcon"
                    label="Upload Survey"
                    buttonIcon={<UploadIcon />}
                    onClick={() => {
                      setOpenModalUpload(true);
                    }}
                  />
                </Grid>
                {isFilterApplied && (
                  <Grid item>
                    <MuiIconLabelButton
                      iconPosition="startIcon"
                      label="Export to Excel"
                      buttonIcon={<DownloadIcon />}
                      onClick={handleDownload}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <SummaryCardDigitalasiResult data={dataSummary} />
        </div>
      ) : (
        <div>
          <Grid
            container
            justify="space-between"
            className={classes.titleContainer}
          >
            <Grid item>
              <Typography className={classes.title}>Ticketing</Typography>
            </Grid>
          </Grid>
          <SummaryCardDigitalisasiTicketing data={dataSummary} />
        </div>
      )}
      <div>
        <FilterData
          itemSearch={valueTab === 0 ? itemSearch : itemSearchTicket}
          onFilterSubmit={
            valueTab === 0 ? handleFilterResult : handleFilterSubmit
          }
          handleReset={handleResetFilter}
        />
      </div>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="content tabs"
            >
              <ContentTab
                label="Result"
                {...a11yProps(0)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Ticketing"
                {...a11yProps(1)}
                style={{ minWidth: 100 }}
              />
            </ContentTabs>
          </Grid>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <TablePaginationDigitalisasi
                data={dataResult}
                fields={titleTable}
                cellOption={valueType}
                onChangePage={handleChangePage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                isLoadData={isLoading}
                isSort={isSort}
                isUsingMuiSort
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
                isFilterApplied={isFilterApplied}
                resetPageCounter={resetPageCounter}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <TablePagination
                fields={titleTableTicketing}
                cellOption={valueTypeTicketing}
                data={dataTicketing}
                changePage={handleChangePageTicketing}
                totalPages={totalPagesTicketing}
                rowsPerPage={rowsPerPage}
                totalRows={totalRowsTicketing}
                isLoadData={isLoading}
                isSort={isSortTicketing}
                isUsingMuiSort
                handleSort={handleSortTicketing}
                sortBy={sortByTicketing}
                order={orderDirectionTicketing}
                resetPageCounter={resetPageCounter}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {openModalNewOrder ? (
        <TicketingNew
          isOpen={openModalNewOrder}
          onClose={() => setOpenModalNewOrder(false)}
          dataTicket={ticketNew}
        />
      ) : null}
      {/* <FloatingChat /> */}
      <ModalUploadSurvey
        isOpen={openModalUpload}
        onClose={() => setOpenModalUpload(false)}
        onSuccesUpload={() => {
          setOpenModalUpload(false);
        }}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(MainTicketing))
);
