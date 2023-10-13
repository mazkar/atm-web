/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* Third Party Import */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import { ReactComponent as CheckCircle } from "../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as CrossCircle } from "../../../assets/icons/duotone-red/times-circle.svg";
import FilterComponent from "../../MediaPromosi/MediaPromosiQuality/common/FilterComponent";
import TableTemplate from "./common/TableTemplate";
import { doGetUploadResponseCodeAnalizer } from "../serviceMonitoring";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as UploadCloud } from "../../../assets/icons/siab/upload-cloud.svg";
import ModalPopUpUpload from "./common/ModalPopUpUpload";
import useRupiahConverter from "../../../helpers/useRupiahConverter";

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
  wrapper: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px, 6px rgba(232, 238, 255, 0.3)",
    padding: "20px",
    margin: "0px 10px",
  },
  textWrapper: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: 15,
  },
  successText: {
    color: "#65D170",
  },
  errorText: {
    color: "#FF7774",
  },
  defaultText: {
    color: "#8D98B4",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: 10,
  sortBy: "atmId",
  sortType: "ASC",
};

const itemSearch = [
  { text: "ATM ID", value: "atmId" },
  { text: "Location", value: "lokasi" },
  { text: "Card ID", value: "cardId" },
  { text: "Kode Transaksi", value: "kdTransaksi" },
  { text: "Kode Response", value: "kdResponse" },
];

const ResponCodeAnalyzer = () => {
  const classes = useStyles();

  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [data, setData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  /* Methods */
  function handleSortTable(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal =
        TableTemplate.columnNameVar[TableTemplate.titleTable.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      setDataRequest({
        ...dataRequest,
        sortType,
        sortBy: sortByNewVal,
      });
    };
  }

  function handleChangePage(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  function handleFilterSubmit(value) {
    console.log(value);
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else if (value.startDate === "" && value.endDate === "") {
      delete value.startDate;
      delete value.endDate;
      setDataRequest({
        ...dataRequest,
        ...value,
      });
    } else if (value.startDate === "") {
      delete value.startDate;
      setDataRequest({
        ...dataRequest,
        ...value,
      });
    } else if (value.endDate === "") {
      delete value.endDate;
      setDataRequest({
        ...dataRequest,
        ...value,
      });
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...dataRequest,
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

  const showPopUp = () => {
    setUploadExcel(true);
  };

  /* Functional Component */
  const RowData = (props) => {
    const { label, value, icon, type } = props;
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ flexWrap: "nowrap", marginBottom: "16px" }}
      >
        <Grid container>
          {icon ? (
            type === "success" ? (
              <CheckCircle width="20" style={{ marginRight: "10px" }} />
            ) : (
              <CrossCircle width="20" style={{ marginRight: "10px" }} />
            )
          ) : (
            ""
          )}
          <Typography className={classes.textWrapper}>{label}</Typography>
        </Grid>
        <Typography
          className={`
            ${classes.textWrapper}
            ${type === "success" && classes.successText}
            ${type === "error" && classes.errorText}
            ${type === "default" && classes.defaultText}
          `}
        >
          {value}
        </Typography>
      </Grid>
    );
  };
  RowData.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.bool,
  };
  RowData.defaultProps = {
    type: "default",
    value: "0%",
    icon: false,
  };

  useEffect(() => {
    doGetUploadResponseCodeAnalizer(loadingHandler, dataRequest)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "00") {
            const { data } = response;
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            const dataToSet = [];
            data.map((item) => {
              const newRow = {
                atmId: item.atmId,
                location: item.location,
                cardId: null,
                transactionCode: item.kodeTransaksi,
                responCode: item.kodeResponse,
                amount: useRupiahConverter(item.amount),
                charge: item.charge,
                date: item.tanggal,
                paycode: item.payCode,
                responseCode: item.responCode,
                statusCardId: item.statusCardId,
                messageTypeClass: item.msgTypeClass,
                messageTypeFunc: item.msgTypeFunc,
                valutaCode: item.kodeValuta,
                payreff: item.payref,
              };
              dataToSet.push(newRow);
            });
            setData(dataToSet);
          }
        }
      })
      .catch((err) => {
        alert(`Error Fetchind data ${err}`);
      });
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 24 }}
      >
        <Grid item>
          <Typography className={classes.title}>
            Respon Code Analyzer
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: "max-content", right: 0, height: 40 }}
            label="Upload Excel"
            iconPosition="startIcon"
            onClick={showPopUp}
            buttonIcon={<UploadCloud />}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="start" style={{ flexWrap: "nowrap" }}>
        <Grid item xs={3} className={classes.wrapper}>
          <RowData label="Transaksi Sukses" value="98,5%" type="success" icon />
          <RowData label="Transaksi Sukses" value="98,5%" type="error" icon />
        </Grid>
        <Grid item xs={3} className={classes.wrapper}>
          <RowData label="Transaksi Sukses" value="98,5%" type="success" />
          <RowData label="Gagal Karena Sistem" value="1%" type="error" />
          <RowData label="Gagal Karena Hardware" value="0,75%" type="error" />
          <RowData label="Gagal Karena User" value="0,75%" type="error" />
        </Grid>
        <Grid item xs={3} className={classes.wrapper}>
          <RowData label="Transaksi Sukses" value="10.000" type="success" />
          <RowData label="Gagal Karena Sistem" value="4.000" type="error" />
          <RowData label="Gagal Karena Hardware" value="4.000" type="error" />
          <RowData label="Gagal Karena User" value="4.000" type="error" />
        </Grid>
        <Grid item xs={3} className={classes.wrapper}>
          <RowData label="Transaksi Tunai" value="10.000" />
          <RowData label="Transaksi Non Tunai" value="4.000" />
          <RowData label="Transaksi Pembayaran" value="4.000" />
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
        itemSearch={itemSearch}
      />
      <ModalPopUpUpload
        isOpen={uploadExcel}
        onClose={() => setUploadExcel(false)}
        onSuccesUpload={() => setUploadExcel(false)}
      />
      <ChkyTablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        isSort={TableTemplate.isSort}
        totalPages={totalPages}
        isLoadData={isLoading}
        totalRows={totalRows}
        sortBy={sortBy}
        order={orderDirection}
        changePage={handleChangePage}
        handleSort={handleSortTable}
        isUsingMuiSort
      />
    </div>
  );
};

export default ResponCodeAnalyzer;
