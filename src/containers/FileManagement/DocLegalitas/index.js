import { Grid, Typography, Tabs, Tab, Box, Button } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import Filter from "./common/Filter";
import Constants from "../../../helpers/constants";
import * as ThemeColor from "../../../assets/theme/colors";
import { useHistory } from "react-router-dom";
import { ChkyTablePagination } from "../../../components";
import LoadingView from "../../../components/Loading/LoadingView";
import { ChkySearchBar } from "../../../components";
import PopUpUpload from "./common/PopUpUpload";
import PopUpRemark from "./common/PopUpRemark";
import TableChips from "../../../components/Chips/TableChips";
import { ReactComponent as PaperClip } from "../../../assets/icons/general/paperclip_red.svg";
import { RootContext } from "../../../router";
import {
  doGetFileDocumentLegalityNew,
  doGetFileDocumentLegalityRenew,
  doGetFileDocumentLegalityTermin,
  doGetFileDocumentLegalityReplace,
} from "../serviceFileManagement";
import {
  TitleNew,
  columnNameVarNew,
  isSortNew,
  typeNew,
  TitleRenew,
  columnNameVarRenew,
  isSortRenew,
  typeReNew,
  TitleTermin,
  columnNameVarTermin,
  isSortTermin,
  typeTermin,
  TitleReplace,
  columnNameVarReplace,
  isSortReplace,
  typeReplace,
} from "./common/TableTemplate";

const UseStyles = makeStyles({
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
});

const defaultDataHit = {
  areaId: "All",
  cityId: "All",
  dataPerPage: 10,
  location: "",
  pageNumber: 0,
  status: "All",
  type: "All",
};

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/acknowledge/g) || [];

    if (result.length) {
      return result[0];
    }
    return value;
  }
};

