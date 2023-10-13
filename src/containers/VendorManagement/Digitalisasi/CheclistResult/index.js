import React, { useEffect, useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import Constants from "../../../../helpers/constants";
import Axios from "axios";
import { RootContext } from "../../../../router";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/general/download-white.svg";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import TablePaginationDigitalisasi from "../../../../components/Table/TablePaginationDigitalisasi";
import FilterComponent from "../Ticketing/common/FilterComponent";
import {doFetchResult } from "../../ApiServices";
import ButtonLink from "../../../../components/Button/ButtonLink";
import ModalLoader from "../../../../components/ModalLoader";
import { routeRef } from "../../../../helpers/constants";
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
});

const dataDummy = [
  {
    id: 0,
    TicketId: 12,
    ATMId: 123,
    Lokasi: "Test",
    CheklistVendor: "FLM",
    VendorName: "PT.TRIAS",
    userVend: "Robert",
    StartDate: "12/12/2022",
    EndDate: "12/12/2023",
    Durasi: "60 menit",
  },
];
//INIT Table
const rowsPerPage = 10;
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const isSort = [true, true, true, true, true, true, true, true, true, false];
const DigitalisasiCheck = () => {
  const classes = useStyles();
  const history = useHistory();

  // =====> DATA TABLE  <=====
  const [dataResult, setDataResult] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [isLoadData, setIsLoadData] = useState(false);
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  //get userID
  const { userId, userRoleName } = useContext(RootContext);

  //fetch detail
  const linkDetail = (id, checklistVendor) => {
    const urlRoute = routeRef.find((val) => val.type === checklistVendor);
    console.log(checklistVendor);
    if (userRoleName.toLowerCase().includes("vendor")) {
      window.location.assign(`${urlRoute.urlVendor}/${id}`);
    } else {
      window.location.assign(`${urlRoute.url}/${id}`);
    }
  };

  // fetch result
  useEffect(() => {
    doFetchResult(loadDataHandler, dataRequest)
      .then((response) => {
        console.log("~respon result vendor", response);
        //console.log("~data hit", dataRequest)
        if (isFilterApply) {
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
        }
        setDataResult(
          response.content.map((item) => ({
            resultId: item.id,
            atmId: item.atmId,
            location: item.location,
            checklistVendor: item.checklistVendor,
            nameVendor: item.vendorName,
            userVendor: item.userId,
            startDate: item.startDate,
            endDate: item.endDate,
            durasi: item.durasi,
            status: item.status,
            ...{
              detail: (
                <ButtonLink
                  title="Detail"
                  onClick={() => linkDetail(item.id, item.checklistVendor)}
                />
              ),
            },
          }))
        );
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:$[err]`);
      });
  }, [dataRequest]);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
    console.log("loader", loaderValue);
    setTimeout(() => {
      setIsLoadData(false);
    }, 500);
  }

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
    setTotalPages(0);
    setTotalRows(0);
    setDataRequest({
      ...defaultDataHit,
    });
  }

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
  const itemSearch = [
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

  const handleDownload = () => {
    setIsModalLoaderOpen(true);
    Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/downloadChecklistData`,
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
        console.log(err);
      });
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            Digital Checklist Results
          </Typography>
        </Grid>
        {isFilterApply ? (
          <Grid item>
            <MuiIconLabelButton
              iconPosition="startIcon"
              label="Export to Excel"
              buttonIcon={<DownloadIcon />}
              onClick={handleDownload}
            />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <div className={classes.filterContainer}>
              <FilterComponent
                itemSearch={itemSearch}
                onFilterSubmit={handleFilterSubmit}
                handleReset={handleResetFilter}
              />
            </div>
          </Grid>
          <Grid>
            <TablePaginationDigitalisasi
              data={dataResult}
              fields={titleTable}
              cellOption={valueType}
              isLoadData={isLoadData}
              isFilterApplied={isFilterApply}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
              isSort={isSort}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
              totalRows={totalRows}
            />
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};
export default DigitalisasiCheck;
