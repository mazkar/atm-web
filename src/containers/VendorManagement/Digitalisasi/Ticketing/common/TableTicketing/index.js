import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Link, Button } from "@material-ui/core";
import axios from "axios";
import MuiIconLabelButton from "../../../../../../components/Button/MuiIconLabelButton";
import TablePagination from "../../../../../../components/chky/ChkyTablePagination";
import constants from "../../../../../../helpers/constants";
import { GrayUltrasoft } from "../../../../../../assets/theme/colors";
import TicketingNew from "../../../../../../components/NewOrder/TicketingNew";
import { doFetchTicketing } from "../../../../ApiServices";
import moment from "moment";
const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: GrayUltrasoft,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  backLabel: {
    fontSize: 13,
    color: constants.color.primaryHard,
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
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
});
const titleTable = [
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
const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "statusTicket",
  "node",
];
const columnNameVar = [
  "ticketId",
  "atmId",
  "lokasi",
  "vendorName",
  "userVendor",
  "category",
  "qusetion",
  "kondisi",
  "startDate",
  "status",
  "",
];
const isSort = [
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
const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};
const dummyData = [
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
];
const TableTicketing = () => {
  const classes = useStyles();
  const history = useHistory();
  //SET DATA
  const [data, setData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);

  //HANDLE SORT
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

  //HANDLE CHANGE PAGE

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  //FETCH DATA
  useEffect(() => {
    doFetchTicketing(loadDataHandler, dataRequest)
      .then((response) => {
        console.log("~data response", response);
        setTotalPages(response.totalPages);
        setTotalRows(response.totalElements);
        setData(
          response.content.map((item) => ({
            ticketId: item.ticketId,
            atmId: item.atmId,
            location: item.location,
            vendorName: item.vendorId,
            userVendor: item.vendorId,
            category: item.surveyCategory,
            question: item.surveyQuestion,
            boothCondition: item.boothCondition,
            startDate: moment.unix(item.startDate / 1000).format("DD/MM/YYYY"),
            status: item.status === 1 ? "Done" : "Open",

            ...{
              assign: (
                <Grid item className={classes.backAction}>
                  <Button onClick={() => setOpenModalNewOrder(true)}>
                    <Typography className={classes.backLabel}>
                      Assign
                    </Typography>
                  </Button>
                </Grid>
              ),
            },
          }))
        );
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);

  return (
    <div>
      <TablePagination
        fields={titleTable}
        cellOption={valueType}
        data={data}
        changePage={handleChangePage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        isLoadData={isLoadData}
        isSort={isSort}
        isUsingMuiSort
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
      />
      {openModalNewOrder ? (
        <TicketingNew
          isOpen={openModalNewOrder}
          onClose={() => setOpenModalNewOrder(false)}
        />
      ) : null}
    </div>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(TableTicketing))
);
