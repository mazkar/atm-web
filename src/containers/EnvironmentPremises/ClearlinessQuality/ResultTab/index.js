/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, useContext } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Box, Grid, Typography, Tabs, Tab, Button } from "@material-ui/core";
import Constants, { dataCard } from "../../../../helpers/constants";
import TablePaginationDigitalisasi from "../../../../components/Table/TablePaginationDigitalisasi";
import TableTicketing from "../TicketingTab";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/general/download-white.svg";
import FilterComponent from "../../../VendorManagement/Digitalisasi/Ticketing/common/FilterComponent";
import FilterData from "../../../VendorManagement/Digitalisasi/CheclistResult/common/FilterComponent";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import {
  doFetchResultClearliness,
  doExportExcelResultClearliness,
  doFetchCountClearnessQuality,
} from "../../../VendorManagement/ApiServices";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import { RootContext } from "../../../../router";
import SummaryCard from "../../../VendorManagement/Digitalisasi/Ticketing/common/SummaryCard";
import ModalUploadSurvey from "../../../../components/Modal/ModalUploadSurvey";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/linear-red/upload-cloud.svg";
import SummaryCardDigitalasi, {
  defaultDataSummary,
} from "../../../../components/SummaryCardDigitalasi";
import SummaryCardDigitalasiResult from "../../../../components/SummaryCardDigitalasiResult";

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
  buttonText: {
    color: Constants.color.primaryHard,
    textTransform: "capitalize",
  },
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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}
const ClearlinessResult = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userRoleName } = useContext(RootContext);
  const isVendor = userRoleName?.toLowerCase().includes("vendor");

  /* State */
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [isLoadData, setIsLoadData] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const rowsPerPage = 10;
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [valueTab, setValueTab] = useState(0);
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const [dataSummary, setDataSummary] = useState(defaultDataSummary);
  const [loadSummary, setLoadSummary] = useState(false);

  // set handler loader when call Approval API Service
  function loaderSummary(loaderValue) {
    setLoadSummary(loaderValue);
  }

  /* Template Table Static Data */
  const isSort = [true, true, true, true, true, true, true, true, true, false];
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
    "resultId",
    "atmId",
    "lokasi",
    "checklistVendor",
    "vendorName",
    "userVendor",
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

  /* Select Static Data */
  const itemSearch = [
    { text: "Result ID", value: "ticketNumber" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "lokasi" },
    { text: "Checklist Vendor", value: "checklistVendor" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "Vendor User", value: "vendorUser" },
    { text: "Start Date", value: "startDate" },
    { text: "End Date", value: "endDate" },
    { text: "Durasi", value: "durasi" },
    { text: "Status", value: "status" },
  ];
  const itemSearchTicket = [
    { text: "Ticket ID", value: "ticketNumber" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "lokasi" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "User Vendor", value: "vendorUser" },
    { text: "Category", value: "category" },
    { text: "Question", value: "question" },
    { text: "Kondisi", value: "kondisi" },
    { text: "Start Date", value: "startDate" },
  ];

  /* Methods */
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
    setIsFilterApply(true);
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

  function handleResetFilter() {
    setIsFilterApply(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
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

  const handleChangePage = (value) => {
    setDataRequest((prevValue) => ({
      ...prevValue,
      pageNumber: value,
    }));
  };

  const handleExportExcel = async () => {
    const res = await doExportExcelResultClearliness(loadDataHandler);
    console.log(res);
  };

  const handleClickDetail = (id) => {
    const { url, urlVendor } = dataCard.find(
      (item) => item.type === "clearlinessQuality"
    );
    history.push(isVendor ? `${urlVendor}/${id}` : `${url}/${id}`);
  };

  /* Check URL Bash */
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

  /* Fetch Data */
  useEffect(() => {
    doFetchResultClearliness(loadDataHandler, dataRequest).then((response) => {
      const {
        content,
        totalPages: responseTotalPages,
        totalElements,
      } = response;
      if (isFilterApply) {
        setTotalPages(responseTotalPages);
        setTotalRows(totalElements);
      }
      const formattedArray = content.map((item) => {
        return {
          id: item.id,
          atmId: item.atmId,
          location: item.location,
          checklistVendor: item.checklistVendor,
          vendorName: item.vendorName,
          userVendor: item.userId,
          startDate: useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY"),
          endDate: useTimestampConverter(item.endDate / 1000, "DD/MM/YYYY"),
          duration: `${item.intervalDay} ${item.intervalDesc}`,
          status: item.status,
          action: (
            <Button
              disabled={item.status === 1 ? true : false}
              className={classes.buttonText}
              onClick={() => handleClickDetail(item.id)}
            >
              Detail
            </Button>
          ),
        };
      });
      setDataResult(formattedArray);
    });
  }, [dataRequest]);

  // FETCH SUMARRY DATA
  useEffect(() => {
    const dataHit = valueTab === 0 ? "result" : "ticketing";
    doFetchCountClearnessQuality(loaderSummary, dataHit)
      .then((response) => {
        // console.log("+++ data response", response);
        if (response) {
          const { resultCheklist, vendor } = response;

          // Result
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
          const indexCloseTicketing = resultCheklist.findIndex(
            (item) => item.status == 1
          );
          const indexAssignTicketing = resultCheklist.findIndex(
            (item) => item.status == 2
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
                  delay: surveyDelayResult,
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
                {isFilterApply && (
                  <Grid item>
                    <MuiIconLabelButton
                      iconPosition="startIcon"
                      label="Export to Excel"
                      buttonIcon={<DownloadIcon />}
                      onClick={() => handleExportExcel()}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <SummaryCardDigitalasi data={dataSummary} valueTab={valueTab} />
        </div>
      ) : (
        <div>
          {" "}
          <Grid item>
            <Typography className={classes.title}>Ticketing</Typography>
          </Grid>
          <Grid item>
            <SummaryCardDigitalasi data={dataSummary} valueTab={valueTab} />
          </Grid>
        </div>
      )}

      <div>
        <FilterData
          itemSearch={valueTab === 0 ? itemSearch : itemSearchTicket}
          onFilterSubmit={handleFilterSubmit}
          isLoad={loadDataHandler}
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
                fields={titleTable}
                cellOption={valueType}
                isFilterApplied={isFilterApply}
                isLoadData={isLoadData}
                isSort={isSort}
                isUsingMuiSort
                handleSort={handleSort}
                sortBy={sortBy}
                order={orderDirection}
                data={dataResult}
                totalRows={totalRows}
                totalPages={totalPages}
                onChangePage={handleChangePage}
              />
            </TabPanel>
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <TableTicketing />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalUploadSurvey
        isOpen={openModalUpload}
        onClose={() => setOpenModalUpload(false)}
        onSuccesUpload={() => {
          setOpenModalUpload(false);
        }}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(ClearlinessResult))
);
