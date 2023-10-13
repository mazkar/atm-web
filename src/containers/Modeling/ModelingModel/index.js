/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import axios from "axios";
import qs from "qs";
import * as ThemeColor from "../../../assets/theme/colors";
import RupiahConverter from "../../../helpers/useRupiahConverter";
import { percentageFormatter } from "../../../helpers/useFormatter";
import Filter from "../../../components/GeneralComponent/FilterCategoryStatus";
import {
  ChkyDownloadButton,
  ChkySearchBar,
  ChkyTablePagination,
} from "../../../components/chky";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as UploadCloud } from "../../../assets/icons/siab/upload-cloud.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/siab/arrow-left.svg";

import EditModel from "./EditModel";

import constansts from "../../../helpers/constants";
import ModalUpload from "./ModalUpload";
import ModalParameterize from "./Parameterize";
import ModalLoader from "../../../components/ModalLoader";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constansts.color.dark,
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    margin: "40px 0px 20px 0px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  paramButton: {
    width: "max-content",
    color: constansts.color.primaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: constansts.color.primaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  tombolAdd: { textAlign: "right" },
  filterContainer: { marginBottom: 15 },
  tableContent: {},
});

const rowsPerPage = 10; // <--- init default rowsPerPage

const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  atmId: '',
  status:'',
  modelTeam:'',
  modelFinal:'',
  location:'',
}

