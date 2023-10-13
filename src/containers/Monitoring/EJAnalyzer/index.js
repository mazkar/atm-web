/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core";

/* Internal Import */
import { ChkyTablePagination } from "../../../components";
import { PrimaryHard, PrimaryUltrasoft } from "../../../assets/theme/colors";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import ExpandableFilter from "../../../components/Filter/ExpandableFilter";
import { ReactComponent as UploadIcon } from "../../../assets/icons/whiteIcons/upload-cloud.svg";
import FilterComponent from "../../MediaPromosi/MediaPromosiQuality/common/FilterComponent";
import TableTemplate from "./common/TableTemplate";
import PopUpUploadEJ from "./common/PopUpUploadEJ";
import { doGetDataEJ } from "../serviceMonitoring";

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
  rootButton: {
    width: "max-content",
    height: 40,
    borderRadius: 10,
    textTransform: "capitalize",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
  },
  outlinedButton: {
    border: "1px solid",
    borderColor: PrimaryHard,
    color: PrimaryHard,
    backgroundColor: "#ffffff",
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultDataHit = {
  sortType: "ASC",
  sortBy: "tanggal",
  pageNumber: 0,
  dataPerPage: 10,
  ceklist: [""],
  // textInput: null,
  // startDate: null,
  // endDate: null,
  date: "all",
};

const dummyData = [
  {
    name: "Dispenser Tidak Bekerja",
    isChecked: false,
  },
  {
    name: "Full Reversal",
    isChecked: false,
  },
  {
    name: "Kartu Tidak Diizinkan",
    isChecked: false,
  },
  {
    name: "Saldo Tidak Cukup",
    isChecked: false,
  },
  {
    name: "Transaksi Timeout",
    isChecked: false,
  },
];

//ITEM SEARCH OPEN
const itemSearch = [
  { text: "Tanggal", value: "date" },
  { text: "Dispenser Tidak Bekerja", value: "dispenserNotWorking" },
  { text: "Full Reversal", value: "fullReveal" },
  { text: "Kartu Tidak Diizinkan", value: "cardNotAllowed" },
  { text: "Saldo Tidak Cukup", value: "saldoNotEnough" },
  { text: "Transaksi Time Out", value: "trxRto" },
  { text: "Other", value: "other" },
];

const EJAnalyzer = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [uploadEJ, setUploadEJ] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [newRequest, setNewRequest] = useState({});
  /* Methods */

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  //handle sort table
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
    setIsFilterApplied(true);
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",value);
      setDataRequest({
        ...dataRequest,
        ...value,
      });
    }
  }

  function handleResetFilter() {
    setResetPageCounter((prevCount) => prevCount + 1);
    setIsFilterApplied(false);
    setDataRequest({
      ...newRequest,
    });
  }

  const handleApply = (dataValue, inputOthers) => {
    console.log(dataValue);
    setResetPageCounter((prevCount) => prevCount + 1);
    const dataApplied = [];
    const isCheckedValue = dataValue.filter(function (data) {
      return data.isChecked == true;
    });
    isCheckedValue.map((item) => {
      dataApplied.push(item.name);
    });
    console.log(dataApplied);
    setDataRequest({
      ...dataRequest,
      ceklist: dataApplied,
      textInput: inputOthers,
    });
    setNewRequest({
      ...dataRequest,
      ceklist: dataApplied,
      textInput: inputOthers,
    });
  };

  useEffect(() => {
    doGetDataEJ(loadingHandler, dataRequest)
      .then((response) => {
        if (response) {
          if (response.responseCode === "00") {
            const { content } = response;
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            const dataToSet = [];
            content.map((item) => {
              const newRow = {
                date: item.date,
                dispenserNotWorking: item.dispenserNotWorking,
                fullReveal: item.fullReveal,
                cardNotAllowed: item.cardNotAllowed,
                saldoNotEnough: item.saldoNotEnough,
                trxRto: item.trxRto,
                other: item.other,
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
  }, [dataRequest, newRequest]);

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.title}>EJ Analyzer</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={`${classes.rootButton} ${classes.containedButton}`}
            label="Upload EJ"
            iconPosition="startIcon"
            buttonIcon={<UploadIcon width={18} height={18} />}
            onClick={() => setUploadEJ(true)}
          />
        </Grid>
      </Grid>
      <FilterComponent
        onFilterSubmit={handleFilterSubmit}
        handleReset={handleResetFilter}
        itemSearch={itemSearch}
      />
      <ExpandableFilter
        data={dummyData}
        handleApply={handleApply}
        setDataRequest={setDataRequest}
        defaultDataHit={defaultDataHit}
        label="Pivot"
        otherCheckbox
      />

      <PopUpUploadEJ isOpen={uploadEJ} onClose={() => setUploadEJ(false)} />

      <ChkyTablePagination
        data={data}
        rowsPerPage={rowsPerPage}
        fields={TableTemplate.titleTable}
        cellOption={TableTemplate.valueType}
        resetPageCounter={resetPageCounter}
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

export default EJAnalyzer;
