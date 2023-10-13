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
import { RootContext } from "../../../router";
// import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../helpers/constants";
import FilterProgress from "./common/FilterProgress";
import { TableCheckPagination } from "../../../components";
import SuccessPopUp from "./common/PopUp/successPopUp";
import ConfirmPopUp from "./common/PopUp/confirmPopUp";
import { thousandFormat } from "../../../helpers/useFormatter";
import ModalLoader from "../../../components/ModalLoader";
import useTimestampConverter from "../../../helpers/useTimestampConverter";
import TableChips from "../../../components/Chips/TableChips";

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
    padding: "0px 0px",
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
  // name: PropTypes.string,
  // jobTitle: PropTypes.string,
  initial: PropTypes.string,
};
let approvals = [
  { id: 1, initial: "BA" },
  { id: 2, initial: "TS" },
  { id: 3, initial: "AA" },
];
ApprovalBy.defaultProps = {
  // name: "Nama Lengkap",
  // jobTitle: "Job Title",
  initial: "N",
};
const Approval = approvals.map((item) => (
  <div key={item.id} style={{ display: "inline-flex", marginRight: "2px" }}>
    <ApprovalBy
      // name="Roy Axter"
      // jobTitle="ATM Site Management Head"
      initial={item.initial}
    />
  </div>
));
function chipsHandler(type) {
  /*
    [props in table] : "color in chips component"
  */
  const condition = {
    done: "success",
    assigned: "info",
    onprogress: "warning",
    open: "purple",
    unprocessed: "error",
    overdue: "default",
  };

  return condition[type] ?? "default";
}

const StatusApproval = (
  <TableChips label="Approved" type={chipsHandler("done")} />
);
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

