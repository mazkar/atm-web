/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import constansts from "../../../helpers/constants";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import { ChkyTablePagination } from "../../../components/chky";
import ModalLoader from "../../../components/ModalLoader";
import FilterRbb from "./FilterRBB";
import ModalUpload from "./ModalRemark";
import AddButton from "../../../components/Button/AddButton";
import ModalRemark from "../../../components/Modal/ModalRemark";
import ModalDraftRenewal from "../../../components/Modal/ModalDraftRenewal";
import OverviewPanel from "./tabpanels/OverviewPanel";
import ContentTab from "./components/ContentTab";
import ContentTabs from "./components/ContentTabs";
import TabPanel from "./components/TabPanel";
import ModalAddUnplanRenewal from "./ModalAddUnplanRenewal";
import ReplacePanel from './tabpanels/ReplacePanel';
import UnplanReplacePanel from './tabpanels/UnplanReplacePanel';
import { createContext } from 'react';
import RenewalPanel from './tabpanels/RenewalPanel';
import TerminPanel from './tabpanels/TerminPanel';

const useStyles = makeStyles({
  root: {
    background: "#F4F7FB",
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
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
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },
});

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

export const RbbImpCtx = createContext()
const { Provider } = RbbImpCtx

const RbbImplementation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);
  const [isLoadData, setIsLoadData] = useState(true);
  // const {userSignature} = useContext(RootContext);

  // handle Tab Change
  const handleChangeTab = (event, newValueTab) => {
    let hashTab = "";
    setCurrentPage(0);
    if (newValueTab === 0) {
      hashTab = "Overview";
    }
    if (newValueTab === 1) {
      hashTab = "NewATM";
    }
    if (newValueTab === 2) {
      hashTab = "Renewal";
    }
    if (newValueTab === 3) {
      hashTab = "Termin";
    }
    if (newValueTab === 4) {
      hashTab = "Replace";
    }
    if (newValueTab === 5) {
      hashTab = "UnplanTermin";
    }
    if (newValueTab === 6) {
      hashTab = "UnplanRenewal";
    }
    if (newValueTab === 7) {
      hashTab = "UnplanReplace";
    }
    history.push(`#${hashTab}`);
  };
  // Detec Hash for Open Tab Directly
  const hash = window.location.hash;
  useEffect(() => {
    if (hash.length > 0) {
      setOrderBy(null)
      setSortBy(null)
      setOrderDirection('ASC')
      if (hash === "#Overview") {
        setValueTab(0);
      } else if (hash === "#NewATM") {
        setValueTab(1);
      } else if (hash === "#Renewal") {
        setValueTab(2);
      } else if (hash === "#Termin") {
        setValueTab(3);
      } else if (hash === "#Replace") {
        setValueTab(4);
      } else if (hash === "#UnplanTermin") {
        setValueTab(5);
      } else if (hash === "#UnplanRenewal") {
        setValueTab(6);
      } else if (hash === "#UnplanReplace") {
        setValueTab(7);
      }
    }
  }, [hash]);
  // End handle tab

  const [filterData, setFilterData] = useState([
    { areaName: "All", city: "All" },
  ]);
  const [selectedRow, setSelectedRow] = useState("");

  const [selectedIdSite, setSelectedIdSite] = useState("");

  const [OpenModalUploadNew, setOpenModalUploadNew] = useState(false);
  const [openModalAddUnplanRenewal, setOpenModalAddUnplanRenewal] = useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);
  
  // MODAL REMARK
  const [openModalRemark, setOpenModalRemark] = useState(false);
  const handleCloseModalRemark = () => setOpenModalRemark(false);

  const handleAjukanTerm = (data) => {
    // console.log("ke klik");
    if (!data.isDisable) {
      try {
        // console.log("ajukan termin lolos IF");
        setModalLoader2(true);
        const req = { id: data.id };
        // const req = { id: 549 };
        const config = {
          headers: {
            "Content-Type": "application/json;;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        };
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitTermination`,
            req,
            config
          )
          .then((res) => {
            // console.log("response ajukan termin", res.data);
            if (res.status == 200) {
              setModalLoader2(false);
              if (res.data.statusCode == 200) {
                alert("Successfully submitted Termin");
              } else {
                alert(res.data.message);
              }
              // alert("SUKSES AJUKAN TERMIN");
              // alert(res.data.message);
              window.location.reload();
            } else {
              setModalLoader2(false);
              alert("Failed to submit Termin");
            }
          })
          .catch((err) => {
            alert(err);
            setModalLoader2(false);
          });
      } catch (err) {
        // console.log(`Error Fetching Renewal Atm Data...! \n${err}`);
        setModalLoader2(false);
      }
    }
  };
  // END CLOSE Kerjasama

  // DRAFT Renewal Perpanjangan
  const [openModalCreateDraftRenew, setOpenModalCreateDraftRenew] = useState(
    false
  );
  const handleOpenModalCreateDraftRenew = () =>
    setOpenModalCreateDraftRenew(true);
  const handleCloseModalCreateDraftRenew = () =>
    setOpenModalCreateDraftRenew(false);
  const handleCreateDraftRenew = (data) => {
    if (!data.isDisable) {
      setSelectedIdSite(data.idSite);
      setSelectedRow(data.id);
      handleOpenModalCreateDraftRenew();
    }
  };
  // End Draft Renewal

  const handleDetail = (val) => {
    // console.log('~ val', val)
    const status = val.id === "6" ? "6s" : val.id;
    const idRow = val.row;
    const tabAsal = val.tabAsal;
    const atmId = val.atmId;
    if (tabAsal) {
      detailButtonAction(status, idRow, tabAsal, atmId);
    } else if (status == null) {
      alert("No progress");
    } else {
      detailButtonAction(status, idRow, undefined, atmId);
    }
  };

  function detailButtonAction(status, idRow, tabAsal, atmId) {
    // console.log('~ id', id)
    // console.log('~ status', status)
    // console.log('+++ tabAsal', tabAsal);
    // console.log(`+++ status : ${status}, idRow : ${idRow}, tabAsal : ${tabAsal}, atmId : ${atmId}`);

    if (status == 1) {
      if (tabAsal === "renewal") {
        // console.log(`+++ GO TO Trend analisa 1 atmId: ${atmId}`);
        goTo.push(`/trend-analisa/detail/${atmId}`);
      }
      goTo.push("/acquisition#savedlocation");
    } else if (status == 2) {
      if (tabAsal === "renewal") {
        // console.log(`+++ GO TO Trend analisa 2 atmId: ${atmId}`);
        goTo.push(`/trend-analisa/detail/${atmId}`);
      }
      goTo.push("/acquisition/profiling");
    } else if (status == 3) {
      goTo.push(`/negotiation/detail/${idRow}`);
    } else if (status == 4) {
      goTo.push(`/procurement/detail#${idRow}`);
    } else if (status == 5) {
      goTo.push(`/approval/detail/${idRow}`);
    } else if (status == 6) {
      goTo.push("/submission-tracking");
    } else if (status == "6s" || status == 14) {
      goTo.push(`/site-management/document-legality#${tabAsal}`);
    } else if (status == 12) {
      goTo.push("/implementation");
    } else if (status == 99) {
      goTo.push(`/site-management/document-legality/detail/${idRow}`);
    } else if (!status) {
      // console.log(`+++ GO TO Trend analisa null atmId: ${atmId}`);
      goTo.push(`/trend-analisa/detail/${atmId}`);
    } else {
      // alert("Tidak ada progress");
    }
  }

  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader2, setModalLoader2] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const rowsPerPage = 10; // <--- init default rowsPerPage
  // [1]getDataNewRBB
  const [dataNewRBB, setDataNewRBB] = useState([]); // <--- init dataNewRBB array
  const [dataUnplanAtm, setDataUnplanAtm] = useState([]); /// / <--- init dataUnplanRBB array
  const [dataUnplanRenewalAtm, setDataUnplanRenewalAtm] = useState([]); 

  const [orderDirection, setOrderDirection] = useState('ASC');
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const goTo = useHistory();

  function clickDetail(val) {
    // console.log("clickDetail", val);
    if (val) {
      //if (val.step) {
      if (val.id) {
        //const status = val.step;
        const status = val.id
        detailButtonAction(status, val.value, "new");
      }
    }
    // alert("Tidak ada progress");
  }

  const dateConverter = (tanggal) => {
    const dateNya = moment(new Date(tanggal)).format("DD/MM/YYYY");
    return dateNya;
  };

  useEffect(() => {
    const newData = [];
    const unplanData = [];
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const {picSiteId, progress, machine, model, areaName, city} = filterData
    const dataHitNew = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      areaId: areaName || "All",
      picSiteId,
      status: progress,
      mesin: machine,
      cityId: city || "All",
      ...(orderBy && {orderBy, orderDirection})
    };
    const dataHitTermin = {
      pageNumber: currentPage,
      dataPerPage: rowsPerPage,
      ...(areaName && areaName !== "All" && { areaId: areaName }),
      ...(city && city !== "All" && { cityId: city }),
      picSiteId,
      status: progress,
      model,
      ...(orderBy && {orderBy, orderDirection})
    };
    // console.log("Cek data New", dataHitNew);
    if (valueTab === 1) {
      try {
        setIsLoadData(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getNewRbbImplementation`,
            dataHitNew,
            headers
          )
          .then((res) => {
            try {
              const dataPre = res.data.content;
              setTotalPages(res.data.totalPages);
              setTotalRows(res.data.totalElements);

              dataPre.map((row) => {
                const actionDetailsNewATM = [
                  {
                    name: "Detail",
                    id: row.status,
                    funct: clickDetail,
                    value: row.id,
                    step: row.status,
                    isDisable: row.idSite ? false : true,
                    tabAsal: "new",
                  },
                ];
                const newRow = {
                  locationId: row.locationId,
                  atmId: row.atmId,
                  newCity: row.newCity,
                  areaName: row.area,
                  model: row.modelTeam,
                  newLocation: row.newLocation,
                  submissionDate:
                    row.submissionDate === null
                      ? "-"
                      : dateConverter(row.submissionDate), // ini tgl submision
                  machineType: row.machineType,
                  progress: row.status,
                  lastUpdate:
                    row.lastUpdate === null
                      ? "-"
                      : dateConverter(row.lastUpdate), // ini tgl online
                  onlineDate:
                    row.onlineDate === null
                      ? "-"
                      : dateConverter(row.onlineDate), // ini tgl profiling
                  remark: row.remark,
                  actionDetailsNewATM,
                  // action: actionData,
                };
                newData.push(newRow);
              });
            } catch {
              alert(`Error Re-Construct Data New Atm Implementation...!`);
              setIsLoadData(false);
            }
            // console.log("newData", newData);
            setDataNewRBB(newData);
            setIsLoadData(false);
          })
          .catch((err) => {
            alert(err);
            setIsLoadData(false);
          });
      } catch (err) {
        alert(`Error Fetching New Atm Data...! \n${err}`);
        setIsLoadData(false);
      }
    } else if (valueTab === 5) {
      try {
        setIsLoadData(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/unplanTerminRbbImpl`,
            dataHitTermin,
            headers
          )
          .then((res) => {
            try {
              const dataPre = res.data.content;
              // console.log("ini datapre", dataPre);
              setTotalPages(res.data.totalPages);
              setTotalRows(res.data.totalElements);

              dataPre.map((row) => {
                const actionAjukanUnplan = [
                  {
                    name: "Ajukan Terminisasi",
                    id: row.id,
                    funct: handleAjukanTerm,
                    isDisable: row.status
                      ? true
                      : !row.isApproval
                        ? true
                        : false,
                    isApprove: row.isApproval,
                    status: row.status,
                  },
                ];
                const actionDetailsUnplan = [
                  {
                    name: "Detail",
                    id: row.status,
                    funct: handleDetail,
                    row: row.idSite,
                    atmId: row.atmId,
                    isDisable:
                      row.isApproval == 1 || row.status == "5" ? false : true,
                    tabAsal: "termin",
                  },
                ];

                const newRow = {
                  atmId: row.atmId,
                  areaName: row.areaName,
                  newLocation: row.locationName,
                  deadLine:
                    row.rentRemaining === null ? "-" : row.rentRemaining,
                  dueDate:
                    row.dueDate === null ? "-" : dateConverter(row.dueDate),
                  lastStatus: row.status,
                  model: row.modelFinal,
                  actionAjukanUnplan,
                  remarks: row.remark,
                  actionDetailsUnplan,
                };
                unplanData.push(newRow);
              });
            } catch {
              alert(`Error Re-Construct Data Unplan Atm Implementation...!`);
              setIsLoadData(false);
            }
            setDataUnplanAtm(unplanData);
            setIsLoadData(false);
          })
          .catch((err) => {
            alert(err);
            setIsLoadData(false);
          });
      } catch (err) {
        alert(`Error Fetching Unplan Atm Data...! \n${err}`);
        setIsLoadData(false);
      }
    } else if (valueTab === 6) {
      // alert("UnplanRenewal")
      try {
        setIsLoadData(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/unplanRenewalRbbImpl`,
            dataHitTermin,
            headers
          )
          .then((res) => {
            try {
              const dataPre = res.data.content;
              // console.log(">>> ini datapre", dataPre);
              setTotalPages(res.data.totalPages);
              setTotalRows(res.data.totalElements);

              dataPre.map((row) => {
                const actionActionSurat = [
                  {
                    name: "Surat Perpanjangan",
                    id: row.id,
                    idSite: row.idSite,
                    funct: handleCreateDraftRenew,
                    isDisable: !(row.isApproval == 1 && row.status * 1 < 3),
                    // status: row.lastStatus
                    status: row.status,
                  },
                ];
                const actionDetailsUnplan = [
                  {
                    name: "Detail",
                    id: row.status,
                    funct: handleDetail,
                    row: row.idSite,
                    atmId: row.atmId,
                    isDisable:
                      row.isApproval == 1 || row.status == "5" ? false : true,
                    tabAsal: "termin",
                  },
                ];

                const newRow = {
                  atmId: row.atmId,
                  areaName: row.areaName,
                  newLocation: row.locationName,
                  deadLine:
                    row.rentRemaining === null ? "-" : row.rentRemaining,
                  dueDate:
                    row.dueDate === null ? "-" : dateConverter(row.dueDate),
                  lastStatus: row.status,
                  model: row.modelFinal,
                  actionActionSurat,
                  remarks: row.remark,
                  actionDetailsUnplan,
                };
                unplanData.push(newRow);
              });
            } catch {
              alert(`Error Re-Construct Data Unplan Atm Implementation...!`);
              setIsLoadData(false);
            }
            setDataUnplanRenewalAtm(unplanData);
            setIsLoadData(false);
          })
          .catch((err) => {
            alert(err);
            setIsLoadData(false);
          });
      } catch (err) {
        alert(`Error Fetching Unplan Atm Data...! \n${err}`);
        setIsLoadData(false);
      }
    }
  }, [
    filterData.areaName,
    filterData.city,
    filterData.picSiteId,
    filterData.progress,
    filterData.machine,
    filterData.model,
    valueTab,
    currentPage,
    orderDirection,
    orderBy
  ]);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  function handleFilter(newValue) {
    setFilterData(newValue);
    setCurrentPage(0);
    setResetPageCounter((prevCount) => prevCount + 1);
  }

  const renderAddButton = () => {
    if(valueTab === 5 || valueTab === 6 || valueTab === 7){
      return <AddButton
        style={{ marginBottom: 20, width: 140, height: 40, right: 0 }}
        label="Add New"
        iconPosition="startIcon"
        onClick={() => {
          if(valueTab === 5) {
            handleOpenModalUploadNew();
          } else if(valueTab === 6 || valueTab === 7){
            setOpenModalAddUnplanRenewal(true);  
          }
        }}
      />;
    }
    return null;
  };

  function handleSort(property) {
    return function actualFn(e) {
      const isActiveAndAsc = sortBy === property && orderDirection === 'ASC';
      const {titleArr, colNameArr} = sortArray[valueTab]
      const colNumber = titleArr.indexOf(property)
      const columnName = colNameArr[colNumber]
      setOrderDirection(isActiveAndAsc ? 'DESC' : 'ASC');
      setSortBy(property);
      setOrderBy(columnName);
      setCurrentPage(0);
      setResetPageCounter((prevCount) => prevCount + 1);
    };
  }

  return (
    <Provider value={{redirectFn: detailButtonAction}}>
      <div className={classes.root}>
        <Grid
          container
          justify="space-between"
          className={classes.titleContainer}
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.title}>RBB Implementation</Typography>
          </Grid>
        </Grid>
        <div className={classes.container}>
          <Grid container justify="space-between">
            <Grid style={{ paddingBottom: 15 }}>
              <ContentTabs
                value={valueTab}
                onChange={handleChangeTab}
                aria-label="content tabs"
                variant="scrollable"
              >
                <ContentTab label="Overview" {...a11yProps(0)} />
                <ContentTab label="New ATM" {...a11yProps(1)} />
                <ContentTab label="Renewal" {...a11yProps(2)} />
                <ContentTab label="Termin" {...a11yProps(3)} />
                <ContentTab label="Replace" {...a11yProps(4)} />
                <ContentTab label="Unplan Termin" {...a11yProps(5)} />
                <ContentTab label="Unplan Renewal" {...a11yProps(6)} />
                <ContentTab label="Unplan Replace" {...a11yProps(7)} />
              </ContentTabs>
            </Grid>
            <Grid>
              <div style={{ justifyContent: "flex-end" }}>
                {renderAddButton()}
              </div>
            </Grid>
          </Grid>
          <TabPanel value={valueTab} index={0}>
            <OverviewPanel />
          </TabPanel>
          <TabPanel value={valueTab} index={1}>
            <div className={classes.container}>
              <div className={classes.filterContainer}>
                <FilterRbb onFilterSubmit={handleFilter} showProgress showMachine showPicSite type="New" />
              </div>
              <div className={classes.tableContent}>
                <ChkyTablePagination
                  data={dataNewRBB}
                  fields={titleTableNew}
                  cellOption={valueTypeNew}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  totalRows={totalRows}
                  isLoadData={isLoadData}
                  changePage={handleChangePageValue}
                  resetPageCounter={resetPageCounter}
                  isSort={isSortNew}
                  isUsingMuiSort={true}
                  handleSort={handleSort}
                  sortBy={sortBy}
                  order={orderDirection}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueTab} index={2}>
            <RenewalPanel />
          </TabPanel>
          <TabPanel value={valueTab} index={3}>
            <TerminPanel />
          </TabPanel>
          <TabPanel value={valueTab} index={4}>
            <ReplacePanel />
          </TabPanel>
          <TabPanel value={valueTab} index={5}>
            <div className={classes.container}>
              <div className={classes.filterContainer}>
                <FilterRbb
                  onFilterSubmit={handleFilter}
                  type="Termin"
                  showPicSite
                  showProgress
                  showModel
                />
              </div>
              <div className={classes.tableContent}>
                <ChkyTablePagination
                  fields={titleTableUnplan}
                  data={dataUnplanAtm}
                  cellOption={valueTypeUnplan}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  totalRows={totalRows}
                  isLoadData={isLoadData}
                  changePage={handleChangePageValue}
                  leftAlignBody={[2]}
                  resetPageCounter={resetPageCounter}
                  isSort={isSortUnplanTermin}
                  isUsingMuiSort={true}
                  handleSort={handleSort}
                  sortBy={sortBy}
                  order={orderDirection}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueTab} index={6}>
            <div className={classes.container}>
              <div className={classes.filterContainer}>
                <FilterRbb
                  onFilterSubmit={handleFilter}
                  showPicSite
                  showProgress
                  showModel
                  type="Renewal"
                />
              </div>
              <div className={classes.tableContent}>
                <ChkyTablePagination
                  fields={titleTableUnplan}
                  data={dataUnplanRenewalAtm}
                  cellOption={valueTypeUnplan}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  totalRows={totalRows}
                  isLoadData={isLoadData}
                  changePage={handleChangePageValue}
                  leftAlignBody={[2]}
                  resetPageCounter={resetPageCounter}
                  isSort={isSortUnplanRenewal}
                  isUsingMuiSort={true}
                  handleSort={handleSort}
                  sortBy={sortBy}
                  order={orderDirection}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={valueTab} index={7}>
            <UnplanReplacePanel />
          </TabPanel>
        </div>
        {/* <FloatingChat /> */}
        <ModalRemark
          isOpen={openModalRemark}
          onClose={handleCloseModalRemark}
          onLeave={() => {
            handleCloseModalRemark();
          }}
          rowToShow={selectedRow}
        />
        <ModalDraftRenewal
          // Surat Perpanjangan
          rowToShow={selectedRow}
          siteId={selectedRow} //  selectedIdSite
          isOpen={openModalCreateDraftRenew}
          onClose={handleCloseModalCreateDraftRenew}
          onLeave={() => {
            handleCloseModalCreateDraftRenew();
          }}
        />
        <ModalLoader isOpen={isOpenModalLoader2} />
        <ModalUpload
          isOpen={OpenModalUploadNew}
          onClose={handleCloseModalUploadNew}
          onLeave={() => {
            handleCloseModalUploadNew();
          }}
        />
        <ModalAddUnplanRenewal
          isOpen={openModalAddUnplanRenewal}
          onClose={()=>setOpenModalAddUnplanRenewal(false)}
          onLeave={()=>setOpenModalAddUnplanRenewal(false)}
          tabValue={valueTab}
        />
      </div>
    </Provider>
  );
};
    

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(RbbImplementation))
);

// [1]getDataNew
const titleTableNew = [
  "ID Requester",
  "ID ATM",
  "City",
  "Area",
  "Propose Model",
  "New Location",
  "Tgl Submission",
  "Mesin",
  "Progress",
  "Last Update",
  "Tgl Online",
  "Remark",
  "Action",
];
const valueTypeNew = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "statusRbb_Implementation",
  "string",
  "string",
  "string",
  "modal_RBB",
];

// [4]getDataUnplan
const titleTableUnplan = [
  "ATM ID",
  "Area",
  "Location",
  "Habis Masa Sewa",
  "Tgl Jatuh Tempo",
  "Status Terakhir",
  "Model",
  "",
  // '',
  "Remark",
  "Action",
];
const valueTypeUnplan = [
  "string",
  "string",
  "string",
  "status_expire",
  "string",
  "statusRbb_Implementation",
  "string",
  "modal_RBB",
  // 'modal_RBB',
  "string",
  "modal_RBB",
];

const isSortNew = [true, true, true, true, true, true, true, true, true, true, true, true];
const isSortUnplanTermin = [true, true, true, true, true, true, true, false, true, false,];
const isSortUnplanRenewal = [true, true, true, true, true, true, true, false, true];

const columnNameVarNew = [
  'locationId',
  'atmId',
  'newCity',
  'area',
  'modelTeam',
  'newLocation',
  'submissionDate',
  'machineType',
  'status',
  'lastUpdate',
  'onlineDate',
  'remark',
];

const columnNameVarUnplanTermin = [
  'atmId',
  'areaName',
  'locationName',
  'rentRemaining',
  'dueDate',
  'status',
  'modelFinal',
  '',
  'remark',
]

const columnNameVarUnplanRenewal = [
  'atmId',
  'areaName',
  'locationName',
  'rentRemaining',
  'dueDate',
  'status',
  'modelFinal',
  '',
  'remark',
]

const sortArray = [
  {titleArr:[], colNameArr:[] },
  {titleArr: titleTableNew, colNameArr:columnNameVarNew},
  {titleArr: [], colNameArr: []},
  {titleArr: [], colNameArr:[]},
  {titleArr: [], colNameArr:[]},
  {titleArr: titleTableUnplan, colNameArr:columnNameVarUnplanTermin},
  {titleArr: titleTableUnplan, colNameArr:columnNameVarUnplanRenewal},
]