/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Axios from "axios";
import moment from 'moment';
import { ChkyButtons } from "../../../../components";
import constansts from "../../../../helpers/constants";
import LocationInformasiUmum from "./LocationInformasiUmum";
import LocationDetailAtm from './LocationDetailAtm';
import ModalLoader from '../../../../components/ModalLoader';
import LocationBiayaSewa from './LocationBiayaSewa';
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../router";
import { doUpdateData } from '../ApiServiceProggress';

// INIT DEFAULT PARAMETERS VALUE (IMPORTANT!!!)

const defaultParamProfiling = {
  newLocation: "xxx.xxx.",
  visitorPerDay: "",
  locationId: "", // hapus id location
  codeGFMS: "",
  branchInitial: "",
  userId: "",
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

const itemList = [
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

function convertArrayStringToArrayObjectATMBankList(data) {
  const newArr = [];
  data.map((item) => {
    const newItem = itemList.find((obj) => obj.title === item);
    newArr.push(newItem);
  });
  return newArr;
}

function countRentRange(start, end) {
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

// DEFAULT EXPORT
function ProgressEditProfiling({ history }) {
  const { userId } = useContext(RootContext);
  // GET QUERY URL VALUE
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const openingType = urlParams.get("openingType");
  const savedId = urlParams.get("savedId");
  const atmID = urlParams.get("atmId");

  // INIT TOP STATE
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [disabledBiaya, setDisabledBiaya] = useState(null);
  const [isATMBusiness, setIsATMBusiness] = useState(false);
  const [isAddMachine, setIsAddMachine] = useState(false);
  const [isMandatory, setIsMandatory] = useState(false);

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue){
    setIsLoading(loaderValue);
  }

  // INIT PARAMETERS VALUE
  const [paramProfiling, setParamSaveProfiling] = useState(
    defaultParamProfiling
  );
  const [paramDetailATM, setParamDetailATM] = useState(defaultParamDetailATM);
  const [paramBiayaSewaLokasi, setParamBiayaSewaLokasi] = useState(
    defaultParamBiayaSewa
  );

  // INIT ERROR STATE
  const [errorFormInfoUmum, setErrorFormInfoUmum] = useState({
    locationName: false,
    visitorPerDay: false,
    codeGFMS: false,
    branchInitial: false,
    namePicLocation: false,
    telephoneNumberPicLocation: false,
    emailPicLocation: false,
    addressPicLocation: false,
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

  // INIT HIT API FUNCTION
  const getDraftDetail = async (idDraft) => {
    try {
      setIsLoading(true);
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
      const resItem = data.data.detailData;
      // console.log(">>> resItem", resItem);
      if (resItem) {
        setDisabledBiaya(resItem.status > 4);
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
      setIsLoading(false);
      setDataFetched(true);
    } catch (error) {
      // console.log(">>> error", error);
      setIsLoading(false);
      setDataFetched(true);
      // alert("Something Wrong", error);
    //   history.goBack();
    //   localStorage.removeItem("dataGetDraftDetail");
    }
  };
  
  const getRequester = (parameterProfiling) => {
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
            ...parameterProfiling,
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

  const getAddmachineData = async (atmId, saveId) => {
    try {
      // toggleCloseDrawer();
      setIsLoading(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDataNewMachine`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId,
          id: parseInt(saveId),
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
        history.goBack();
        localStorage.removeItem("dataGetDraftDetail");
      }
      setIsLoading(false);
    } catch (error) {
      // console.log("error", error);
      setIsLoading(false);
      alert("Internal Server Error");
      history.goBack();
      localStorage.removeItem("dataGetDraftDetail");
    }
  };

  //   MAP DATA FUNCTION (UPDATE DEFAULT STATE)
  const mapData = (parseItem) => {
    // console.log("<><>");
    // console.log("<><> parseItem", parseItem);
    // set data profiling
    const newParamProfiling = defaultParamProfiling;
    newParamProfiling.userId = parseItem.userId; 
    newParamProfiling.locationId = parseItem.locationId || "";
    newParamProfiling.newLocation = parseItem.newLocation;
    newParamProfiling.visitorPerDay = parseItem.visitorPerDay || "";
    newParamProfiling.codeGFMS = parseItem.codeGFMS || "";
    newParamProfiling.branchInitial = parseItem.branchInitial || "";
    newParamProfiling.recommendation = parseItem.recommendation || "";
    newParamProfiling.namePicLocation = parseItem.namePicLocation || "";
    newParamProfiling.telephoneNumberPicLocation =
        parseItem.telephoneNumberPicLocation || "";
    newParamProfiling.addressPicLocation = parseItem.addressPicLocation || "";
    newParamProfiling.emailPicLocation = parseItem.emailPicLocation || "";
    newParamProfiling.nameBank = parseItem.nameBank || "";
    newParamProfiling.noRekeningPic = parseItem.noRekeningPic || "";
    newParamProfiling.nameRekeningPic = parseItem.nameRekeningPic || "";
    newParamProfiling.nameLandlord = parseItem.nameLandlord || "";
    newParamProfiling.numberTelephoneLandlord =
        parseItem.numberTelephoneLandlord || "";
    newParamProfiling.emailLandlord = parseItem.emailLandlord || "";
    newParamProfiling.corporateTypeLandlord =
        parseItem.corporateTypeLandlord || "";
    newParamProfiling.corporateAddressLandlord =
        parseItem.corporateAddressLandlord || "";
    newParamProfiling.informationRequester =
        parseItem.informationRequester || "";
    newParamProfiling.openingType = parseItem.openingType || "";
    // data tidak perlu ke BE
    newParamProfiling.dataATM = parseItem.findNearbyAtmResponse.atmPoints;
    newParamProfiling.position = [parseItem.latitude, parseItem.longitude];
    newParamProfiling.isDisableIdRequester = !(
      parseItem.locationId === null || parseItem.locationId === ""
    );
    newParamProfiling.locationMode = parseItem.locationMode;
    newParamProfiling.isChangeData = true;
  
    newParamProfiling.nameRequester = parseItem.nameRequester || "";
    newParamProfiling.telephoneNumberRequester =
        parseItem.telephoneNumberRequester || "";
    newParamProfiling.emailRequester = parseItem.emailRequester || "";
    newParamProfiling.nameBusinessEntity = parseItem.nameBusinessEntity || "";
      
    //  onChangeData(paramProfiling);
    setParamSaveProfiling(newParamProfiling);
    // console.log("param requester", parseItem.requester);
    // if (parseItem.requester === "ATM Business") {
    //   setIsATMBusiness(true);
    //   getRequester(newParamProfiling);
    // }
  
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
    console.log("<><> parseItem.yearlyRentCostList", parseItem.yearlyRentCostList);
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
  
  // COMPONENT DID MOUNT
  useEffect(() => {
    getDraftDetail(savedId);
    // if (atmID !== "null" && atmID !== "" && openingType === "addMachine") {
    //   getAddmachineData(atmID, savedId);
    //   setIsAddMachine(true);
    // } else {
    //   getDraftDetail(savedId);
    // }
  }, []);
  
  const handleInformasiUmum = (e) => {
    setParamSaveProfiling(e);
    console.log("+++ ? DATA INFORMASI UMUM : ", e);
  };
  const handleDetailATM = (e) => {
    setParamDetailATM(e);
    // console.log("+++ ? DATA DETIL ATM : ", e);
  };
  const handleBiayaSewaLokasi = (e) => {
    setParamBiayaSewaLokasi(e);
    // console.log("<><> BIAYA SEWA LOKASI : ", e);
  };

  // HANDLE BIAYA SEWA

  const [costList, setCostList] = useState([]);
  const [flatCost, setFlatCost] = useState(true);
  const [startDate, setStartDate] = useState(+moment());
  const [endDate, setEndDate] = useState(+moment());

  const rentRange = countRentRange(startDate, endDate);
  const [rangeYears] = rentRange;
  const inputLength = calculateLength(rangeYears, flatCost);

  function calculateLength(range, isFlat){
    if (isFlat) {
      return range;
    } if (range <= 1) {
      return 0;
    } 
    return range;
  }

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
      setCostList(newCostList);
    }
  }, [flatCost]);

  // DO SAVE PROFILING
  const saveProfiling = async () => {
    // var idProf = localStorage.getItem('profilingId', idSaveSurvei);
    // get id draft
    const newProfiling = { ...paramProfiling };
    const newParamDetailATM = { ...paramDetailATM };
    delete newParamDetailATM.aroundAtmBank;
    delete newParamDetailATM.isChangeData;
    delete newProfiling.isChangeData;
    delete newProfiling.locationId;
    delete newProfiling.isDisable;
    delete newProfiling.isDisableIdRequester;
    delete newProfiling.dataATM;
    delete newProfiling.position;
    delete newProfiling.locationMode;

    // ===> sementara
    // delete newParamDetailATM.locationPhotosLayout; 
    // delete newProfiling.nameBranchOtherBuRequester;
    // delete newProfiling.nameBusinessEntity;
    // delete newProfiling.numberTelephoneLandlord;
    
    // <=== sementara
    
    const dataHit = {
      id: savedId,
      // userId,
      ...newProfiling,
      ...newParamDetailATM,
      ...paramBiayaSewaLokasi,
      startRentDate: startDate,
      endRentDate: endDate,
      flatCost,
      yearlyRentCostList: costList,
      // atmId: null, // <=== sementara
      // boothTypeNote: null, // <=== sementara
      // telephoneNumberLandlord: null, // <=== sementara
    };
    console.log(">>><<< dataHit",dataHit);
    
    doUpdateData(loaderHandler,dataHit).then((response)=>{
      console.log(">>> CEK doUpdateData: ", response);
      if(response){
        alert("Data Berhasil Update, Reload Page!");
        window.location.reload();
      }
    });
  };

  // useEffect(() => {
  //   console.log(">>>> paramDetailATM",paramDetailATM);
  //   console.log(">>>> paramBiayaSewaLokasi",paramBiayaSewaLokasi);
    
  // }, [paramDetailATM,paramBiayaSewaLokasi]);
  return (
    <div>
      <Grid container style={{padding: 10}} direction="column" spacing={2}>
        <Grid item>
          <LocationInformasiUmum
            dataValue={paramProfiling}
            onChangeData={handleInformasiUmum}
            errorForm={errorFormInfoUmum}
          />
        </Grid>
        <Grid item>
          <LocationDetailAtm
            dataValue={paramDetailATM}
            onChangeData={handleDetailATM}
            errorForm={errorFormDetailAtm}
            dataFetched={dataFetched}
          />
        </Grid>
        <Grid item>
          <LocationBiayaSewa
            disabledBiaya={disabledBiaya}
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
        </Grid>
      </Grid>
      <Grid container justify="space-between" style={{padding: "0px 25px 40px 25px"}}>
        <Grid item>
          
          <ChkyButtons
            buttonType='redOutlined'
            onClick={() => {
              history.push(`/site-management/progress-list`);
            }}
          >
            Cancel
          </ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons
            onClick={() => {
              saveProfiling();
            }}
          >
            Save
          </ChkyButtons>
        </Grid>
      </Grid>
      <ModalLoader isOpen={isLoading} />
    </div>
  );
}

ProgressEditProfiling.propTypes = {

};

export default ProgressEditProfiling;

