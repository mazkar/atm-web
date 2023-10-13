/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Typography,
  Avatar,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
// eslint-disable-next-line import/no-cycle
import { functions } from "lodash";
import { RootContext } from "../../../router";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import DynamicTable from "../../../components/DynamicTableWithCheck";
import ModalLoader from "../../../components/ModalLoader";
import Constants from "../../../helpers/constants";
import FilterApproval from "./FilterApproval";
import TieringList from "./TieringList";
import {
  doFetchDataApprovalNew,
  doFetchDataApprovalRenewal,
  doFetchDataApprovalReopen,
  doFetchDataApprovalTermin,
} from "./ApiServiceApproval";
import ModalApproveAll from "./ModalApproveAll";
import { TableCheckPagination } from "../../../components";
import ModalRejectAll from "./ModalRejectAll";
import * as ThemeColor from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
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
  tableContent: { marginTop: 20 },
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
});

// TABS PANEL COMPONENT

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 3,
    "& > span": {
      width: "100%",
      backgroundColor: Constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: Constants.color.grayMedium,
    "&:hover": {
      color: Constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: Constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

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

// ====> Start Component Approval Footer
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
// End Component Approval Footer <====

const rowsPerPage = 10; // <--- init default rowsPerPage
const defaultFilterData = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  approvalStatus: "All",
  modelTeam: "All",
  // cagr: "All", // siapa tau cagr dimasukin lagi
  areaId: 'All',
  cityId: 'All'
};

const Approval = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userId, userFullName, userRoleName } = useContext(RootContext);

  // Init Selected Table Items
  const [selectedItemTable, setSelectedItemTable] = useState([]);
  const [selectedItemObjTable, setSelectedItemObjTable] = useState([]);

  // INIT TABLE
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // INIT DATA HIT
  const [dataHit, setDataHit] = useState(defaultFilterData);

  // =========> JOM MODAL LOADER WHER FETCHING DATA
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(true);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  // modal for Approve All
  const [openModalApproveAll, setOpenModalApproveAll] = useState(false);
  const [openModalRejectAll, setOpenModalRejectAll] = useState(false);
  const handleOpenModalApproveAll = () => {
    // console.log("+++ selectedItemObjTable", selectedItemObjTable);
    // console.log("+++ userFullName", userFullName);
    // CHECK IS TIM APPROVAL LOGIN
    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes("tim approval");
    if (!isApproval) {
      alert("Approve Action allowed just for Approval Team / Directors");
    } else if (selectedItemTable.length > 0) {
      {
        /** Yang aku komen jangan dihapus dulu, buat pengecekan tim approver */
      }
      // // CHECK IF USER ALREADY APPROVE SOME ITEM
      // const idApprovedByUser=[];
      // // CHECK IF ITEM NOT APPROVE BY ANOTHER DIRECTORS
      // const prevNotApprove=[];
      // selectedItemObjTable.map(item=>{
      //   if (item.approver.includes(userFullName)){
      //     idApprovedByUser.push(item);
      //   }
      //   // CHECK DIRECTORS APPROVE
      //   // eslint-disable-next-line default-case
      //   switch (true) {
      //   case userFullName.toLowerCase().includes('trisna'):
      //     // console.log("+++ trisna");
      //     if (!item.approver.includes('Deden Hidayat')){
      //       prevNotApprove.push(item);
      //     }
      //     break;
      //   case userFullName.toLowerCase().includes('bambang'):
      //     // console.log("+++ bambang");
      //     if (!item.approver.includes('Trisna L.M. Siahaan')){
      //       prevNotApprove.push(item);
      //     }
      //     break;
      //   }
      // });
      // // console.log("+++ prevNotApprove: ", prevNotApprove);
      // // CONDITIONAL APPROVE
      // if (idApprovedByUser.length > 0) {
      //   alert("You Already Approve several data, please unselect approved data by you!");
      // }else if(prevNotApprove.length > 0){
      //   // console.log("+++ prevNotApprove: ", prevNotApprove);
      //   let confirmTo = "another DA";
      //   // eslint-disable-next-line default-case
      //   switch (true) {
      //   case userFullName.toLowerCase().includes('trisna'):
      //     confirmTo = "Deden Hidayat";
      //     break;
      //   case userFullName.toLowerCase().includes('bambang'):
      //     confirmTo = "Trisna L.M. Siahaan";
      //     break;
      //   }
      //   alert(`Please wait for ${confirmTo} to give approval first, unselect some items!`);
      // }
      // else{
      //   setOpenModalApproveAll (true);
      // }
      setOpenModalApproveAll(true);
    } else {
      alert("No Selected Table Row Items \nPlease select one or more items..!");
    }
  };
  const handleCloseModalApproveAll = () => setOpenModalApproveAll(false);
  function handleOpenModalRejectAll() {
    // CHECK IS TIM APPROVAL LOGIN
    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes("tim approval");
    if (!isApproval) {
      alert("Reject Action allowed just for Approval Team / Directors");
    } else if (selectedItemTable.length > 0) {
      setOpenModalRejectAll(true);
    } else {
      alert("No Selected Table Row Items \nPlease select one or more items..!");
    }
  }
  const handleCloseModalRejectAll = () => setOpenModalRejectAll(false);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(null);

  // check url hash
  const windowsHash = window.location.hash;
  useEffect(() => {
    // console.log("HASH: ",windowsHash);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
    setDataHit((prevState) => {
      return { ...prevState, pageNumber: 0 };
    });
    setOrderBy('id');
    setOrderDirection('DESC');
    if (windowsHash) {
      switch (windowsHash) {
      case "#new":
        setValueTab(0);
        break;
      case "#renewal":
        setValueTab(1);
        break;
      case "#reopen":
        setValueTab(2);
        break;
      case "#termin":
        setValueTab(3);
        break;
      default:
        setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, [windowsHash]);

  const handleChangeTab = (event, newValueTab) => {

    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "new";
    }
    if (newValueTab === 1) {
      hashTab = "renewal";
    }
    if (newValueTab === 2) {
      hashTab = "reopen";
    }
    if (newValueTab === 3) {
      hashTab = "termin";
    }
    history.push(`#${hashTab}`);
  };

  // Init data table = Approval
  const [dataApprovalNew, setDataApprovalNew] = useState([]); // <--- init dataApproval array
  const [dataApprovalRenewal, setDataApprovalRenewal] = useState([]); // <--- init dataApproval array
  const [dataApprovalReopen, setDataApprovalReopen] = useState([]); // <--- init dataApproval array
  const [dataApprovalTermin, setDataApprovalTermin] = useState([]); // <--- init dataApproval array
  const [orderBy, setOrderBy] = useState('id');
  const [orderDirection, setOrderDirection] = useState('DESC');

  // init title and value type table for Data
  // (1) Approval New
  const titleTableNew = [
    { id: "id", numeric: false, disablePadding: false, label: "ID", orderVarName: 'id' },
    {
      id: "idLokasi",
      numeric: false,
      disablePadding: false,
      label: "ID Requester",
      orderVarName: 'location_id'
    },
    { id: "lokasi", numeric: false, disablePadding: false, label: "Lokasi", orderVarName: 'new_location' },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga Sepakat",
    },
    {
      id: "penurunan",
      numeric: false,
      disablePadding: false,
      label: "Penurunan Harga",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      orderVarName: 'model_team'
    },
    { id: "status", numeric: false, disablePadding: false, label: "Status", orderVarName: 'approval_status' },
    { id: "sla", numeric: false, disablePadding: false, label: "SLA", orderVarName: 'due_date' },
    {
      id: "requester",
      numeric: false,
      disablePadding: false,
      label: "Requester",
      orderVarName: 'requester'
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
      orderVarName: 'approval_approver'
    },
    { id: "action", numeric: false, disablePadding: false, label: "" },
  ];
  const valueTypeTableNew = [
    "hide",
    "string",
    "string",
    "child",
    "child",
    "string",
    "statusApproval",
    "string",
    "string",
    "approverNew",
    "url",
  ];

  // (2) Approval ReNew
  const titleTableRenewal = [
    { id: "id", numeric: false, disablePadding: false, label: " ID" },
    { id: "atmId", numeric: false, disablePadding: false, label: "ATM ID", orderVarName: 'atm_id' },
    { id: "lokasi", numeric: false, disablePadding: false, label: "Lokasi", orderVarName: 'new_location' },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga Sepakat",
    },
    {
      id: "penurunan",
      numeric: false,
      disablePadding: false,
      label: "Renewal CAGR %",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      orderVarName: 'model_team'
    },
    { id: "status", numeric: false, disablePadding: false, label: "Status", orderVarName: 'approval_status' },
    { id: "sla", numeric: false, disablePadding: false, label: "SLA", orderVarName: 'due_date' },
    {
      id: "requester",
      numeric: false,
      disablePadding: false,
      label: "Requester",
      orderVarName: 'requester'
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
      orderVarName: 'approval_approver'
    },
    { id: "action", numeric: false, disablePadding: false, label: "" },
  ];
  const valueTypeTableRenewal = [
    "hide",
    "string",
    "string",
    "child",
    "string",
    "string",
    "statusApproval",
    "string",
    "string",
    "approverNew",
    "url",
  ];

  // (3) Approval ReOpen
  const titleTableReopen = [
    { id: "id", numeric: false, disablePadding: false, label: "ID" },
    { id: "locationId", numeric: false, disablePadding: false, label: "ID Requester", orderVarName: 'locationId' },
    { id: "lokasi", numeric: false, disablePadding: false, label: "Lokasi", orderVarName: 'newLocation' },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga Sepakat",
    },
    {
      id: "penurunan",
      numeric: false,
      disablePadding: false,
      label: "Penurunan Harga",
    },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      orderVarName: 'modelTeam'
    },
    { id: "status", numeric: false, disablePadding: false, label: "Status", orderVarName: 'approvalStatus' },
    { id: "sla", numeric: false, disablePadding: false, label: "SLA", orderVarName: 'dueDate' },
    {
      id: "requester",
      numeric: false,
      disablePadding: false,
      label: "Requester",
      orderVarName: 'requester'
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
      orderVarName: 'approvalApprover'
    },
    { id: "action", numeric: false, disablePadding: false, label: "" },
  ];
  const valueTypeTableReopen = [
    "hide",
    "string",
    "string",
    "child",
    "child",
    "string",
    "statusApproval",
    "string",
    "string",
    "approverNew",
    "url",
  ];

  // (4) Approval Termin
  const titleTableTermin = [
    { id: "id", numeric: false, disablePadding: false, label: "ID" },
    { id: "idAtm", numeric: false, disablePadding: false, label: "ATM ID", orderVarName: 'atmId' },
    { id: "lokasi", numeric: false, disablePadding: false, label: "Lokasi", orderVarName: 'newLocation' },
    { id: "casa", numeric: false, disablePadding: false, label: "CASA", orderVarName: 'casa' },
    {
      id: "transaksi",
      numeric: false,
      disablePadding: false,
      label: "Transaksi",
      orderVarName: 'transaction'
    },
    { id: "revenue", numeric: false, disablePadding: false, label: "Revenue", orderVarName: 'revenue' },
    {
      id: "category",
      numeric: false,
      disablePadding: false,
      label: "Category",
      orderVarName: 'category'
    },
    { id: "status", numeric: false, disablePadding: false, label: "Status", orderVarName: 'approvalStatus' },
    { id: "reason", numeric: false, disablePadding: false, label: "Reason", orderVarName: 'terminReason' },
    {
      id: "requester",
      numeric: false,
      disablePadding: false,
      label: "Requester",
      orderVarName: 'requester'
    },
    {
      id: "approver",
      numeric: false,
      disablePadding: false,
      label: "Approver",
      orderVarName: 'approvalApprover'
    },
    { id: "action", numeric: false, disablePadding: false, label: "" },
  ];
  const valueTypeTableTermin = [
    "hide",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "statusApproval",
    "string",
    "string",
    "approverNew",
    "url",
  ];

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }
  // do fetch / hit api when value tab changed
  useEffect(() => {
    // reset dataApproval to empty array
    const newDataHit = {
      ...dataHit,
      // ...(valueTab === 1 && { cagr: dataHit.cagr }),
      ...(orderBy && {orderBy, orderDirection})
    };
      // console.log('~ newDataHit', newDataHit)
      // console.log('~ dataHit', dataHit)

    setDataApprovalNew([]);
    setDataApprovalRenewal([]);
    setDataApprovalReopen([]);
    setDataApprovalTermin([]);
    if (valueTab === 0) {
      doFetchDataApprovalNew(loaderHandler, loadDataHandler, newDataHit).then(
        (response) => {
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            setDataApprovalNew(response.dataTable.map((val)=>{
              const down = val.penurunan.map(item => `${item}%`);
              return {
                ...val,
                harga: <TieringList array={val.harga} />,
                penurunan: <TieringList array={down} />
              };
            }));
          } else {
            setDataApprovalNew([]);
          }
        }
      );
    }
    if (valueTab === 1) {
      doFetchDataApprovalRenewal(
        loaderHandler,
        loadDataHandler,
        newDataHit
      ).then((response) => {
        // console.log(">>>> doFetchDataApprovalRenewal :", JSON.stringify(response));
        if (response) {
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
          setDataApprovalRenewal(response.dataTable.map((val)=>{
            return {
              ...val,
              harga: <TieringList array={val.harga} />
            };
          }));
        } else {
          setDataApprovalRenewal([]);
        }
      });
    }
    if (valueTab === 2) {
      doFetchDataApprovalReopen(loaderHandler, loadDataHandler, newDataHit).then(
        (response) => {
          // console.log(">>>> doFetchDataApprovalReopen :", JSON.stringify(response));
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            setDataApprovalReopen(response.dataTable.map((val)=>{
              const down = val.penurunan.map(item => `${item}%`);
              return {
                ...val,
                harga: <TieringList array={val.harga} />,
                penurunan: <TieringList array={down} />
              };
            }));
          } else {
            setDataApprovalReopen([]);
          }
        }
      );
    }
    if (valueTab === 3) {
      doFetchDataApprovalTermin(loaderHandler, loadDataHandler, newDataHit).then(
        (response) => {
          // console.log(">>>> doFetchDataApprovalTermin :", JSON.stringify(response));
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            setDataApprovalTermin(response.dataTable);
          } else {
            setDataApprovalTermin([]);
          }
        }
      );
    }
  }, [valueTab, dataHit, orderBy, orderDirection]);

  // handle for table selected items
  const handleGetSelectedItem = (selectedItems) => {
    // console.log("<<<<< CHECK PARENT : ", JSON.stringify(selectedItems));
    setSelectedItemTable(selectedItems);
  };

  // handle for table selected items by object
  const handleGetSelectedItemObj = (selected) => {
    // console.log("<<<<< CHECK PARENT : ", JSON.stringify(selected));
    setSelectedItemObjTable(selected);
  };

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
    setDataHit({
      ...dataHit,
      pageNumber: newPage,
    });
  }

  function handleFilterSubmit(value) {
    if (value === null) {
      setDataHit(defaultFilterData);
    } else {
      setDataHit({
        ...value,
        pageNumber: 0,
        dataPerPage: rowsPerPage,
        // ...(valueTab === 1 && { cagr: value.cagr }), // siapa tau cagr dimasukin lagi
      });
    }
  }

  function sorting(type, property){
    // console.log('~ type, property', type, property)
    if(property !== 'harga' && property !== 'penurunan'){
      let titleArr;
      switch(valueTab){
      case 0 : titleArr = titleTableNew; break;
      case 1 : titleArr = titleTableRenewal; break;
      case 2 : titleArr = titleTableReopen; break;
      case 3 : titleArr = titleTableTermin; break;
      default : titleArr = titleTableNew; break;
      }
      const index = titleArr.findIndex(({id})=>id===property);
      setOrderBy(titleArr[index].orderVarName);
      setOrderDirection(type);
    }
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
        <Grid item>
          {/* <ChkySearchBar placeholder="Search ... " width={290}/> */}
        </Grid>
      </Grid>
      <div className={classes.container}>
        <FilterApproval
          onFilterSubmit={handleFilterSubmit}
          valueTab={valueTab}
        />
        <Grid container direction="column" spacing={1}>
          <Grid item>
            {/* TABS */}
            <ContentTabs
              value={valueTab}
              onChange={handleChangeTab}
              aria-label="content tabs"
            >
              <ContentTab
                label="New"
                {...a11yProps(0)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Renewal"
                {...a11yProps(1)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Reopen"
                {...a11yProps(2)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Termin"
                {...a11yProps(3)}
                style={{ minWidth: 100 }}
              />
            </ContentTabs>
          </Grid>
          {/* TAB PANEL CONTENT */}
          <Grid item style={{ width: "-webkit-fill-available" }}>
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <TableCheckPagination
                data={dataApprovalNew}
                fields={titleTableNew}
                cellOption={valueTypeTableNew}
                onSelectedItems={handleGetSelectedItem}
                onSelectedItemsObj={handleGetSelectedItemObj}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isLoadData={isLoadData}
                leftAlignBody={[2]}
                resetPageCounter={resetPageCounter}
                sorting={sorting}
                isSort
                isWithApiSorting
                // isFirstColumnAlignLeft
              />
            </TabPanel>
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <TableCheckPagination
                data={dataApprovalRenewal}
                fields={titleTableRenewal}
                cellOption={valueTypeTableRenewal}
                onSelectedItems={handleGetSelectedItem}
                onSelectedItemsObj={handleGetSelectedItemObj}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isLoadData={isLoadData}
                leftAlignBody={[2]}
                resetPageCounter={resetPageCounter}
                sorting={sorting}
                isSort
                isWithApiSorting
              />
            </TabPanel>
            <TabPanel value={valueTab} index={2} className={classes.tabContent}>
              <TableCheckPagination
                data={dataApprovalReopen}
                fields={titleTableReopen}
                cellOption={valueTypeTableReopen}
                onSelectedItems={handleGetSelectedItem}
                onSelectedItemsObj={handleGetSelectedItemObj}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isLoadData={isLoadData}
                leftAlignBody={[2]}
                resetPageCounter={resetPageCounter}
                sorting={sorting}
                isSort
                isWithApiSorting
              />
            </TabPanel>
            <TabPanel value={valueTab} index={3} className={classes.tabContent}>
              <TableCheckPagination
                data={dataApprovalTermin}
                fields={titleTableTermin}
                cellOption={valueTypeTableTermin}
                onSelectedItems={handleGetSelectedItem}
                onSelectedItemsObj={handleGetSelectedItemObj}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                isLoadData={isLoadData}
                leftAlignBody={[2]}
                resetPageCounter={resetPageCounter}
                sorting={sorting}
                isSort
                isWithApiSorting
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      <Grid container justify="space-between" >
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
            onClick={handleOpenModalRejectAll}
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
            onClick={handleOpenModalApproveAll}
          >
            Approve All
          </Button>
        </Grid>
      </Grid>
      <div className={classes.containerPaper}>
        <Typography styl={{ fontSize: 24, fontWeight: 500 }}>
          Approver
        </Typography>
        <Grid container>
          <Grid item xs={4}>
            <ApprovalBy
              name="Deden Hidayat"
              jobTitle="ATM Site Management Head"
              initial="DH"
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
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
      <ModalApproveAll
        isOpen={openModalApproveAll}
        onClose={handleCloseModalApproveAll}
        selectedItems={selectedItemObjTable}
        tabValue={valueTab}
        loaderHandler={loaderHandler}
        userId={321}
        username={userFullName}
      />
      <ModalRejectAll
        isOpen={openModalRejectAll}
        onClose={handleCloseModalRejectAll}
        selectedItems={selectedItemObjTable}
        tabValue={valueTab}
        loaderHandler={loaderHandler}
        userId={321}
        username={userFullName}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(Approval))
);
