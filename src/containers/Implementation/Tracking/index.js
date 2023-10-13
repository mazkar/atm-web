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
import moment from "moment";
import { Box, Grid, Typography, Tabs, Tab,Link } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import axios from "axios";
import { RootContext } from "../../../router";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import Constants from "../../../helpers/constants";
import FilterProgress from '../FilterProgress';
import ModalTambah from "../ModalTambah";
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import { TableCheckPagination } from "../../../components";
import { PaperImplementOverview } from "../ComponentsOwn";
import {
  thousandFormat,
  percentageFormatter,
} from "../../../helpers/useFormatter";
import { ReactComponent as PlusWhite } from '../../../assets/icons/siab/plus-white.svg';
import { ReactComponent as IconClose } from "../../../assets/icons/duotone-others/close-bg-red.svg";
import { ReactComponent as IconGear } from "../../../assets/icons/duotone-others/gear-bg-red.svg";
import { ReactComponent as IconRefresh } from "../../../assets/icons/duotone-others/refresh-bg-red.svg";
import {
  doFetchImplementationNew,
  doFetchImplementationTermin,
  doFetchImplementationReplace,
  doFetchImplementationMigrasi
} from '../ApiServiceImplementation';
import PopupSucces from "../../../components/PopupSucces";
import MenuPopUp from "./common/MenuPopUp";
import ModalRemark from "../../../components/Modal/ModalRemark";
import getMinioFile from "../../../helpers/getMinioFile"
import RemarkImplementation from "../../../components/Modal/RemarkImplementation";
import LocationPrepare from "../../../components/Modal/LocationPrepare";

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
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
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

// CONVERTING DATE AS DD-MM-YYYY FORMAT
const DateConvert = (props) => {
  const { getDate } = props;
  const getNewDate = typeof getDate === 'string' ? getDate.replace("WIB", "+07:00") : '';
  const setDate = getNewDate ? moment(getNewDate)?.format("DD-MM-YYYY") : '';
  return setDate || '-';
};

// INIT DATE FORMAT SECOND
const dateFormat = (seconds) => {
  const date = new Date(seconds);
  const newDate = date.getDate();
  const newMonth = date.getMonth()+1;
  const newYear = date.getFullYear();
  return `${newDate<10 ? `0${  newDate}` : newDate}/${newMonth<10 ? `0${  newMonth}` : newMonth}/${newYear}`;
};

DateConvert.propTypes = {
  getDate: PropTypes.string,
};

