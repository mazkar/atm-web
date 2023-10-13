/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Link, Button } from "@material-ui/core";
import axios from "axios";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import TablePagination from "../../../../components/chky/ChkyTablePagination";
import constants from "../../../../helpers/constants";
import { GrayUltrasoft } from "../../../../assets/theme/colors";
import TicketingNew from "../../../../components/NewOrder/TicketingNew";
import { doFetchTicketPremisesQuality } from "../../../VendorManagement/ApiServices";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";

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
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: constants.color.primaryHard,
    textTransform: "capitalize",
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
const rowsPerPage = 10;

const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const defaultDataTicket = {
  ticketId: "-",
  locationId: "-",
  mesinId: "-",
  locationName: "-",
};

const TicketingClearliness = (props) => {
  const { dataRequest,onChangePage } = props;
  const classes = useStyles();
  const history = useHistory();

  /* State */
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [data, setData] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  // const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [openModalNewOrder, setOpenModalNewOrder] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataTicket, setDataTicket] = useState(defaultDataTicket);

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

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const handleOpenDialog = ({
    ticketId,
    locationId,
    mesinId,
    locationName,
  }) => {
    setDataTicket({ ticketId, locationId, mesinId, locationName });
    setOpenModalNewOrder(true);
  };

  const handleChangePage = (value) => {
    dataRequest((prevValue) => ({
      ...prevValue,
      pageNumber: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await doFetchTicketPremisesQuality(
        loadDataHandler,
        dataRequest
      );
      const { content, totalPages, totalElements } = response;

      setTotalPages(totalPages);
      setTotalRows(totalElements);
      const newArray = content.map((item) => {
        const props = {
          ticketId: item.id,
          locationId: item.location,
          mesinId: item.atmId,
          locationName: item.address,
        };
        return {
          id: item.id,
          atmId: item.atmId,
          location: item.location,
          vendorName: item.vendorName,
          userId: item.userId,
          checklistVendor: item.checklistVendor,
          condition: item.questionSurvey,
          question: item.conditionBooth,
          startDate: useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY"),
          status: item.status,
          action: (
            <Button
              className={classes.buttonText}
              onClick={() => handleOpenDialog(props)}
            >
              Assign
            </Button>
          ),
        };
      });
      setData(newArray);
    };
    fetchData();
  }, [dataRequest]);
  return (
    <div>
      <TablePagination
        fields={titleTable}
        cellOption={valueType}
        data={data}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        isSort={isSort}
        isUsingMuiSort
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
        isLoadData={isLoadData}
        changePage={onChangePage}
      />
      {openModalNewOrder ? (
        <TicketingNew
          isOpen={openModalNewOrder}
          onClose={() => history.go(0)}
          dataTicket={dataTicket}
        />
      ) : null}
    </div>
  );
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(
    withTranslation("translations")(TicketingClearliness)
  )
);
