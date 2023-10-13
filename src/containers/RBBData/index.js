/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import * as ThemeColor from "../../assets/theme/colors";
import DownloadButton from "../../components/Button/DownloadButton";
import UploadButton from "../../components/Button/UploadButton";
import constansts from "../../helpers/constants";
import ModalUpload from "./ModalUpload";
import ModalLoader from "../../components/ModalLoader";
import Overview from "./OverviewCard";
import StarIcon from "../../assets/icons/siab/star.png";
import UndoIcon from "../../assets/icons/siab/undo.png";
import CloseIcon from "../../assets/icons/siab/times-circle.png";
import TableSummary from "./TableRBB";
import { ReactComponent as IconStar } from "../../assets/icons/siab/star.svg";
import { ReactComponent as IconRefresh } from "../../assets/icons/siab/undo.svg";
import { ReactComponent as IconClose } from "../../assets/icons/siab/times-circle.svg";
import New from './tabContent/New';
import Renewal from './tabContent/Renewal';
import Termin from './tabContent/Termin';
import UnplanTermin from './tabContent/UnplanTermin';
import UnplanRenewal from './tabContent/UnplanRenewal';
import Replace from './tabContent/Replace';
import UnplanReplace from './tabContent/UnplanReplace';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      paddingLeft: 0,
      paddingRight: 0,
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
  tombolAdd: { textAlign: "right" },
  filterContainer: { marginBottom: 15 },
  tableContent: {
    marginTop: 20,
  },

  titleLastUpdate: {
    fontWeight: 400,
    fontSize: 17,
    color: "#8D98B4",
  },
});

const defYear = moment().year();

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "80%",
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span /> }}
  />
));

