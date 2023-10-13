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
import { Grid, Link, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";
import { RootContext } from "../../../router";
import Constants from "../../../helpers/constants";
import { ChkyTablePagination } from "../../../components";
import TableTemplate from "./TableTemplate";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import FilterComponent from "./FilterComponent";

import useTimestampConverter from "../../../helpers/useTimestampConverter";
import PopUpConfirmation from "../../../components/PopUpConfirmation";
import ModalLoader from "../../../components/ModalLoader";
import { doFetchVendorPajak } from "../ApiServices";
import ButtonLink from "../../../components/Button/ButtonLink";
import PopupReminder from "./PopupReminder";

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

const rowsPerPage = 10; // <--- init default rowsPerPage
// INIT DATA REQUEST
const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  sortBy: "id",
  sortType: "ASC",
};

const itemSearch = [
  { text: "Tanggal Order", value: "dateOrder" },
  { text: "ATM ID", value: "atmId" },
  { text: "Type Orderan", value: "orderType" },
  { text: "Lokasi", value: "locationName" },
  { text: "Alamat", value: "locationAddress" },
  { text: "Kelurahan", value: "district" },
  { text: "Kecamatan", value: "subDistrict" },
  { text: "Area", value: "areaName" },
  { text: "City", value: "city" },
  { text: "Province", value: "province" },
  { text: "Pajak Awal", value: "pajakAwal" },
  { text: "Pajak Akhir", value: "pajakAkhir" },
  { text: "Nilai Pajak", value: "taxValue" },
  { text: "Vendor Pajak", value: "picVendorId" },
];

// DEFAULT EXPORT
const VendorPajak = () => {
  const classes = useStyles();
  const history = useHistory();
  const page = (new URLSearchParams(window.location.search)).get("page");
  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [itemEdit, setItemEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  // =====> DATA TABLE  <=====
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState("ASC");
  // const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [openReminder, setOpenReminder] = useState(false);
  const [idRow, setIdRow] = useState(null);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  
  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  
  function loadingHandlerDelete(loaderValue) {
    setIsLoadingDelete(loaderValue);
  }
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
      // console.log("Sasa",value);
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
    // console.log("+++ dataRequest",dataRequest);
    doFetchVendorPajak(loadingHandler, dataRequest)
      .then((response) => {
        console.log("+++ response", response);
        if(response){
          if(response.responseCode === "200"){
            const {content} = response;
            setTotalRows(response.totalElements);
            setTotalPages(response.totalPages);
            const dataToSet = [];
            
            content.map((item, index) => {
              const newRow = 
                {
                  orderDate: item.orderDate? useTimestampConverter(item.orderDate / 1000, "DD/MM/YYYY") : "-",
                  atmId: item.atmId,
                  orderType: item.orderType,
                  locationName: item.locationName,
                  locationAddress: item.locationAddress,
                  district: item.district,
                  subDistrict: item.subDistrict,
                  areaName: item.areaName,
                  city: item.city,
                  province: item.province,

                  startDate: item.startDate? useTimestampConverter(item.startDate / 1000, "DD/MM/YYYY") : "-",
                  endDate: item.endDate? useTimestampConverter(item.endDate / 1000, "DD/MM/YYYY") : "-",
                  taxValue: item.taxValue,
                  picVendor: item.picVendorId,
                  reminder: (<ButtonLink title="Reminder" onClick={() => {
                    setIdRow(item.id);
                    setOpenReminder(true);
                  }}/>),
                  detail: (<ButtonLink title="Detail" onClick={() => history.push(`/vendor-management/pajak/${item.id}`)}/>),
                };
              dataToSet.push(newRow);
            });

            setData(dataToSet);
          }
        }
      })
      .catch((err) => {
        // console.log("Error Fetch Data Orders", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, [dataRequest]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Pajak Media Promosi</Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <div className={classes.filterContainer}>
              <FilterComponent 
                onFilterSubmit={handleFilterSubmit} 
                itemSearch={itemSearch}
                handleReset={handleResetFilter}
              />
            </div>
          </Grid>

          <ChkyTablePagination
            data={data}
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
        </Grid>
        <ModalLoader isOpen={isLoadingDelete} />
      </div>
      <PopupReminder 
        isOpen={openReminder}
        onClose={() => setOpenReminder(false)}
        idRow={idRow}/>
    </div>
  );
};

export default VendorPajak;