// function a11yProps(index) {
//   return {
//     id: `content-tab-${index}`,
//     "aria-controls": `content-tabpanel-${index}`,
//   };
// }

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
const Main = () => {
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

  const actionDetail = (id, taskType) => {
    // alert(`(${id}) Go to Order Detail`)
    // history.push(
    //   `/vendor-management/orders/approval/${id}/detail?taskType=${taskType}`
    // );
  };

  const dataAction3 = [{ name: "Detail", func: actionDetail }];

  const titleTableNew = [
    {
      id: "noTicket",
      numeric: false,
      disablePadding: false,
      label: "No Ticket",
    },
    {
      id: "tglRequest",
      numeric: false,
      disablePadding: false,
      label: "Tgl Request",
    },
    { id: "userReq", numeric: false, disablePadding: false, label: "User Req" },
    {
      id: "namaLokasi",
      numeric: false,
      disablePadding: false,
      label: "Lokasi",
    },

    { id: "IDMesin", numeric: false, disablePadding: false, label: "ID Mesin" },

    {
      id: "namaVendor",
      numeric: false,
      disablePadding: false,
      label: "Nama Vendor",
    },

    { id: "SLA", numeric: false, disablePadding: false, label: "SLA" },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
    },
    {
      id: "statusApproval",
      numeric: false,
      disablePadding: false,
      label: "Status Approval",
    },
    {
      id: "tglApproved",
      numeric: false,
      disablePadding: false,
      label: "Tgl Approval",
    },
    {
      id: "action2",
      numeric: false,
      disablePadding: false,
      label: "",
      disabledSort: true,
    },
  ];

  const SlaBa = <Typography style={{ color: "#65D170" }}> 0 Days</Typography>;

  let listTable = [
    {
      // id: 1,
      noTicket: "A1",
      tglRequest: "20-12-2022",
      userReq: "Bambang Karsono Adi",
      namaLokasi: "Jakarta barat",
      IDMesin: "A222",
      namaVendor: "Nama Vendor",
      sla_Vendor: SlaBa,
      approver: Approval,
      statusApproval: StatusApproval,
      tglApproved: "20-12-2022",
      action2: dataAction3.map((act) => {
        return <a onClick={() => act.func(data.id, data.type)}>{act.name}</a>;
      }),
    },
    {
      // id: 2,
      noTicket: "A1",
      tglRequest: "20-12-2022",
      userReq: "Bambang Karsono Adi",
      namaLokasi: "Jakarta barat",
      IDMesin: "A222",
      namaVendor: "Nama Vendor",
      sla_Vendor: "0 Days",
      approver: Approval,
      statusApproval: StatusApproval,
      tglApproved: "20-12-2022",
      action2: dataAction3.map((act) => {
        return <a onClick={() => act.func(data.id, data.type)}>{act.name}</a>;
      }),
    },
    {
      // id: 3,
      noTicket: "A1",
      tglRequest: "20-12-2022",
      userReq: "Bambang Karsono Adi",
      namaLokasi: "Jakarta barat",
      IDMesin: "A222",
      namaVendor: "Nama Vendor",
      sla_Vendor: "0 Days",
      approver: Approval,
      statusApproval: StatusApproval,
      tglApproved: "20-12-2022",
      action2: dataAction3.map((act) => {
        return <a onClick={() => act.func(data.id, data.type)}>{act.name}</a>;
      }),
    },
    {
      // id: 4,
      noTicket: "A1",
      tglRequest: "20-12-2022",
      userReq: "Bambang Karsono Adi",
      namaLokasi: "Jakarta barat",
      IDMesin: "A222",
      namaVendor: "Nama Vendor",
      sla_Vendor: "0 Days",
      approver: Approval,
      statusApproval: StatusApproval,
      tglApproved: "20-12-2022",
      action2: dataAction3.map((act) => {
        return <a onClick={() => act.func(data.id, data.type)}>{act.name}</a>;
      }),
    },
    {
      // id: 5,
      noTicket: "A1",
      tglRequest: "20-12-2022",
      userReq: "Bambang Karsono Adi",
      namaLokasi: "Jakarta barat",
      IDMesin: "A222",
      namaVendor: "Nama Vendor",
      sla_Vendor: "0 Days",
      approver: Approval,
      statusApproval: StatusApproval,
      tglApproved: "20-12-2022",
      action2: dataAction3.map((act) => {
        return <a onClick={() => act.func(data.id, data.type)}>{act.name}</a>;
      }),
    },
  ];

  const itemSearch = [
    { text: "No Ticket", value: "ticketNumber" },
    { text: "Tgl Request", value: "requestDate" },
    { text: "User Req", value: "requesterUser" },
    { text: "ID Loc", value: "locationId" },
    { text: "Nama Lokasi", value: "locationName" },
    { text: "Alamat", value: "locationAddress" },
    { text: "Area", value: "locationArea" },
    { text: "City", value: "locationCity" },
    { text: "Lat - Long", value: "latitudeLongitude" },
    { text: "ID Mesin", value: "idMesin" },
    { text: "Jenis Pekerjaan", value: "jobType" },
    { text: "Nama Vendor", value: "vendorName" },
    { text: "Tgl Approved", value: "approvedDate" },
  ];

  const valueTypeTableNew = [];

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // function ApproveOrReject() {
  //   const serviceType =
  //     confirmType === "Approve"
  //       ? "approveApprovalVendor"
  //       : "rejectApprovalVendor";
  //   const arr = [];
  //   // for (const i in selectedItemTable) {
  //   //   arr.push({
  //   //     id: selectedItemTable[i],
  //   //     // taskType:
  //   //   });
  //   // }
  //   selectedItemTable.map((item) => {
  //     arr.push({
  //       id: item.id,
  //       taskType: item.taskType,
  //     });
  //   });
  //   const dataHit = {
  //     // taskType: "need",
  //     approveList: arr,
  //   };
  //   setOpenModalLoader(true);
  //   Axios({
  //     url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/${serviceType}`,
  //     method: "POST",
  //     data: dataHit,
  //     headers: configNew,
  //   })
  //     .then((res) => {
  //       setOpenModalLoader(false);
  //       // console.log('+++ res', res);
  //       if (res.data.responseCode === "00") {
  //         switch (confirmType) {
  //           case "Approve":
  //             setOpenConfirmModal(false);
  //             setOpenSuccessModal(true);
  //             setLabelSuccess("Approve Berhasil Dilakukan");
  //             break;
  //           default:
  //             setOpenConfirmModal(false);
  //             setOpenSuccessModal(true);
  //             setLabelSuccess("Reject Berhasil Dilakukan");
  //             break;
  //         }
  //       } else {
  //         alert(res.data.responseMessage);
  //       }
  //     })
  //     .catch((err) => {
  //       alert("Error", err);
  //       setOpenConfirmModal(false);
  //       setOpenModalLoader(false);
  //       console.log(err);
  //     });
  // }

  useEffect(() => {}, [dataRequest, dataFilter]);

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  // const handleSorting = (type, column) => {
  //   setDataRequest({
  //     ...dataRequest,
  //     sortType: type,
  //     sortBy: column,
  //   });
  // };

  // function handleReject() {
  //   if (selectedItemTable.length < 1) {
  //     alert("Silakan pilih salah satu");
  //   } else {
  //     setConfirmType("Reject");
  //     setOpenConfirmModal(true);
  //   }
  // }

  function handleApproveReject(type) {
    if (type === "Approve") {
      setConfirmType("Approve");
    } else {
      setConfirmType("Reject");
    }
    setOpenConfirmModal(true);
  }

  // const handleGetSelectedItem = (selectedItems) => {
  //   console.log("<<<<< CHECK PARENT : ", JSON.stringify(selectedItems));
  //   setSelectedItemTable(selectedItems);
  // };

  // function onFilterSubmit(filter) {
  //   // console.log('~ filter', filter)
  //   const newFilter = { ...filter };
  //   delete newFilter.status;
  //   // console.log('~ newFilter', newFilter)
  //   setDataFilter(_.isEmpty(newFilter) ? null : newFilter);
  //   setDataRequest((old) => ({ ...old, pageNumber: 0 }));
  // }

  // function handleResetFilter() {
  //   setDataRequest({
  //     ...defaultDataHit,
  //     pageNumber: 0,
  //   });
  //   setDataFilter(null);
  // }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>
            Approval BA Penghancuran
          </Typography>
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
                // onFilterSubmit={onFilterSubmit}
                // handleReset={handleResetFilter}
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
              data={listTable}
              fields={titleTableNew}
              cellOption={valueTypeTableNew}
              // totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePageValue}
              // isLoadData={isLoading}
              // sorting={handleSorting}
              // isSort
              // onSelectedItems={handleGetSelectedItem}
              // onSelectedItemsObj={handleGetSelectedItem}
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
      <ConfirmPopUp
        isOpen={openConfirmModal}
        onClose={() => {
          setOpenConfirmModal(false);
        }}
        type={confirmType}
        // onSubmit={ApproveOrReject}
      />
      {/* <SuccessPopUp
        isOpen={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          window.location.reload();
        }}
        label={labelSuccess}
      /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default Main;
