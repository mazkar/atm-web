/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Layout, Space } from "antd";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, IconButton } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FilterComponent from "./Common/FilterComponent";
import { ChkyTablePagination } from "../../../components";
import TableTemplate from "./Common/TableTemplate";
import { PrimaryHard } from "../../../assets/theme/colors";
import TablePagination from "../../../components/chky/ChkyTablePagination";
import constants from "../../../helpers/constants";
import Filter from "./Common/TableTemplate/filter/index";
import LoadingView from "../../../components/Loading/LoadingView";
import numeral from "numeral";

const useStyle = makeStyles({
  root: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 28.5,
    paddingBottom: 75,

    background: "inherit",
  },
  Barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
  },
  //   title2: {
  //     fontFamily: "Barlow",
  //     fontWeight: 500,
  //     fontSize: 36,
  //     color: "#2B2F3C",
  //   },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

export default function PraPascaBayar() {
  const { Header } = Layout;
  const classes = useStyle();
  const { Barlow, title } = classes;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [dataFilter, setDataFilter] = useState(null);

  // Data Table
  const [tableData, setTableData] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage

  // Sort Data
  const [orderBy, setOrderBy] = useState("atmId");
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");

  const navigateToDetail = (atmId) => {
    history.push(`/environment-premises/pra-pasca-bayar/detail/${atmId}`);
  };

  const defaultDataHit = {
    sortType: orderDirection,
    sortBy: orderBy,
    pageNumber: 0,
    dataPerPage: 10,
  };

  const titleTable = [
    "ATM ID",
    "Jenis Listrik",
    "No Meteran",
    "Atas Nama",
    "Token Sebelum",
    "Token Sesudah",
    "Harga Pembelian Tiket",
    "Foto KWH Sebelum",
    "Foto KWH Sesudah",
    "",
  ];

  const valueTypeTableNew = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "child",
  ];

  const columnNameVar = [
    "atmId",
    "electricType",
    "meterNumber",
    "electricOwner",
    "remainingToken",
    "afterToken",
    "tokenPrice",
    "remainingToken",
    "afterTokenPhoto",
    "detail",
  ];

  const isSort = [true, true, true, true, true, true, true, true, true, false];

  function handleSort(property) {
    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderBy);
      console.log(orderDirection, "od");
    };
  }

  // Fetch Data Table
  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const rowsPerPage = 10; // <--- init
  const [dataRequest, setDataRequest] = useState({
    sortType: orderDirection,
    sortBy: orderBy,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  });

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  async function fetchDataTable() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.ENVIRONTMENT_SERVICE}/praAndPascaBayarFilter`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      console.log("res data listrik", result.data);
      setTableData(
        result.data.content.map((val) => ({
          atmId: val.atmId,
          electricType: val.electricType,
          meterNumber: val.meterNumber,
          electricOwner: val.electricOwner,
          remainingToken: `${numeral(val.remainingToken).format("0,0")} KWH`,
          afterToken: `${numeral(val.afterToken).format("0,0")} KWH`,
          tokenPrice: `Rp. ${numeral(val.tokenPrice).format("0,0")}`,

          fotoSebelum: (
            <div>
              <Typography style={{ color: "#dc241f", fontSize: 12 }}>
                {val.remainingTokenPhoto}
              </Typography>
            </div>
          ),
          afterTokenPhoto: (
            <div>
              <Typography style={{ color: "#dc241f", fontSize: 12 }}>
                {val.afterTokenPhoto}
              </Typography>
            </div>
          ),
          detail: (
            <div style={{}}>
              <IconButton onClick={() => navigateToDetail(val.atmId)}>
                <Typography style={{ fontWeight: 400, color: "red" }}>
                  detail
                </Typography>
              </IconButton>
            </div>
          ),
        }))
      );
      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  // FILTER DATA
  const itemSearch = [
    { text: "ATM ID", value: "atmId" },
    { text: "Jenis Listrik", value: "electricType" },
    { text: "No Meteran", value: "meterNumber" },
    { text: "Atas Nama", value: "electricOwner" },
    { text: "Harga Pembelian Tiket", value: "tokenPrice" },
    { text: "Token Sebelum", value: "remainingToken" },
    { text: "Token Sesudah", value: "afterToken" },
  ];
  // Set Filter
  function onFilterSubmit(filter) {
    // console.log('~ filter', filter)
    const newFilter = { ...filter };
    delete newFilter.status;
    // console.log('~ newFilter', newFilter)
    setDataFilter(_.isEmpty(newFilter) ? null : newFilter);
    setDataRequest((old) => ({ ...old, pageNumber: 0 }));
    console.log(filter);
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
      pageNumber: 0,
    });
    setDataFilter(null);
  }

  useEffect(() => {
    setDataRequest((old) => ({
      ...old,
      sortType: orderDirection,
      sortBy: orderBy,
      pageNumber: 0,
      dataPerPage: rowsPerPage,
    }));
  }, [orderDirection]);

  useEffect(() => {
    fetchDataTable();
  }, [currentPage, dataRequest, dataFilter]);

  return (
    <>
      <Layout className={classes.root}>
        <Header style={{ padding: 0, background: "inherit" }}>
          <Typography className={`${Barlow} ${title}`}>
            Pra & Pasca Bayar Listrik
          </Typography>
        </Header>
        <Filter
          isOpening={false}
          itemSearch={itemSearch}
          onFilterSubmit={onFilterSubmit}
          handleReset={handleResetFilter}
        />
        {isLoading ? (
          <LoadingView />
        ) : (
          <>
            <TablePagination
              data={tableData}
              fields={titleTable}
              cellOption={valueTypeTableNew}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePageValue}
              isWithCheck={false}
              isSort={isSort}
              isUsingMuiSort
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
              // handleSort={handleSort}
              // sortBy={sortBy}
              // order={orderDirection}
              // isLoadData={isLoading}
            />
          </>
        )}
      </Layout>
    </>
  );
}