const ContentTab = withStyles(() => ({
  root: {
    textTransform: "none",
    color: ThemeColor.Dark,
    fontSize: 15,
    fontWeight: 600,
    opacity: 0.3,
    minWidth: 0,
    padding: '6px 16px',
    "&:focus": {
      opacity: 1,
    },
  },
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
          <>{children}</>
        </Box>
        // <div>
        //   {children}
        // </div>
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

const RbbData = () => {
  const classes = useStyles();
  const history = useHistory();
  const [valueTab, setValueTab] = useState(0);

  // const history = useHistory();
  const handleChangeTab = (event, newValueTab) => {
    let hashTab = "";
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
    history.replace(`#${hashTab}`);
  };

  // MODAL UPLOAD OVERVIEW NEW
  const [OpenModalUploadNew, setOpenModalUploadNew] = useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);

  const handleUploadOverviewRBB = () => {
    handleOpenModalUploadNew();
  };

  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(true);
  const [isOpenModalLoader2, setModalLoader2] = useState(false);
  const [openLoader, setOpenLoader] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(""); // <--- init default currentPage
  // default year
  const [currentYear, setCurrentYear] = useState(defYear);

  // =========> START FETCHING DATA
  // [1]getDataOverview

  const [overviewCard, setOverviewCard] = useState({
    overviewNewAtm: {
      target: 0,
      actual: 0,
    },
    overviewRenewal: {
      target: 0,
      actual: 0,
    },
    overviewTerminResponse: {
      target: 0,
      actual: 0,
    },
    overviewUnplan: {
      target: 0,
      actual: 0,
    },
  });
  const [summaryNew, setSummaryNew] = useState([]);
  const [summaryRenewal, setSummaryRenewal] = useState([]);
  const [summaryTermin, setSummaryTermin] = useState([]);

  const [grantTotalNew, setGrantTotalNew] = useState([]);
  const [grantTotalRenewal, setGrantTotalRenewal] = useState([]);
  const [grantTotalTermin, setGrantTotalTermin] = useState([]);

  // init title and value type table for New Master Data

  const columnSummaryNew = [
    { title: "Area", dataIndex: "areaIndex", key: "areaKey", width: "30%" },
    {
      title: "Target",
      dataIndex: "targetIndex",
      key: "targetKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Sisa Target",
      dataIndex: "sisaTargetIndex",
      key: "sisaTargetKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Submission",
      dataIndex: "submissionIndex",
      key: "submissionKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Lapor BI",
      dataIndex: "laporbiIndex",
      key: "laporbiKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Sisa Lapor BI",
      dataIndex: "sisalaporbiIndex",
      key: "sisalaporbiKey",
      width: "14%",
      align: "center",
    },
  ];

  const columnSummaryRenewal = [
    { title: "Area", dataIndex: "areaIndex", key: "areaKey", width: "30%" },
    {
      title: "Target",
      dataIndex: "targetIndex",
      key: "targetKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Sisa Target",
      dataIndex: "sisaTargetIndex",
      key: "sisaTargetKey",
      width: "28%",
      align: "center",
    },
    {
      title: "Jumlah Renewal Selesai",
      dataIndex: "jmlRenewIndex",
      key: "jmlRenewIndex",
      width: "28%",
      align: "center",
    },
  ];

  const columnSummaryTermin = [
    { title: "Area", dataIndex: "areaIndex", key: "areaKey", width: "30%" },
    {
      title: "Target",
      dataIndex: "targetIndex",
      key: "targetKey",
      width: "14%",
      align: "center",
    },
    {
      title: "Sisa Target",
      dataIndex: "sisaTargetIndex",
      key: "sisaTargetKey",
      width: "12%",
      align: "center",
    },
    {
      title: "Jumlah Terminasi Selesai",
      dataIndex: "jmlhTerminIndex",
      key: "jmlhTerminKey",
      width: "16%",
      align: "center",
    },
    {
      title: "Lapor BI",
      dataIndex: "laporbiIndex",
      key: "laporbiKey",
      width: "8%",
      align: "center",
    },
    {
      title: "Sisa Lapor BI",
      dataIndex: "sisalaporbiIndex",
      key: "sisalaporbiKey",
      width: "10%",
      align: "center",
    },
    // { title: 'Jumlah', dataIndex: 'jmlhIndex', key: 'jmlhKey', width: '10%', align: 'center', },
  ];

  // Detec Hash for Open Tab Directly
  const { hash } = window.location;

  useEffect(() => {
    if (hash.length > 0) {
      if (hash === "#NewATM") {
        setValueTab(1);
        setCurrentYear(defYear);
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
      } else if (hash === "#Overview") {
        setValueTab(0);
      }
    }
  }, [hash]);

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  useEffect(() => {
    const fetchDataMaster = async () => {
      // START getDataSummary
      if (valueTab === 0) {
        // hitApiLastUpdate();
        hitApiCardOverview();
        // summary new
        hitApiSummaryNew();
        // summary renewal
        hitApiSummaryRenewal();
        // summary termin
        hitApiSummaryTermin();
      }
      // START [5]getDataUnplan
    };
    fetchDataMaster();
  }, [valueTab]);

  function handleDownloadRBB() {
    // console.log("Download Button Clicked", currentYear);
    try {
      setModalLoader2(true);
      axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/downloadMasterRbbFile/${currentYear}`, // your url
        method: "GET",
        responseType: "blob", // important
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `Master Data RBB ${currentYear}.xlsx`); // or any other extension
          document.body.appendChild(link);
          link.click();
          setModalLoader2(false);
        })
        .catch((error) => {
          // console.log("error download", error);
          if (error && error.response) {
            // console.log("error download", error.response);
            alert(`${error.response.status}\n${error.response.statusText}`);
          }
          setModalLoader2(false);
        });
    } catch (e) {
      setModalLoader2(false);
      alert(e);
    }
  }

  // HIT API OVERVIEW
  const hitApiCardOverview = async () => {
    const overviewCardSet = [];
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/overviewSummary`,
        configNew
      );
      // console.log("ini data overviewcard", result);
      try {
        const overviewCardSet = result.data;
        setLastUpdate(overviewCardSet.lastUpdated);
        setOverviewCard(overviewCardSet);
      } catch (err) {
        setModalLoader(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setModalLoader(false);
    }
  };
  const hitApiSummaryNew = async () => {
    const dataSummaryNewSet = [];
    try {
      setOpenLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryNewAtm`,
        configNew
      );
      // console.log('ini data summary new', result);
      try {
        const dataSumNewPre = result.data.data.summaries;
        // console.log('ini data new pre', dataSumNewPre);

        const dataSumNewGrand = result.data.data;
        // console.log('===> ini data grand sum new', dataSumNewGrand);
        const grandTotal = [
          dataSumNewGrand.totalTarget,
          dataSumNewGrand.totalTargetRemaining,
          dataSumNewGrand.totalSubmission,
          dataSumNewGrand.totalBiReportedCount,
          dataSumNewGrand.totalBiReportedRemaining,
        ];

        dataSumNewPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesNew = row.cities;
          // console.log('ini data cities', dataCitiesNew);

          dataCitiesNew.map((item, indx) => {
            const tipe = [];
            const dataTipeNew = item.openingTypes;
            // console.log('ini data tipe lokasi', dataTipeNew);

            dataTipeNew.map((itm, idex) => {
              const tipeRow = {
                key: `locType${idx}${indx}${idex}`,
                areaIndex: itm.name,
                targetIndex: itm.target,
                sisaTargetIndex: itm.targetRemaining,
                submissionIndex: itm.submission,
                laporbiIndex: itm.biReportedCount,
                sisalaporbiIndex: itm.biReportedRemaining,
              };
              tipe.push(tipeRow);
            });
            const citiesRow = {
              key: `cityType${idx}${indx}`,
              areaIndex: item.name,
              targetIndex: item.target,
              sisaTargetIndex: item.targetRemaining,
              submissionIndex: item.submission,
              laporbiIndex: item.biReportedCount,
              sisalaporbiIndex: item.biReportedRemaining,
              children: tipe,
            };
            cityes.push(citiesRow);
          });
          const newRow = {
            key: `namePicType${idx}`,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            submissionIndex: row.submission,
            laporbiIndex: row.biReportedCount,
            sisalaporbiIndex: row.biReportedRemaining,
            children: cityes,
          };
          dataSummaryNewSet.push(newRow);
        });

        setOpenLoader(false);
        setSummaryNew(dataSummaryNewSet);
        setGrantTotalNew(grandTotal);
      } catch (err) {
        setOpenLoader(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      setOpenLoader(false);
      alert(`Error Fetching Data...! \n${err}`);
    }
  };

  const hitApiSummaryRenewal = async () => {
    const dataSummaryRenewalSet = [];
    try {
      setModalLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryRenewalAtm`,
        configNew
      );
      // console.log('ini data summary renewal', result);
      try {
        const dataSumRenewPre = result.data.data.summaries;
        // console.log('ini data renewal pre', dataSumRenewPre);

        const dataSumRenewalGrand = result.data.data;
        // console.log('===> ini data grand sum renewal', dataSumRenewalGrand);
        const grandTotal = [
          dataSumRenewalGrand.totalTarget,
          dataSumRenewalGrand.totalTargetRemaining,
          dataSumRenewalGrand.totalCompletedRenewal,
        ];

        dataSumRenewPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesNew = row.cities;

          dataCitiesNew.map((item, indx) => {
            const sites = [];
            const dataSitesNew = item.picSite;

            dataSitesNew.map((site, index) => {
              const sitesRow = {
                key: `siteType${idx}${indx}${index}`,
                areaIndex: site.name,
                targetIndex: site.target,
                sisaTargetIndex: site.targetRemaining,
                jmlRenewIndex: site.completedRenewal,
              };
              sites.push(sitesRow);
            });

            const citiesRow = {
              key: `cityType${idx}${indx}`,
              areaIndex: item.name,
              targetIndex: item.target,
              sisaTargetIndex: item.targetRemaining,
              jmlRenewIndex: item.completedRenewal,
              children: sites,
            };
            cityes.push(citiesRow);
          });

          const newRow = {
            key: `namePicType${idx}`,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            jmlRenewIndex: row.completedRenewal,
            children: cityes,
          };
          dataSummaryRenewalSet.push(newRow);
        });
        setModalLoader(false);
        setSummaryRenewal(dataSummaryRenewalSet);
        setGrantTotalRenewal(grandTotal);
      } catch (err) {
        setModalLoader(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setModalLoader(false);
    }
  };

  const hitApiSummaryTermin = async () => {
    const dataSummaryTerminSet = [];
    try {
      setModalLoader(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryCloseAtm`,
        configNew
      );
      // console.log('ini data summary termin', result);
      try {
        const dataSumTermPre = result.data.data.summaries;
        // console.log('ini data termin pre', dataSumTermPre);

        const dataSumTerminGrand = result.data.data;
        // console.log('===> ini data grand sum Termin', dataSumTerminGrand);
        const grandTotal = [
          dataSumTerminGrand.totalTarget,
          dataSumTerminGrand.totalTargetRemaining,
          dataSumTerminGrand.totalTerminationComplete,
          dataSumTerminGrand.totalBiReportedCount,
          dataSumTerminGrand.totalBiReportedRemaining,
          // dataSumTerminGrand.totalBiReportedRemaining
        ];

        dataSumTermPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesTerm = row.cities;
          // console.log('ini data cities termin', dataCitiesTerm);

          dataCitiesTerm.map((item, indx) => {
            const tipe = [];
            const dataTipeTerm = item.openingTypes;
            // console.log('ini data tipe lokasi termin', dataTipeTerm);

            dataTipeTerm.map((itm, idex) => {
              const tipeRow = {
                key: `locType${idx}${indx}${idex}`,
                areaIndex: itm.name,
                targetIndex: itm.target,
                sisaTargetIndex: itm.targetRemaining,
                jmlhTerminIndex: itm.terminationComplete,
                laporbiIndex: itm.biReportedCount,
                sisalaporbiIndex: itm.biReportedRemaining,
                jmlhIndex: itm.total,
              };
              tipe.push(tipeRow);
            });
            const citiesRow = {
              key: `cityType${idx}${indx}`,
              areaIndex: item.name,
              targetIndex: item.target,
              sisaTargetIndex: item.targetRemaining,
              jmlhTerminIndex: item.terminationComplete,
              laporbiIndex: item.biReportedCount,
              sisalaporbiIndex: item.biReportedRemaining,
              jmlhIndex: item.total,
              children: tipe,
            };
            cityes.push(citiesRow);
          });
          const newRow = {
            key: `namePicType${idx}`,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            jmlhTerminIndex: row.terminationComplete,
            laporbiIndex: row.biReportedCount,
            sisalaporbiIndex: row.biReportedRemaining,
            jmlhIndex: row.total,
            children: cityes,
          };
          dataSummaryTerminSet.push(newRow);
        });
        setModalLoader(false);
        setSummaryTermin(dataSummaryTerminSet);
        setGrantTotalTermin(grandTotal);
      } catch (err) {
        setModalLoader(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setModalLoader(false);
    }
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
          <Typography className={classes.title}>RBB</Typography>
        </Grid>
        <Grid item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {valueTab === 0 && (
              <Typography className={classes.titleLastUpdate}>
                Last Update {lastUpdate}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid container spacing={1} justify="space-between">
          <Grid item style={{ paddingBottom: 15 }} xs={8}>
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
          <Grid item xs={4}>
            {(valueTab === 0 || valueTab === 4) && (
              <Grid container spacing={1} justify="flex-end">
                { valueTab === 0 &&
                  <Grid item>
                    <DownloadButton
                      style={{
                        width: 158,
                        height: 40,
                      }}
                      label="Download RBB"
                      onClick={() => {
                        handleDownloadRBB();
                      }}
                    />
                  </Grid>
                }
                <Grid item>
                  <UploadButton
                    style={{ width: 145, height: 40,  }}
                    label="Upload RBB"
                    iconPosition="startIcon"
                    onClick={() => {
                      handleUploadOverviewRBB();
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <TabPanel value={valueTab} index={0}>
          <div className={classes.container}>
            <Grid container style={{ display: "flex" }} spacing={1}>
              <Grid item xs={3}>
                <Overview
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={StarIcon}
                  imgStyle={{ height: "40px", width: "40px" }}
                  title="New ATM"
                  isLoadData={isOpenModalLoader}
                  target={overviewCard.overviewNewAtm.target}
                  actual={overviewCard.overviewNewAtm.actual}
                />
              </Grid>
              <Grid item xs={3}>
                <Overview
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={UndoIcon}
                  imgStyle={{ height: "40px", width: "40px" }}
                  title="Renewal ATM"
                  isLoadData={isOpenModalLoader}
                  target={overviewCard.overviewRenewal.target}
                  actual={overviewCard.overviewRenewal.actual}
                />
              </Grid>
              <Grid item xs={3}>
                <Overview
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={CloseIcon}
                  imgStyle={{ height: "40px", width: "40px" }}
                  title="Termin ATM"
                  isLoadData={isOpenModalLoader}
                  target={overviewCard.overviewTerminResponse.target}
                  actual={overviewCard.overviewTerminResponse.actual}
                />
              </Grid>
              <Grid item xs={3}>
                <Overview
                  isLoadData={isOpenModalLoader}
                  color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
                  imgIcon={CloseIcon}
                  imgStyle={{ height: "40px", width: "40px" }}
                  title="Unplan Termin ATM"
                  // target={overviewCard.overviewUnplan.target}
                  actual={overviewCard.overviewUnplan.actual}
                />
              </Grid>
            </Grid>
            <div className={classes.tableContent}>
              <TableSummary
                isLoading={openLoader}
                titleSum="Summary New ATM"
                data={summaryNew}
                imgIcon={<IconStar style={{ width: 20, height: 20 }} />}
                columnData={columnSummaryNew}
                summaries={grantTotalNew}
                grandTotal
              />
            </div>
            <div className={classes.tableContent}>
              <TableSummary
                // align="center"
                isLoading={openLoader}
                titleSum="Summary Renewal ATM"
                data={summaryRenewal}
                imgIcon={<IconRefresh style={{ width: 20, height: 20 }} />}
                columnData={columnSummaryRenewal}
                summaries={grantTotalRenewal}
                grandTotal
              />
            </div>
            <div className={classes.tableContent}>
              <TableSummary
                isLoading={openLoader}
                titleSum="Summary Termin ATM"
                data={summaryTermin}
                imgIcon={<IconClose style={{ width: 20, height: 20 }} />}
                columnData={columnSummaryTermin}
                summaries={grantTotalTermin}
                grandTotal
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <New />
        </TabPanel>
        <TabPanel value={valueTab} index={2}>
          <Renewal />
        </TabPanel>
        <TabPanel value={valueTab} index={3}>
          <Termin />
        </TabPanel>
        <TabPanel value={valueTab} index={4}>
          <Replace />
        </TabPanel>
        <TabPanel value={valueTab} index={5}>
          <UnplanTermin />
        </TabPanel>
        <TabPanel value={valueTab} index={6}>
          <UnplanRenewal />
        </TabPanel>
        <TabPanel value={valueTab} index={7}>
          <UnplanReplace />
        </TabPanel>
      </div>
      {/* <FloatingChat /> */}
      <ModalUpload
        isOpen={OpenModalUploadNew}
        onClose={handleCloseModalUploadNew}
        onLeave={() => {
          handleCloseModalUploadNew();
        }}
        tabValue={valueTab}
      />
      <ModalLoader isOpen={isOpenModalLoader2} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(RbbData))
);
