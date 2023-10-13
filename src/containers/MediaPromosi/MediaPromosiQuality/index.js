/* eslint-disable no-unneeded-ternary */
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
import { useHistory, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { RootContext } from "../../../router";
import Constants from "../../../helpers/constants";
import { ChkyTablePagination } from "../../../components";
import TableTemplate from "./common/TableTemplate";
import FilterComponent from "./common/FilterComponent";
import SuccessPopUp from "../../Implementation/cimb/common/PopUp/successPopUp";
import {
  ContentTabs,
  ContentTab,
  TabPanel,
  a11yProps,
} from "../../../components/TabsMui";
import TablePaginationDigitalisasi from "../../../components/Table/TablePaginationDigitalisasi";
import {
  doFetchMediaPromosiResultList,
  doFetchMediaPromosiTicketingList,
} from "../services";
import useTimestampConverter from "../../../helpers/useTimestampConverter";
import TicketingNew from "../../../components/NewOrder/TicketingNew";
import ModalLoader from "../../../components/ModalLoader";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/general/download-white.svg";
import SummaryCard from "../../VendorManagement/Digitalisasi/Ticketing/common/SummaryCard";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload-cloud.svg";
import SummaryCardDigitalasi, {
  defaultDataSummary,
} from "../../../components/SummaryCardDigitalasi";
import { doFetchCountMediaPromosi } from "../../VendorManagement/ApiServices";
import ModalUploadSurveyMedia from "./common/ModalUploadSurveyMedia";
import SummaryCardDigitalasiResult from "../../../components/SummaryCardDigitalasiResult";
import SummaryCardDigitalisasiTicketing from "../../../components/SummaryCardDigitalisasiTicketing";
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
  link: {
    color: Constants.color.primaryHard,
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

// DEFAULT EXPORT
const Scheduling = () => {
  const classes = useStyles();
  const history = useHistory();
  const page = new URLSearchParams(window.location.search).get("page");
  const windowsHash = window.location.hash;

  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const [uploadSchedule, setUploadSchedule] = useState(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [openModalNewSchedule, setOpenModalNewSchedule] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [idEdit, setIdEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [openModalUpload, setOpenModalUpload] = useState(false);

  const [dataSummary, setDataSummary] = useState(defaultDataSummary);
  const [loadSummary, setLoadSummary] = useState(false);

  // set handler loader when call Approval API Service
  function loaderSummary(loaderValue) {
    setLoadSummary(loaderValue);
  }

  const dummyData = [
    {
      id: 1,
      scheduleId: 123,
      atmId: 1222,
      lokasi: "TGR-CRM-CBG-CLG",
      checklistVendor: "Media Promosi",
      vendorName: "Pt.Maju Jaya",
      userVendor: "Robert Fox",
      startDate: "12/12/2021, 14:00",
      endDate: "12/12/2021, 15:00",
      duration: "60 Menit",
      editFunction: (
        <Link
          onClick={() => {
            window.location.assign(
              `/media-promosi/media-promosi-quality/result/1`
            );
          }}
        >
          Detail
        </Link>
      ),
    },
  ];

  const dummyDataTicketing = [
    {
      id: 1,
      ticketId: "C-2123",
      atmId: 1222,
      lokasi: "TGR-CRM-CBG-CLG",
      vendorName: "Pt.Maju Jaya",
      userVendor: "Agung A",
      category: "Media Promosi",
      question: "Media Promosi",
      kondisi: "Tertutupi",
      startDate: "07/02/2022",
      status: "Open",
      editFunction: (
        <Link
          onClick={() => {
            setCurrentRow({ id: 1 });
            setOpenModalNewOrder(true);
          }}
        >
          Assign
        </Link>
      ),
    },
  ];

  const itemSearchTicketing = [
    { text: "Ticket ID", value: "id" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "location" },
    { text: "Checklist Vendor", value: "checklistVendor" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "Vendor User", value: "userId" },
    { text: "Start Date", value: "startDate" },
    { text: "End Date", value: "endDate" },
    { text: "Durasi", value: "durasi" },
    { text: "Status", value: "status" },
  ];
  const itemSearchResult = [
    { text: "Result ID", value: "id" },
    { text: "ATM ID", value: "atmId" },
    { text: "Lokasi", value: "location" },
    { text: "Checklist Vendor", value: "checklistVendor" },
    { text: "Vendor Name", value: "vendorName" },
    { text: "Vendor User", value: "userId" },
    { text: "Start Date", value: "startDate" },
    { text: "End Date", value: "endDate" },
    { text: "Durasi", value: "durasi" },
    { text: "Status", value: "status" },
  ];

  // =====> DATA TABLE  <=====
  // TICKETING TABLE RESULT
  const [dataResult, setDataResult] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // INIT TICKETING TABLE VARIABLES
  const [dataTicketing, setDataTicketing] = useState([]);
  const [dataRequestTicketing, setDataRequestTicketing] =
    useState(defaultDataHit);

  const [totalPagesTicketing, setTotalPagesTicketing] = useState(0);
  const [totalRowsTicketing, setTotalRowsTicketing] = useState(0);
  const [orderDirectionTicketing, setOrderDirectionTicketing] = useState("ASC");
  const [sortByTicketing, setSortByTicketing] = useState(null);
  const [resetPageCounterTicketing, setResetPageCounterTicketing] = useState(0);

  const [ticketNew, setTicketNew] = useState({
    ticketId: null,
    mesinId: null,
    locationName: null,
    locationId: null,
  });

  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  // HANDLER
  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  // HANDLER
  function handleChangePageTicketing(newPage) {
    setDataRequestTicketing({
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

  function handleSortTicketing(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVarTicketing[
          TableTemplate.titleTableTicketing.indexOf(property)
        ];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      // console.log("+++ sortByNewVal", sortByNewVal);
      setOrderDirectionTicketing(sortType);
      setSortByTicketing(property);
      // setOrderBy(sortByNewVal);
      setDataRequestTicketing({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }
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

  function handleResetFilter() {
    setIsFilterApplied(false);
    setDataRequest({
      ...defaultDataHit,
    });
  }

  const assignTicket = (ticketingId, atmId, locationName, locationId) => {
    setOpenModalNewOrder(true);
    setTicketNew({
      ticketId: ticketingId,
      mesinId: atmId,
      locationName,
      locationId,
    });
  };

  useEffect(() => {
    // console.log("+++ dataRequest",dataRequest);
    if (isFilterApplied) {
      if (currentTab === 0) {
        doFetchMediaPromosiResultList(loadingHandler, dataRequest)
          .then((res) => {
            console.log("~ res tab result", res);
            setDataResult(
              res.content.map((item) => ({
                id: item.id,
                resultId: item.id,
                atmId: item.atmId,
                lokasi: item.location,
                checklistVendor: item.checklistVendor,
                vendorName: item.vendorName,
                userVendor: item.userId,
                startDate: moment(item.startDate).format("DD/MM/YYYY"),
                endDate: moment(item.endDate).format("DD/MM/YYYY"),
                durasi: item.durasi,
                status: item.status,
                editFunction: (
                  <Link
                    disabled={item.status === 1 ? true : false}
                    className={classes.link}
                    component={RouterLink}
                    to={`/media-promosi/media-promosi-quality/vendor-media-promosi/${item.id}`}
                  >
                    Detail
                  </Link>
                ),
              }))
            );
            setTotalPages(res.totalPages);
            setTotalRows(res.totalElements);
          })
          .catch((err) => {
            console.log("~ err", err);
          });
      }
    }
  }, [dataRequest, isFilterApplied]);

  useEffect(() => {
    if (currentTab === 1) {
      doFetchMediaPromosiTicketingList(loadingHandler, dataRequestTicketing)
        .then((res) => {
          // console.log('~ res', res);
          setDataTicketing(
            res.content.map((item) => ({
              id: item.id,
              atmId: item.atmId,
              lokasi: item.location,
              vendorName: item.vendorName,
              userVendor: item.userId,
              category: item.surveyCategory,
              question: item.surveyQuestion,
              kondisi: item.boothCondition,
              startDate: moment(item.startDate).format("DD/MM/YYYY"),
              status: item.status,
              editFunction: (
                <Link
                  className={classes.link}
                  onClick={() =>
                    assignTicket(
                      item.id,
                      item.atmId,
                      item.location,
                      item.locationId
                    )
                  }
                >
                  Assign
                </Link>
              ),
            }))
          );
          setTotalPagesTicketing(res.totalPages);
          setTotalRowsTicketing(res.totalElements);
        })
        .catch((err) => {
          console.log("~ err", err);
        });
    }
  }, [dataRequestTicketing, currentTab]);

  const handleChangeTab = (event, newValueTab) => {
    setCurrentTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "result";
    }
    if (newValueTab === 1) {
      hashTab = "ticket";
    }
    history.push(`#${hashTab}`);
  };

  useEffect(() => {
    // console.log("HASH: ",windowsHash);
    if (windowsHash) {
      switch (windowsHash) {
        case "#result":
          setCurrentTab(0);
          break;
        case "#ticket":
          setCurrentTab(1);
          break;
        default:
          setCurrentTab(0);
      }
    } else {
      setCurrentTab(0);
    }
  }, [windowsHash]);

  const handleDownload = () => {
    setIsModalLoaderOpen(true);
    axios({
      url: `${process.env.REACT_APP_API_VENDORS}/exportMediaPromosiResult`,
      responseType: "blob",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Media Promosi Result Checklist.xlsx");
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
        console.log(err);
      });
  };

  // FETCH SUMARRY DATA
  useEffect(() => {
    const dataHit = currentTab === 0 ? "result" : "ticketing";
    doFetchCountMediaPromosi(loaderSummary, dataHit)
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
            currentTab === 0
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
  }, [currentTab]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            {currentTab === 0 ? "Digital Checklist Results" : "Ticketing"}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              {currentTab === 0 ? (
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
              ) : (
                <></>
              )}
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
      {currentTab === 0 ? (
        <SummaryCardDigitalasiResult data={dataSummary} />
      ) : (
        <SummaryCardDigitalisasiTicketing data={dataSummary} />
      )}
      {/* <SummaryCardDigitalasi data={dataSummary} /> */}
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <div className={classes.filterContainer}>
              <FilterComponent
                onFilterSubmit={handleFilterSubmit}
                handleReset={handleResetFilter}
                itemSearch={
                  currentTab === 0 ? itemSearchResult : itemSearchTicketing
                }
              />
            </div>
          </Grid>

          <ContentTabs
            value={currentTab}
            onChange={handleChangeTab}
            aria-label="tabs for media promosi quality"
          >
            <ContentTab label="Result" {...a11yProps(0)} />
            <ContentTab label="Ticketing" {...a11yProps(1)} />
          </ContentTabs>

          {/* RESULT */}
          <TabPanel value={currentTab} index={0} style={{ width: "inherit" }}>
            <TablePaginationDigitalisasi
              data={dataResult}
              fields={TableTemplate.titleTableResult}
              cellOption={TableTemplate.valueTypeResult}
              onChangePage={handleChangePage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoading}
              isSort={TableTemplate.isSortResult}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
              isFilterApplied={isFilterApplied}
            />
          </TabPanel>
          {/* TICKETING */}
          <TabPanel value={currentTab} index={1} style={{ width: "inherit" }}>
            <ChkyTablePagination
              data={dataTicketing}
              fields={TableTemplate.titleTableTicketing}
              cellOption={TableTemplate.valueTypeTicketing}
              changePage={handleChangePageTicketing}
              totalPages={totalPagesTicketing}
              rowsPerPage={rowsPerPage}
              totalRows={totalRowsTicketing}
              isLoadData={isLoading}
              isSort={TableTemplate.isSortTicketing}
              isUsingMuiSort
              handleSort={handleSortTicketing}
              sortBy={sortByTicketing}
              order={orderDirectionTicketing}
            />
          </TabPanel>
        </Grid>
        <SuccessPopUp
          isOpen={openSuccessPopUp}
          onClose={() => history.go(0)}
          label={messageSuccess}
          type="Add"
        />

        <TicketingNew
          isOpen={openModalNewOrder}
          onClose={() => history.go(0)}
          dataTicket={ticketNew}
        />
        <ModalLoader isOpen={isModalLoaderOpen} />
        <ModalUploadSurveyMedia
          isOpen={openModalUpload}
          onClose={() => setOpenModalUpload(false)}
          onSuccesUpload={() => {
            setOpenModalUpload(false);
          }}
        />
      </div>
    </div>
  );
};

export default Scheduling;
