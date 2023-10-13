/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import React, { useEffect, useState, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { RootContext } from "../../../router";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import ModalLoader from "../../../components/ModalLoader";
import * as ThemeColor from "../../../assets/theme/colors";
import { ChkyTablePagination } from "../../../components";
import {
  doFetchOngoingNegotiation,
  doFetchApprovalNegotiation,
  doApproveNegotiation,
  doDeclineNegotiation,
} from "./ApiServiceNegotiation";
import FilterNegotiation from "./FilterNegotiation";
import useRupiahConverterSecondary from "../../../helpers/useRupiahConverterSecondary";
import { ReactComponent as DeclineIcon } from "../../../assets/images/xclose.svg";
import { ReactComponent as ApprIcon } from "../../../assets/images/check.svg";
import { ReactComponent as DetailIcon } from "../../../assets/images/arrow-right-red.svg";
import Constants from "../../../helpers/constants";
import { ContentTab, ContentTabs } from "../../../components/MaterialTabs";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  filterContainer: {
    marginBottom: 15,
  },
  tableContent: {
    marginTop: 20,
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
});

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStylesMore = makeStyles({
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: "#DC241F",
    },
  },
});
const ChildMoreNego = (props) => {
  const classes = useStylesMore();
  const { value } = props;
  const actionObject = value;

  // LOADER MODAL
  const [isOpenModalLoader, setModalLoader] = useState(false);
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }

  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function renderIconMenu(type) {
    if (type === "approve") {
      return <ApprIcon height={16} width={16} />;
    }
    if (type === "decline") {
      return <DeclineIcon height={16} width={16} />;
    }
    if (type === "detail") {
      return <DetailIcon height={16} width={16} />;
    }
    return <ApprIcon height={16} width={16} />;
  }

  function doService(which, dataHit) {
    if (which === "doApproveNegotiation") {
      // console.log(`doService: ${which}, dataHit: ${JSON.stringify(dataHit)}`);
      if (window.confirm("Are you sure want to Approve this negotiation?")) {
        doApproveNegotiation(loaderHandler, dataHit).then((response) => {
          // console.log(`doApproveNegotiation: ${JSON.stringify(response)}`);
          if (response.data.responseCode === "00") {
            if (window.confirm("Approve Negotiation Success, go to Procurement menu?")) {
              window.location.assign(`/procurement`);
            }else{
              window.location.reload();
            }
          } else {
            alert(
              `Error Approve Negotiation \n Message: ${response.data.responseMessage}`
            );
          }
        });
      }
    }
    if (which === "doDeclineNegotiation") {
      // console.log(`doService: ${which}, dataHit: ${JSON.stringify(dataHit)}`);
      if (window.confirm("Are you sure want to Decline this negotiation?")) {
        doDeclineNegotiation(loaderHandler, dataHit).then((response) => {
          // console.log(`doDeclineNegotiation: ${JSON.stringify(response)}`);
          if (response.data.responseCode === "00") {
            if (window.confirm("Decline Negotiation Success, Reload page?")) {
              window.location.reload();
            }
          } else {
            alert(
              `Error Approve Negotiation \n Message: ${response.data.responseMessage}`
            );
          }
        });
      }
    }
    if (which === "doDetailNegotiation") {
      window.location.assign(`/negotiation/detail/${dataHit.id}`);
    }
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: "#DC241F" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {actionObject.map((item) => {
          return (
            <MenuItem
              onClick={() => {
                doService(item.doService, item.dataHit);
              }}
              className={classes.menuMoreItem}
            >
              {
                item.type==='detail' ? 
                  <Typography style={{ fontSize: 13, color:'#DC241F'}}>{item.name}</Typography>
                  :
                  <Typography style={{ fontSize: 13 }}>{item.name}</Typography>
              }
              <div>{renderIconMenu(item.type)}</div>
            </MenuItem>
          );
        })}
      </Menu>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};
ChildMoreNego.propTypes = {
  value: PropTypes.string.isRequired,
};

const rowsPerPage = 10; // <--- init default rowsPerPage

const defaultDataHit = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  areaId: "All",
  picSiteId: "All",
  type: 'All',
  status: "All",
  requester: 'All',
  location: "",
}

const defaultDataHitApproval = {
  pageNumber: 0,
  dataPerPage: rowsPerPage,
  areaId: "All",
  picSiteId: "All",
  type: 'All',
  locationType: "All",
  requester: 'All',
  location: "",
}

