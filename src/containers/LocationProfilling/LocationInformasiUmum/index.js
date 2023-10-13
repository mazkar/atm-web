/* eslint-disable import/named */
import React, { useEffect, useState, Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Divider,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import * as Colors from "../../../assets/theme/colors";
import { ChkyInputSmall, ChkySelectInput, NumericInput } from "../../../components";
import ModalMap from "../../../components/Modal/ModalMap";
import NearestComponent from "./NearestComponent";
import ChkyInput from "../chkyInputSmall";
import { ReactComponent as RequiredIcon } from "../../../assets/icons/general/required_icon.svg";
import ErrorComponent from "../ErrorComponent";
import constansts, { branches } from "../../../helpers/constants";
import CommonSelect from '../../../components/Selects/CommonSelect';
import { AutoComplete } from 'antd';
import PhoneNumberInput from "../../../components/PhoneNumberInput";
import { useEmailValidation } from "../../../helpers";

const options = branches

const ChkyLeafletMaps = lazy(() =>
  import("../../../components/chky/ChkyLeafletMaps")
);

const useStyles = makeStyles({
  root: {
    padding: "20px 18px",
    borderRadius: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
  },
  subsubTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  margin5px: {
    marginBottom: 5,
  },
  margin10px: {
    marginBottom: 10,
  },
  generateLocContainer: {
    borderRadius: 6,
    border: "1px solid #E6EAF3",
    overflow: "hidden",
  },
  generateLocItemAuto: {
    backgroundColor: Colors.GraySoft,
    padding: 11,
    color: Colors.GrayHard,
    fontSize: 15,
    fontWeight: 500,
    width: "15%",
    textAlign: "center",
    borderRight: `2px solid ${Colors.GrayMedium}`,
  },
  generateLocItemIput: {
    width: "55%",
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  spacerTop: { marginTop: 20 },
});

const dataNearest = [
  {
    title: "Alfamidi Sudirman",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Good",
    totalTransaction: 1204,
  },
  {
    title: "Alfamidi Sudirman 2",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Bad",
    totalTransaction: 1204000,
  },
  {
    title: "Alfamidi Sudirman 3",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Good",
    totalTransaction: 1204,
  },
];

const dataSelectRekeningBank = [
  {value: "-", name: "- Pilih Rekening Bank -",},
  {value: 'BANK BRI', name: 'BANK BRI'},
  {value: 'BANK BCA', name: 'BANK BCA'},
  {value: 'BANK MANDIRI', name: 'BANK MANDIRI'},
  {value: 'BANK BNI', name: 'BANK BNI'},
  {value: 'BANK SYARIAH INDONESIA (BSI)', name: 'BANK SYARIAH INDONESIA (BSI)'},
  {value: 'BANK CIMB NIAGA', name: 'BANK CIMB NIAGA'},
  {value: 'BANK CIMB NIAGA SYARIAH', name: 'BANK CIMB NIAGA SYARIAH'},
  {value: 'BANK MUAMALAT', name: 'BANK MUAMALAT'},
  {value: 'BANK BTPN', name: 'BANK BTPN'},
  {value: 'BANK BTPN SYARIAH', name: 'BANK BTPN SYARIAH'},
  {value: 'BANK PERMATA', name: 'BANK PERMATA'},
  {value: 'BANK PERMATA SYARIAH', name: 'BANK PERMATA SYARIAH'},
  {value: 'BANK DBS INDONESIA', name: 'BANK DBS INDONESIA'},
  {value: 'DIGIBANK', name: 'DIGIBANK'},
  {value: 'BANK BTN', name: 'BANK BTN', nameEn: 'BANK BTN' },
  {value: 'BANK DANAMON', name: 'BANK DANAMON'},
  {value: 'BANK MAYBANK (BII)', name: 'BANK MAYBANK (BII)'},
  {value: 'BANK MEGA', name: 'BANK MEGA'},
  {value: 'BANK SINARMAS', name: 'BANK SINARMAS'},
  {value: 'BANK COMMONWEALTH',name: 'BANK COMMONWEALTH'},
  {value: 'BANK OCBC NISP', name: 'BANK OCBC NISP'},
  {value: 'BANK BUKOPIN', name: 'BANK BUKOPIN'},
  {value: 'BANK BUKOPIN SYARIAH', name: 'BANK BUKOPIN SYARIAH'},
  {value: 'BANK BCA SYARIAH', name: 'BANK BCA SYARIAH'},
  {value: 'BANK LIPPO', name: 'BANK LIPPO'},
  {value: 'CITIBANK', name: 'CITIBANK'},
];

const listCabang = [
  {id: 0, value: 'Cabang 1', nameId: 'Cabang 1', nameEn: 'Cabang 1'},
  {id: 1, value: 'Cabang 2', nameId: 'Cabang 2', nameEn: 'Cabang 2'},
  {id: 2, value: 'Cabang 3', nameId: 'Cabang 3', nameEn: 'Cabang 3'}
];

const listROArea = [
  {id: 0, value: 'RO Area 1', nameId: 'RO Area 1', nameEn: 'RO Area 1'},
  {id: 1, value: 'RO Area 2', nameId: 'RO Area 2', nameEn: 'RO Area 2'},
  {id: 2, value: 'RO Area 3', nameId: 'RO Area 3', nameEn: 'RO Area 3'}
];

const dataSelectJenisBadanUsaha = [
  {
    value: "- Pilih Jenis Badan Usaha -",
    name: "- Pilih Jenis Badan Usaha -",
  },
  { value: "Perorangan", name: "Perorangan" },
  { value: "PT", name: "PT" },
  { value: "CV", name: "CV" },
  { value: "UD", name: "UD" },
  { value: "Yayasan", name: "Yayasan" },
  { value: "Koperasi", name: "Koperasi" },
];

let locName = "";
let locHeaderNoR = "";
let machineTypeNoR = "";
let visitorNoR = 0;
let idLocationNoR = "";
let cabangNoR = "";
let roAreaNoR = "";
let recommendationNoR = "";
let nameRequesterNoR = "";
let phoneRequesterNoR = "";
let emailRequesterNoR = "";
let namePengawasNoR = "";
let phonePengawasNoR = "";
let emailPengawasNoR = "";
let namePemilikNoR = "";
let phonePemilikNoR = "";
let emailPemilikNoR = "";
let lokasiCabangNoR = "";
let addressPengawasNoR = "";
let jenisBadanUsahaNoR = "- Pilih Jenis Badan Usaha -";
let addressPemilikNoR = "";
let rekeningBankNoR = "";
let noRekeningNoR = "";
let atasNamaNoR = "";
let paramNewLocationNoR = "";

const defaultPosition = [-7.8289701, 110.3776528];

const LocationInformasiUmum = (props) => {
  const { onChangeData, errorForm, dataValue } = props;
  // console.log("data value", dataValue);

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
          setNameRequester(res.data.data.fullName);
          setPhoneRequester(res.data.data.phoneNumber);
          setEmailRequester(res.data.data.email);
          // setLokasiCabang(res.data.data.location);

          let newParam = {
            ...paramProfiling,
            nameRequester: res.data.data.fullName,
            telephoneNumberRequester: res.data.data.phoneNumber,
            emailRequester: res.data.data.email,
          };
          // console.log("change data global informasi umum newParam", newParam);
          onChangeData(newParam);
        }
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const [position, setPosition] = useState(defaultPosition);
  const [dataATM, setDataATM] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [visitor, setVisitor] = useState(0);
  const [idLocation, setIdLocation] = useState("");
  const [cabang, setCabang] = useState("");
  const [roArea, setRoArea] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [nameRequester, setNameRequester] = useState("");
  const [phoneRequester, setPhoneRequester] = useState("");
  const [emailRequester, setEmailRequester] = useState("");
  const [namePengawas, setNamePengawas] = useState("");
  const [phonePengawas, setPhonePengawas] = useState("");
  const [emailPengawas, setEmailPengawas] = useState("");
  const [namePemilik, setNamePemilik] = useState("");
  const [phonePemilik, setPhonePemilik] = useState("");
  const [emailPemilik, setEmailPemilik] = useState("");
  const [lokasiCabang, setLokasiCabang] = useState("");
  const [addressPengawas, setAddressPengawas] = useState("");
  const [jenisBadanUsaha, setjenisBadanUsaha] = useState("");
  const [addressPemilik, setAddressPemilik] = useState("");
  const [rekeningBank, setRekeningBank] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [atasNama, setAtasNama] = useState("");

  const [isDisableLocation, setIsDisableLocation] = useState(false);
  const [isDisableVisitor, setIsDisableVisitor] = useState(false);
  const [isDisableIdRequester, setIsDisableIdRequester] = useState(false);
  const [isDisableCabang, setIsDisableCabang] = useState(false);
  const [isDisableRoArea, setIsDisableRoArea] = useState(false);
  const [isDisableRecommendation, setIsDisableRecommendation] = useState(false);

  const [isDisableNamePengawas, setIsDisableNamePengawas] = useState(false);
  const [isDisableTelpPengawas, setIsDisableTelpPengawas] = useState(false);
  const [isDisableEmailPengawas, setIsDisableEmailPengawas] = useState(false);
  const [isDisableAlamatPengawas, setIsDisableAlamatPengawas] = useState(false);

  const [isDisableRekeningBank, setIsDisableRekeningBank] = useState(false);
  const [isDisableNoRekening, setIsDisableNoRekening] = useState(false);
  const [isDisableAtasNama, setIsDisableAtasNama] = useState(false);

  const [isDisableNameLandLord, setIsDisableNameLandLord] = useState(false);
  const [isDisableTelpLandLord, setIsDisableTelpLandLord] = useState(false);
  const [isDisableEmailLandLord, setIsDisableEmailLandLord] = useState(false);
  const [isDisableAlamatLandLord, setIsDisableAlamatLandLord] = useState(false);

  const [isDisableJenisBadanUsaha, setIsDisableJenisBadanUsaha] = useState(
    true
  );
  const [isDisable, setIsDisable] = useState(false);
  const [isAddMachine, setIsAddMachine] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openingType, setOpeningType] = useState("");

  const [dataInformasiUmum, setDataInformasiUmum] = useState({
    newLocation: locationName,
    visitorPerDay: visitor,
    // locationId: idLocation, // hapus id location
    branch: cabang,
    area: roArea,
    nameRequester,
    namePicLocation: namePengawas,
    nameLandlord: namePemilik,
    telephoneNumberRequester: phoneRequester,
    emailRequester,
    telephoneNumberPicLocation: phonePengawas,
    emailPicLocation: emailPengawas,
    // telephoneNumberLandlord: phonePemilik,
    numberTelephoneLandlord: phonePemilik,
    emailLandlord: emailPemilik,
    informationRequester: lokasiCabang,
    addressPicLocation: addressPengawas,
    corporateAddressLandlord: addressPemilik,
    recommendation,
    corporateTypeLandlord: jenisBadanUsaha,
    openingType: openingType,
  });

  const [dataCabang, setDataCabang] = useState();

  function locationNew() {
    {
      /** NEW */
    }
    // if (locationName !== "") {
    //   if (openingType == "New ATM") {
    //     return `${paramNewLocation}.${locationName}`;
    //   } else {
    //     return `${paramNewLocation}${locationName}`;
    //   }
    // } else {
    //   return `${paramNewLocationNoR}${locName}`;
    // }
    {
      /** OLD */
    }
    if (isAddMachine || isEdit) {
      if (locationName !== "") {
        return `${locationHeader}.${locationName}`;
      } else {
        return `${locHeaderNoR}.${locName}`;
      }
    } else {
      if (locationName !== "") {
        return `${paramNewLocation}${locationName}`;
      } else {
        return `${paramNewLocationNoR}${locName}`;
      }
    }
  }

  useEffect(() => {
    setDataInformasiUmum({
      // newLocation:
      //   locationName !== ""
      //     ? `${locationHeader}.${locationName}`
      //     : `${locHeaderNoR}.${locName}`,
      // newLocation:
      //   locationName !== ""
      //     ? `${paramNewLocation}${locationName}`
      //     : `${paramNewLocationNoR}${locName}`,
      newLocation: locationNew(),
      visitorPerDay: visitor !== 0 ? visitor : visitorNoR,
      // locationId: idLocation, // hapus id location
      branch: cabang !== "" ? cabang : cabangNoR,
      area: roArea !== "" ? roArea : roAreaNoR,
      nameRequester: nameRequester !== "" ? nameRequester : nameRequesterNoR,
      namePicLocation: namePengawas !== "" ? namePengawas : namePengawasNoR,
      nameLandlord: namePemilik !== "" ? namePemilik : namePemilikNoR,
      telephoneNumberRequester:
        phoneRequester !== "" ? phoneRequester : phoneRequesterNoR,
      emailRequester:
        emailRequester !== "" ? emailRequester : emailRequesterNoR,
      telephoneNumberPicLocation:
        phonePengawas !== "" ? phonePengawas : phonePengawasNoR,
      emailPicLocation: emailPengawas !== "" ? emailPengawas : emailPengawasNoR,
      // telephoneNumberLandlord:
      numberTelephoneLandlord:
        phonePemilik !== "" ? phonePemilik : phonePemilikNoR,
      emailLandlord: emailPemilik !== "" ? emailPemilik : emailPemilikNoR,
      informationRequester:
        lokasiCabang !== "" ? lokasiCabang : lokasiCabangNoR,
      addressPicLocation:
        addressPengawas !== "" ? addressPengawas : addressPengawasNoR,
      corporateAddressLandlord:
        addressPemilik !== "" ? addressPemilik : addressPemilikNoR,
      recommendation:
        recommendation !== "" ? recommendation : recommendationNoR,
      corporateTypeLandlord:
        jenisBadanUsaha !== "" ? jenisBadanUsaha : jenisBadanUsahaNoR,
      // BANK ACCOUNT
      nameBank: rekeningBank !== "" ? rekeningBank : rekeningBankNoR,
      noRekeningPic: nomorRekening !== "" ? nomorRekening : noRekeningNoR,
      nameRekeningPic: atasNama !== "" ? atasNama : atasNamaNoR,
    });
  }, [
    locationName,
    visitor,
    idLocation,
    cabang,
    roArea,
    nameRequester,
    namePengawas,
    namePemilik,
    phoneRequester,
    emailRequester,
    phonePengawas,
    emailPengawas,
    phonePemilik,
    emailPemilik,
    lokasiCabang,
    addressPengawas,
    addressPemilik,
    recommendation,
    jenisBadanUsaha,
  ]);

  useEffect(() => {}, []);

  const [listLocationName, setListLocationName] = useState([]);
  const [locationHeader, setLocationHeader] = useState("");
  const [machineType, setMachineType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOnPremises, setisOnPremises] = useState("");
  const [isATMBusiness, setIsATMBusiness] = useState(false);
  const [paramNewLocation, setParamNewLocation] = useState("");
  const [isErrorEmailRequester, setIsErrorEmailRequester] = useState(false);
  const [isErrorEmailPic, setIsErrorEmailPic] = useState(false);
  const [isErrorEmailLandlord, setIsErrorEmailLandlord] = useState(false);
  const [isErrorPhoneRequester, setIsErrorPhoneRequester] = useState(false);
  const [isErrorPhonePic, setIsErrorPhonePic] = useState(false);
  const [isErrorPhonePemilik, setIsErrorPhonePemilik] = useState(false);

  useEffect(() => {
    // console.log("Loc Header : ", locationHeader);
    // console.log("Heavy Machine Gun : ", machineType);
  }, [locationHeader, machineType]);

  function splitLocationName(res, type, machineType) {
    {
      /** New split */
    }
    // const newArr = res.split(".");
    // setListLocationName(newArr);
    // let lastName = newArr[newArr.length - 1];
    // setLocationName(lastName);
    // if (lastName != "") {
    //   newArr.pop();
    //   setParamNewLocation(newArr.join(""));
    // } else {
    //   setParamNewLocation(res);
    // }
    {
      /** old */
    }
    const construct = [];
    if (res) {
      const newArr = res.split(".");
      for (const each in newArr) {
        if (newArr[each] !== "") {
          construct.push(newArr[each]);
          setListLocationName(construct);
        }
      }
      // setLocationName(newArr && newArr[2]);
      if (type === "OP") {
        if (machineType === "ATM") {
          setLocationHeader(`${newArr[0]}`);
          locHeaderNoR = `${newArr[0]}`;
          setLocationName(newArr && newArr[1] ? newArr[1] : "");
        } else {
          setLocationHeader(`${newArr[0]}.${newArr[1]}`);
          locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
        }
      } else {
        setLocationHeader(`${newArr[0]}.${newArr[1]}`);
        locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
      }
      // setLocationHeader(`${newArr[0]}.${newArr[1]}`);
      // locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
      if (newArr[2]) {
        if (
          newArr[2] !== "ATM" &&
          newArr[2] !== "CDM" &&
          newArr[2] !== "CRM" &&
          newArr[2] !== "MDM"
        ) {
          setLocationName(newArr[2]);
          setIsDisableLocation(true);
        } else {
          setLocationHeader(`${newArr[0]}.${newArr[1]}.${newArr[2]}`);
          locHeaderNoR = `${newArr[0]}.${newArr[1]}.${newArr[2]}`;
          setIsDisableLocation(false);
        }
      }
    }
  }

  function acc_format(value) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,15}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 5) {
      parts.push(match.substring(i, i + 5));
    }
    if (parts.length) {
      return parts.join("-");
    }
    return value;
  }

  // useEffect(() => {
  //   var paramProfiling = dataValue;
  //   const resetProf2 = localStorage.getItem("resetProf2Info");
  //   if (resetProf2) {
  //     locName = "";
  //     locHeaderNoR = "";
  //     machineTypeNoR = "";
  //     visitorNoR = 0;
  //     idLocationNoR = "";
  //     cabangNoR = "";
  //     roAreaNoR = "";
  //     recommendationNoR = "";
  //     nameRequesterNoR = "";
  //     phoneRequesterNoR = "";
  //     emailRequesterNoR = "";
  //     namePengawasNoR = "";
  //     phonePengawasNoR = "";
  //     emailPengawasNoR = "";
  //     namePemilikNoR = "";
  //     phonePemilikNoR = "";
  //     emailPemilikNoR = "";
  //     lokasiCabangNoR = "";
  //     addressPengawasNoR = "";
  //     jenisBadanUsahaNoR = "- Pilih Jenis Badan Usaha -";
  //     addressPemilikNoR = "";
  //     rekeningBankNoR = "";
  //     noRekeningNoR = "";
  //     atasNamaNoR = "";
  //     localStorage.removeItem("resetProf2Info");
  //     paramNewLocationNoR = "";
  //   }
  //   const getDataSavedLoc = localStorage.getItem("dataSavedLocation");
  //   const nearestData = localStorage.getItem("dataNearestATMCard");
  //   const newObj = JSON.parse(getDataSavedLoc);
  //   const newObjATM = JSON.parse(nearestData);
  //   const newPosition = [];
  //   // console.log("data saved location", newObj);
  //   newPosition.push(newObj.latitude || defaultPosition[0]);
  //   newPosition.push(newObj.longitude || defaultPosition[1]);
  //   // console.log("data saved location", newPosition);
  //   // setPosition(newPosition);
  //   // setDataATM(newObjATM);
  //   const getItem = localStorage.getItem("dataGetDraftDetail");
  //   const getItemStatusRequester = localStorage.getItem("statusRequester");
  //   // console.log("IS ADD MACHINE : ", getItem);

  //   if (getItem) {
  //     const parseItem = JSON.parse(getItem);
  //     localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
  //     let _dataATM = parseItem.findNearbyAtmResponse.atmPoints;
  //     let _position = [parseItem.latitude, parseItem.longitude];
  //     setPosition(_position);
  //     setDataATM(_dataATM);
  //     if (getItemStatusRequester === "ATM Business") {
  //       setIsATMBusiness(true);
  //       setIsDisable(true);
  //       getRequester(paramProfiling);
  //       setLokasiCabang(
  //         parseItem.informationRequester !== null
  //           ? parseItem.informationRequester
  //           : lokasiCabangNoR
  //       );
  //     } else {
  //       setNameRequester("");
  //       setPhoneRequester("");
  //       setEmailRequester("");
  //       setLokasiCabang("");
  //       setIdLocation("");
  //     }
  //     if (parseItem.isAddMachine) {
  //       setNamePengawas(
  //         parseItem.namePicLandlord !== null
  //           ? parseItem.namePicLandlord
  //           : namePengawasNoR
  //       );
  //       setIsDisableNamePengawas(true);
  //     }
  //     // setLocationName(parseItem.newLocation);
  //     setIdLocation(
  //       parseItem.locationId !== null ? parseItem.locationId : idLocationNoR
  //     );

  //     setIsDisableIdRequester(
  //       !(parseItem.locationId === null || parseItem.locationId === "")
  //     );
  //     splitLocationName(
  //       parseItem.newLocation,
  //       parseItem.locationMode,
  //       parseItem.machineType
  //     );

  //     setIsAddMachine(parseItem.isAddMachine);
  //     setIsEdit(parseItem.isEdit);
  //     // var splitNewLoc = parseItem.newLocation.split('.');
  //     setParamNewLocation(parseItem.newLocation);
  //     paramNewLocationNoR = parseItem.newLocation;
  //     setisOnPremises(parseItem.locationMode);
  //     // setLocationHeader(parseItem.newLocation); // for location header
  //     // locHeaderNoR = parseItem.newLocation; // for location header
  //     setMachineType(parseItem.machineType);
  //     machineTypeNoR = parseItem.machineType;

  //     setVisitor(
  //       parseItem.visitorPerDay !== null ? parseItem.visitorPerDay : visitorNoR
  //     );

  //     setIsDisableVisitor(
  //       !(parseItem.visitorPerDay === null || parseItem.visitorPerDay === "")
  //     );
  //     setCabang(parseItem.branch !== null ? parseItem.branch : cabangNoR);

  //     setIsDisableCabang(
  //       !(parseItem.branch === null || parseItem.branch === "")
  //     );
  //     setRoArea(parseItem.area !== null ? parseItem.area : roAreaNoR);

  //     setIsDisableRoArea(!(parseItem.area === null || parseItem.area === ""));
  //     setRecommendation(
  //       parseItem.recommendation !== null
  //         ? parseItem.recommendation
  //         : recommendationNoR
  //     );

  //     setNamePengawas(
  //       parseItem.namePicLocation !== null
  //         ? parseItem.namePicLocation
  //         : namePengawasNoR
  //     );

  //     setPhonePengawas(
  //       parseItem.telephoneNumberPicLocation !== null
  //         ? parseItem.telephoneNumberPicLocation
  //         : phonePengawasNoR
  //     );

  //     setEmailPengawas(
  //       parseItem.emailPicLocation !== null
  //         ? parseItem.emailPicLocation
  //         : emailPengawasNoR
  //     );

  //     setAddressPengawas(
  //       parseItem.addressPicLocation !== null
  //         ? parseItem.addressPicLocation
  //         : addressPengawasNoR
  //     );

  //     if (parseItem.nameBank) {
  //       setRekeningBank(
  //         parseItem.nameBank !== null ? parseItem.nameBank : rekeningBankNoR
  //       );

  //       setIsDisableRekeningBank(
  //         !(parseItem.nameBank === null || parseItem.nameBank === "")
  //       );
  //     }
  //     if (parseItem.noRekeningPic) {
  //       setNomorRekening(
  //         parseItem.noRekeningPic !== null
  //           ? parseItem.noRekeningPic
  //           : noRekeningNoR
  //       );
  //       setIsDisableNoRekening(
  //         !(parseItem.noRekeningPic === null || parseItem.noRekeningPic === "")
  //       );
  //     }
  //     if (parseItem.nameRekeningPic) {
  //       setAtasNama(
  //         parseItem.nameRekeningPic !== null
  //           ? parseItem.nameRekeningPic
  //           : atasNamaNoR
  //       );
  //       setIsDisableAtasNama(
  //         !(
  //           parseItem.nameRekeningPic === null ||
  //           parseItem.nameRekeningPic === ""
  //         )
  //       );
  //     }

  //     setNamePemilik(
  //       parseItem.nameLandlord !== null
  //         ? parseItem.nameLandlord
  //         : namePemilikNoR
  //     );
  //     setIsDisableNameLandLord(
  //       !(parseItem.nameLandlord === null || parseItem.nameLandlord === "")
  //     );

  //     setPhonePemilik(
  //       parseItem.numberTelephoneLandlord !== null
  //         ? parseItem.numberTelephoneLandlord
  //         : phonePemilikNoR
  //     );
  //     setIsDisableTelpLandLord(
  //       !(
  //         parseItem.numberTelephoneLandlord === null ||
  //         parseItem.numberTelephoneLandlord === ""
  //       )
  //     );

  //     setEmailPemilik(
  //       parseItem.emailLandlord !== null
  //         ? parseItem.emailLandlord
  //         : emailPemilikNoR
  //     );
  //     setIsDisableEmailLandLord(
  //       !(parseItem.emailLandlord === null || parseItem.emailLandlord === "")
  //     );

  //     setjenisBadanUsaha(
  //       parseItem.corporateTypeLandlord !== null
  //         ? parseItem.corporateTypeLandlord
  //         : jenisBadanUsahaNoR
  //     );
  //     setIsDisableJenisBadanUsaha(
  //       !(
  //         parseItem.corporateTypeLandlord === null ||
  //         parseItem.corporateTypeLandlord === ""
  //       )
  //     );

  //     setAddressPemilik(
  //       parseItem.corporateAddressLandlord !== null
  //         ? parseItem.corporateAddressLandlord
  //         : addressPemilikNoR
  //     );
  //     setIsDisableAlamatLandLord(
  //       !(
  //         parseItem.corporateAddressLandlord === null ||
  //         parseItem.corporateAddressLandlord === ""
  //       )
  //     );

  //     setOpeningType(parseItem.openingType);

  //     if (!paramProfiling.isChangeData) {
  //       paramProfiling.locationId = parseItem.locationId;
  //       paramProfiling.newLocation = parseItem.newLocation;
  //       paramProfiling.visitorPerDay = parseItem.visitorPerDay;
  //       paramProfiling.branch = parseItem.branch;
  //       paramProfiling.area = parseItem.area;
  //       paramProfiling.area = parseItem.recommendation || "";
  //       paramProfiling.namePicLocation = parseItem.namePicLocation || "";
  //       paramProfiling.telephoneNumberPicLocation =
  //         parseItem.telephoneNumberPicLocation || "";
  //       paramProfiling.addressPicLocation = parseItem.addressPicLocation || "";
  //       paramProfiling.emailPicLocation = parseItem.emailPicLocation || "";
  //       paramProfiling.nameBank = parseItem.addressPicLocation || "";
  //       paramProfiling.noRekeningPic = parseItem.noRekeningPic || "";
  //       paramProfiling.nameRekeningPic = parseItem.nameRekeningPic || "";
  //       paramProfiling.nameLandlord = parseItem.nameLandlord || "";
  //       paramProfiling.numberTelephoneLandlord =
  //         parseItem.numberTelephoneLandlord || "";
  //       paramProfiling.emailLandlord = parseItem.emailLandlord || "";
  //       paramProfiling.corporateTypeLandlord =
  //         parseItem.corporateTypeLandlord || "";
  //       paramProfiling.corporateAddressLandlord =
  //         parseItem.corporateAddressLandlord || "";
  //       paramProfiling["informationRequester"] =
  //         parseItem.informationRequester || "";
  //       paramProfiling.openingType = parseItem.openingType || "";
  //       paramProfiling.isChangeData = true;
  //       onChangeData(paramProfiling);
  //     }
  //   }
  // // console.log(
  //     "change data global informasi umum paramProfiling",
  //     paramProfiling
  //   );
  // }, []);

  useEffect(() => {
    // onChangeData(dataInformasiUmum);
  }, [dataInformasiUmum]);

  const newHandleDataInformasiUmum = (data, keyData) => {
    var newDataInformasiUmum = {
      ...dataValue,
      [keyData]: data,
    };
    // console.log(
    //   "change data global informasi umum newHandleDataInformasiUmum",
    //   newDataInformasiUmum
    // );
    onChangeData(newDataInformasiUmum);
    // setDataInformasiUmum(newDataInformasiUmum);
  };

  const handleLocationChange = (e) => {
    var newLocationName = dataValue.newLocation.split(".");
    // newLocationName.pop();
    // console.log("new location before pop", newLocationName);
    newLocationName = newLocationName.slice(0, newLocationName.length - 1);
    // console.log("new location name pop", newLocationName);
    newLocationName.push(e.target.value);
    // console.log("new location name push", newLocationName);
    newLocationName = newLocationName.join(".");
    newHandleDataInformasiUmum(newLocationName, "newLocation");
    // setLocationName(newLocationName);
    // setLocationName(e.target.value);
    // locName = e.target.value;
  };
  const handleVisitorChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "visitorPerDay");
    // setVisitor(e.target.value);
    // visitorNoR = e.target.value;
  };
  const handleIdLocationChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "idLocation");
    setIdLocation(e.target.value);
    idLocationNoR = e.target.value;
  };
  const handleCodeGfms = (e) => {
    newHandleDataInformasiUmum(e.target.value, "codeGFMS");
  };
  const handleBranchInitial = (e) => {
    newHandleDataInformasiUmum(e.target.value, "branchInitial");
    // newHandleDataInformasiUmum(e.target.value, "area");
    // setRoArea(e.target.value);
    // roAreaNoR = e.target.value;
  };
  const handleRecommendationChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "recommendation");
    // setRecommendation(e.target.value);
    // recommendationNoR = e.target.value;
  };
  const handleRequesterName = (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameRequester");
    // setNameRequester(e.target.value);
    // nameRequesterNoR = e.target.value;
  };
  const handleRequesterBranchName= (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameBranchOtherBuRequester");
    // setNameRequester(e.target.value);
    // nameRequesterNoR = e.target.value;
  };
  const handlePengawasName = (e) => {
    newHandleDataInformasiUmum(e.target.value, "namePicLocation");
    // setNamePengawas(e.target.value);
    // namePengawasNoR = e.target.value;
  };
  const handleNameLandlord = (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameLandlord");
    // setNamePemilik(e.target.value);
    // namePemilikNoR = e.target.value;
  };
  const handleBusinessEntity= (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameBusinessEntity");
    // setNamePemilik(e.target.value);
    // namePemilikNoR = e.target.value;
  };
  const handlePhoneRequester = (newVal) => {
    if(newVal==="" || newVal===undefined){
      setIsErrorPhoneRequester(true);
    }else{
      setIsErrorPhoneRequester(false);
    }
    // console.log(">>> e", e);
    newHandleDataInformasiUmum(newVal, "telephoneNumberRequester");
    // setPhoneRequester(e.target.value);
    // phoneRequesterNoR = e.target.value;
  };
  const handleEmailRequester = (e) => {
    setIsErrorEmailRequester(!useEmailValidation(e.target.value))
    newHandleDataInformasiUmum(e.target.value, "emailRequester");
    // setEmailRequester(e.target.value);
    // emailRequesterNoR = e.target.value;
  };
  const handlePhonePengawas = (newVal) => {
    if(newVal==="" || newVal===undefined){
      setIsErrorPhonePic(true);
    }else{
      setIsErrorPhonePic(false);
    }
    newHandleDataInformasiUmum(newVal, "telephoneNumberPicLocation");
    // setPhonePengawas(e.target.value);
    // phonePengawasNoR = e.target.value;
  };
  const handleEmailPengawas = (e) => {
    setIsErrorEmailPic(!useEmailValidation(e.target.value))
    newHandleDataInformasiUmum(e.target.value, "emailPicLocation");
    // setEmailPengawas(e.target.value);
    // emailPengawasNoR = e.target.value;
  };
  const handlePhonePemilik = (newVal) => {
    // console.log(">>> handlePhonePemilik",newVal)
    if(newVal==="" || newVal===undefined){
      setIsErrorPhonePemilik(true);
    }else{
      setIsErrorPhonePemilik(false);
    }
    // newHandleDataInformasiUmum(e.target.value, "telephoneNumberLandlord");
    newHandleDataInformasiUmum(newVal, "numberTelephoneLandlord");
    // setPhonePemilik(e.target.value);
    // phonePemilikNoR = e.target.value;
  };
  const handleEmailPemilik = (e) => {
    // console.log(">>> validation", useEmailValidation(e.target.value));
    setIsErrorEmailLandlord(!useEmailValidation(e.target.value))
    
    newHandleDataInformasiUmum(e.target.value, "emailLandlord");
    // setEmailPemilik(e.target.value);
    // emailPemilikNoR = e.target.value;
  };
  const handleLokasiCabang = (e) => {
    newHandleDataInformasiUmum(e.target.value, "informationRequester");
    // setLokasiCabang(e.target.value);
    // lokasiCabangNoR = e.target.value;
  };
  const handleAddressPengawas = (e) => {
    newHandleDataInformasiUmum(e.target.value, "addressPicLocation");
    // setAddressPengawas(e.target.value);
    // addressPengawasNoR = e.target.value;
  };
  const handleAddressPemilik = (e) => {
    newHandleDataInformasiUmum(e.target.value, "corporateAddressLandlord");
    // setAddressPemilik(e.target.value);
    // addressPemilikNoR = e.target.value;
  };
  const handleJenisBadanUsaha = (e) => {
    newHandleDataInformasiUmum(e, "corporateTypeLandlord");
    // setjenisBadanUsaha(e);
    // jenisBadanUsahaNoR = e;
  };
  const handleRekeningBank = (value) => {
    console.log(">>>> value",value);
    newHandleDataInformasiUmum(value, "nameBank");
    // newHandleDataInformasiUmum(e.target.value, "nameBank");
    // setRekeningBank(e.target.value);
    // rekeningBankNoR = e.target.value;
  };
  const handleNoRekening = (e) => {
    newHandleDataInformasiUmum(acc_format(e.target.value), "noRekeningPic");
    // setNomorRekening(acc_format(e.target.value));
    // noRekeningNoR = e.target.value;
  };
  const handleAtasNama = (e) => {
    newHandleDataInformasiUmum(acc_format(e.target.value), "nameRekeningPic");
    // setAtasNama(e.target.value);
    // atasNamaNoR = e.target.value;
  };

  function onSelectBranch(value, option){
    setRoArea(option.id)
    roAreaNoR = option.id
    newHandleDataInformasiUmum(value, "branch")
    // newHandleDataInformasiUmum(option.id, "area")
  };

  useEffect(() => {
    newHandleDataInformasiUmum(roArea !=="" ? roArea : roAreaNoR, "area")
  }, [roArea])

  return (
    <Paper className={classes.root}>
      <ModalMap
        isOpen={isOpenModal}
        position={dataValue.position}
        dataATM={dataValue.dataATM}
        onClose={(e) => setIsOpenModal(false)}
      />
      <Typography style={{ fontSize: 20, fontWeight: 500, marginBottom: 12 }}>
        Informasi Umum
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Suspense fallback={<div />}>
            <ChkyLeafletMaps
              height={200}
              position={dataValue.position}
              dataATM={dataValue.dataATM}
              disableTooltip
              onClickMap={(e) => setIsOpenModal(true)}
            />
          </Suspense>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={classes.subTitle}
          >{`Location (${dataValue.locationMode})`}</Typography>
          <Grid container className={classes.generateLocContainer}>
            {/* <Grid item className={classes.generateLocItemAuto}>
              <Typography>{listLocationName && listLocationName[0]}</Typography>
            </Grid>
            {isOnPremises !== "OP" ? (
              <Grid item className={classes.generateLocItemAuto}>
                <Typography>
                  {listLocationName && listLocationName[1]}
                </Typography>
              </Grid>
            ) : null}
            {machineType !== "ATM" ? (
              <Grid item className={classes.generateLocItemAuto}>
                <Typography>{machineType && machineType}</Typography>
              </Grid>
            ) : null} */}
            {dataValue.newLocation.split(".").map((item, index) => {
              if (dataValue.newLocation.split(".").length - 1 != index) {
                return (
                  <Grid item className={classes.generateLocItemAuto}>
                    <Typography>{item}</Typography>
                  </Grid>
                );
              }
            })}
            <Grid item className={classes.generateLocItemIput}>
              <TextField
                fullWidth
                InputProps={{ disableUnderline: true }}
                placeholder="Location name"
                onChange={handleLocationChange}
                value={
                  dataValue.newLocation.split(".")[
                    dataValue.newLocation.split(".").length - 1
                  ]
                }
                // value={locationName !== "" ? locationName : locName}
                // disabled={isDisableLocation}
                // error={errorForm.locationName}
                // helperText={errorForm.locationName? 'Required' : null}
              />
              {errorForm.locationName ? (
                <ErrorComponent style={{ paddingTop: 10 }} />
              ) : null}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            className={classes.spacerTop}
            justify="space-between"
          >
            <Grid item xs={3}><Typography className={classes.subTitle}>Visitor per day</Typography></Grid>
            <Grid item xs={3}><Typography className={classes.subTitle}>ID Requester</Typography></Grid>
            <Grid item xs={3}><Typography className={classes.subTitle}>Kode GFMS</Typography></Grid>
            <Grid item xs={3}><Typography className={classes.subTitle}>Initial Cabang</Typography></Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            // className={classes.spacerTop}
            justify="space-between"
          >
            <Grid item xs={3}>
              <NumericInput
                placeholder="0"
                value={dataValue.visitorPerDay}
                onValueChange={(val) => {
                  const newVal = val.floatValue;
                  newHandleDataInformasiUmum(newVal, "visitorPerDay");
                }}
              />
              {errorForm.visitorPerDay ? (
                <ErrorComponent style={{ position: "unset" }} />
              ) : null}
            </Grid>
            <Grid item xs={3}>
              <ChkyInputSmall
                placeholder="Id location"
                onChange={handleIdLocationChange}
                value={dataValue.locationId}
                // value={idLocation !== "" ? idLocation : idLocationNoR}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <ChkyInputSmall
                placeholder="Kode GFMS"
                onChange={handleCodeGfms}
                value={dataValue.codeGFMS}
              />
              {errorForm.codeGFMS ? (
                <ErrorComponent style={{ position: "unset" }} />
              ) : null}
            </Grid>
            <Grid item xs={3}>
              <ChkyInputSmall
                placeholder="Initial"
                onChange={handleBranchInitial}
                value={dataValue.branchInitial}
              />
              {errorForm.branchInitial ? (
                <ErrorComponent style={{ position: "unset" }} />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Typography className={classes.subTitle}>Nearest ATM</Typography>
            <Grid container justify="space-between" spacing={2}>
              {/* {dataNearest.map((item)=>{ */}
              {dataValue.dataATM &&
                dataValue.dataATM.map((item) => {
                  return (
                    <Grid item xs={4}>
                      <NearestComponent
                        title={item.locationName}
                        id={item.atmId}
                        // machineType={item.potentialModel}
                        address={item.locationAddress}
                        condition={item.condition}
                        avgTransaction={item.averageTransaction}
                        distance={item.distanceInMeter}
                        machineType={item.machineType}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.subTitle}>Recommendation</Typography>
          <ChkyInputSmall
            multiline
            rows={6}
            placeholder="Text"
            fullWidth
            onChange={handleRecommendationChange}
            value={dataValue.recommendation}
            // value={recommendation !== "" ? recommendation : recommendationNoR}
            // disabled={isDisableRecommendation}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "flex-end",
            }}
          >
            {/* <RequiredIcon />
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#DC241F",
                marginLeft: 5,
              }}
            >
              Required
            </Typography> */}
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} justify="space-between">
        {/* Informasi Requester CONTAINER */}
        <Grid item xs={4}>
          <Typography className={classes.subTitle}>
            Informasi Requester
          </Typography>
          <div className={classes.margin10px} />
          <Typography className={classes.subSubTitle}>Nama</Typography>
          <div className={classes.margin5px} />
          <ChkyInputSmall
            disabled={dataValue.isDisable}
            fullWidth
            placeholder="Username"
            onChange={handleRequesterName}
            value={dataValue.nameRequester}
            // value={nameRequester !== "" ? nameRequester : nameRequesterNoR}
          />
          {errorForm.nameRequester ? <ErrorComponent /> : null}
          <div className={classes.margin10px} />
          <Typography className={classes.subSubTitle}>Nama Branch / Other BU</Typography>
          <div className={classes.margin5px} />
          <ChkyInputSmall
            disabled={dataValue.isDisable}
            fullWidth
            placeholder="Username"
            onChange={handleRequesterBranchName}
            value={dataValue.nameBranchOtherBuRequester}
            // value={nameRequester !== "" ? nameRequester : nameRequesterNoR}
          />
          {/* {errorForm.nameRequester ? <ErrorComponent /> : null} */}
          <div className={classes.margin10px} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>
                  Nomor Telp
                </Typography>
                <div className={classes.margin5px} />
                {/* <ChkyInput
                  disabled={dataValue.isDisable}
                  fullWidth
                  placeholder="Nomor Telp"
                  onChange={handlePhoneRequester}
                  value={dataValue.telephoneNumberRequester}
                  // value={
                  //   phoneRequester !== "" ? phoneRequester : phoneRequesterNoR
                  // }
                /> */}
                <PhoneNumberInput 
                  disabled={dataValue.isDisable}
                  value={dataValue.telephoneNumberRequester} 
                  onChange={handlePhoneRequester}/>
                {isErrorPhoneRequester || errorForm.telephoneNumberRequester ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>Email</Typography>
                <div className={classes.margin5px} />
                <ChkyInputSmall
                  disabled={dataValue.isDisable}
                  fullWidth
                  placeholder="Email"
                  onChange={handleEmailRequester}
                  value={dataValue.emailRequester}
                  // value={
                  //   emailRequester !== "" ? emailRequester : emailRequesterNoR
                  // }
                />
                {isErrorEmailRequester || errorForm.emailRequester ? (
                  <ErrorComponent
                    style={{ position: "unset" }}
                    label="! Required, please insert correct email format."
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.margin10px} />
          <Grid container>
            <Typography className={classes.subSubTitle}>
              Alamat Branch / Other BU
            </Typography>
            <ChkyInputSmall
              disabled={dataValue.isDisable}
              multiline
              rows={3}
              placeholder="Address"
              fullWidth
              onChange={handleLokasiCabang}
              value={dataValue.informationRequester}
            />
          </Grid>
        </Grid>
        {/* Informasi Pengawas / Pengelola Lokasi CONTAINER */}
        <Grid item xs={4}>
          <Typography className={classes.subTitle}>
            Informasi PIC Lokasi
          </Typography>
          <div className={classes.margin10px} />
          <Typography className={classes.subSubTitle}>Nama</Typography>
          <div className={classes.margin5px} />
          <ChkyInputSmall
            fullWidth
            placeholder="Username"
            onChange={handlePengawasName}
            value={dataValue.namePicLocation}
            // value={namePengawas !== "" ? namePengawas : namePengawasNoR}
            // disabled={isDisableNamePengawas}
          />
          {errorForm.namePicLocation ? <ErrorComponent /> : null}
          <div className={classes.margin10px} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>
                  Nomor Telp
                </Typography>
                <div className={classes.margin5px} />
                {/* <ChkyInput
                  fullWidth
                  placeholder="Nomor Telp"
                  onChange={handlePhonePengawas}
                  value={dataValue.telephoneNumberPicLocation}
                  // value={
                  //   phonePengawas !== "" ? phonePengawas : phonePengawasNoR
                  // }
                  // disabled={isDisableTelpPengawas}
                /> */}
                <PhoneNumberInput 
                  onChange={handlePhonePengawas}
                  value={dataValue.telephoneNumberPicLocation}/>
                {isErrorPhonePic || errorForm.telephoneNumberPicLocation ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>Email</Typography>
                <div className={classes.margin5px} />
                <ChkyInputSmall
                  fullWidth
                  placeholder="Email"
                  onChange={handleEmailPengawas}
                  value={dataValue.emailPicLocation}
                  // value={
                  //   emailPengawas !== "" ? emailPengawas : emailPengawasNoR
                  // }
                  // disabled={isDisableEmailPengawas}
                />
                {isErrorEmailPic || errorForm.emailPicLocation ? (
                  <ErrorComponent
                    style={{ position: "unset" }}
                    label="! Required, please insert correct email format."
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.margin10px} />
          {/* <Grid container>
            <Typography className={classes.subSubTitle}>
              Alamat Perusahaan
            </Typography>
            <ChkyInputSmall
              multiline
              rows={3}
              placeholder="Address"
              fullWidth
              onChange={handleAddressPengawas}
              value={dataValue.addressPicLocation}
              // value={
              //   addressPengawas !== "" ? addressPengawas : addressPengawasNoR
              // }
              // disabled={isDisableAlamatPengawas}
            />
            {errorForm.addressPicLocation ? (
              <ErrorComponent style={{ position: "unset" }} />
            ) : null}
          </Grid> */}
          <Grid container direction="column" style={{ marginTop: 20 }}>
            <Typography className={classes.subSubTitle}>
              Rekening Bank
            </Typography>
            <div className={classes.margin5px} />
            {/* <CommonSelect 
              bordered 
              suggestions={itemList}
              width='100%' 
              handleChange={handleRekeningBank} 
              color={constansts.color.dark} 
            /> */}
            
            <ChkySelectInput
              selectOptionData={dataSelectRekeningBank}
              onSelectValueChange={handleRekeningBank}
              value={
                dataValue.nameBank
              }
              // value={
              //   jenisBadanUsaha !== "" ? jenisBadanUsaha : jenisBadanUsahaNoR
              // }
              // disabled={isDisableJenisBadanUsaha}
            />
            {errorForm.corporateTypeLandlord ? (
              <ErrorComponent label="! Select one" />
            ) : null}
          </Grid>
          <div container style={{ marginTop: 10 }} direction="column">
            <Typography className={classes.subSubTitle}>
              Nomor Rekening
            </Typography>
            <div className={classes.margin5px} />

            <NumericInput
              placeholder="000-000-000"
              separator="-"
              value={dataValue.noRekeningPic}
              onValueChange={(val) => {
                const newVal = val.floatValue;
                newHandleDataInformasiUmum(newVal, "noRekeningPic");
              }}
              style={{width: "100%"}}
            />
          </div>
          <Grid container style={{ marginTop: 10 }}>
            <Typography className={classes.subSubTitle}>Atas Nama</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              fullWidth
              placeholder="Username"
              onChange={handleAtasNama}
              value={dataValue.nameRekeningPic}
              // value={atasNama !== "" ? atasNama : atasNamaNoR}
              // disabled={isDisableAtasNama}
            />
            {/* {errorForm.addressPicLocation ? <ErrorComponent style={{position: 'unset'}}/> : null} */}
          </Grid>
        </Grid>
        {/* Informasi Pemilik CONTAINER */}
        <Grid item xs={4}>
          <Typography className={classes.subTitle}>
            Informasi Pemilik/Badan Usaha
          </Typography>
          <div className={classes.margin10px} />
          <Typography className={classes.subSubTitle}>Nama Penanda Tangan LOO/MOU</Typography>
          <div className={classes.margin5px} />
          <ChkyInputSmall
            fullWidth
            placeholder="Username"
            onChange={handleNameLandlord}
            value={dataValue.nameLandlord}
            // value={namePemilik !== "" ? namePemilik : namePemilikNoR}
            // disabled={isDisableNameLandLord}
          />
          {errorForm.nameLandlord ? <ErrorComponent /> : null}
          <div className={classes.margin10px} />
          <Typography className={classes.subSubTitle}>Nama Badan Usaha</Typography>
          <div className={classes.margin5px} />
          <ChkyInputSmall
            fullWidth
            placeholder="Nama Badan Usaha"
            onChange={handleBusinessEntity}
            value={dataValue.nameBusinessEntity}
            // value={namePemilik !== "" ? namePemilik : namePemilikNoR}
            // disabled={isDisableNameLandLord}
          />
          {/* {errorForm.nameLandlord ? <ErrorComponent /> : null} */}
          <div className={classes.margin10px} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>
                  Nomor Telp
                </Typography>
                <div className={classes.margin5px} />
                {/* <ChkyInput
                  fullWidth
                  placeholder="Nomor Telp"
                  onChange={handlePhonePemilik}
                  value={dataValue.numberTelephoneLandlord}
                  // value={dataValue.telephoneNumberLandlord}
                  // value={phonePemilik !== "" ? phonePemilik : phonePemilikNoR}
                  // disabled={isDisableTelpLandLord}
                /> */}
                <PhoneNumberInput 
                  onChange={handlePhonePemilik}
                  value={dataValue.numberTelephoneLandlord}/>
                {/* {errorForm.telephoneNumberLandlord ? ( */}
                {isErrorPhonePemilik || errorForm.numberTelephoneLandlord ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography className={classes.subSubTitle}>Email</Typography>
                <div className={classes.margin5px} />
                <ChkyInputSmall
                  fullWidth
                  placeholder="Email"
                  onChange={handleEmailPemilik}
                  value={dataValue.emailLandlord}
                  // value={emailPemilik !== "" ? emailPemilik : emailPemilikNoR}
                  // disabled={isDisableEmailLandLord}
                />
                {isErrorEmailLandlord || errorForm.emailLandlord ? (
                  <ErrorComponent
                    style={{ position: "unset" }}
                    label="! Required, please insert correct email format."
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.margin10px} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography className={classes.subSubTitle}>
                Jenis Badan Usaha
              </Typography>
              <ChkySelectInput
                selectFirstDummy="- Pilih Jenis Badan Usaha -"
                selectOptionData={dataSelectJenisBadanUsaha}
                onSelectValueChange={handleJenisBadanUsaha}
                value={
                  dataValue.corporateTypeLandlord ||
                  "- Pilih Jenis Badan Usaha -"
                }
                // value={
                //   jenisBadanUsaha !== "" ? jenisBadanUsaha : jenisBadanUsahaNoR
                // }
                // disabled={isDisableJenisBadanUsaha}
              />
              {errorForm.corporateTypeLandlord ? (
                <ErrorComponent label="! Select one" />
              ) : null}
            </Grid>
            {/* <Grid item xs={6}>
              <Typography className={classes.subSubTitle}>
                Alamat Perusahaan
              </Typography>
              <ChkyInputSmall
                multiline
                rows={3}
                placeholder="Address"
                fullWidth
                onChange={handleAddressPemilik}
                value={dataValue.corporateAddressLandlord}
                // value={
                //   addressPemilik !== "" ? addressPemilik : addressPemilikNoR
                // }
                // disabled={isDisableAlamatLandLord}
              />
              {errorForm.corporateAddressLandlord ? <ErrorComponent /> : null}
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.margin10px} />
    </Paper>
  );
};

LocationInformasiUmum.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  errorForm: PropTypes.object,
  dataValue: PropTypes.object,
};

LocationInformasiUmum.defaultProps = {
  data: [],
  errorForm: {},
  dataValue: {
    newLocation: "xxx.xxx.",
    visitorPerDay: "",
    locationId: "", // hapus id location
    codeGFMS: "",
    area: "",
    nameRequester: "",
    namePicLocation: "",
    nameLandlord: "",
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
    dataATM: [],
    position: [0, 0],
    isChangeData: false,
  },
};

export default LocationInformasiUmum;
