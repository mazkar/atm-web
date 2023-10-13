import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import constants from "../../helpers/constants";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import ChkyDownloadButton from "../../components/chky/ChkyDownloadButton";
import MuiIconLabelButton from "../../components/Button/MuiIconLabelButton";
import FilterData from "./MasterDataFilter";
import ChkyTablePagination from "../../components/chky/ChkyTablePagination";
import ModalUpload from "./ModalUpload";
import { ReactComponent as UploadCloud } from "../../assets/icons/siab/upload-cloud.svg";
import { ReactComponent as MachineIcon } from "../../assets/icons/general/calculator_overview.svg";

import { PrimaryHard } from "../../assets/theme/colors";
import ModalLoader from "../../components/ModalLoader";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  containerMachine: {
    padding: 15,
    border: "1px solid #8D98B4",
    borderRadius: 10,
  },
  fontStyle: {
    fontWeight: 500,
    fontSize: 15,
  },
});

const index = () => {
  const classes = useStyles();
  const history = useHistory();
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // MODAL UPLOAD //
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const handleOpenModalUpload = () => setOpenModalUpload(true);
  const handleCloseModalUpload = () => setOpenModalUpload(false);
  const [filterData, setFilterData] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [cardContents, setCardContents] = useState([null, null, null, null]);
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);

  const handleUpload = () => {
    handleOpenModalUpload();
  };

  function handleFilterSubmit(val) {
    setFilterData(val);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
  }

  function handleDetailPage(id) {
    history.push(`/master-data/detail/${id}`);
  }

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const titleTable = [
    "ATM ID",
    "Tgl Pengajuan Mesin",
    "Nama Lokasi",
    "Denominasi Mesin",
    "Tipe ATM",
    "Pembangunan ATM",
    "Tipe Lokasi",
    "",
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
    "child",
    "child",
  ];

  useEffect(() => {
    fetchTableData();
    fetchCardData();
  }, [currentPage, filterData, orderBy, orderDirection]);

  function fetchTableData() {
    const {
      provinceId = "All",
      citiesId: cityId = "All",
      kecamatanId: districtId = "All",
      atmIdOrLocationName,
    } = filterData || {};
    setIsLoading(true);
    axios({
      url: `${constants.MODELINGS_SERVICE}/getListMasterData`,
      method: "POST",
      data: {
        pageNumber: currentPage,
        dataPerPage: rowsPerPage,
        provinceId,
        cityId,
        districtId,
        atmIdOrLocationName,
        ...(orderBy && { orderBy, orderDirection }),
      },
    })
      .then((res) => {
        setIsLoading(false);
        const GeneralLink = ({ label, action, disabled }) => (
          <Link
            component="button"
            style={{ color: disabled ? null : PrimaryHard }}
            onClick={action}
            disabled={disabled}
          >
            {label}
          </Link>
        );
        // console.log('~ res', res.data);
        setTotalPages(res.data.totalPages);
        setTotalRows(res.data.totalElements);
        setDataTable(
          res.data.content.map((val) => ({
            atmId: val.atmId,
            machineSubmissionDate: moment(
              val.machineSubmissionDate,
              "YYYY-MM-DD"
            ).format("DD/MM/YYYY"),
            locationName: val.locationName,
            denom: val.denom,
            machineType: val.machineType,
            pembangunan: val.boothType,
            typeRuang: val.locationType,
            editAction: (
              <GeneralLink
                label="Edit"
                disabled={!val.editable}
                action={() => {
                  history.push(`/master-data/edit/${val.atmId}`);
                }}
              />
            ),
            detailAction: (
              <GeneralLink
                label="Detail"
                action={() => handleDetailPage(val.atmId)}
              />
            ),
          }))
        );
      })
      .catch((err) => {
        console.log("~ err", err);
        setIsLoading(false);
      });
  }

  function fetchCardData() {
    const {
      provinceId = "All",
      citiesId: cityId = "All",
      kecamatanId: districtId = "All",
      atmIdOrLocationName,
    } = filterData || {};
    axios({
      url: `${constants.MODELINGS_SERVICE}/getSummaryMachinePopulation`,
      method: "POST",
      data: {
        provinceId,
        cityId,
        districtId,
      },
    })
      .then(({ data }) => {
        setCardContents([data.atm, data.crm, data.cdm, data.mdm]);
      })
      .catch((err) => {
        console.log("~ err", err);
        setCardContents([null, null, null, null]);
      });
  }

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
      setSortBy(property);
      setOrderBy(colNameVarArr[titleTable.indexOf(property)]);
    };
  }

  const handleDownload = () => {
    setIsModalLoaderOpen(true);
    // console.log('click');
    axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/downloadMasterData`,
      responseType: "blob", // important
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // },
    })
      .then((res) => {
        console.log(res.data);
        setIsModalLoaderOpen(false);
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        // console.log('~ url', url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Master Data.xlsx");
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
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Master Data</Typography>
        </Grid>
      </Grid>

      <Grid container justify="flex-end" direction="row">
        <Grid item>
          <ChkyDownloadButton
            style={{ marginRight: 10, height: 40, width: "max-content" }}
            label="Export to Excel"
            onClick={handleDownload}
          />
        </Grid>

        <Grid item>
          <MuiIconLabelButton
            style={{ width: "max-content", right: 0, height: 40 }}
            label="Upload Master Data"
            iconPosition="startIcon"
            onClick={() => {
              handleUpload();
            }}
            buttonIcon={<UploadCloud />}
          />
        </Grid>
      </Grid>

      {/** Content */}
      <Grid container direction="column" style={{ marginTop: 30 }} spacing={2}>
        <Grid item>
          <FilterData onFilterSubmit={handleFilterSubmit} />
        </Grid>

        <Grid item>
          <Accordion defaultExpanded style={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item style={{ display: "flex" }}>
                  <MachineIcon />
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                    Machine Populations
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={2}
              >
                {cardContents.map((val) => {
                  return (
                    <Grid item md={3}>
                      <div className={classes.containerMachine}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 5,
                          }}
                        >
                          <MachineIcon />
                          <Typography
                            style={{
                              marginLeft: 5,
                              fontSize: 15,
                              fontWeight: 500,
                            }}
                          >
                            {val?.machineType}
                          </Typography>
                        </div>
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="spacing-between"
                        >
                          <Grid item xs={6}>
                            <Typography className={classes.fontStyle}>
                              Total Mesin
                            </Typography>
                          </Grid>
                          <Grid item xs={3} className={classes.fontStyle}>
                            {val?.totalMachine}
                          </Grid>
                          <Grid item xs={3} className={classes.fontStyle}>
                            {val?.totalPersetage}%
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item>
          <ChkyTablePagination
            data={dataTable}
            fields={titleTable}
            cellOption={valueType}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePage}
            resetPageCounter={resetPageCounter}
            isLoadData={isLoading}
            leftAlignBody={[2]}
            isSort={isSort}
            isUsingMuiSort
            handleSort={handleSort}
            sortBy={sortBy}
            order={orderDirection}
          />
        </Grid>
      </Grid>

      {/* <FloatingChat /> */}
      <ModalUpload
        isOpen={openModalUpload}
        onClose={handleCloseModalUpload}
        onLeave={() => {
          handleCloseModalUpload();
        }}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
};

index.propTypes = {};

export default index;

const isSort = [true, true, true, true, true, true, true];

const colNameVarArr = [
  "atmId",
  "machineSubmissionDate",
  "locationName",
  "denom",
  "machineType",
  "boothType",
  "locationType",
];