function ModelingModel(props) {
  const classes = useStyles();

  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataTable, setDataTable] = useState([]); // <--- init dataTable array
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCount, setResetPageCount] = useState(0); // <--- init default resetPageCount
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [keywords, setKeyword] = useState(""); // <--- init default keyword
  const [selectedRow, setSelectedRow] = useState(""); // <--- init default currentPage
  const [dataParameterize, setDataParameterize] = useState([]);
  // default hit data
  const [dataHit, setDataHit] = useState(defaultDataHit);
  // filterData
  const [filterData, setFilterData] = useState(false);

  function splitNum(num) {
    const bilangan = num;

    const reverse = bilangan.toString().split("").reverse().join("");
    const ribuan = reverse.match(/\d{1,3}/g);
    const split = ribuan.join(".").split("").reverse().join("");

    return split;
  }

  // MODAL EDIT
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModaEdit = () => setOpenModalEdit(false);
  const [isOpenModalLoaderNew, setIsOpenModalLoaderNew] = useState(false);
  function handleModalLoaderNew(val) {
    setIsOpenModalLoaderNew(val);
  }

  const handleModalEdit = (id, data) => {
    setSelectedRow(id);
    handleOpenModalEdit();
    // eslint-disable-next-line no-unused-expressions
    // setModalLoader(true);
  };

  // MODAL CRITERIA
  const [openModalCriteria, setOpenModalCriteria] = useState(false);
  const handleOpenModalCriteria = () => setOpenModalCriteria(true);
  const handleCloseModalCriteria = () => setOpenModalCriteria(false);

  const handleUploadCriteria = () => {
    handleOpenModalCriteria();
  };

  // MODAL PARAMETERIZE
  const [openModalParameterize, setOpenModalParameterize] = useState(false);
  const handleOpenParameterize = () => setOpenModalParameterize(true);
  const handleCloseParameterize = () => setOpenModalParameterize(false);

  const handleParameterize = () => {
    hitApiGetParameterize();
    console.log("+++ parameterize");
  };

  useEffect(() => {
    const dataToSet = [];
    const fetchDataMaster = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      const params = qs.stringify({
        ...dataHit,
        atmId: keywords,
        pageNumber: currentPage,
        dataPerPage: rowsPerPage,
        orderBy,
        orderDirection,
      });

      // hit API
      try {
        setModalLoader(true);
        const result = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings?${params}`,
          config
        );

        // console.log(result);
        const dataNewPre = result.data.data.content;
        setTotalPages(result.data.data.totalPages);
        setTotalRows(result.data.data.totalElements);
        // eslint-disable-next-line array-callback-return
        dataNewPre.map((row) => {
          const actionToInsertAsNewField = [
            {
              name: "Remodel",
              id: row.id,
              funct: handleModalEdit,
              data: row,
              isDisable:
                row.modelFinal != "Low Performance" &&
                row.modelTeam != "Low Performance",
            },
          ];
          const newRow = {
            atmId: row.atmId,
            location: row.locationName,
            averageCasa: RupiahConverter(row.averageCasa),
            averageTransaction: splitNum(row.averageTransaction),
            averageRevenue: splitNum(row.averageRevenue),
            revenuePaymentPerCost: percentageFormatter(
              row.revenuePaymentPerCost
            ),
            status: row.status === "Not Review" ? "OK" : row.status,
            modelTeam: row.modelTeam,
            modelFinal: row.modelFinal,
            action: actionToInsertAsNewField,
          };
          // set constructed data
          dataToSet.push(newRow);
        });
        setDataTable(dataToSet);
        setModalLoader(false);
        // console.log(dataTable);
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoader(false);
      }
    };
    fetchDataMaster();
  }, [dataHit, keywords, currentPage, orderBy, orderDirection]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  function handleDownload() {
    console.log("Download Button Clicked");
    if (dataTable.length === 0) {
      alert("Data table is empty");
    } else {
      try {
        setModalLoader(true);
        axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings/download`, // your url
          method: "GET",
          responseType: "blob", // important
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Model Performance.xlsx`); // or any other extension
            document.body.appendChild(link);
            link.click();
            setModalLoader(false);
          })
          .catch((error) => {
            console.log("error download", error);
            if (error && error.response) {
              console.log("error download", error.response);
              alert(`${error.response.status}\n${error.response.statusText}`);
            }
            setModalLoader(false);
          });
      } catch (e) {
        setModalLoader(false);
        alert(e);
      }
    }
  }

  function handleKeyword(newValue) {
    setCurrentPage(0);
    setKeyword(newValue);
  }

  function handleFilter(newValue) {
    setCurrentPage(0);
    setResetPageCount((prevCount) => prevCount + 1);
    setDataHit(newValue);
    setFilterData(true);
  }

  function handleResetFilter() {
    setCurrentPage(0);
    setKeyword("");
    setResetPageCount(0);
    setDataHit(defaultDataHit);
    setFilterData(false);
  }

  const modelSuggestions = [
    { id: 0, value: "0", nameEn: "High SA", nameId: "High SA" },
    { id: 1, value: "1", nameEn: "Medium SA", nameId: "Medium SA" },
    { id: 2, value: "2", nameEn: "High Usage", nameId: "High Usage" },
    { id: 3, value: "3", nameEn: "Medium Usage", nameId: "Medium Usage" },
    { id: 4, value: "4", nameEn: "High Revenue", nameId: "High Revenue" },
    { id: 5, value: "5", nameEn: "Medium Revenue", nameId: "Medium Revenue" },
    { id: 6, value: "6", nameEn: "Low Performance", nameId: "Low Performance" },
    { id: 7, value: "7", nameEn: "Branding", nameId: "Branding" },
    { id: 8, value: "8", nameEn: "Prominent", nameId: "Prominent" },
    { id: 9, value: "9", nameEn: "Unrated", nameId: "Unrated" },
    { id: 10, value: "10", nameEn: "All", nameId: "All" },
  ];

  const statusSuggestions = [
    { id: 0, value: "0", nameEn: "Need Review", nameId: "Need Review" },
    { id: 1, value: "1", nameEn: "Reviewed", nameId: "Reviewed" },
    { id: 2, value: "2", nameEn: "OK", nameId: "OK" },
    { id: 3, value: "10", nameEn: "All", nameId: "All" },
  ];

  const hitApiGetParameterize = async () => {
    try {
      setIsOpenModalLoaderNew(true);
      const result = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings/parameter`,
        method: "GET",
      });
      // console.log("ini data result parameterize", result);
      const dataPre = result.data.data;
      console.log("+++ Get Parameterize List :", dataPre);

      const dataParam = {
        highCasaData: dataPre.highCasa,
        highTrxData: dataPre.highTransaction,
        highRevData: dataPre.highRevenue,

        mediumCasaData: dataPre.mediumCasa,
        mediumTrxData: dataPre.mediumTransaction,
        mediumRevData: dataPre.mediumRevenue,

        lowCasaData: dataPre.lowCasa,
        lowTrxData: dataPre.lowTransaction,
        lowRevData: dataPre.lowRevenue,
        anomalyData: dataPre.anomaly,
      };
      setDataParameterize(dataParam);
      setIsOpenModalLoaderNew(false);
      handleOpenParameterize();
    } catch (error) {
      setIsOpenModalLoaderNew(false);
      console.log(`Error Fetching Parameterize List : \n ${error}`);
      alert(`Error Fetching Parameterize List : \n ${error}`);
    }
  };

  function onSubmitBtnEdit() {
    setDataHit(dataHit);
    alert("Success Update Data");
    location.reload();
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
    };
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Modeling</Typography>
        </Grid>
        <Grid item>
          <ChkySearchBar
            placeholder="Search ATM ID"
            onKeywordChange={handleKeyword}
            width={310}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" style={{ marginBottom: 20 }}>
        <Grid item>
          <div />
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Change Parameter"
            iconPosition="startIcon"
            onClick={() => {
              handleParameterize();
            }}
            buttonIcon={<ArrowLeft />}
          />

          <ChkyDownloadButton
            style={{
              marginRight: 10,
              height: 40,
              width: "max-content",
              boxShadow: "0px 6px 6px rgba(101, 209, 112, 0.2)",
              borderRadius: "6px",
            }}
            label="Download File Excel"
            onClick={() => {
              handleDownload();
            }}
          />

          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Upload List Branding & Prominent"
            iconPosition="startIcon"
            onClick={() => {
              handleUploadCriteria();
            }}
            buttonIcon={<UploadCloud />}
          />
        </Grid>
      </Grid>
      <Paper className={classes.filterSection}>
        <Filter
          modelSuggestions={modelSuggestions}
          statusSuggestions={statusSuggestions}
          onFilterSubmit={handleFilter}
          onResetSubmit={handleResetFilter}
          filterData={filterData}
        />
      </Paper>
      <ChkyTablePagination
        data={dataTable}
        fields={titleTable}
        cellOption={valueType}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        isLoadData={isOpenModalLoader}
        changePage={handleChangePage}
        resetPageCounter={resetPageCount}
        // leftAlignHeaders={[1]}
        leftAlignBody={[1]}
        isSort={isSort}
        isUsingMuiSort={true}
        handleSort={handleSort}
        sortBy={sortBy}
        order={orderDirection}
      />
      {/* <FloatingChat /> */}
      <EditModel
        isOpen={openModalEdit}
        onClose={handleCloseModaEdit}
        onLeave={() => {
          handleCloseModaEdit();
        }}
        rowToShow={selectedRow}
        onSubmitBtn={onSubmitBtnEdit}
        loaderHandler={handleModalLoaderNew}
      />
      <ModalUpload
        isOpen={openModalCriteria}
        onClose={handleCloseModalCriteria}
        onLeave={() => {
          handleCloseModalCriteria();
        }}
      />
      <ModalParameterize
        isOpen={openModalParameterize}
        onClose={handleCloseParameterize}
        onLeave={() => {
          handleCloseModalParameterize();
        }}
        data={dataParameterize}
        handleLoading={(bool)=>{
          setIsOpenModalLoaderNew(bool);
        }}
      />
      <ModalLoader isOpen={isOpenModalLoaderNew} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(ModelingModel))
);

const columnNameVar = [
  'atmId',
  'locationName',
  'averageCasa',
  'averageTransaction',
  'averageRevenue',
  'revenuePaymentPerCost',
  'status',
  'modelTeam',
  'modelFinal',
];

const isSort = [true, true, true, true, true, true, true, true, true,];

// init data table Fields and valueTypes
const titleTable = [
  "ATM ID",
  "Location",
  "Avg CASA",
  "Avg Trx",
  "Avg Rev",
  "Rev per cost",
  "Status",
  "Model Team",
  "Model Final",
  "",
];

const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "statusModel",
  "string",
  "string",
  "modal",
];