// DEFAULT EXPORT
const Main = () => {
  const classes = useStyles();
  const history = useHistory();

  // INIT DEFAULT SUMMARY CARD
  const [statusImpl, setStatusImpl] = useState(); /* --> init first summary card */
  const [implementation, setImplementation] = useState({
    migrasi: {
      totalActual: 0,
      totalActualPercentage: 0,
      totalSubmission: 0,
    },
    newLocation: {
      totalActual: 0,
      totalActualPercentage: 0,
      totalSubmission: 0,
    },
    replace: {
      totalActual: 0,
      totalActualPercentage: 0,
      totalSubmission: 0,
    },
    terminasi: {
      totalActual: 0,
      totalActualPercentage: 0,
      totalSubmission: 0,
    },
  });

  // INIT SUMMARY
  const [summaryNew, setSummaryNew] = useState({});
  const [summaryTermin, setSummaryTermin] = useState({});
  const [summaryReplace, setSummaryReplace] = useState({});
  const [summaryMigrasi, setSummaryMigrasi] = useState({});

  // POPUP TAMBAH
  const [OpenModalUploadNew, setOpenModalUploadNew] = React.useState(false);
  const handleOpenModalUploadNew = () => setOpenModalUploadNew(true);
  const handleCloseModalUploadNew = () => setOpenModalUploadNew(false);
  const [isSuccessAddMigrasi, setIsSuccessAddMigrasi] = React.useState(false);

  // GET USER ID
  const { userId } = useContext(RootContext);

  // INIT LOADING
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  function loaderHandler(loaderValue){
    setIsLoading(loaderValue);
  }
  const [isLoadingSummary, setIsLoadingSummary] = useState(true); /* <------- loading Summary */
  function loaderHandlerSummary(loaderValue){
    setIsLoadingSummary(loaderValue);
  }

  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "id";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const rowsPerPage = 10; // <--- init default rowsPerPage

  // INIT FILTER TABLE
  const [valueFilter, setValueFilter] = useState(titleTableNew);

  // Init data table = Implementation
  const [dataImplementationNew, setDataImplementationNew] = useState([]); // <--- init dataImplementation array
  const [dataImplementationTermin, setDataImplementationTermin] = useState([]); // <--- init dataImplementation array
  const [dataImplementationReplace, setDataImplementationReplace] = useState([]); // <--- init dataImplementation array
  const [dataImplementationMigrasi, setDataImplementationMigrasi] = useState([]); // <--- init dataImplementation array

  //dataStatus
  const [dataStatusImplementation, setDataStatusImplementation]= useState();

  // RESET PAGE PAGINATION
  const [resetPageCounter, setResetPageCounter] = useState(0);

  // INIT DATA REQUEST
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(0);

  // Modal Remark State
  const [isOpenRemark, setOpenRemark] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openingType, setOpeningType] = useState("New");
  const [isLocationPrepare,setOpenLocationPrepare]= useState(false)

  //minio
  const [minioFile,setMinioFile]= useState(null);
  const [fileUrl,setFileUrl]= useState(null);


  // check url hash
  useEffect(() => {
    const windowsHash = window.location.hash;
    if (windowsHash) {
      switch (windowsHash) {
      case "#new":
        setValueTab(0);
        break;
      case "#termin":
        setValueTab(1);
        break;
      case "#replace":
        setValueTab(2);
        break;
      case "#migrasi":
        setValueTab(3);
        break;
      default:
        setValueTab(0);
      }
    } else {
      setValueTab(0);
    }
  }, [dataRequest]);

  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
    let hashTab = "";
    if (newValueTab === 0) {
      hashTab = "new";
    }
    if (newValueTab === 1) {
      hashTab = "termin";
    }
    if (newValueTab === 2) {
      hashTab = "replace";
    }
    if (newValueTab === 3) {
      hashTab = "migrasi";
    }
    history.replace(`#${hashTab}`);
  };

  const actionDetail = (id) => {
    // alert("Action Detail")
    history.push(`/implementation/${id}`);
  };
 const document = async(documentFile,openFile)=>{
   const filePath = documentFile
   console.log("document",filePath)
   if(filePath){
     try{
       //setIsLoading(true);
       getMinioFile(filePath).then((result)=>{
        console.log(">>>> try getMinio Offering ", JSON.stringify(result));
         setMinioFile(result);
         setIsLoading(false)
         setFileUrl(result.fileUrl)
         openFile(result.fileUrl)
       })
     }catch(err){
       setIsLoading(false)
     }
   }  else{
     alert("Document does not exist")
   }
 }


 const openFile = (urlFile)=>{
// alert(`File opened:${urlFile}`)
 window.open(urlFile, "_blank");
 }
  useEffect(() => {
    const fetchDataMaster = async () => {
      if(statusImpl != "200" || statusImpl != 200){
        hitApiCardOverview();
      }
      if(valueTab === 0){
        setValueFilter(titleTableNew);
        hitApiTableNew();
        setOpeningType("New");
      }else if(valueTab === 1){
        setValueFilter(titleTableTermin);
        hitApiTableTermin();
        setOpeningType("Termin");
      }else if(valueTab === 2){
        setValueFilter(titleTableReplace);
        hitApiTableReplace();
        setOpeningType("Replace");
      }else if(valueTab === 3){
        setValueFilter(titleTableMigrasi);
        hitApiTableMigrasi();
        setOpeningType("Migrasi")
      }
    };

    fetchDataMaster();
  }, [dataRequest]);

  useEffect(()=> {
    setDataRequest(defaultDataHit);
  },[valueTab]);

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // HIT API DATA TABLE MIGRASI & SET DATA OF TABLE
  const hitApiTableMigrasi = () => {
    doFetchImplementationMigrasi(
      loaderHandler,
      dataRequest
    ).then((response) => {
      try {
        const storeNew = [];
        if (response) {
          const resultData = response.data.content.implementationMigrasi;
          const {totalPages,totalElements}=response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data,index) => {
            storeNew.push({
              id: data.implementationInfoMigrasi.submitId,
              atmId: data.implementationInfoMigrasi.atmId,
              submitDate: data.implementationInfoMigrasi.submitDate == null ? "-" : dateFormat(data.implementationInfoMigrasi.submitDate),
              submitId: parseInt(data.implementationInfoMigrasi.submitId),
              locationName: data.implementationInfoMigrasi.locationName,
              branch: data.implementationInfoMigrasi.branch,
              machine: data.implementationInfoMigrasi.machineType,
              picRequester: data.implementationInfoMigrasi.picRequester,
              readyDate: data.implementationInfoMigrasi.readyDate == null ? "-" : dateFormat(data.implementationInfoMigrasi.readyDate),
              tglAktivasi: data.implementationInfoMigrasi.activationDate == null ? "-" : dateFormat(data.implementationInfoMigrasi.activationDate),
              idBaru: data.implementationInfoMigrasi.newAtmId,
              locationNameNew: data.implementationInfoMigrasi.newLocationName,
              flmVendor: data.implementationInfoMigrasi.flmVendor,
              sla: data.implementationInfoMigrasi.sla,
              parameter: data.checklistMigrasi.parameter,
              aktivasi: data.checklistMigrasi.aktivasi,
              status:data.status.status,
              // action:  <a onClick={() => actionDetail(data.implementationInfoMigrasi.submitId)}>Detail</a>
              action: <MenuPopUp
                detailHandler={() => actionDetail(data.implementationInfoMigrasi.submitId)}
                remarkHandler={() => setOpenRemark(true)}
                setCurrentId={()=>setCurrentId(data.implementationInfoMigrasi.submitId)}
                document={()=>document(data.implementationInfoMigrasi.documentFileName, openFile)}
                fileUrl={fileUrl}
                locationPrepareHandler={()=>setOpenLocationPrepare(true)}
              />
            });
          });
          setDataImplementationMigrasi(storeNew);
        
        } else {
          setDataImplementationMigrasi([]);
        }
      } catch (err) {
        console.log('~ err', err);
        loaderHandler(false);
        alert(`Error Re-Construct Data Migrasi...! \n${err}`);
      }
    });
  };

  // HIT API DATA TABLE REPLACE & SET DATA OF TABLE
  const hitApiTableReplace = () => {
    doFetchImplementationReplace(
      loaderHandler,
      dataRequest
    ).then((response) => {
      try {
        const storeNew = [];
        if (response) {
          const resultData = response.data.content.implementationReplace;
          const {totalPages,totalElements}=response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data,index) => {
            storeNew.push({
              id: data.implementationInfoReplace.submitId,
              atmIdLama: data.implementationInfoReplace.oldAtmId,
              mesinlama: data.implementationInfoReplace.oldMachine,
              tglsubmit: data.implementationInfoReplace.submitDate === null ? "-" : dateFormat(data.implementationInfoReplace.submitDate),
              submitId: parseInt(data.implementationInfoReplace.submitId),
              locationName: data.implementationInfoReplace.locationName,
              picRequester: data.implementationInfoReplace.picRequester,
              readyDate: data.implementationInfoReplace.readyDate === null ? "-" : dateFormat(data.implementationInfoReplace.readyDate),
              atmIdbaru: data.implementationInfoReplace.newAtmId,
              mesinBaru: data.implementationInfoReplace.newMachine,
              tglNotif: data.implementationInfoReplace.notifDate === null ? "-" : dateFormat(data.implementationInfoReplace.notifDate),
              sla: data.implementationInfoReplace.sla,
              kebutuhan: data.checklistReplace.kebutuhan,
              parameter: data.checklistReplace.parameter,
              mesin: data.checklistReplace.mesin,
              booth: data.checklistReplace.booth,
              keamanan: data.checklistReplace.keamanan,
              aktivasi: data.checklistReplace.aktivasi,
              signage: data.checklistReplace.signage,
              status:data.status.status,
              // action:  <a onClick={() => actionDetail(data.implementationInfoReplace.submitId)}>Detail</a>
              action: <MenuPopUp
                detailHandler={() => actionDetail(data.implementationInfoReplace.submitId)}
                remarkHandler={() => setOpenRemark(true)}
                setCurrentId={()=>setCurrentId(data.implementationInfoReplace.submitId)}
                document={()=>document(data.implementationInfoReplace.documentFileName)}
                fileUrl={fileUrl}
                locationPrepareHandler={()=>setOpenLocationPrepare(true)}
              />
            });
          });
          setDataImplementationReplace(storeNew);
        } else {
          setDataImplementationReplace([]);
        }
      } catch (err) {
        console.log('~ err', err);
        loaderHandler(false);
        alert(`Error Re-Construct Data Replace...! \n${err}`);
      }
    });
  };

  // HIT API DATA TABLE TERMIN & SET DATA OF TABLE
  const hitApiTableTermin = () => {
    doFetchImplementationTermin(
      loaderHandler,
      dataRequest
    ).then((response) => {
      try {
        const storeNew = [];
        if (response) {
          const resultData = response.data.content.implementationTermin;
          const {totalPages,totalElements}=response.data;
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data,index) => {
            storeNew.push({
              id: data.implementationInfo.submitId,
              atmId: data.implementationInfo.atmId,
              submitDate: data.implementationInfo.submitDate == null ? "-" : dateFormat(data.implementationInfo.submitDate),
              submitId: parseInt(data.implementationInfo.submitId),
              locationName: data.implementationInfo.locationName,
              picRequester: data.implementationInfo.picRequester,
              readyDate: data.implementationInfo.readyDate == null ? "-" : dateFormat(data.implementationInfo.readyDate),
              tglEksekusi: data.implementationInfo.executionDate == null ? "-" : dateFormat(data.implementationInfo.executionDate),
              tglNotif: data.implementationInfo.notifDate == null ? "-" : dateFormat(data.implementationInfo.notifDate),
              sla: data.implementationInfo.sla,
              konfirmasiSaldo0: data.checklistTermin.konfirmasiSaldo,
              cabutJarkom: data.checklistTermin.cabutJarkom,
              cabutMesin: data.checklistTermin.cabutMesin,
              cabutBooth: data.checklistTermin.cabutBooth,
              cabutKeamanan: data.checklistTermin.cabutKeamanan,
              statusTerminasi: data.checklistTermin.statusTerminasi,
              perapihanRuang: data.checklistTermin.perapihanRuangan,
              cabutParameter: data.checklistTermin.cabutParameter,
              status:data.status.status,
              // action:  <a onClick={() => actionDetail(data.implementationInfo.submitId)}>Detail</a>
              action: <MenuPopUp
                detailHandler={() => actionDetail(data.implementationInfo.submitId)}
                remarkHandler={() => setOpenRemark(true)}
                setCurrentId={()=>setCurrentId(data.implementationInfo.submitId)}
                document={()=>document(data.implementationInfo.documentFileName)}
                fileUrl={fileUrl}
                locationPrepareHandler={()=>setOpenLocationPrepare(true)}
              />
            });
          });
          setDataImplementationTermin(storeNew);
        } else {
          setDataImplementationTermin([]);
        }
      } catch (err) {
        console.log('~ err', err);
        loaderHandler(false);
        alert(`Error Re-Construct Data Termin...! \n${err}`);
      }
    });
  };

  // HIT API DATA TABLE NEW & SET DATA OF TABLE
  const hitApiTableNew = () => {
    doFetchImplementationNew(
      loaderHandler,
      dataRequest
    ).then((response) => {
      try {
        const storeNew = [];
        if (response) {
          const resultData = response.data.content.implementationNew;
          const {totalPages,totalElements}=response.data;
          // console.log('~ response', response);
          setTotalRows(totalElements);
          setTotalPages(totalPages);
          resultData.map((data,index) => {
            storeNew.push({
              id: data.implementationInfo.submitId,
              atmId: data.implementationInfo.atmId,
              submitDate: data.implementationInfo.submitDate === null ? "-" : dateFormat(data.implementationInfo.submitDate),
              submitId: parseInt(data.implementationInfo.submitId),
              locationName: data.implementationInfo.locationName,
              machine: data.implementationInfo.machine,
              picRequester: data.implementationInfo.picRequester,
              readyDate: data.implementationInfo.readyDate === null ? "-" : dateFormat(data.implementationInfo.readyDate),
              tglAktivasi: data.implementationInfo.activationDate === null ? "-" : dateFormat(data.implementationInfo.activationDate),
              tglNotif: data.implementationInfo.notifDate === null ? "-" : dateFormat(data.implementationInfo.notifDate),
              sla: data.implementationInfo.sla,
              kebutuhan: data.checklistNew.kebutuhan,
              parameter: data.checklistNew.parameter,
              jarkom: data.checklistNew.jarkom,
              mesin: data.checklistNew.mesin,
              booth: data.checklistNew.booth,
              keamanan: data.checklistNew.keamanan,
              aktivasi: data.checklistNew.aktivasi,
              signage: data.checklistNew.signage,
              status:data.status.status,
              // action:  <a onClick={() => actionDetail(data.implementationInfo.submitId)}>Detail</a>
              action: <MenuPopUp
                detailHandler={() => actionDetail(data.implementationInfo.submitId)}
                remarkHandler={() => setOpenRemark(true)}
                setCurrentId={()=>setCurrentId(data.implementationInfo.submitId)}
                document={()=>document(data.implementationInfo.documentFileName,openFile)}
                fileUrl={fileUrl}
                locationPrepareHandler={()=>setOpenLocationPrepare(true)}
              />
            });
          });
          setDataImplementationNew(storeNew);
        } else {
          setDataImplementationNew([]);
        }
      } catch (err) {
        console.log('~ err', err);
        loaderHandler(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    });
  };

  // HIT API DATA OF SUMMARY
  const hitApiCardOverview = async () => {
    loaderHandlerSummary(true);
    const overviewCardSet = [];
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_VENDORS}/getImplementationSummary`,
        configNew
      );
      try {
        const overviewCardSet = result.data;
        setImplementation(overviewCardSet);
        setStatusImpl(result.status);
        loaderHandlerSummary(false);
      } catch (err) {
        loaderHandlerSummary(false);
        alert(`Error Re-Construct Data Summary Card...! \n${err}`);
      }
    } catch (err) {
      console.log('~ err', err);
      alert(`Error Fetching Data... Summary Card! \n${err}`);
      loaderHandlerSummary(false);
    }
  };

  // SET DATA OF SUMMARY
  useEffect(() => {
    const response = implementation;
    let storeNew = {};
    let storeTermin = {};
    let storeReplace = {};
    let storeMigrasi = {};

    if (response.newLocation) {
      storeNew = {
        submission: response.newLocation.totalSubmission,
        actual: response.newLocation.totalActual,
        percentage: response.newLocation.totalActualPercentage,
      };

      if (response.terminasi) {
        storeTermin = {
          submission: response.terminasi.totalSubmission,
          actual: response.terminasi.totalActual,
          percentage: response.terminasi.totalActualPercentage,
        };
      };

      if (response.replace) {
        storeReplace = {
          submission: response.replace.totalSubmission,
          actual: response.replace.totalActual,
          percentage: response.replace.totalActualPercentage,
        };
      };

      if (response.migrasi) {
        storeMigrasi = {
          submission: response.migrasi.totalSubmission,
          actual: response.migrasi.totalActual,
          percentage: response.migrasi.totalActualPercentage,
        };
      };

      setSummaryNew(storeNew);
      setSummaryTermin(storeTermin);
      setSummaryReplace(storeReplace);
      setSummaryMigrasi(storeMigrasi);
    }
  }, [implementation]);

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

  function handleFilterSubmit(value) {
  // console.log(">>>>> FILTER DATA: ", JSON.stringify(value));
  // console.log(">>>>> FILTER DATA: ", JSON.stringify(dataRequest));
    setResetPageCounter(prevCount => prevCount+1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...defaultDataHit,
        // // pageNumber: 0,
        // // dataPerPage: rowsPerPage,
        ...value
      });
    }
  }

  const handleButton = () => {
    // alert("PopUp")
    handleOpenModalUploadNew();
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        className={classes.titleContainer}
      >
        <Grid item>
          <Typography className={classes.title}>Implementation</Typography>
        </Grid>
        <Grid item>
          {/* <ChkySearchBar placeholder="Search ... " width={290}/> */}
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="New Loc"
            keyNameA="Total Submission"
            keyNameB="Total Actual"
            valA={thousandFormat(summaryNew.submission)}
            valB={thousandFormat(summaryNew.actual)}
            valC={percentageFormatter(summaryNew.percentage)}
            isLoading={isLoadingSummary}
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Terminasi"
            keyNameA="Total Submission"
            keyNameB="Total Actual"
            valA={thousandFormat(summaryTermin.submission)}
            valB={thousandFormat(summaryTermin.actual)}
            valC={percentageFormatter(summaryTermin.percentage)}
            isLoading={isLoadingSummary}
            icon={<IconClose />}
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Replace"
            keyNameA="Total Submission"
            keyNameB="Total Actual"
            valA={thousandFormat(summaryReplace.submission)}
            valB={thousandFormat(summaryReplace.actual)}
            valC={percentageFormatter(summaryReplace.percentage)}
            isLoading={isLoadingSummary}
            icon={<IconGear />}
          />
        </Grid>
        <Grid item xs={3}>
          <PaperImplementOverview
            title="Migrasi"
            keyNameA="Total Submission"
            keyNameB="Total Actual"
            valA={thousandFormat(summaryMigrasi.submission)}
            valB={thousandFormat(summaryMigrasi.actual)}
            valC={percentageFormatter(summaryMigrasi.percentage)}
            isLoading={isLoadingSummary}
            icon={<IconRefresh />}
          />
        </Grid>
      </Grid>
      <div className={classes.container}>
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
                label="Termin"
                {...a11yProps(1)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Replace"
                {...a11yProps(2)}
                style={{ minWidth: 100 }}
              />
              <ContentTab
                label="Migrasi"
                {...a11yProps(3)}
                style={{ minWidth: 100 }}
              />
            </ContentTabs>
          </Grid>
          {/* TAB PANEL CONTENT */}
          <Grid item style={{ width: "-webkit-fill-available" }}>
            {/* FILTER */}
            <div className={classes.filterContainer}>
              <FilterProgress
                valueTab={valueTab}
                onFilterSubmit={handleFilterSubmit}
                valueFilter={valueFilter}
              />
            </div>
            {/* NEW */}
            <TabPanel value={valueTab} index={0} className={classes.tabContent}>
              <TableCheckPagination
                data={dataImplementationNew}
                fields={titleTableNew}
                cellOption={valueTypeTableNew}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                isWithCheck={false}
                isLoadData={isLoading}
                sorting={handleSorting}
                isSort
                alignTitleData={alignTitleData}
              />
            </TabPanel>
            {/* TERMIN */}
            <TabPanel value={valueTab} index={1} className={classes.tabContent}>
              <TableCheckPagination
                data={dataImplementationTermin}
                fields={titleTableTermin}
                cellOption={valueTypeTableTermin}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                isWithCheck={false}
                isLoadData={isLoading}
                sorting={handleSorting}
                isSort
                alignTitleData={alignTitleData}
              />
            </TabPanel>
            {/* REPLACE */}
            <TabPanel value={valueTab} index={2} className={classes.tabContent}>
              <TableCheckPagination
                data={dataImplementationReplace}
                fields={titleTableReplace}
                cellOption={valueTypeTableReplace}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                isWithCheck={false}
                isLoadData={isLoading}
                sorting={handleSorting}
                isSort
                alignTitleData={alignTitleData}
              />
            </TabPanel>
            {/* MIGRASI */}
            <TabPanel value={valueTab} index={3} className={classes.tabContent}>
              <Grid
                container
                justify="space-between"
                className={classes.titleContainer}
                alignItems="center"
              >
                <Grid>
                  <MuiIconLabelButton
                    style={{ width: 120, height: 40 }}
                    label="Tambah"
                    iconPosition="endIcon"
                    onClick={handleButton}
                    buttonIcon={<PlusWhite />}
                  />
                </Grid>
              </Grid>
              <TableCheckPagination
                data={dataImplementationMigrasi}
                fields={titleTableMigrasi}
                cellOption={valueTypeTableMigrasi}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                changePage={handleChangePageValue}
                resetPageCounter={resetPageCounter}
                isWithCheck={false}
                isLoadData={isLoading}
                sorting={handleSorting}
                isSort
                alignTitleData={alignTitleData}
              />
            </TabPanel>
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalTambah
        isOpen={OpenModalUploadNew}
        onClose={handleCloseModalUploadNew}
        onCloseAll={setOpenModalUploadNew}
        onSuccessSubmit={()=>setIsSuccessAddMigrasi(true)}
      />
      <PopupSucces isOpen={isSuccessAddMigrasi}
        onClose={()=>{
          setIsSuccessAddMigrasi(false);
          history.go(0);
        }}
        message="Data Implementasi Migrasi Berhasil Ditambahkan!"/>

      {isOpenRemark && <RemarkImplementation isOpen={isOpenRemark} onClose={()=>{setOpenRemark(false);}} rowToShow={currentId} type={openingType} rType="IMPLEMENTATION_REMARK" />}
      {isLocationPrepare && <LocationPrepare isOpen={isLocationPrepare} onClose={()=>{setOpenLocationPrepare(false)}} rowToShow={currentId}/>}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(Main))
);

// init title and value type table for Data
// (1) Implementation New
const titleTableNew = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "atmId", numeric: false, disablePadding: false, label: "ATM ID", typeColumn: "info" },
  { id: "submitDate", numeric: false, disablePadding: false, label: "Tgl Submit", typeColumn: "info" },
  { id: "submitId", numeric: false, disablePadding: false, label: "ID Submit", typeColumn: "info" },
  { id: "locationName", numeric: false, disablePadding: false, label: "Nama Lokasi", typeColumn: "info" },
  { id: "machineType", numeric: false, disablePadding: false, label: "Type Mesin", typeColumn: "info" },
  { id: "picRequester", numeric: false, disablePadding: false, label: "PIC Req", typeColumn: "info" },
  { id: "readyDate", numeric: false, disablePadding: false, label: "Target Online", typeColumn: "info" },
  { id: "activationDate", numeric: false, disablePadding: false, label: "Tgl Aktivasi", typeColumn: "info" },
  { id: "notifDate", numeric: false, disablePadding: false, label: "Tgl Notif", typeColumn: "info" },
  { id: "sla", numeric: false, disablePadding: false, label: "SLA", typeColumn: "info" },
  { id: "kebutuhan", numeric: false, disablePadding: false, label: "Kebutuhan", typeColumn: "checklist" },
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "jarkom", numeric: false, disablePadding: false, label: "Jarkom", typeColumn: "checklist" },
  { id: "mesin", numeric: false, disablePadding: false, label: "Mesin", typeColumn: "checklist" },
  { id: "booth", numeric: false, disablePadding: false, label: "Booth", typeColumn: "checklist" },
  { id: "keamanan", numeric: false, disablePadding: false, label: "Keamanan", typeColumn: "checklist" },
  { id: "aktivasi", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
  { id: "signage", numeric: false, disablePadding: false, label: "Signage", typeColumn: "checklist" },
  {id : "status",numeric:false,disablePadding:false, label:"Status",typeColumn:"info"},
  { id: "action", numeric: false, disablePadding: false, label: "" },
];
const valueTypeTableNew = [
  "hide",
  "string","string","string","limit20Left","string","limit20Left","string","string","string","sla_implementation",
  "cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","statusImplementation",
  "",
];

const alignTitleData = [
  'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left', 'left',
  'left', 'left', 'left', 'left'];

// (2) Implementation Termin
const titleTableTermin = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "atmId", numeric: false, disablePadding: false, label: "ATM ID", typeColumn: "info" },
  { id: "submitDate", numeric: false, disablePadding: false, label: "Tgl Submit", typeColumn: "info" },
  { id: "submitId", numeric: false, disablePadding: false, label: "ID Submit", typeColumn: "info" },
  { id: "locationName", numeric: false, disablePadding: false, label: "Nama Lokasi", typeColumn: "info" },
  { id: "picRequester", numeric: false, disablePadding: false, label: "PIC Req", typeColumn: "info" },
  { id: "readyDate", numeric: false, disablePadding: false, label: "Tgl Ready", typeColumn: "info" },
  { id: "tglEksekusi", numeric: false, disablePadding: false, label: "Tgl Eksekusi", typeColumn: "info" },
  { id: "notifDate", numeric: false, disablePadding: false, label: "Tgl Notif", typeColumn: "info" },
  { id: "sla", numeric: false, disablePadding: false, label: "SLA", typeColumn: "info" },
  { id: "konfirmasiSaldo0", numeric: false, disablePadding: false, label: "Konfirmasi Saldo 0", typeColumn: "checklist" },
  { id: "cabutJarkom", numeric: false, disablePadding: false, label: "Cabut Jarkom", typeColumn: "checklist" },
  { id: "cabutMesin", numeric: false, disablePadding: false, label: "Cabut Mesin", typeColumn: "checklist" },
  { id: "cabutBooth", numeric: false, disablePadding: false, label: "Cabut Booth & Promosi", typeColumn: "checklist" },
  { id: "cabutKeamanan", numeric: false, disablePadding: false, label: "Cabut Keamanan", typeColumn: "checklist" },
  { id: "statusTerminasi", numeric: false, disablePadding: false, label: "Status Terminasi", typeColumn: "checklist" },
  { id: "perapihanRuang", numeric: false, disablePadding: false, label: "Perapihan Ruang", typeColumn: "checklist" },
  { id: "cabutParameter", numeric: false, disablePadding: false, label: "Cabut Parameter", typeColumn: "checklist" },
  {id : "status",numeric:false,disablePadding:false, label:"Status",typeColumn:"info"},
  { id: "action", numeric: false, disablePadding: false, label: "" },
];
const valueTypeTableTermin = [
  "hide",
  "string","string","string","limit20Left","limit20Left","string","string","string","sla_implementation",
  "cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","statusImplementation",
  "",
];

// (3) Implementation Replace
const titleTableReplace = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  { id: "atmIdlama", numeric: false, disablePadding: false, label: "ATM ID Lama", typeColumn: "info" },
  { id: "mesinlama", numeric: false, disablePadding: false, label: "Mesin Lama", typeColumn: "info" },
  { id: "tglsubmit", numeric: false, disablePadding: false, label: "Tgl Submit", typeColumn: "info" },
  { id: "submitId", numeric: false, disablePadding: false, label: "ID Submit", typeColumn: "info" },
  { id: "locationName", numeric: false, disablePadding: false, label: "Nama Lokasi", typeColumn: "info" },
  { id: "picRequester", numeric: false, disablePadding: false, label: "PIC Req", typeColumn: "info" },
  { id: "readyDate", numeric: false, disablePadding: false, label: "Tgl Ready", typeColumn: "info" },
  { id: "atmIdbaru", numeric: false, disablePadding: false, label: "ATM ID Baru", typeColumn: "info" },
  { id: "mesinBaru", numeric: false, disablePadding: false, label: "Mesin Baru", typeColumn: "info" },
  { id: "notifDate", numeric: false, disablePadding: false, label: "Tgl Notif", typeColumn: "info" },
  { id: "sla", numeric: false, disablePadding: false, label: "SLA", typeColumn: "info" },
  { id: "kebutuhan", numeric: false, disablePadding: false, label: "Kebutuhan", typeColumn: "checklist" },
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "mesin", numeric: false, disablePadding: false, label: "Mesin", typeColumn: "checklist" },
  { id: "booth", numeric: false, disablePadding: false, label: "Booth", typeColumn: "checklist" },
  { id: "keamanan", numeric: false, disablePadding: false, label: "Keamanan", typeColumn: "checklist" },
  { id: "aktivasi", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
  { id: "signage", numeric: false, disablePadding: false, label: "Signage", typeColumn: "checklist" },
   {id : "status",numeric:false,disablePadding:false, label:"Status",typeColumn:"info"},
  { id: "action", numeric: false, disablePadding: false, label: "" },
];
const valueTypeTableReplace = [
  "hide",
  "string","string","string","string","limit20Left","limit20Left","string","string","string",
  "string","sla_implementation",
  "cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","cardStatus","statusImplementation",
  "",
];

// (4) Implementation Migrasi
const titleTableMigrasi = [
  { id: "id", numeric: false, disablePadding: false, label: "ID", typeColumn: "info" },
  { id: "atmId", numeric: false, disablePadding: false, label: "ATM ID", typeColumn: "info" },
  { id: "submitDate", numeric: false, disablePadding: false, label: "Tgl Submit", typeColumn: "info" },
  { id: "submitId", numeric: false, disablePadding: false, label: "ID Submit", typeColumn: "info" },
  { id: "locationName", numeric: false, disablePadding: false, label: "Nama Lokasi", typeColumn: "info" },
  { id: "branch", numeric: false, disablePadding: false, label: "Branch", typeColumn: "info" },
  { id: "machineType", numeric: false, disablePadding: false, label: "Type Mesin", typeColumn: "info" },
  { id: "picRequester", numeric: false, disablePadding: false, label: "PIC Req", typeColumn: "info" },
  { id: "readyDate", numeric: false, disablePadding: false, label: "Tgl Ready", typeColumn: "info" },
  { id: "activationDate", numeric: false, disablePadding: false, label: "Tgl Aktivasi", typeColumn: "info" },
  { id: "idBaru", numeric: false, disablePadding: false, label: "ID Baru", typeColumn: "info" },
  { id: "locationNameNew", numeric: false, disablePadding: false, label: "Nama Lokasi Baru", typeColumn: "info" },
  { id: "flmVendor", numeric: false, disablePadding: false, label: "FLM Vendor", typeColumn: "info" },
  { id: "sla", numeric: false, disablePadding: false, label: "SLA", typeColumn: "info" },
  { id: "parameter", numeric: false, disablePadding: false, label: "Parameter", typeColumn: "checklist" },
  { id: "aktivasi", numeric: false, disablePadding: false, label: "Aktivasi", typeColumn: "checklist" },
   {id : "status",numeric:false,disablePadding:false, label:"Status",typeColumn:"info"},
  { id: "action", numeric: false, disablePadding: false, label: "" },
];
const valueTypeTableMigrasi = [
  "hide",
  "string","string","string","limit20Left","string","string","string",
  "string","string","string","string","string","sla_implementation",
  "cardStatus","cardStatus","statusImplementation",
  "",
];
