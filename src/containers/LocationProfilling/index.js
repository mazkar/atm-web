/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Button, Grid, Tabs, Tab, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import moment from 'moment';
import { ReactComponent as BackIcon } from "../../assets/icons/general/arrow_back_red.svg";
import { ChkyButtons } from "../../components";
import constansts from "../../helpers/constants";
import LocationInformasiUmum from "./LocationInformasiUmum";
import LocationDetailAtm from "./LocationDetailAtm";
import LocationBiayaSewa from "./LocationBiayaSewa";
import LeaveLocationPopUp from "./LeaveLocationPopUp";
import SuccessModal from "./SuccessModal";
import ModalLoader from "../../components/ModalLoader";
import { RootContext } from "../../router";
import { useEmailValidation } from "../../helpers";
import LoadingView from "../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  title: { fontSize: 36, fontWeight: 500, color: constansts.color.dark },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  buttonActionContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

// TABS PANEL COMPONENT

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: constansts.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constansts.color.grayMedium,
    "&:hover": {
      color: constansts.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constansts.color.dark,
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

const LocationProfilling = ({ history }) => {
  const classes = useStyles();
  const { userId } = useContext(RootContext);

  // GET QUERY URL VALUE
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const openingType = urlParams.get("openingType");
  const savedId = urlParams.get("savedId");
  const atmID = urlParams.get("atmId");

  // INIT TOP STATE
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // Init TABS Value
  const [valueTab, setValueTab] = useState(0);
  const handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  function handleNextButton() {
    setValueTab(valueTab + 1);
  }

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOnLeaveDialog = () => navigateToPage("/acquisition");

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);

  const navigateToPage = (to) => history.push(to);

  const handleSaveLocation = () => {
    saveProfiling();
  };

  const handleInformasiUmum = (e) => {
    setParamSaveProfiling(e);
    // console.log("+++ ? DATA INFORMASI UMUM : ", e);
  };
  const handleDetailATM = (e) => {
    setParamDetailATM(e);
    // console.log("+++ ? DATA DETIL ATM : ", e);
  };
  const handleBiayaSewaLokasi = (e) => {
    setParamBiayaSewaLokasi(e);
    // console.log("<><> BIAYA SEWA LOKASI : ", e);
  };

  const [paramProfiling, setParamSaveProfiling] = useState(
    defaultParamProfiling
  );
  const [paramDetailATM, setParamDetailATM] = useState(defaultParamDetailATM);
  const [paramBiayaSewaLokasi, setParamBiayaSewaLokasi] = useState(
    defaultParamBiayaSewa
  );

  const [costList, setCostList] = useState([]);
  const [flatCost, setFlatCost] = useState(true);
  const [startDate, setStartDate] = useState(+moment());
  const [endDate, setEndDate] = useState(+moment());

  const rentRange = countRentRange(startDate, endDate);
  const [rangeYears] = rentRange;
  const inputLength = calculateLength(rangeYears, flatCost);

  function handleChangeDate(start, end){
    // khusus user interactionlet newCostList;
    const range = countRentRange(start, end);
    const [years] = range;
    const newInputLength = calculateLength(years, flatCost);
    if(costList.length > newInputLength){
      // mengurangi
      const newCostList = costList.filter((val,i)=>i<newInputLength);
      setCostList(newCostList);
    } else if (costList.length < newInputLength){
      // menambah
      const newCostList = [...Array(newInputLength)].map((val,i)=>flatCost ? costList[0] : costList[i]||0);
      setCostList(newCostList);
    }
  }

  useEffect(() => {
    if(flatCost){
      const newCostList = [...Array(inputLength)].fill(costList[0]);
      // console.log("<><> newCostList", newCostList);
      setCostList(newCostList);
    }
    // console.log('change flatcost to', flatCost);
  }, [flatCost]);

  // useEffect(() => {
  //   console.log('>>> paramProfiling', paramProfiling);
  // }, [paramProfiling]);

  const [isATMBusiness, setIsATMBusiness] = useState(false);
  const [isAddMachine, setIsAddMachine] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);

  useEffect(() => {
    // if (openingType == "addMachine") {
  // console.log("atm ID", atmID);
    if (atmID !== "null" && atmID !== "" && openingType == "addMachine") {
      getAddmachineData(atmID, savedId);
      setIsAddMachine(true);
    } else {
      getDraftDetail(savedId);
    }
  }, []);

  const getDraftDetail = async (idDraft) => {
    try {
      // toggleCloseDrawer();
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftDetail`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          id: idDraft,
        },
      });
      // console.log("ID DRAFT : ", data);
      const resItem = data.data.detailData;
      if (resItem) {
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(resItem));
        mapData(resItem);
        if (resItem.locationMode === "ON") {
          setIsMandatory(true);
        } else if (resItem.modelTeam === "Prominent") {
          setIsMandatory(true);
        }
      } else {
        alert(data.data.responseMessage);
        // history.goBack();
        localStorage.removeItem("dataGetDraftDetail");
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert("Internal Server Error");
      // history.goBack();
      localStorage.removeItem("dataGetDraftDetail");
    }
  };

  const getAddmachineData = async (atmId, savedId) => {
    try {
      // toggleCloseDrawer();
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDataNewMachine`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId,
          id: parseInt(savedId),
        },
      });
      const resItem = data.data.detailData;
      if (resItem) {
        mapData(resItem);
        if (resItem.locationMode === "ON") {
          setIsMandatory(true);
        } else if (resItem.modelTeam === "Prominent") {
          setIsMandatory(true);
        }
      } else {
        alert(data.data.responseMessage);
        // history.goBack();
        localStorage.removeItem("dataGetDraftDetail");
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert("Internal Server Error");
      // history.goBack();
      localStorage.removeItem("dataGetDraftDetail");
    }
  };

  const mapData = (parseItem) => {
  // console.log("<><>");
  // console.log("<><> parseItem", parseItem);
    // set data profiling
    const paramProfiling = defaultParamProfiling;
    paramProfiling.locationId = parseItem.locationId || "";
    paramProfiling.newLocation = parseItem.newLocation;
    paramProfiling.visitorPerDay = parseItem.visitorPerDay || "";
    paramProfiling.codeGFMS = parseItem.codeGFMS || "";
    paramProfiling.branchInitial = parseItem.branchInitial || "";
    paramProfiling.recommendation = parseItem.recommendation || "";
    paramProfiling.namePicLocation = parseItem.namePicLocation || "";
    paramProfiling.telephoneNumberPicLocation =
      parseItem.telephoneNumberPicLocation || "";
    paramProfiling.addressPicLocation = parseItem.addressPicLocation || "";
    paramProfiling.emailPicLocation = parseItem.emailPicLocation || "";
    paramProfiling.nameBank = parseItem.nameBank || "";
    paramProfiling.noRekeningPic = parseItem.noRekeningPic || "";
    paramProfiling.nameRekeningPic = parseItem.nameRekeningPic || "";
    paramProfiling.nameLandlord = parseItem.nameLandlord || "";
    paramProfiling.numberTelephoneLandlord =
      parseItem.numberTelephoneLandlord || "";
    paramProfiling.emailLandlord = parseItem.emailLandlord || "";
    paramProfiling.corporateTypeLandlord =
      parseItem.corporateTypeLandlord || "";
    paramProfiling.corporateAddressLandlord =
      parseItem.corporateAddressLandlord || "";
    paramProfiling.informationRequester =
      parseItem.informationRequester || "";
    paramProfiling.openingType = parseItem.openingType || "";
    // data tidak perlu ke BE
    paramProfiling.dataATM = parseItem.findNearbyAtmResponse.atmPoints;
    paramProfiling.position = [parseItem.latitude, parseItem.longitude];
    paramProfiling.isDisableIdRequester = !(
      parseItem.locationId === null || parseItem.locationId === ""
    );
    paramProfiling.locationMode = parseItem.locationMode;
    paramProfiling.isChangeData = true;

    paramProfiling.nameRequester = parseItem.nameRequester || "";
    paramProfiling.telephoneNumberRequester =
      parseItem.telephoneNumberRequester || "";
    paramProfiling.emailRequester = parseItem.emailRequester || "";
    paramProfiling.nameBusinessEntity = parseItem.nameBusinessEntity || "";
    
    //  onChangeData(paramProfiling);
    setParamSaveProfiling(paramProfiling);
    // console.log("param requester", parseItem.requester);
    if (parseItem.requester === "ATM Business") {
      setIsATMBusiness(true);
      getRequester(paramProfiling);
    }

    // set data detail
    let newParamDetailAtm = defaultParamDetailATM;
    newParamDetailAtm = {
      locationType: parseItem.locationType || "",
      boothType: parseItem.boothType || "",
      buildingLarge: parseItem.buildingLarge || "",
      publicAccessibility: parseItem.publicAccessibility || "",
      mediaPromotion: parseItem.mediaPromotion || [],
      aroundAtmBankList: parseItem.aroundAtmBank || [],
      aroundAtmBank: convertArrayStringToArrayObjectATMBankList(
        parseItem.aroundAtmBank || []
      ),
      publicAccessibilityNote: parseItem.publicAccessibilityNote || "",
      startWorkHour: parseItem.startWorkHour || "",
      endWorkHour: parseItem.endWorkHour || "",
      denom: parseItem.denom || "",
      acType: parseItem.acType || "",
      cleanType: parseItem.cleanType || "",
      commType: parseItem.commType || "",
      mediaPromotionNote: parseItem.mediaPromotionNote || "",
      locationMachinePhotos: parseItem.locationMachinePhotos || "",
      locationFrontMachinePhoto: parseItem.locationFrontMachinePhoto || "",
      locationPhotosLayout: parseItem.locationPhotosLayout || "",
      locationPhotosPositionNeonSign:
        parseItem.locationPhotosPositionNeonSign || "",
      locationPhotosPositionAtenaVsat:
        parseItem.locationPhotosPositionAtenaVsat || "",
      isChangeData: true,
    };
    setParamDetailATM(newParamDetailAtm);

    // set data param biaya
    let newParamBiayaSewa = defaultParamBiayaSewa;
    newParamBiayaSewa = {
      startRentDate: parseItem.startRentDate || "",
      endRentDate: parseItem.endRentDate || "",
      offeringFilesPath: parseItem.offeringFilesPath || "",
      paymentType: parseItem.paymentType || "Full-Payment",
      electricityType: parseItem.electricityType || "-",
      yearlyRentCostList: parseItem.yearlyRentCostList || [],
      numberMeterElectricity: parseItem.numberMeterElectricity || "",
      electricityOwnerName: parseItem.electricityOwnerName || "",
      yearlyRentCost: parseItem.yearlyRentCost || 0,
      yearlyElectricityCost: parseItem.yearlyElectricityCost || "0",
      antenaLandCost: parseItem.antenaLandCost || "0",
      yearlyServiceCharge: parseItem.yearlyServiceCharge || "0",
      yearlySignageCost: parseItem.yearlySignageCost || "0",
      notaryCost: parseItem.notaryCost || "0",
      promotionCost: parseItem.promotionCost || "0",
      consessionCost: parseItem.consessionCost || "0",
      otherCost: parseItem.otherCost || "0",
      depositRent: parseItem.depositRent || "0",
      depositElectricity: parseItem.depositElectricity || "0",
      depositServiceCharge: parseItem.depositServiceCharge || "0",
      depositOthers: parseItem.depositOthers || "0",
      rentInfoNote: parseItem.rentInfoNote || "0",
      flatCost: parseItem.flatCost,
      // data yang tidak dipakai di BE
    };

    setCostList(parseItem.yearlyRentCostList || []);
    // console.log("<><> parseItem.yearlyRentCostList", parseItem.yearlyRentCostList);
    const {startRentDate, endRentDate}=parseItem;
    // const rangeYear = countRentRange(startRentDate, endRentDate);
    // setCostList(
    //   parseItem.flatCost
    //     ? [...Array(rangeYear[0]).fill(parseItem.yearlyRentCost)]
    //     : parseItem.yearlyRentCostList || []
    // );
    setStartDate(startRentDate || '');
    setEndDate(endRentDate || '');
    setFlatCost(parseItem.flatCost);
    setParamBiayaSewaLokasi(newParamBiayaSewa);
  };
  
  const getRequester = (paramProfiling) => {
    Axios({
      url: `${constansts.userServiceBaseUrl}/users/profile`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
          const newParam = {
            ...paramProfiling,
            nameRequester: res.data.data.fullName,
            telephoneNumberRequester: res.data.data.phoneNumber,
            emailRequester: res.data.data.email,
            isDisable: true,
          };
          // console.log("change data global informasi umum newParam", newParam);
          setParamSaveProfiling(newParam);
        }
      })
      .catch((err) => console.log(err));
  };

  const saveProfiling = async () => {
    // var idProf = localStorage.getItem('profilingId', idSaveSurvei);
    try {
      // get id draft
      const newProfiling = { ...paramProfiling };
      const newParamDetailATM = { ...paramDetailATM };
      delete newParamDetailATM.aroundAtmBank;
      delete newParamDetailATM.isChangeData;
      // delete newParamDetailATM["locationPhotosLayout"]; // <=== sementara
      delete newProfiling.isChangeData;
      delete newProfiling.locationId;
      delete newProfiling.isDisable;
      delete newProfiling.isDisableIdRequester;
      delete newProfiling.dataATM;
      delete newProfiling.position;
      delete newProfiling.locationMode;
      const param = {
        id: savedId,
        userId,
        ...newProfiling,
        ...newParamDetailATM,
        ...paramBiayaSewaLokasi,
        startRentDate: startDate,
        endRentDate: endDate,
        flatCost,
        yearlyRentCostList: costList

      };
      // console.log(param);
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveProfilling`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: param,
      });
      // console.log("Save Profiling Data : ", data);
      setModalLoader(false);
      navigateToPage("/acquisition/savedLocation");
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Save Profiling Service : \n ${error}`);
    }
  };

  const submitProfiling = async () => {
    // var idProf = localStorage.getItem('profilingId', idSaveSurvei);
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      // get id draft
      const newProfiling = { ...paramProfiling };
      const newParamDetailATM = { ...paramDetailATM };
      delete newParamDetailATM.aroundAtmBank;
      // delete newParamDetailATM["locationPhotosLayout"]; // <=== sementara
      delete newParamDetailATM.isChangeData;
      delete newProfiling.isChangeData;
      delete newProfiling.locationId;
      delete newProfiling.isDisable;
      delete newProfiling.isDisableIdRequester;
      delete newProfiling.dataATM;
      delete newProfiling.position;
      delete newProfiling.locationMode;
      const param = {
        id: savedId,
        userId,
        ...newProfiling,
        ...newParamDetailATM,
        ...paramBiayaSewaLokasi,
        startRentDate: startDate,
        endRentDate: endDate,
        flatCost,
        yearlyRentCostList: costList
      };
      // console.log("Submit Profiling Data : ", param);
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitProfilling`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: param,
      });
      setModalLoader(false);
      setOpenSuccessModal(true);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Submit Profiling Service : \n ${error}`);
      if(error == 'Error: Network Error'){
        alert('You are not connected to the Internet, please check your connection');
      }else{
        alert(`There is an error ${error}`);
      }
    }
  };

  const postPhoneProfiling = async () => {
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      // get id draft
      const newProfiling = { ...paramProfiling };
      const newParamDetailATM = { ...paramDetailATM };
      delete newParamDetailATM.aroundAtmBank;
      delete newParamDetailATM.isChangeData;
      // delete newParamDetailATM["locationPhotosLayout"]; // <=== sementara
      delete newProfiling.isChangeData;
      delete newProfiling.locationId;
      delete newProfiling.isDisable;
      delete newProfiling.isDisableIdRequester;
      delete newProfiling.dataATM;
      delete newProfiling.position;
      delete newProfiling.locationMode;
      const param = {
        id: savedId,
        userId,
        ...newProfiling,
        ...newParamDetailATM,
        ...paramBiayaSewaLokasi,
      };
      // var param = {
      //   id: parseItem.id,
      //   userId: userId,
      //   ...paramProfiling,
      //   ...paramDetailATM,
      //   ...paramBiayaSewaLokasi,
      // };
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/postPhoneProfilling`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: param,
      });
      // console.log("Submit Profiling Data : ", data);
      setModalLoader(false);
      navigateToPage("/acquisition/reject");
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Submit Profiling Service : \n ${error}`);
    }
  };

  const [errorFormInfoUmum, setErrorFormInfoUmum] = useState({
    locationName: false,
    visitorPerDay: false,
    codeGFMS: false,
    branchInitial: false,
    namePicLocation: false,
    telephoneNumberPicLocation: false,
    emailPicLocation: false,
    // addressPicLocation: false,
    nameLandlord: false,
    // telephoneNumberLandlord: false,
    numberTelephoneLandlord: false,
    emailLandlord: false,
    corporateTypeLandlord: false,
    corporateAddressLandlord: false,
  });
  const [errorFormDetailAtm, setErrorFormDetailAtm] = useState({
    locationType: false,
    boothType: false,
    buildingLarge: false,
    startWorkHour: false,
    endWorkHour: false,
    denom: false,
    acType: false,
    cleanType: false,
    commType: false,
  });
  const [errorFormBiaya, setErrorFormBiaya] = useState({
    startRentDate: false,
    endRentDate: false,
    yearlyRentCostList: false,
    electricityType: false,
    // numberMeterElectricity: false,
    // electricityOwnerName: false,
    yearlyElectricityCost: false,
    antenaLandCost: false,
    yearlyServiceCharge: false,
    yearlySignageCost: false,
    notaryCost: false,
    promotionCost: false,
    consessionCost: false,
    depositRent: false,
    depositElectricity: false,
    depositServiceCharge: false,
  });
  const handleSubmitProfiling = () => {
    // >>>>>>>>>> START VALIDATION <<<<<<<<<<
    // HANDLING ERROR
    function handleError(state, keyname, bool) {
      // eslint-disable-next-line default-case
      switch (state) {
      case "InfoUmum":
        setErrorFormInfoUmum((prevVal) => {
          return {
            ...prevVal,
            [keyname]: bool,
          };
        });
        break;
      case "DetailAtm":
        setErrorFormDetailAtm((prevVal) => {
          return {
            ...prevVal,
            [keyname]: bool,
          };
        });
        break;
      case "Biaya":
        setErrorFormBiaya((prevVal) => {
          return {
            ...prevVal,
            [keyname]: bool,
          };
        });
        break;
      }
    }
    function infoUmumValidator() {
      // <<<<<<<<< (1) errorFormInfoUmum >>>>>>>>>>>>
      let errorCount = 0;
      // newLocation
      const newLocations = paramProfiling.newLocation.split(".");
      const lastNewLocationName = newLocations[newLocations.length - 1];
      if (lastNewLocationName === "") {
        handleError("InfoUmum", "locationName", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "locationName", false);
      }
      // visitorPerDay
      if (
        paramProfiling.visitorPerDay === "" ||
        paramProfiling.visitorPerDay === null
      ) {
        handleError("InfoUmum", "visitorPerDay", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "visitorPerDay", false);
      }

      // ******************************************************************
      if (isMandatory) {
        // codeGFMS
        if (paramProfiling.codeGFMS === "") {
          // handleError("InfoUmum", "codeGFMS", true);
          // errorCount += 1;
          if (
            paramProfiling.locationMode == "OP" ||
            (paramProfiling.locationMode == "ON" &&
              paramProfiling.machineType == "ATM")
          ) {
            handleError("InfoUmum", "codeGFMS", true);
            errorCount += 1;
          }
        } else {
          handleError("InfoUmum", "codeGFMS", false);
        }
        // branchInitial
        if (paramProfiling.branchInitial === "") {
          // handleError("InfoUmum", "branchInitial", true);
          // errorCount += 1;
          if (
            paramProfiling.locationMode == "OP" ||
            (paramProfiling.locationMode == "ON" &&
              paramProfiling.machineType == "ATM")
          ) {
            handleError("InfoUmum", "branchInitial", true);
            errorCount += 1;
          }
        } else {
          handleError("InfoUmum", "branchInitial", false);
        }
      }

      // *****************************************************************
      if (!isATMBusiness) {
        // nameRequester
        if (paramProfiling.nameRequester === "") {
          handleError("InfoUmum", "nameRequester", true);
          errorCount += 1;
        } else {
          handleError("InfoUmum", "nameRequester", false);
        }
        // telephoneNumberPicLocation
        if (paramProfiling.telephoneNumberRequester === "") {
          handleError("InfoUmum", "telephoneNumberRequester", true);
          errorCount += 1;
        } else {
          handleError("InfoUmum", "telephoneNumberRequester", false);
        }
        // emailRequester
        if (
          paramProfiling.emailRequester === "" ||
          useEmailValidation(paramProfiling.emailRequester) === false
        ) {
          handleError("InfoUmum", "emailRequester", true);
          errorCount += 1;
        } else {
          handleError("InfoUmum", "emailRequester", false);
        }
      }
      // namePicLocation
      if (paramProfiling.namePicLocation === "") {
        handleError("InfoUmum", "namePicLocation", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "namePicLocation", false);
      }
      // telephoneNumberPicLocation
      if (paramProfiling.telephoneNumberPicLocation === "") {
        handleError("InfoUmum", "telephoneNumberPicLocation", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "telephoneNumberPicLocation", false);
      }
      // emailPicLocation
      if (
        paramProfiling.emailPicLocation === "" ||
        useEmailValidation(paramProfiling.emailPicLocation) === false
      ) {
        handleError("InfoUmum", "emailPicLocation", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "emailPicLocation", false);
      }
      // addressPicLocation
      // if (paramProfiling.addressPicLocation === "") {
      //   handleError("InfoUmum", "addressPicLocation", true);
      //   errorCount += 1;
      // } else {
      //   handleError("InfoUmum", "addressPicLocation", false);
      // }
      // nameLandlord
      if (paramProfiling.nameLandlord === "") {
        handleError("InfoUmum", "nameLandlord", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "nameLandlord", false);
      }

      // *****************************************************************
      if (!isAddMachine) {
        // telephoneNumberLandlord
        // if (paramProfiling.telephoneNumberLandlord === "") {
        //   handleError("InfoUmum", "telephoneNumberLandlord", true);
        //   errorCount += 1;
        // } else {
        //   handleError("InfoUmum", "telephoneNumberLandlord", false);
        // }
        if (paramProfiling.numberTelephoneLandlord === "") {
          handleError("InfoUmum", "numberTelephoneLandlord", true);
          errorCount += 1;
        } else {
          handleError("InfoUmum", "numberTelephoneLandlord", false);
        }
        // emailLandlord
        if (
          paramProfiling.emailLandlord === "" ||
          useEmailValidation(paramProfiling.emailLandlord) === false
        ) {
          handleError("InfoUmum", "emailLandlord", true);
          errorCount += 1;
        } else {
          handleError("InfoUmum", "emailLandlord", false);
        }
        // corporateAddressLandlord
        // if (paramProfiling.corporateAddressLandlord === "") {
        //   handleError("InfoUmum", "corporateAddressLandlord", true);
        //   errorCount += 1;
        // } else {
        //   handleError("InfoUmum", "corporateAddressLandlord", false);
        // }
      }

      // corporateTypeLandlord
      if (
        paramProfiling.corporateTypeLandlord === "" ||
        paramProfiling.corporateTypeLandlord === "- Pilih Jenis Badan Usaha -"
      ) {
        handleError("InfoUmum", "corporateTypeLandlord", true);
        errorCount += 1;
      } else {
        handleError("InfoUmum", "corporateTypeLandlord", false);
      }

      return errorCount;
    }

    // <<<<<<<<< errorFormDetailAtm >>>>>>>>>>>>
    function detailAtmValidator() {
      let errorCount = 0;
      // locationType
      if (
        paramDetailATM.locationType === "" ||
        paramDetailATM.locationType === "-" ||
        paramDetailATM.locationType === null
      ) {
        handleError("DetailAtm", "locationType", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "locationType", false);
      }

      // boothType
      if (paramDetailATM.boothType === "" || paramDetailATM.boothType === "-") {
        handleError("DetailAtm", "boothType", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "boothType", false);
      }
      // buildingLarge
      if (paramDetailATM.buildingLarge === "") {
        handleError("DetailAtm", "buildingLarge", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "buildingLarge", false);
      }
      // startWorkHour
      if (paramDetailATM.startWorkHour === "") {
        handleError("DetailAtm", "startWorkHour", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "startWorkHour", false);
      }
      // endWorkHour
      if (paramDetailATM.endWorkHour === "") {
        handleError("DetailAtm", "endWorkHour", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "endWorkHour", false);
      }
      // denom
      if (paramDetailATM.denom === "" || paramDetailATM.denom === "-") {
        handleError("DetailAtm", "denom", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "denom", false);
      }
      // acType
      if (
        paramDetailATM.acType === "" ||
        paramDetailATM.acType === "-"
      ) {
        handleError("DetailAtm", "acType", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "acType", false);
      }
      // cleanType
      if (
        paramDetailATM.cleanType === "" ||
        paramDetailATM.cleanType === "- Include / Exclude -"
      ) {
        handleError("DetailAtm", "cleanType", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "cleanType", false);
      }
      // commType
      if (
        paramDetailATM.commType === "" ||
        paramDetailATM.commType === "- Pilih Jenis Komunikasi -"
      ) {
        handleError("DetailAtm", "commType", true);
        errorCount += 1;
      } else {
        handleError("DetailAtm", "commType", false);
      }
      return errorCount;
    }

    // <<<<<<<<< errorFormBiaya >>>>>>>>>>>>
    function biayaSewaValidator() {
      let errorCount = 0;
      // startRentDate
      if (startDate === "") {
        handleError("Biaya", "startRentDate", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "startRentDate", false);
      }

      // endRentDate
      if (endDate === "") {
        handleError("Biaya", "endRentDate", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "endRentDate", false);
      }
      // yearlyRentCostList
      if (costList.length < 1) {
        handleError("Biaya", "yearlyRentCostList", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "yearlyRentCostList", false);
      }
      // electricityType
      if (
        paramBiayaSewaLokasi.electricityType === "" ||
        paramBiayaSewaLokasi.electricityType === "- Pilih jenis listrik -" ||
        paramBiayaSewaLokasi.electricityType === "-"
      ) {
        handleError("Biaya", "electricityType", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "electricityType", false);
      }
      // // numberMeterElectricity
      // if (paramBiayaSewaLokasi.numberMeterElectricity === "") {
      //   handleError("Biaya", "numberMeterElectricity", true);
      //   errorCount += 1;
      // } else {
      //   handleError("Biaya", "numberMeterElectricity", false);
      // }
      // // electricityOwnerName
      // if (paramBiayaSewaLokasi.electricityOwnerName === "") {
      //   handleError("Biaya", "electricityOwnerName", true);
      //   errorCount += 1;
      // } else {
      //   handleError("Biaya", "electricityOwnerName", false);
      // }
      // yearlyElectricityCost
      if (paramBiayaSewaLokasi.yearlyElectricityCost === "") {
        handleError("Biaya", "yearlyElectricityCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "yearlyElectricityCost", false);
      }
      // antenaLandCost
      if (paramBiayaSewaLokasi.antenaLandCost === "") {
        handleError("Biaya", "antenaLandCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "antenaLandCost", false);
      }
      // yearlyServiceCharge
      if (paramBiayaSewaLokasi.yearlyServiceCharge === "") {
        handleError("Biaya", "yearlyServiceCharge", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "yearlyServiceCharge", false);
      }
      // yearlySignageCost
      if (paramBiayaSewaLokasi.yearlySignageCost === "") {
        handleError("Biaya", "yearlySignageCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "yearlySignageCost", false);
      }
      // notaryCost
      if (paramBiayaSewaLokasi.notaryCost === "") {
        handleError("Biaya", "notaryCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "notaryCost", false);
      }
      // promotionCost
      if (paramBiayaSewaLokasi.promotionCost === "") {
        handleError("Biaya", "promotionCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "promotionCost", false);
      }
      // consessionCost
      if (paramBiayaSewaLokasi.consessionCost === "") {
        handleError("Biaya", "consessionCost", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "consessionCost", false);
      }
      // depositRent
      if (paramBiayaSewaLokasi.depositRent === "") {
        handleError("Biaya", "depositRent", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "depositRent", false);
      }
      // depositElectricity
      if (paramBiayaSewaLokasi.depositElectricity === "") {
        handleError("Biaya", "depositElectricity", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "depositElectricity", false);
      }
      // depositServiceCharge
      if (paramBiayaSewaLokasi.depositServiceCharge === "") {
        handleError("Biaya", "depositServiceCharge", true);
        errorCount += 1;
      } else {
        handleError("Biaya", "depositServiceCharge", false);
      }
      return errorCount;
    }

    const errorInfoUmumCounter = infoUmumValidator();
    const errorDetailAtmCounter = detailAtmValidator();
    const biayaSewaCounter = biayaSewaValidator();
    // >>>>>>>>>> FINISH VALIDATION <<<<<<<<<<

    const totalErrorCount =
      errorInfoUmumCounter + errorDetailAtmCounter + biayaSewaCounter;
    // console.log(">>>> errorInfoUmumCounter: ", errorInfoUmumCounter);
    // console.log(">>>> errorDetailAtmCounter: ", errorDetailAtmCounter);
    // console.log(">>>> biayaSewaCounter: ", biayaSewaCounter);
    // console.log(">>>> totalErrorCount: ", totalErrorCount);

    if (totalErrorCount > 0) {
      alert("Some fields empty, please fill all required field.");
    } else {
      submitProfiling();
    }
  };

  // useEffect(() => {
  // // console.log('>>> errorFormBiaya,errorFormDetailAtm,errorFormInfoUmum', errorFormBiaya,errorFormDetailAtm,errorFormInfoUmum)
  // }, [errorFormBiaya, errorFormDetailAtm, errorFormInfoUmum]);

  const CancelButton = () => (
    <ChkyButtons
      buttonType='redOutlined'
      onClick={() => {
        handleOpenDialog();
      }}
    >
      Cancel
    </ChkyButtons>
  );

  const SaveButton = () => (
    <ChkyButtons
      buttonType='redOutlined'
      onClick={() => {
        handleSaveLocation();
      }}
    >
      Save Location
    </ChkyButtons>
  );

  const NextButton = () => (
    <ChkyButtons
      onClick={
        valueTab < 2
          ? handleNextButton
          : () => {
            handleSubmitProfiling();
          }
      }
    >
      {valueTab === 2 ? 'Submit' : 'Next'}
    </ChkyButtons>
  );

  return isOpenModalLoader ? (
    <LoadingView maxheight="100%" />
  ) : (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container>
            {/* BUTTON BACK */}
            <div className={classes.backAction}>
              <Button
                onClick={() => {
                  history.goBack();
                  localStorage.removeItem("dataGetDraftDetail");
                  localStorage.setItem("resetProf2Info", true);
                  localStorage.setItem("resetProf2Detail", true);
                  localStorage.setItem("resetProf2Maintenance", true);
                }}
              >
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: 10 }}>
          <Typography className={classes.title}>Profiling</Typography>
        </Grid>
        {/* TABS and CONTENT PANEL */}
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              {/* TABS */}
              <ContentTabs
                value={valueTab}
                onChange={handleChangeTab}
                aria-label="content tabs"
              >
                <ContentTab label="Informasi Umum" {...a11yProps(0)} />
                <ContentTab label="Detail ATM" {...a11yProps(1)} />
                <ContentTab
                  label="Biaya Sewa dan Pemeliharaan"
                  {...a11yProps(2)}
                />
              </ContentTabs>
            </Grid>
            {/* TAB PANEL CONTENT */}
            <Grid item>
              <TabPanel
                value={valueTab}
                index={0}
                className={classes.tabContent}
              >
                <LocationInformasiUmum
                  dataValue={paramProfiling}
                  onChangeData={handleInformasiUmum}
                  errorForm={errorFormInfoUmum}
                />
              </TabPanel>
              <TabPanel
                value={valueTab}
                index={1}
                className={classes.tabContent}
              >
                <LocationDetailAtm
                  dataValue={paramDetailATM}
                  onChangeData={handleDetailATM}
                  errorForm={errorFormDetailAtm}
                />
              </TabPanel>
              <TabPanel
                value={valueTab}
                index={2}
                className={classes.tabContent}
              >
                <LocationBiayaSewa
                  dataValue={paramBiayaSewaLokasi}
                  onChangeData={handleBiayaSewaLokasi}
                  errorForm={errorFormBiaya}
                  {...{
                    costList,
                    setCostList,
                    flatCost,
                    setFlatCost,
                    startDate,
                    setStartDate,
                    endDate,
                    setEndDate,
                    rentRange,
                    handleChangeDate
                  }}
                />
              </TabPanel>
            </Grid>
            <Grid item className={classes.buttonActionContainer}>
              {valueTab === 2 ? (
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <CancelButton />
                  </Grid>
                  <Grid item>
                    <SaveButton />
                  </Grid>
                  <Grid item>
                    <NextButton />
                  </Grid>
                </Grid>
              ) : (
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Grid container justify="flex-start">
                      <Grid item style={{ margin: 10 }}>
                        <CancelButton />
                      </Grid>
                      <Grid item style={{ margin: 10 }}>
                        <SaveButton />
                      </Grid>
                      <Grid item style={{ margin: 10 }}>
                        <ChkyButtons
                          buttonType="redOutlined"
                          onClick={() => postPhoneProfiling()}
                        >
                          Postpone
                        </ChkyButtons>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <NextButton />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LeaveLocationPopUp
        isOpen={openDialog}
        onSubmit={saveProfiling}
        onClose={handleCloseDialog}
        onLeave={handleOnLeaveDialog}
      />
      <SuccessModal
        isOpen={openSuccessModal}
        onClose={()=>window.location.assign("/acquisition")}
        onLeave={() => {
          const cachedItem = localStorage.getItem("dataGetDraftDetail");
          if (cachedItem) {
            localStorage.removeItem("dataGetDraftDetail");
          }
          window.location.assign("/negotiation");
        }}
      />
    </div>
  );
};

const defaultParamProfiling = {
  newLocation: "xxx.xxx.",
  visitorPerDay: "",
  locationId: "", // hapus id location
  codeGFMS: "",
  branchInitial: "",
  nameRequester: "",
  nameBranchOtherBuRequester: "",
  namePicLocation: "",
  nameLandlord: "",
  nameBusinessEntity: "",
  telephoneNumberRequester: "",
  emailRequester: "",
  telephoneNumberPicLocation: "",
  emailPicLocation: "",
  // telephoneNumberLandlord: "",
  numberTelephoneLandlord: "",
  emailLandlord: "",
  informationRequester: "",
  addressPicLocation: "",
  corporateAddressLandlord: "",
  recommendation: "",
  corporateTypeLandlord: "",
  openingType: "",
  nameBank: "",
  noRekeningPic: "",
  nameRekeningPic: "",
  mediaPromotionNote: "",
  locationMachinePhotos: "",
  locationFrontMachinePhoto: "",
  locationPhotosPositionNeonSign: "",
  locationPhotosPositionAtenaVsat: "",
  // tidak perlu dikirim ke BE
  isChangeData: false,
  isDisableIdRequester: false,
  isDisable: false,
};

const defaultParamDetailATM = {
  locationType: "",
  boothType: "",
  buildingLarge: "",
  publicAccessibility: "",
  mediaPromotion: [],
  aroundAtmBankList: [],
  publicAccessibilityNote: "",
  startWorkHour: "",
  endWorkHour: "",
  denom: "",
  acType: "",
  cleanType: "",
  commType: "",
  mediaPromotionNote: "",
  locationMachinePhotos: "",
  locationFrontMachinePhoto: "",
  locationPhotosPositionNeonSign: "",
  locationPhotosPositionAtenaVsat: "",
  locationPhotosLayout: "",
  // tidak dikirim ke BE
  isChangeData: false,
  aroundAtmBank: [],
};

const defaultParamBiayaSewa = {
  startRentDate: "", // <----- e.q 1618160400000 (timestamp milisecond)
  endRentDate: "", // <----- e.q 1681405200000 (timestamp milisecond)
  offeringFilesPath: "",
  paymentType: "Full-Payment",
  electricityType: "-",
  yearlyRentCostList: [],
  numberMeterElectricity: "",
  electricityOwnerName: "",
  yearlyRentCost: 0,
  yearlyElectricityCost: "0",
  antenaLandCost: "0",
  yearlyServiceCharge: "0",
  yearlySignageCost: "0",
  notaryCost: "0",
  promotionCost: "0",
  consessionCost: "0",
  otherCost: "0",
  depositRent: "0",
  depositElectricity: "0",
  depositServiceCharge: "0",
  depositOthers: "0",
  rentInfoNote: "",
  flatCost: false,
};

function convertArrayObjToArrayStringATMBankList(data) {
  const newArr = [];
  data.map((item) => {
    newArr.push(item.title);
  });
  // console.log("new arr atm bank", newArr);
  return newArr;
}

function convertArrayStringToArrayObjectATMBankList(data) {
  const newArr = [];
  data.map((item) => {
    const newItem = itemList.find((obj) => obj.title === item);
    newArr.push(newItem);
  });
  return newArr;
}

export const itemList = [
  { title: "BANK BRI", code: "002" },
  { title: "BANK BCA", code: "014" },
  { title: "BANK MANDIRI", code: "008" },
  { title: "BANK BNI", code: "009" },
  { title: "BANK BNI SYARIAH", code: "427" },
  { title: "BANK SYARIAH MANDIRI (BSM)", code: "451" },
  { title: "BANK CIMB NIAGA", code: "022" },
  { title: "BANK CIMB NIAGA SYARIAH", code: "022" },
  { title: "BANK MUAMALAT", code: "147" },
  { title: "BANK BTPN", code: "213" },
  { title: "BANK BTPN SYARIAH", code: "547" },
  { title: "BANK PERMATA", code: "013" },
  { title: "BANK PERMATA SYARIAH", code: "013" },
  { title: "BANK DBS INDONESIA", code: "046" },
  { title: "DIGIBANK", code: "046" },
  { title: "BANK BRI SYARIAH", code: "422" },
  { title: "BANK BTN", code: "200" },
  { title: "BANK DANAMON", code: "011" },
  { title: "BANK MAYBANK (BII)", code: "016" },
  { title: "BANK MEGA", code: "426" },
  { title: "BANK SINARMAS", code: "153" },
  { title: "BANK COMMONWEALTH", code: "950" },
  { title: "BANK OCBC NISP", code: "028" },
  { title: "BANK BUKOPIN", code: "441" },
  { title: "BANK BUKOPIN SYARIAH", code: "521" },
  { title: "BANK BCA SYARIAH", code: "536" },
  { title: "BANK LIPPO", code: "026" },
  { title: "CITIBANK", code: "031" },
];

export default withRouter(LocationProfilling);

export function countRentRange(start, end) {
  if (start === "" || end === "") {
    return [0, 0];
  }
  const mulaiSewa = moment(start);
  const selesaiSewa = moment(end).add(1, "days");
  // years
  const years = selesaiSewa.diff(mulaiSewa, "year");
  mulaiSewa.add(years, "years");
  // days
  const days = selesaiSewa.diff(mulaiSewa, "days");
  return [years, days];
}

export function calculateLength(range, isFlat){
  if (isFlat) {
    return range;
  } if (range <= 1) {
    return 0;
  } 
  return range;
  
}