function Negotiations() {
  const classes = useStyles();
  const history = useHistory();
  // GET USER ID
  const { userId, userRoleName} = useContext(RootContext);
  const [valueTab, setValueTab] = useState(0);
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // CHECK USER ROLE
  const roleToLower = userRoleName.toLowerCase();

  useEffect(() => {
    console.log('~ roleToLower', roleToLower)
  }, [roleToLower])

  const isRoleApproval = (role) => {
    console.log('??? role', role); 
    let result = false;
    if (role === "tim approval negotiation"){
      result = true;
    }
    console.log('??? result', result); 

    return result;
  };

  const handleChangeTab = (event, newValueTab) => {
    // Inject Hash
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "ongoing";
    }
    if (newValueTab === 1) {
      hashTab = "approval";
    }
    history.push(`#${hashTab}`);
  };

  // check url hash
  const windowsHash = window.location.hash;
  useEffect(() => {
    // console.log(">>> HASH: ",windowsHash);
    setOrderBy(null)
    setOrderDirection('ASC')
    setSortBy(null)
    switch (windowsHash) {
      case "#ongoing":
        setValueTab(0);
        break;
      case "#approval":
        // console.log(">>> HASH: ",windowsHash);
        setValueTab(1);
        break;
      default:
        setValueTab(0);
    }
  }, [windowsHash]);
  // LOADER MODAL
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // LOADER LOAD DATA
  const [isLoadData, setIsLoadData] = useState(true);
  // set handler loader when call Approval API Service
  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const [dataNego, setDataNego] = useState([]);

  const [dataTableApproval, setDataTableApproval] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const [dataHit, setDataHit] = useState(defaultDataHit);

  const [dataHitApproval, setDataHitApproval] = useState(defaultDataHitApproval);

  const titleTable = [
    // 'Location Id',
    "Nama Lokasi",
    "Status",
    "Location Type",
    "Harga Penawaran",
    "Harga Kesepakatan",
    "Type",
    "Requester",
    "",
  ];
  const valueType = [
    //   'string',
    "string",
    "status_nego",
    "string",
    "harga_nego",
    "harga_nego",
    "string",
    "string",
    "url",
  ];

  const titleTableApproval = [
    "ATM ID",
    "ID Requester",
    "Nama Lokasi",
    "Location Type",
    "Type",
    "Harga Penawaran",
    "Harga Final",
    "Tanggal Kesepakatan",
    "Requester",
    "Action",
  ];

  const valueTypeApproval = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "harga_nego",
    "harga_nego",
    "string",
    "string",
    "child",
  ];
  
  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }
  // do fetch / hit api when value tab changed
  useEffect(() => {
    // reset dataApproval to empty array
    const newDataHit = {
      pageNumber: dataHit.pageNumber,
      dataPerPage: dataHit.dataPerPage,
      negotiationStatus: dataHit.status,
      areaId: dataHit.areaId,
      picSiteId: dataHit.picSiteId,
      ...(dataHit.type !== 'All' && {type: dataHit.type,}),
      requester: dataHit.requester,
      location: dataHit.location,
      ...(orderBy && {orderBy, orderDirection})
    };
    const approvalDataHit = {
      pageNumber: dataHitApproval.pageNumber,
      dataPerPage: dataHitApproval.dataPerPage,
      locationType: dataHitApproval.locationType,
      areaId: dataHitApproval.areaId,
      picSiteId: dataHitApproval.picSiteId,
      ...(dataHitApproval.type !== 'All' && {type: dataHitApproval.type,}),
      requester: dataHitApproval.requester,
      location: dataHitApproval.location,
      ...(orderBy && {orderBy, orderDirection})
    };
    setDataNego([]);
    setDataTableApproval([]);
    if (valueTab === 0) {
      doFetchOngoingNegotiation(
        loaderHandler,
        loadDataHandler,
        newDataHit
      ).then((response) => {
        // console.log(
        //   ">>>> doFetchOngoingNegotiation :",
        //   JSON.stringify(response)
        // );
        if (response) {
          setTotalPages(response.totalPages);
          setTotalRows(response.totalElements);
          setDataNego(response.dataTable);
        } else {
          setDataNego([]);
        }
      });
    }
    if (valueTab === 1) {
      doFetchApprovalNegotiation(
        loaderHandler,
        loadDataHandler,
        approvalDataHit
      ).then((response) => {
        // console.log(
        //   ">>>> doFetchApprovalNegotiation :",
        //   JSON.stringify(response)
        // );
        if (response) {
          loaderHandler(true);
          // reconstruct data from DB
          let dataPage = {};
          const dataToSet = [];
          try {
            // reconstruct data from DB
            const dataPre = response.data.content;
            dataPage = {
              totalPages: response.data.totalPages,
              totalElements: response.data.totalElements,
            };
            dataPre.map((row) => {
              const actionData = [
                {
                  name: "Approve",
                  doService: "doApproveNegotiation",
                  type: "approve",
                  dataHit: {
                    id: row.id,
                    userId,
                    locationId: row.locationId,
                  },
                },
                {
                  name: "Decline",
                  doService: "doDeclineNegotiation",
                  type: "decline",
                  dataHit: {
                    id: row.id,
                    userId,
                    locationId: row.locationId,
                  },
                },
                {
                  name: "Detail",
                  doService: "doDetailNegotiation",
                  type: "detail",
                  dataHit: {
                    id: row.id,
                    userId,
                    locationId: row.locationId,
                  },
                },
              ];
              const newRow = {
                atmId: row.openingType == 'New ATM' || row.openingType == 'Reopen' ? '-' : row.atmId,
                locationId: row.locationId,
                locationName: row.newLocation,
                locationType: row.locationtype,
                type: row.openingType,
                yearlyRentCost: {flatCost: false, costList:row.yearlyRentCostList},
                negotiationDealCost: { flatCost: false, costList: row.negotiationDealCostList},
                submitDealDate: moment(new Date(row.submitDealDate)).format(
                  "DD-MM-YYYY"
                ),
                requester: row.requester,
                action: <ChildMoreNego value={actionData} />,
              };
              dataToSet.push(newRow);
            });
          } catch {
            loaderHandler(false);
            alert(`Error Re-Construct Data Approval New...!`);
          }
          setTotalPages(dataPage.totalPages);
          setTotalRows(dataPage.totalElements);
          setDataTableApproval(dataToSet);
          loaderHandler(false);
        } else {
          setDataTableApproval([]);
        }
      });
    }
  }, [valueTab, dataHit, dataHitApproval, orderBy, orderDirection]);

  function handleChangePageValue(newPage) {
    setDataHit({
      ...dataHit,
      pageNumber: newPage,
    });
  };

  function handleChangePageValueApproval(newPage) {
    setDataHitApproval({
      ...dataHitApproval,
      pageNumber: newPage,
    });
  }

  function handleFilterSubmit(value) {
    // console.log(">>>>> FILTER DATA: ", JSON.stringify(value));\
    setResetPageCounter(prevCount => prevCount+1);
    if (value === null) {
      setDataHit(defaultDataHit);
      setDataHitApproval(defaultDataHitApproval);
    } else {
      setDataHit({
        ...dataHit,
        pageNumber: 0,
        ...value
      });
      setDataHitApproval({
        ...dataHitApproval,
        pageNumber: 0,
        ...value
      });
    }
  }

  useEffect(() => {
    // console.log("<< Data Nego", JSON.stringify(dataNego));
  }, [dataNego]);

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      const colNameVarArr = valueTab ? columnNameVarApproval : columnNameVar
      const titles = valueTab ? titleTableApproval : titleTable
      setOrderBy(colNameVarArr[titles.indexOf(property)]);
    };
  }

  return (
    <div className={classes.root}>
      {valueTab === 0 ? (
        <Typography className={classes.title}>Negotiation</Typography>
      ) : (
        <Typography className={classes.title}>Negotiation Approval</Typography>
      )}
      <Grid container justify="space-between" style={{ padding: "0 0 25px 0" }}>
        <Grid>
          <ContentTabs
            value={valueTab}
            onChange={handleChangeTab}
            aria-label="simple tabs example"
          >
            <ContentTab label="Ongoing" {...a11yProps(0)} />
            {isRoleApproval(roleToLower) && <ContentTab label="Approval" {...a11yProps(1)} />}
          </ContentTabs>
        </Grid>
        <Grid />
      </Grid>
      <div className={classes.container}>
        <div className={classes.filterContainer}>
          <FilterNegotiation onFilterSubmit={handleFilterSubmit} currentTab={valueTab}/>
        </div>

        <TabPanel value={valueTab} index={0} className={classes.tabContent}>
          <div className={classes.tableContent}>
            <ChkyTablePagination
              data={dataNego}
              fields={titleTable}
              cellOption={valueType}
              changePage={handleChangePageValue}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoadData}
              leftAlignBody={[0]}
              resetPageCounter={resetPageCounter}
              isSort={isSort}
              isUsingMuiSort={true}
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
            />
          </div>
        </TabPanel>

        <TabPanel value={valueTab} index={1} className={classes.tabContent}>
          <div className={classes.tableContent}>
            <ChkyTablePagination
              data={dataTableApproval}
              fields={titleTableApproval}
              cellOption={valueTypeApproval}
              changePage={handleChangePageValueApproval}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              isLoadData={isLoadData}
              leftAlignBody={[2]}
              resetPageCounter={resetPageCounter}
              isSort={isSortApproval}
              isUsingMuiSort={true}
              handleSort={handleSort}
              sortBy={sortBy}
              order={orderDirection}
            />
          </div>
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(Negotiations))
);

const columnNameVar = [
  'newLocation',
  'negotiationStatus',
  'locationType',
  '',
  '',
  'openingType',
  'requester',
]

const columnNameVarApproval = [
  'atmId',
  'locationId',
  'newLocation',
  'locationtype',
  'openingType',
  '',
  '',
  'submitDealDate',
  'requester',
]

const isSort = [true, true, true, false, false, true, true,];
const isSortApproval = [true, true, true, true, true, false, false, true, true,];