function DocLegalitas(props) {
  const { userRoleName } = useContext(RootContext);
  const classes = UseStyles();
  const history = useHistory();
  const {
    location: { hash },
  } = history;
  // STATE LOADING
  const [isLoading, setIsLoading] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  //STATE INIT PAGE PAGINATION
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; //init rows per page
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  //STATE DATA
  const [dataNew, setDataNew] = useState([]);
  const [dataRenew, setDataRenew] = useState([]);
  const [dataTermin, setDataTermin] = useState([]);
  const [dataReplace, setDataReplace] = useState([]);
  //STATE FILTER
  const [type, setType] = useState("All");
  const [atmId, setAtmId] = useState("");
  const [status, setStatus] = useState("All");
  const [atmStatus, setAtmStatus] = useState("");
  const [valueSelectArea, setValueSelectArea] = useState("All");
  const [valueSelectCity, setValueSelectCity] = useState("All");
  const [location, setLocation] = useState("");
  const [selectedRow, setSelectedRow] = useState();
  const [filterTypeValue, setFilterTypeValue] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [orderDirection, setOrderDirection] = useState("ASC");
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [isOpenModalFileUpload, setIsOpenModalFileUpload] = useState(false);
  const [isOpenRemark, setIsOpenRemark] = useState(false);
  const [openingType, setOpeningType] = useState("New");

  const isAcknowledgeUser = matchRoleName(userRoleName) === "acknowledge";
  // CONTENT TABS
  const hashValues = ["new", "renew", "termin", "replace"];
  const index = hashValues.indexOf(hash.replace("#", ""));
  const tabValue = index >= 0 ? index : 0;
  const ContentTabs = withStyles({
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      "& > span": {
        width: "100%",
        backgroundColor: ThemeColor.PrimaryHard,
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
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{ padding: "24px 0px 0px 0px" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    history.push(`#${hashValues[newTabValue]}`);
    if (newTabValue === 0) {
      setOpeningType("New");
    } else if (newTabValue === 1) {
      setOpeningType("Renewal");
    } else if (newTabValue === 2) {
      setOpeningType("Termin");
    } else {
      setOpeningType("Replace");
    }
  };

  //END CONTENT TABS

  //initial loading handler
  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  //FUNCTION CHIP HANDLER
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
  //END CHIP HANDLER

  //FUNCTION HANDLING
  //handle change
  //FUNCTION HANDLE CHANGE PAGE
  function handleChangePage(newPage) {
    console.log(newPage);
    setCurrentPage(newPage + 1);
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  //HANDLE SORT OPEN
  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      const sortByNewVal = columnNameVarNew[TitleNew.indexOf(property)];
      const sortType = isActiveAndAsc ? "DESC" : "ASC";
      setOrderDirection(sortType);
      setSortBy(property);
      // setOrderBy(sortByNewVal);
      setDataRequest({
        ...dataRequest,
        orderDirection: sortType,
        orderBy: sortByNewVal,
      });
    };
  }
  //END HANDLE SORT OPEN

  // //handle sort
  // function handleSort(property) {
  //   return function actualFn(e) {
  //     const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
  //     const { titleArr, colNameArr } = sortArray[tabValue];
  //     const colNumber = titleArr.indexOf(property);
  //     const columnName = colNameArr[colNumber];
  //     setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
  //     setSortBy(property);
  //     setOrderBy(columnName);
  //     setCurrentPage(0);
  //   };
  // }

  const handleAcknowledge = async (id) => {
    setModalLoader(true);
    try {
      const payload = {
        id,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/documentLegalityAcknowledge`,
        payload
      );
      setTimeout(() => {
        alert("Sukses Acknowledge");
      });
      window.location.reload();
    } catch (e) {
      setModalLoader(false);
      setTimeout(() => {
        alert(`Internal Server Error`, e);
      }, 100);
    }
  };

  //close popup
  const handleCloseModalFileUpload = () => {
    setIsOpenModalFileUpload(false);
  };

  const handleCloseRemark = () => {
    setIsOpenRemark(false);
  };

  const handleRemarkUpload = () => {
    setIsOpenRemark(true);
    setIsOpenModalFileUpload(false);
  };

  const handleOpenModalUpload = () => {
    setIsOpenModalFileUpload(false);
  };

  const handleOpenModalDraftPKS = () => {
    setIsOpenModalFileUpload(false);
  };

  const handleOpenPopUp = (id, type, status, openType) => {
    setIsOpenModalFileUpload(true);
    setType(type);
    setAtmId(id);
    setStatus(status);
    setOpeningType(openType);
    setSelectedRow(id);
  };

  const handleOpenDetail = (type, id, atmId) => {
    history.push(`/file-management/doc-legalitas/${type}-${id}-${atmId}`);
  };

  const handleReset = () => {
    setDataRequest({
      ...defaultDataHit,
    });
  };

  const handleSubmitFilter = () => {
    setDataRequest({
      ...dataRequest,
      areaId: valueSelectArea,
      cityId: valueSelectCity,
      type: type,
      location: location,
      status: status,
    });
  };

  //fetching data NEW----------------------------->>>>>
  useEffect(() => {
    if (index === 0 || index === -1) {
      doGetFileDocumentLegalityNew(loadingHandler, dataRequest).then(
        (response) => {
          console.log(response);
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            const { content } = response;
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                idRequester: item.requestId,
                locationName: item.locationName,
                type: item.type,
                legalityTotal: `${item.legality}/${item.legalityTotal}`,
                draftPksTotal: `${item.draftPks}/${item.draftPksTotal}`,
                rentInvoiceTotal: `${item.rentInvoice}/${item.rentInvoiceTotal}`,
                bukpotTotal: `${item.bukpot}/${item.bukpotTotal}`,
                pksTotal: `${item.pks}/${item.pksTotal}`,
                suratIzinLandlordTotal: `${item.suratIzinLandlord}/${item.suratIzinLandlordTotal}`,
                status:
                  item.status === "Acknowledge" ? (
                    <TableChips
                      label="Acknowledge"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === "Incomplete" ? (
                    <TableChips
                      label="Incomplete"
                      type={chipsHandler("onprogress")}
                    />
                  ) : (
                    <TableChips label="Complete" type={chipsHandler("done")} />
                  ),
                action: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenPopUp(item.id, item.type, item.status, "New")
                    }
                  >
                    Document Legality
                  </Button>
                ),
                action1: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() => handleOpenDetail("new", item.id, item.atmId)}
                  >
                    SKPD Pajak
                  </Button>
                ),
              };
              dataRow.push(newRow);
            });
            setDataNew(dataRow);
          }
        }
      );
    }
    // -------------------------------------
    if (index === 1) {
      doGetFileDocumentLegalityRenew(loadingHandler, dataRequest).then(
        (response) => {
          console.log(response);
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            const { content } = response;
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                atmId: item.atmId,
                locationName: item.locationName,
                type: item.type,
                legalityTotal: `${item.legality}/${item.legalityTotal}`,
                draftPksTotal: `${item.draftPks}/${item.draftPksTotal}`,
                rentInvoiceTotal: `${item.rentInvoice}/${item.rentInvoiceTotal}`,
                bukpotTotal: `${item.bukpot}/${item.bukpotTotal}`,
                filling: `${item.filling}/${item.fillingTotal}`,
                status:
                  item.status === "Acknowledge" ? (
                    <TableChips
                      label="Acknowledge"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === "Incomplete" ? (
                    <TableChips
                      label="Incomplete"
                      type={chipsHandler("onprogress")}
                    />
                  ) : (
                    <TableChips label="Complete" type={chipsHandler("done")} />
                  ),
                action: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenPopUp(
                        item.id,
                        item.type,
                        item.status,
                        "Renewal"
                      )
                    }
                  >
                    Document Legality
                  </Button>
                ),
                action1: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenDetail("renew", item.id, item.atmId)
                    }
                  >
                    SKPD Pajak
                  </Button>
                ),
              };
              dataRow.push(newRow);
            });
            setDataRenew(dataRow);
          }
        }
      );
    }
    // --------------------------
    if (index === 2) {
      doGetFileDocumentLegalityTermin(loadingHandler, dataRequest).then(
        (response) => {
          console.log(response);
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            const { content } = response;
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                atmId: item.atmId,
                locationName: item.locationName,
                type: item.type,
                legalityTotal: `${item.legality}/${item.legalityTotal}`,
                pengakhiranSewaPKS: `${item.draftPks}/${item.draftPksTotal}`,
                suratIzinLandlordTotal: `${item.suratIzinLandlord}/${item.suratIzinLandlordTotal}`,
                securityDeposit: `${item.securityDeposit}/${item.securityDepositTotal}`,
                status:
                  item.status === "Acknowledge" ? (
                    <TableChips
                      label="Acknowledge"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === "Incomplete" ? (
                    <TableChips
                      label="Incomplete"
                      type={chipsHandler("onprogress")}
                    />
                  ) : (
                    <TableChips label="Complete" type={chipsHandler("done")} />
                  ),
                action: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenPopUp(item.id, item.type, item.status, "Termin")
                    }
                  >
                    Document Legality
                  </Button>
                ),
                action1: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenDetail("renew", item.id, item.atmId)
                    }
                  >
                    SKPD Pajak
                  </Button>
                ),
              };
              dataRow.push(newRow);
            });
            setDataTermin(dataRow);
          }
        }
      );
    }
    // --------------------
    if (index === 3) {
      doGetFileDocumentLegalityReplace(loadingHandler, dataRequest).then(
        (response) => {
          console.log(response);
          if (response) {
            setTotalPages(response.totalPages);
            setTotalRows(response.totalElements);
            const { content } = response;
            const dataRow = [];
            content.map((item) => {
              const newRow = {
                atmId: item.atmId,
                locationName: item.locationName,
                type: item.type,
                suratIzinLandlordTotal: `${item.suratIzinLandlord}/${item.suratIzinLandlordTotal}`,
                status:
                  item.status === "Acknowledge" ? (
                    <TableChips
                      label="Acknowledge"
                      type={chipsHandler("assigned")}
                    />
                  ) : item.status === "Incomplete" ? (
                    <TableChips
                      label="Incomplete"
                      type={chipsHandler("onprogress")}
                    />
                  ) : (
                    <TableChips label="Complete" type={chipsHandler("done")} />
                  ),
                action: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenPopUp(
                        item.id,
                        item.type,
                        item.status,
                        "Replace"
                      )
                    }
                  >
                    Document Legality
                  </Button>
                ),
                action1: (
                  <Button
                    style={{ color: "#DC241F", textTransform: "capitalize" }}
                    onClick={() =>
                      handleOpenDetail("renew", item.id, item.atmId)
                    }
                  >
                    SKPD Pajak
                  </Button>
                ),
              };
              dataRow.push(newRow);
            });
            setDataReplace(dataRow);
          }
        }
      );
    }
  }, [dataRequest, index]);
  //fetching data NEW----------------------------->>>>>

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Document & Legality</Typography>
        </Grid>
        {/* {index !== 0 && (
          <Grid item>
            <ChkySearchBar
              placeholder="Pencarian berdasarkan no document..."
              // onKeywordChange={handleKeyword}
              width={290}
            />
          </Grid>
        )} */}
      </Grid>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Filter
            openingType={openingType}
            valueSelectArea={valueSelectArea}
            setValueSelectArea={setValueSelectArea}
            valueSelectCity={valueSelectCity}
            setValueSelectCity={setValueSelectCity}
            type={type}
            setType={setType}
            status={status}
            setStatus={setStatus}
            onFilterSubmit={handleSubmitFilter}
            location={location}
            setLocation={setLocation}
            handleReset={handleReset}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentTabs
            value={tabValue}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <ContentTab label="New" {...a11yProps(0)} />
            <ContentTab label="Renew" {...a11yProps(1)} />
            <ContentTab label="Termin" {...a11yProps(2)} />
            <ContentTab label="Replace" {...a11yProps(3)} />
          </ContentTabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0}>
            <ChkyTablePagination
              data={dataNew}
              fields={TitleNew}
              cellOption={typeNew}
              isSort={isSortNew}
              totalPages={totalPages}
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              order={orderDirection}
              resetPageCounter={resetPageCounter}
              changePage={handleChangePage}
              handleSort={handleSort}
              sortBy={sortBy}
              isLoadData={isLoading}
              isUsingMuiSort
              outerPage={currentPage}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ChkyTablePagination
              data={dataRenew}
              fields={TitleRenew}
              cellOption={typeReNew}
              isSort={isSortRenew}
              totalPages={totalPages}
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              order={orderDirection}
              resetPageCounter={resetPageCounter}
              changePage={handleChangePage}
              handleSort={handleSort}
              sortBy={sortBy}
              isUsingMuiSort
              isLoadData={isLoading}
              outerPage={currentPage}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ChkyTablePagination
              data={dataTermin}
              fields={TitleTermin}
              cellOption={typeTermin}
              isSort={isSortTermin}
              totalPages={totalPages}
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              order={orderDirection}
              resetPageCounter={resetPageCounter}
              changePage={handleChangePage}
              handleSort={handleSort}
              sortBy={sortBy}
              isUsingMuiSort
              isLoadData={isLoading}
              outerPage={currentPage}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ChkyTablePagination
              data={dataReplace}
              fields={TitleReplace}
              cellOption={typeReplace}
              isSort={isSortReplace}
              totalPages={totalPages}
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              order={orderDirection}
              resetPageCounter={resetPageCounter}
              changePage={handleChangePage}
              handleSort={handleSort}
              sortBy={sortBy}
              isUsingMuiSort
              isLoadData={isLoading}
              outerPage={currentPage}
            />
          </TabPanel>
          {isOpenRemark && (
            <PopUpRemark
              isOpen={isOpenRemark}
              onClose={handleCloseRemark}
              onLeave={handleCloseRemark}
              rowToShow={selectedRow}
              type={openingType}
              rType="DOCUMENT_LEGALITY_REMARK"
            />
          )}
          <PopUpUpload
            isOpen={isOpenModalFileUpload}
            type={type}
            atmId={atmId}
            onClose={handleCloseModalFileUpload}
            onRemark={handleRemarkUpload}
            isAcknowledgeUser={isAcknowledgeUser}
            onUpload={handleOpenModalUpload}
            onDraftPKS={handleOpenModalDraftPKS}
            setModalLoader={setModalLoader}
            confirmAction={() => handleAcknowledge(atmId)}
            atmStatus={status}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default DocLegalitas;
