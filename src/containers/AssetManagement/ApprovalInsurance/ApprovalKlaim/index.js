/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
import moment from "moment";
import { Box, Grid, Typography, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import _ from "lodash";
import { RootContext } from "../../../../router";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../../helpers/constants";
import FilterProgress from "../../../VendorManagement/Orders/common/FilterProgress";
import { TableCheckPagination } from "../../../../components";
import { thousandFormat } from "../../../../helpers/useFormatter";
import ModalLoader from "../../../../components/ModalLoader";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import dummyData from "./dummyData";
import { doGetSubmissionClaim } from "../../ApiServiceAsset";

const { dummyDataKlaim } = dummyData;
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

const approvalStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "15px 0px",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    display: "flex",
    "& > *": {
      margin: 5,
    },
    fontSize: 18,
  },
});

const ApprovalBy = (props) => {
  const classes = approvalStyles();
  // init Props
  const { name, jobTitle, initial } = props;
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }
  return (
    <div className={classes.root}>
      <Avatar
        style={{ backgroundColor: renderBackColor(initial) }}
        className={classes.avatar}
      >
        {initial}
      </Avatar>
      <div
        style={{
          marginLeft: 12,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <Typography style={{ fontSize: 12, fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography style={{ fontSize: 12, fontStyle: "italic" }}>
          {jobTitle}
        </Typography>
      </div>
    </div>
  );
};

ApprovalBy.propTypes = {
  name: PropTypes.string,
  jobTitle: PropTypes.string,
  initial: PropTypes.string,
};

ApprovalBy.defaultProps = {
  name: "Nama Lengkap",
  jobTitle: "Job Title",
  initial: "N",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

// END TABS PANEL COMPONENT

// CONVERTING DATE AS DD-MM-YYYY FORMAT
const DateConvert = (props) => {
  const { getDate } = props;
  const getNewDate =
    typeof getDate === "string" ? getDate.replace("WIB", "+07:00") : "";
  const setDate = getNewDate ? moment(getNewDate)?.format("DD-MM-YYYY") : "";
  return setDate || "-";
};

DateConvert.propTypes = {
  getDate: PropTypes.string,
};

// DEFAULT EXPORT
const index = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalLoader, setOpenModalLoader] = useState(false);

  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const rowsPerPage = 10; // <--- init default rowsPerPage|
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState("Approve");
  const [labelSuccess, setLabelSuccess] = useState("");
  const [selectedItemTable, setSelectedItemTable] = useState([]);

  useEffect(() => {
    // console.log("+++ selectedItemTable",selectedItemTable);
  }, [selectedItemTable]);

  // INIT DATA REQUEST
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };

  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(null);

  // INIT FILTER Table
  const [selectedSearch, setSelectedSearch] = useState("All");
  const [selectedKebutuhan, setSelectedKebutuhan] = useState("All");
  const [inputSearch, setInputSearch] = useState("");
  const [dataFilter, setDataFilter] = useState(null);

  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array

  const actionDetail = (id) => {
    // alert(`(${id}) Go to Order Detail`)
    history.push(
      `/asset-management/insurance/insurance-approval-klaim/detail/${id}`
    );
  };

  const dataAction3 = [{ name: "Detail", func: actionDetail }];

  const titleTableNew = [
    { id: "id", numeric: false, disablePadding: false, label: "ID" },
    {
      id: "claimNumber",
      numeric: false,
      disablePadding: false,
      label: "No Klaim",
    },
    {
      id: "claimType",
      numeric: false,
      disablePadding: false,
      label: "Tipe Klaim",
    },
    {
      id: "approvalDate",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Pengajuan",
    },
    {
      id: "snMachine",
      numeric: false,
      disablePadding: false,
      label: "SN Mesin",
    },
    {
      id: "idMachine",
      numeric: false,
      disablePadding: false,
      label: "ID Mesin",
    },
    { id: "location", numeric: false, disablePadding: false, label: "Lokasi" },
    {
      id: "lossStatement",
      numeric: false,
      disablePadding: false,
      label: "Keterangan Kerugian",
    },
    {
      id: "incidentDate",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Kejadian",
    },
    {
      id: "amountOfLoss",
      numeric: false,
      disablePadding: false,
      label: "Jumlah Kerugian",
    },
    {
      id: "offerEmailDate",
      numeric: false,
      disablePadding: false,
      label: "Tgl Email Penawaran",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Kategori",
    },
    {
      id: "flm",
      numeric: false,
      disablePadding: false,
      label: "FLM",
    },
    {
      id: "slm",
      numeric: false,
      disablePadding: false,
      label: "SLM",
    },
    {
      id: "cctv",
      numeric: false,
      disablePadding: false,
      label: "CCTV",
    },
    {
      id: "sla",
      numeric: false,
      disablePadding: false,
      label: "SLA",
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
    },
    {
      id: "approvalStatus",
      numeric: false,
      disablePadding: false,
      label: "Status Approve",
    },
    {
      id: "approvalDate",
      numeric: false,
      disablePadding: false,
      label: "Tgl Approve",
    },
    {
      id: "action2",
      numeric: false,
      disablePadding: false,
      label: "",
      disabledSort: true,
    },
  ];

  const itemSearch = [
    { text: "No Klaim", value: "claimNumber" },
    { text: "Tipe Klaim", value: "claimType" },
    { text: "Tanggal Pengajuan", value: "approvalDate" },
    { text: "SN Mesin", value: "snMachine" },
    { text: "ID Mesin", value: "idMachine" },
    { text: "Lokasi", value: "location" },
    { text: "Keterangan Kerugian", value: "lossStatement" },
    { text: "Tanggal Kejadian", value: "incidentDate" },
    { text: "Jumlah Kerugian", value: "amountOfLoss" },
    { text: "Tgl Email Penawaran", value: "offerEmailDate" },
    { text: "Kategori", value: "category" },
    { text: "FLM", value: "flm" },
    { text: "SLM", value: "slm" },
    { text: "CCTV", value: "cctv" },
    { text: "SLA", value: "sla" },
    { text: "Approver", value: "approver" },
    { text: "Status Approve", value: "approvalStatus" },
    { text: "Tgl Approve", value: "approvalDate" },
  ];

  const valueTypeTableNew = [
    "hide",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20Left",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "limit20",
    "sla_Vendor",
    "approverImple",
    "statusApproval",
    "limit20",
  ];

  function loaderHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  useEffect(() => {
    try {
      doGetSubmissionClaim(loaderHandler, dataRequest)
        .then((res) => {
          console.log("data response", res);
          if (res) {
            const newData = [];
            const resData = res.data.content;
            setTotalRows(res.data.totalElements);
            setTotalPages(res.data.totalPages);
            resData.map((item, i) => {
              const newRow = {
                id: item.id,
                noKlaim: item.claimNumber ? item.claimNumber : "-",
                tipeKlaim: item.claimType ? item.claimType : "-",
                tanggalPengajuan:
                  item.approvalDate !== null
                    ? useTimestampConverter(
                        item.approvalDate / 1000,
                        "YYYY-MM-DD"
                      )
                    : "-",
                snMesin: item.snMachine ? item.snMachine : "-",
                idMesin: item.idMachine ? item.idMachine : "-",
                lokasi: item.location ? item.location : "-",
                keteranganKerugian: item.lossStatement
                  ? item.lossStatement
                  : "-",
                tglKejadian:
                  item.incidentDate !== null
                    ? useTimestampConverter(
                        item.incidentDate / 1000,
                        "YYYY-MM-DD"
                      )
                    : "-",
                jumlahKerugian: item.amountOfLoss
                  ? `Rp.${thousandFormat(item.amountOfLoss)}`
                  : "-",
                tglEmailPenawaran: item.offerEmailDate
                  ? item.offerEmailDate
                  : "-",
                kategori: item.category ? item.category : "-",
                flm: item.flm ? item.flm : "-",
                slm: item.slm ? item.slm : "-",
                cctv: item.cctv ? item.cctv : "-",
                sla: item.sla ? item.sla : "-",
                approver: item.approver,
                statusApprove: item.approvalStatus ? item.approvalStatus : "-",
                tglApprove:
                  item.approvalDate !== null
                    ? useTimestampConverter(
                        item.approvalDate / 1000,
                        "YYYY-MM-DD"
                      )
                    : "-",
                action2: dataAction3.map((act) => {
                  return <a onClick={() => act.func(item.id)}>{act.name}</a>;
                }),
              };
              newData.push(newRow);
              // console.log("data set", newRow);
            });
            setDataImplementationNew(newData);
          }
        })
        .catch((err) => {
          alert(`Failed to get data \n ${err}`);
        });
    } catch (err) {
      alert(`Failed to get data \n ${err}`);
    }
  }, [dataRequest]);

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };

  function handleReject() {
    if (selectedItemTable.length < 1) {
      alert("Silakan pilih salah satu");
    } else {
      setConfirmType("Reject");
      setOpenConfirmModal(true);
    }
  }

  function handleApproveReject(type) {
    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes("approval_implementasi");
    if (!isApproval) {
      alert(
        "Approve / Reject Action allowed just for Approval Implementation Users"
      );
    } else if (selectedItemTable.length < 1) {
      alert("Silakan pilih salah satu");
    } else {
      if (type === "Approve") {
        setConfirmType("Approve");
      } else {
        setConfirmType("Reject");
      }
      setOpenConfirmModal(true);
    }
  }

  const handleGetSelectedItem = (selectedItems) => {
    console.log("<<<<< CHECK PARENT : ", JSON.stringify(selectedItems));
    setSelectedItemTable(selectedItems);
  };

  function onFilterSubmit(filter) {
    const newFilter = { ...filter };
    delete newFilter.status;
    if (filter === null) {
      setDataRequest(defaultDataHit);
    } else {
      // console.log("Sasa",filter);
      setDataRequest({
        ...dataRequest,
        ...newFilter,
      });
    }
  }

  function handleResetFilter() {
    setDataRequest({
      ...defaultDataHit,
      pageNumber: 0,
    });
    setDataFilter(null);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Approval</Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container direction="column" spacing={1}>
          {/* TAB PANEL CONTENT */}
          <Grid item style={{ width: "-webkit-fill-available" }}>
            {/* FILTER */}
            <div className={classes.filterContainer}>
              <FilterProgress
                isOpening={false}
                itemSearch={itemSearch}
                onFilterSubmit={onFilterSubmit}
                handleReset={handleResetFilter}
              />
            </div>
            <Grid
              container
              justify="space-between"
              style={{ marginBottom: "24px" }}
            >
              <Grid item>
                <Button
                  style={{
                    backgroundColor: Constants.color.primaryHard,
                    padding: "12px 40px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    textTransform: "capitalize",
                    borderRadius: 8,
                  }}
                  onClick={() => handleApproveReject("Reject")}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: "#65D170",
                    padding: "12px 40px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    textTransform: "capitalize",
                    borderRadius: 8,
                  }}
                  onClick={() => handleApproveReject("Approve")}
                >
                  Approve
                </Button>
              </Grid>
            </Grid>
            {/* NEW */}
            <TableCheckPagination
              data={dataImplementationNew}
              fields={titleTableNew}
              cellOption={valueTypeTableNew}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePageValue}
              isLoadData={isLoading}
              sorting={handleSorting}
              isSort
              // onSelectedItems={handleGetSelectedItem}
              onSelectedItemsObj={handleGetSelectedItem}
            />
          </Grid>
        </Grid>
        <div className={classes.containerPaper}>
          <Typography style={{ fontSize: 24, fontWeight: 500 }}>
            Approver
          </Typography>
          <Grid container>
            <Grid item xs={4}>
              <ApprovalBy
                name="Roy Axter"
                jobTitle="ATM Site Management Head"
                initial="RA"
              />
            </Grid>
            <Grid item xs={4}>
              <ApprovalBy
                name="Bambang Karsono Adi"
                jobTitle="Head of Digital Banking, Branchless & Partnership"
                initial="BA"
              />
            </Grid>
            <Grid item xs={4}>
              {/* <ApprovalBy name="Lani" jobTitle="EFI Champion Rental" initial="L" /> */}
            </Grid>
            <Grid item xs={4}>
              <ApprovalBy
                name="Trisna L. M. Siahaan"
                jobTitle="ATM Business Head"
                initial="TS"
              />
            </Grid>
            {/* <Grid item xs={4}>
                <ApprovalBy name="Yohana" jobTitle="Network Planning & Strategy Head" initial="Y" />
            </Grid> */}
          </Grid>
        </div>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default index;
