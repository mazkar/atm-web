/* eslint-disable default-case */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { useHistory, useParams, withRouter } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import moment from "moment";
import Axios from "axios";
import qs from "qs";
import DeleteIcon from "@material-ui/icons/Delete";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as CimbLogo } from "../../../../../assets/icons/siab/cimbLogo.svg";
import { ReactComponent as ShareIcon } from "../../../../../assets/icons/siab/share-2.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/linear-red/plus.svg";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import constants from "../../../../../helpers/constants";
import Loading from "../../../../../components/Loading/LoadingView";
import AddNewVendorPopUp from "../../common/PopUp/AddNewVendor";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
import NoImage from "../../../../../assets/images/image.png";
import ImageSelector from "../../../../../components/ImageSelector";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import BastPdf from "../BastPdf";
import { ReactComponent as UploadIcon } from "../../../../../assets/icons/siab/upload-cloud.svg";
import { defaultDataBast } from "./defaultData";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    width:"100px",
    height:"23px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "6px 12px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const RedCheckbox = withStyles({
  root: {
    color: "#E6EAF3",
    "&$checked": {
      color: "#DC241F",
    },
  },
  checked: {},
})((props) => <Checkbox {...props} />);

const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "100%",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#DC241F",
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  rootPaper: {
    width: "720px",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  content: {
    padding: 10,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  imgContainer: {
    borderRadius: 10,
    width: "132px",
    height: "98px",
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  select: {
    width: "100%",
    paddingRight: 10,
    paddingLeft:10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

// VARIABEL DROPDOWN
const MerkUps = [
  { id: 0, value: "Eaton", name: "Eaton" },
  { id: 1, value: "TEC", name: "TEC" },
  { id: 2, value: "Protecta", name: "Protecta" },
  { id: 3, value: "Power Care", name: "Power Care" },
  { id: 4, value: "Vektor", name: "Vektor" },
  { id: 5, value: "Ener Plus", name: "Ener Plus" },
  { id: 6, value: "Lain Lain", name: "Lain Lain" },
];

const MerkMesin = [
  { id: 0, value: "NCR", name: "NCR" },
  { id: 1, value: "Diebold", name: "Diebold" },
  { id: 2, value: "Wincor", name: "Wincor" },
  { id: 3, value: "Hitachi", name: "Hitachi" },
  { id: 5, value: "OKI", name: "OKI" },
  { id: 6, value: "Hyosung", name: "Hyosung" },
];
const Mesin = [
  { id: 0, value: "ATM", name: "ATM" },
  { id: 1, value: "CDM", name: "CDM" },
  { id: 2, value: "CRM", name: "CRM" },
];

const TypeMesin = [
  { id: 0, value: "DieboldNG5500", name: "DieboldNG5500" },
  { id: 1, value: "Hyosung MX7800", name: "Hyosung Mx7800" },
  { id: 2, value: "NCRSS22E", name: "NCRSS22E" },
  { id: 3, value: "NCRSS-34", name: "NCRSS-34" },
  { id: 4, value: "NCR SS6661", name: "NCR SS6661" },
  { id: 5, value: "NCR SS83", name: "NCR SS83" },
  { id: 6, value: "Procash 280", name: "Procash 280" },
  { id: 7, value: "Procash 285", name: "Procash 285" },
  { id: 8, value: "Hitachi SR7500", name: "Hitachi SR7500" },
  { id: 9, value: "OKI RG-8", name: "OKI RG-8" },
  { id: 10, value: "Lain-Lain", name: "Lain-lain" },
];

const Dynabolt = [
  { id: 0, value: 4, name: "4 Titik" },
  { id: 1, value: 2, name: "2 Titik" },
  { id: 2, value: 0, name: "Tidak Penting" },
];

const KondisiAc = [
  { id: 0, value: "Sejuk", name: "Sejuk" },
  { id: 1, value: "Panas", name: "Panas" },
  { id: 2, value: "Mati", name: "Mati" },
];

const Typebooth = [
  { id: 0, value: "Acrylic", name: "Acrylic" },
  { id: 1, value: "Kayu", name: "Kayu" },
];

const Kondisibooth = [
  { id: 0, value: "Baru", name: "Baru" },
  { id: 1, value: "Bekas", name: "Bekas" },
];

const TeganganListrikOtlet = [
  { id: 0, value: "Normal(220-240 V)", name: "Normal(220-240 V)" },
  { id: 1, value: "Kurang(<220 V)", name: "Kurang(<220 V)" },
  { id: 2, value: "Lebih(> 240 V)", name: "Lebih(> 240 V)" },
];

const GroundingListrikOtlet = [
  { id: 0, value: "Normal(< 3)", name: "Normal(< 3)" },
  { id: 1, value: "Tidak Normal(> 4 V)", name: "Tidak Normal(> 4 V)" },
];

const TeganganListrikBooth = [
  { id: 0, value: "Normal(< 3)", name: "Normal(< 3)" },
  { id: 1, value: "Tidak Normal(> 4 V)", name: "Tidak Normal(> 4 V)" },
];

const GroundingListrikBooth = [
  { id: 0, value: "Normal(< 3)", name: "Normal(< 3)" },
  { id: 1, value: "Tidak Normal(> 4 V)", name: "Tidak Normal(> 4 V)" },
];

const CctvInternal = [
  { id: 0, value: "Aktif", name: "Aktif" },
  { id: 1, value: "Tidak Aktif", name: "Tidak Aktif" },
];

const CctvDvr = [
  { id: 0, value: "Ada", name: "Ada" },
  { id: 1, value: "Tidak Ada", name: "Tidak Ada" },
];
const StatusMesin = [
  { id: 0, value: "Online", name: "Online" },
  { id: 1, value: "Tidak Online", name: "Tidak online" },
];
const TestingTransaksiKartu = [
  { id: 0, value: "Berhasil", name: "Berhasil" },
  { id: 1, value: "Gagal", name: "Tidak Gagal" },
];
const TestingTransaksiOctom = [
  { id: 0, value: "Berhasil", name: "Berhasil" },
  { id: 1, value: "Tidak Gagal", name: "Tidak Gagal" },
];
const KerapihanKabel = [
  { id: 0, value: "Rapih", name: "Rapih" },
  { id: 1, value: "Tidak Rapih", name: "Tidak Rapi" },
];
const CahayaRuangan = [
  { id: 0, value: "Terang", name: "Terang" },
  { id: 1, value: "Gelap", name: "Gelap" },
];
const KebersihanRuangan = [
  { id: 0, value: "Bersih", name: "Bersih" },
  { id: 1, value: "Kotor", name: "Kotor" },
];

const StikerKelengkapan = [
  { id: 0, value: "Lengkap", name: "Lengkap" },
  { id: 1, value: "Tidak lengkap", name: "Tidak Lengkap" },
];
const StikerId = [
  { id: 0, value: "Ada", name: "Ada" },
  { id: 1, value: "Tidak Ada", name: "Tidak Ada" },
];

function BASTDigital() {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  // const idBast = (new URLSearchParams(window.location.search)).get("idBast");
  const taskType = (new URLSearchParams(window.location.search)).get("taskType");

  const [isOpenAddVendor, setIsOpenAddVendor] = useState(false);
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Summary */
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [photoFront, setPhotoFront] = useState("");
  const [photoLeft, setPhotoLeft] = useState("");
  const [photoRight, setPhotoRight] = useState("");
  const [photoRear, setPhotoRear] = useState("");
  const [dataChecked, setDataChecked] = useState({
    checkedFLM: false,
    checkedSLM: false,
    checkedCR: false,
    checkedSecurity: false,
    checkedVendorJaringan: false,
    checkedVendorMaintenance: false,
    checkedVendorMediaPromosi: false,
    checkedVendorSurvey: false,
    checkedOthers: false
  });

  const [dataBast, setDataBast] = useState(defaultDataBast); // <--- init data BAST
  const [dataResponse, setDataResponse] = useState({}); // <--- init data BAST

  const handleChangeState = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataBast((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  // FOTO
  useEffect(() => {
    if (photoFront !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoFront";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoFront]);

  useEffect(() => {
    if (photoRight !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoRight,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoRight";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoRight]);

  useEffect(() => {
    if (photoLeft !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoLeft,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoLeft";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoLeft]);

  useEffect(() => {
    // console.log("+++ photoRear", JSON.stringify(photoRear));
    if (photoRear !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoRear,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoRear";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoRear]);

  const setAddTextbox = (value) => {
    // console.log("+++ data add vendor", value);
    const data = {
      checkedFLM: value.checkedFLM,
      checkedSLM: value.checkedSLM,
      checkedCR: value.checkedCR,
      checkedSecurity: value.checkedSecurity,
      checkedVendorJaringan: value.checkedVendorJaringan,
      checkedVendorMaintenance: value.checkedVendorMaintenance,
      checkedVendorMediaPromosi: value.checkedVendorMediaPromosi,
      checkedVendorSurvey: value.checkedVendorSurvey,
      checkedOthers: value.checkedOthers,
    };
    setDataChecked(data);
  };
  
  // COMPONENT DID MOUNT FETCH DETAIL DATA
  async function getResponse() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const params = qs.stringify({
      id,
      taskType,
    });
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/bastActivationTermination?${params}`,
        config
      );
      try {
        // console.log("HASIL: ", result);
        const response = result.data;
        setDataResponse(response);
        if (response) {
          const vendorDetailsArr = (val) =>{
            if(val === null){
              return dataBast.vendorDetails;
            }if(val.length>0){
              const newArr = [
                {
                  check: "checkedCR",
                  phone: val.find(obj => obj.key === "CR Telephone Number")?.value,
                  name: val.find(obj => obj.key === "CR Name")?.value,
                  key: "CR",
                },
                {
                  check: "checkedFLM",
                  phone: val.find(obj => obj.key === "FLM Telephone Number")?.value,
                  name: val.find(obj => obj.key === "FLM Name")?.value,
                  key: "FLM",
                },
                {
                  check: "checkedSLM",
                  phone: val.find(obj => obj.key === "SLM Telephone Number")?.value,
                  name: val.find(obj => obj.key === "SLM Name")?.value,
                  key: "SLM",
                },
                {
                  check: "checkedSecurity",
                  phone: val.find(obj => obj.key === "Security Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Security Name")?.value,
                  key: "Security",
                },
                {
                  check: "checkedVendorJaringan",
                  phone: val.find(obj => obj.key === "Jarkom Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Jarkom Name")?.value,
                  key: "Jaringan",
                },
                {
                  check: "checkedVendorMaintenance",
                  phone: val.find(obj => obj.key === "Maintenance Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Maintenance Name")?.value,
                  key: "Maintenance",
                },
                {
                  check: "checkedVendorMediaPromosi",
                  phone: val.find(obj => obj.key === "Promosi Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Promosi Name")?.value,
                  key: "Promosi",
                },
                {
                  check: "checkedVendorSurvey",
                  phone: val.find(obj => obj.key === "Survey Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Survey Name")?.value,
                  key: "Survey",
                },
                {
                  check: "checkedOthers",
                  phone: val.find(obj => obj.key === "Other Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Other Name")?.value,
                  key: "Other",
                },
              ];
              return newArr;
            }
            return dataBast.vendorDetails;
          };
          const newArrVendorDetails = vendorDetailsArr(response.vendorDetails);
          // console.log("+++ newArrVendorDetails", newArrVendorDetails);
          const dataNew = {
            ...dataBast,
            noReference:
              response.referenceNumber !== null
                ? response.referenceNumber
                : "-",
            letterDate:
              response.letterDate !== null ? response.letterDate : "-",
            nameLandlord:
              response.nameLandlord !== null ? response.nameLandlord : "-",
            locationAddress:
              response.locationAddress !== null
                ? response.locationAddress
                : "-",
            locationName:
              response.locationName !== null ? response.locationName : "-",
            atmId: response.atmId !== null ? response.atmId : "-",
            latitude: response.latitude !== null ? response.latitude : "-",
            longitude: response.longitude !== null ? response.longitude : "-",
            areaName: response.areaName !== null ? response.areaName : "-",
            cityName: response.cityName !== null ? response.cityName : "-",
            picVendor: response.picVendor !== null ? response.picVendor : "-",
            ticketNumber:
              response.ticketNumber !== null ? response.ticketNumber : "-",
            locationId:
              response.locationId !== null ? response.locationId : "-",
            idMesin: response.idMesin !== null ? response.idMesin : "-",
            jobType: response.jobType !== null ? response.jobType : "-",
            requestDate:
              response.requestDate !== null
                ? moment(response.requestDate).format("DD/MM/YYYY")
                : "-",
            processingDate:
              response.processingDate !== null
                ? moment(response.processingDate).format("DD/MM/YYYY")
                : "-",
            notesDescription:
              response.notesDescription !== null
                ? response.notesDescription
                : "-",
            engineerPhone:
              response.engineerTelephoneNumber !== null
                ? response.engineerTelephoneNumber
                : "",
            mesinType: response.typeMesin !== null
              ? response.typeMesin
              : "",
            statusSubmit: response.statusSubmit !== null
              ? response.statusSubmit
              : "",
            stickerId: response.stikerId !== null ? response.stikerId : "",
            kelengkapanStiker: response.kelengkapanStiker !== null ? response.kelengkapanStiker : "",
            boothType: response.typeBooth !== null ? response.typeBooth : "",
            mesin: response.mesin !== null ? response.mesin : "",
            snMesin: response.snMesin !== null ? response.snMesin : "",
            upsBrand: response.merekUps !== null ? response.merekUps : "",
            snUps: response.snUps !== null ? response.snUps : "",
            jumlahKaset: response.jumlahKaset !== null ? response.jumlahKaset : "",
            jumlahReject: response.jumlahReject !== null ? response.jumlahReject : "",
            dynabolt: response.dynabolt !== null ? response.dynabolt : "",
            kondisiAc: response.kondisiAc !== null ? response.kondisiAc : "",
            kondisiBooth: response.kondisiBooth !== null ? response.kondisiBooth : "",
            teganganListrikOtlet: response.teganganListrikOtlet !== null ? response.teganganListrikOtlet : "",
            teganganListrikBooth: response.teganganListrikBooth !== null ? response.teganganListrikBooth : "",
            groundListrikOtlet: response.groundListrikOtlet !== null ? response.groundListrikOtlet : "",
            groundListrikBooth: response.groundListrikBooth !== null ? response.groundListrikBooth : "",
            cctvInternal: response.cctvInternal !== null ? response.cctvInternal : "",
            cctvDvr: response.cctvDvr !== null ? response.cctvDvr : "",
            statusMesin: response.statusMesin !== null ? response.statusMesin : "",
            testingTransaksiKartu: response.testingTransaksiKartu !== null ? response.testingTransaksiKartu : "",
            testingTransaksiOctom: response.testingTransaksiOctom !== null ? response.testingTransaksiOctom : "",
            kerapihanKabel: response.kerapihanKabel !== null ? response.kerapihanKabel : "",
            cahayaRuangan: response.cahayaRuangan !== null ? response.cahayaRuangan : "",
            kebersihanRuang: response.kebersihanRuangan !== null ? response.kebersihanRuangan : "",
            merekModem: response.merekModem !== null ? response.merekModem : "",
            hub: response.hub !== null ? response.hub : "",
            snModem: response.snModem !== null ? response.snModem : "",
            merekMesin: response.merekMesin !== null ? response.merekMesin : "",
            requesterName: response.requesterName !== null ? response.requesterName : "",

            photoFrontCimb: response.photoFrontCimb,
            dateFrontCimb:
              response.photoFrontCimbUploadDate !== null
                ? useTimestampConverter(
                  response.photoFrontCimbUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoLeftCimb: response.photoLeftCimb,
            dateLeftCimb:
              response.photoLeftCimbUploadDate !== null
                ? useTimestampConverter(
                  response.photoLeftCimbUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRightCimb: response.photoRightCimb,
            dateRightCimb:
              response.photoRightCimbUploadDate !== null
                ? useTimestampConverter(
                  response.photoRightCimbUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRearCimb: response.photoRearCimb,
            dateRearCimb:
              response.photoRearCimbUploadDate !== null
                ? useTimestampConverter(
                  response.photoRearCimbUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoFrontVendor: response.photoFrontVendor,
            dateFrontVendor:
              response.photoFrontVendorUploadDate !== null
                ? useTimestampConverter(
                  response.photoFrontVendorUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoLeftVendor: response.photoLeftVendor,
            dateLeftVendor:
              response.photoLeftVendorUploadDate !== null
                ? useTimestampConverter(
                  response.photoLeftVendorUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRearVendor: response.photoRearVendor,
            dateRearVendor:
              response.photoRearVendorUploadDate !== null
                ? useTimestampConverter(
                  response.photoRearVendorUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRightVendor: response.photoRightVendor,
            dateRightVendor:
              response.photoRightVendorUploadDate !== null
                ? useTimestampConverter(
                  response.photoRightVendorUploadDate / 1000,
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            kunciBooth: response.kunciBooth? response.kunciBooth : 0,
            kunciKerangkeng: response.kunciKerangkeng? response.kunciKerangkeng : 0,
            kunciFasciaAtas: response.kunciFaciaAtas? response.kunciFaciaAtas : 0,
            kunciFasciaBawah: response.kunciFaciaBawah? response.kunciFaciaBawah : 0,
            kunciTombak: response.kunciTombak? response.kunciTombak : 0,
            vendorSignature: response.vendorSignature !== null ? response.vendorSignature:[],
            vendorDetails: newArrVendorDetails,
          };

          if(response.vendorDetails !== null){
            if(response.vendorDetails.length>0){
              const dataCheckedNew = {
                checkedFLM: response.vendorDetails.find(obj => obj.key === "FLM Name")? response.vendorDetails.find(obj => obj.key === "FLM Name")?.value !== "" : false,
                checkedSLM: response.vendorDetails.find(obj => obj.key === "SLM Name")? response.vendorDetails.find(obj => obj.key === "SLM Name")?.value !== "" : false,
                checkedCR: response.vendorDetails.find(obj => obj.key === "CR Name")? response.vendorDetails.find(obj => obj.key === "CR Name")?.value !== "" : false,
                checkedSecurity: response.vendorDetails.find(obj => obj.key === "Security Name")? response.vendorDetails.find(obj => obj.key === "Security Name")?.value !== "" : false,
                checkedVendorJaringan: response.vendorDetails.find(obj => obj.key === "Jarkom Name")? response.vendorDetails.find(obj => obj.key === "Jarkom Name")?.value !== "" : false,
                checkedVendorMaintenance: response.vendorDetails.find(obj => obj.key === "Maintenance Name")? response.vendorDetails.find(obj => obj.key === "Maintenance Name")?.value !== "" : false,
                checkedVendorMediaPromosi: response.vendorDetails.find(obj => obj.key === "Promosi Name")? response.vendorDetails.find(obj => obj.key === "Promosi Name")?.value !== "" : false,
                checkedVendorSurvey: response.vendorDetails.find(obj => obj.key === "Survey Name")? response.vendorDetails.find(obj => obj.key === "Survey Name")?.value !== "" : false,
                checkedOthers: response.vendorDetails.find(obj => obj.key === "Other Name")? response.vendorDetails.find(obj => obj.key === "Other Name")?.value !== "" : false
              };
              console.log("+++ dataCheckedNew", dataCheckedNew);
              setDataChecked(dataCheckedNew);
            }
          }

          setIsLoading(false);
          setDataBast(dataNew);
        }
      } catch (error) {
        alert(`Error ${error}`);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  // useEffect(() => {
  //   console.log("+++ dataBast",dataBast);
  // }, [dataBast]);

  // Function Submit
  const handleSubtmit = async () => {
    setModalLoader(true);
    // HANDLE PHOTO FILES
    const photoSesudah1 = { path: dataResponse.photoFrontVendor, url: null };
    const photoSesudah2 = { path: dataResponse.photoLeftVendor, url: null };
    const photoSesudah3 = { path: dataResponse.photoRightVendor, url: null };
    const photoSesudah4 = { path: dataResponse.photoRearVendor, url: null };
    
    const doUploadPhotos = async (arr) => {
      if (arr.length > 0) {
        setModalLoader(true);
        await Promise.all(
          arr.map(async (item) => {
            const { docKey } = item;

            await doUploadPhoto(item.file)
              .then((res) => {
                // console.log("data res", res);
                // console.log("docKey", docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    switch (docKey) {
                    case "photoFront":
                      photoSesudah1.path = res.data.path;
                      break;
                    case "photoLeft":
                      photoSesudah2.path = res.data.path;
                      break;
                    case "photoRight":
                      photoSesudah3.path = res.data.path;
                      break;
                    case "photoRear":
                      photoSesudah4.path = res.data.path;
                      break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              })
              .catch((err) => {
                alert(`Failed to upload file ${err}`);
                setModalLoader(false);
              });
          })
        );
      }
    };

    await doUploadPhotos(dataBast.photoList);
    
    const photoReqSignature = { path: null, url: null };
    if(dataBast.photoSignature){
      await doUploadPhoto(dataBast.photoSignature)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.responseCode === "00") {
              photoReqSignature.path = res.data.path;
            } else {
              alert(res.data.responseMessage);
            }
          }
        })
        .catch((err) => {
          alert(`Failed to upload file ${err}`);
          setModalLoader(false);
        });
    }

    const newDataVendorDetail = [];
    const checkedArr = [
      ... dataChecked.checkedFLM ? ['checkedFLM']: [],
      ... dataChecked.checkedSLM ? ['checkedSLM']: [],
      ... dataChecked.checkedCR ? ['checkedCR']: [],
      ... dataChecked.checkedSecurity ? ['checkedSecurity']: [],
      ... dataChecked.checkedVendorJaringan ? ['checkedVendorJaringan']: [],
      ... dataChecked.checkedVendorMaintenance ? ['checkedVendorMaintenance']: [],
      ... dataChecked.checkedVendorMediaPromosi ? ['checkedVendorMediaPromosi']: [],
      ... dataChecked.checkedVendorSurvey ? ['checkedVendorSurvey']: [],
      ... dataChecked.checkedOthers ? ['checkedOthers']: [],
    ];

    // console.log("+++ checkedArr =>", checkedArr);

    checkedArr.map((item)=>{
      let key = "";
      // eslint-disable-next-line default-case
      switch (item) {
      case 'checkedFLM':
        key = "FLM";
        break;
      case 'checkedSLM':
        key = "SLM";
        break;
      case 'checkedCR':
        key = "CR";
        break;
      case 'checkedSecurity':
        key = "Security";
        break;
      case 'checkedVendorJaringan':
        key = "Jarkom";
        break;
      case 'checkedVendorMaintenance':
        key = "Maintenance";
        break;
      case 'checkedVendorMediaPromosi':
        key = "Promosi";
        break;
      case 'checkedVendorSurvey':
        key = "Survey";
        break;
      case 'checkedOthers':
        key = "Other";
        break;
      }
      const newObjName = {
        key: `${key} Name`,
        value: dataBast.vendorDetails.find(values => values.check === item).name || "",
      };
      const newObjPhone = {
        key:  `${key} Telephone Number`,
        value: dataBast.vendorDetails.find(values => values.check === item).phone || "",
      };
      
      newDataVendorDetail.push(newObjName,newObjPhone);
    });

    const dataHit = {
      // eslint-disable-next-line radix
      id: parseInt(id),
      taskType,
      engineerTelephoneNumber: dataBast.engineerPhone,
      idMesin: dataBast.idMesin,
      typeMesin: dataBast.mesinType,
      mesin: dataBast.mesin,
      brandMesin: dataBast.merekMesin,
      snMesin: dataBast.snMesin,
      snUps: dataBast.snUps,
      merekUps: dataBast.upsBrand,
      jumlahKaset: dataBast.jumlahKaset,
      jumlahReject: dataBast.jumlahReject,
      dynabolt: dataBast.dynabolt,
      kunciBooth: dataBast.kunciBooth,
      kunciFasciaAtas: dataBast.kunciFasciaAtas,
      kunciKerangkeng: dataBast.kunciKerangkeng,
      kunciFasciaBawah: dataBast.kunciFasciaBawah,
      kunciTombak: dataBast.kunciTombak,
      kondisiAc: dataBast.kondisiAc,
      typeBooth: dataBast.boothType,
      groundListrikOtlet: dataBast.groundListrikOtlet,
      teganganListrikOtlet: dataBast.teganganListrikOtlet,
      teganganListrikBoth: dataBast.teganganListrikBooth,
      groundLIstrikBooth: dataBast.groundListrikBooth,
      cctvInternal: dataBast.cctvInternal,
      cctvDvr: dataBast.cctvDvr,
      statusMesin: dataBast.statusMesin,
      testingTrasaksiKartu: dataBast.testingTransaksiKartu,
      testingTransaksiOctoM: dataBast.testingTransaksiOctom,
      kerapihanKabel: dataBast.kerapihanKabel,
      cahayaRuangan: dataBast.cahayaRuangan,
      kebersihanRuang: dataBast.kebersihanRuang,
      stickerId: dataBast.stickerId,
      stikerKelengkapan: dataBast.kelengkapanStiker,
      merekModem: dataBast.merekModem,
      snModem: dataBast.snModem,
      hub: dataBast.hub,
      photoVendorFront: photoSesudah1.path,
      photoVendorRear: photoSesudah4.path,
      photoVendorLeft: photoSesudah2.path,
      photoVendorRight: photoSesudah3.path,

      kondisiBooth: dataBast.kondisiBooth,
      vendorDetail: newDataVendorDetail,
      vendorSignature: dataBast.photoSignature? [{
        key: "PIC Signature",
        value: photoReqSignature.path
      }] : dataBast.vendorSignature,
    };
    console.log('+++ dataHit', dataHit);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/submitBastActivationTermination`,
        dataHit,
        config
      );
      setModalLoader(false);
      if(result){
        if (result.status === 200) {
          // alert('BERHASIL');
          setOpenSuccessCreatePopUp(true);
        }
      }
    } catch (error) {
      alert(`Error ${error}`);
      setModalLoader(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>BAST Digital</Typography>

        <Grid container style={{ marginTop: 20, marginLeft: 180 }}>
          <Paper className={classes.rootPaper}>
            {isLoading ? (
              <Loading maxheight="100%" />
            ) : (
              <div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Grid item>
                    <CimbLogo style={{ width: 146, height: 46 }} />
                  </Grid>
                  <Grid item>
                    <div className={classes.backButton}>
                      <PDFDownloadLink
                        document={
                          <BastPdf
                            data={dataBast}
                            dataResponse={dataResponse}
                            dataChecked={dataChecked}
                          />
                        }
                        fileName="BAST_Digital"
                      >
                        {({ loading }) =>
                          loading ? (
                            "loading document..."
                          ) : (
                            <MuiIconLabelButton
                              label="Export To PDF"
                              iconPosition="endIcon"
                              // onClick={generatePDF}
                              buttonIcon={<UploadIcon />}
                            />
                          )
                        }
                      </PDFDownloadLink>
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Typography>
                          {dataBast.noReference !== undefined
                            ? dataBast.noReference
                            : "-"}
                        </Typography>
                        <Typography>
                          {dataBast.letterDate !== undefined
                            ? dataBast.letterDate
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Kepada Yth :</Typography>
                        <Typography>
                          Bapak/Ibu{" "}
                          {dataBast.nameLandlord !== undefined
                            ? dataBast.nameLandlord
                            : "-"}
                        </Typography>
                        <Typography>
                          Pemilik Pengelola Lokasi{" "}
                          {dataBast.locationName !== undefined
                            ? dataBast.locationName
                            : "-"}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          Perihal : Berita Acara Serah Terima
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              ID ATM :
                            </Typography>
                            <Typography>
                              {dataBast.atmId !== undefined
                                ? dataBast.atmId
                                : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Lokasi :
                            </Typography>
                            <Typography style={{ wordWrap: "anywhere" }}>
                              {" "}
                              {dataBast.locationName !== undefined
                                ? dataBast.locationName
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Latitude :
                            </Typography>
                            <Typography style={{wordWrap: "break-word"}}>
                              {dataBast.latitude !== undefined
                                ? dataBast.latitude
                                : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Longitude :
                            </Typography>
                            <Typography style={{wordWrap: "break-word"}}>
                              {dataBast.longitude !== undefined
                                ? dataBast.longitude
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Area :
                            </Typography>
                            <Typography>
                              {dataBast.areaName !== undefined
                                ? dataBast.areaName
                                : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Kota :
                            </Typography>
                            <Typography>
                              {dataBast.cityName !== undefined
                                ? dataBast.cityName
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container direction="row">
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              Alamat :
                            </Typography>
                            <Typography>
                              {dataBast.locationAddress !== undefined
                                ? dataBast.locationAddress
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  {/* LEFT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Tgl Pekerjaan:</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.processingDate !== undefined
                                ? dataBast.processingDate
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Pic Pekerjaan :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.picVendor !== undefined
                                ? dataBast.picVendor
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 0 }}>
                            <Typography style={{ fontWeight: 400 }}>
                              No Engineer :
                            </Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 15 }}>
                            <SmallInput
                              style={{ width: "150px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(
                                  e.target.value,
                                  "engineerPhone"
                                )
                              }
                              placeholder="Masukan No Telp"
                              value={dataBast.engineerPhone}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 28 }}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography>Vendor Lainnya :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 10 }}>
                            <Button
                              style={{
                                height: "max-content",
                                backgroundColor: "#ffff",
                                boxShadow: "none",
                              }}
                              variant="contained"
                              endIcon={<PlusIcon />}
                              onClick={() => setIsOpenAddVendor(true)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          style={{ paddingLeft: 10 }}
                        >
                          {dataBast.vendorDetails.map((item, index) => {
                            if (dataChecked[item.check]) {
                              return (
                                <Grid
                                  item
                                  style={{ marginTop: 10, marginBottom: 10 }}
                                >
                                  <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                  >
                                    <Grid item>
                                      <Typography style={{ fontWeight: 600 }}>
                                        {item.key}
                                      </Typography>
                                    </Grid>
                                    <Grid item style={{ marginRight: 20 }}>
                                      <Grid
                                        container
                                        direction="column"
                                        spacing={2}
                                      >
                                        <Grid item>
                                          <SmallInput
                                            style={{
                                              width: "150px",
                                              height: "23px",
                                            }}
                                            placeholder="Masukan Nama PIC"
                                            value={item.name}
                                            onChange={(e) => {
                                              const newVendorDetail =
                                                dataBast.vendorDetails.map(
                                                  (obj, objIndex) => {
                                                    if (index === objIndex) {
                                                      return {
                                                        ...obj,
                                                        name: e.target.value,
                                                      };
                                                    }
                                                    return obj;
                                                  }
                                                );
                                              // console.log("+++ newVendorDetail", newVendorDetail);
                                              handleChangeState(
                                                newVendorDetail,
                                                "vendorDetails"
                                              );
                                            }}
                                          />
                                        </Grid>
                                        <Grid item>
                                          <SmallInput
                                            style={{
                                              width: "150px",
                                              height: "23px",
                                            }}
                                            placeholder="Masukan No Telp"
                                            value={item.phone}
                                            onChange={(e) => {
                                              const newVendorDetail =
                                                dataBast.vendorDetails.map(
                                                  (obj, objIndex) => {
                                                    if (index === objIndex) {
                                                      return {
                                                        ...obj,
                                                        phone: e.target.value,
                                                      };
                                                    }
                                                    return obj;
                                                  }
                                                );
                                              // console.log("+++ newVendorDetail", newVendorDetail);
                                              handleChangeState(
                                                newVendorDetail,
                                                "vendorDetails"
                                              );
                                            }}
                                          />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            }
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 5 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography> No Ticket:</Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{ fontWeight: 600, marginRight: 20 }}
                            >
                              {dataBast.ticketNumber !== undefined
                                ? dataBast.ticketNumber
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography>ID Location:</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.locationId !== undefined
                                ? dataBast.locationId
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography>Nama Lokasi :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.locationName !== undefined
                                ? dataBast.locationName
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography>ID Mesin :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.idMesin !== undefined
                                ? dataBast.idMesin
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Jenis Pekerjaan :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.jobType !== undefined
                                ? dataBast.jobType
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Tanggal Request :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.requestDate !== undefined
                                ? dataBast.requestDate
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item xs={4}>
                            <Typography>Keterangan : </Typography>
                          </Grid>
                          <Grid item xs={6} style={{ marginRight: 20 }}>
                            <Typography
                              style={{ fontWeight: 600, textAlign: "right" }}
                            >
                              {dataBast.notesDescription !== undefined
                                ? dataBast.notesDescription
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Detail team Mover */}

                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Detail Team Mover
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{ marginTop: 5, paddingLeft: 40, paddingRight: 60 }}
                >
                  <Divider
                    variant="fullWidth"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#BCC8E7",
                    }}
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  {/* LEFT */}
                  <Grid item xs={6}>
                    <Grid container direction="column" justify="space-beetwen">
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          style={{ paddingBottom: 10 }}
                        >
                          <Grid item xs={5}>
                            <Typography>ID Mesin</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <SmallInput
                              value={dataBast.idMesin}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "idMesin")
                              }
                              style={{ width: "135px", height: "23px" }}
                              placeholder="Masukan No"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={5} style={{ paddingTop: 15 }}>
                            <Typography>Mesin</Typography>
                          </Grid>
                          <Grid item xs={1} style={{ paddingTop: 15 }}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <FormControl className={classes.select}>
                              <Select
                                id="status"
                                value={dataBast.mesin}
                                onChange={(e) =>
                                  handleChangeState(e.target.value, "mesin")
                                }
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                <MenuItem value="-">
                                  <em />
                                </MenuItem>
                                {Mesin.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={5} style={{ paddingTop: 15 }}>
                            <Typography> Merek Mesin</Typography>
                          </Grid>
                          <Grid item xs={1} style={{ paddingTop: 15 }}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <FormControl className={classes.select}>
                              <Select
                                id="status"
                                value={dataBast.merekMesin}
                                onChange={(e) =>
                                  handleChangeState(
                                    e.target.value,
                                    "merekMesin"
                                  )
                                }
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                <MenuItem value="-">
                                  <em />
                                </MenuItem>
                                {MerkMesin.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={5} style={{ paddingTop: 15 }}>
                            <Typography> Type Mesin</Typography>
                          </Grid>
                          <Grid item xs={1} style={{ paddingTop: 15 }}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingTop: 15 }}>
                            <FormControl className={classes.select}>
                              <Select
                                id="status"
                                value={dataBast.mesinType}
                                onChange={(e) =>
                                  handleChangeState(e.target.value, "mesinType")
                                }
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                <MenuItem value="-">
                                  <em />
                                </MenuItem>
                                {TypeMesin.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          style={{ paddingTop: 25 }}
                        >
                          <Grid item xs={5}>
                            <Typography>SN Mesin</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <SmallInput
                              style={{ width: "135px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "snMesin")
                              }
                              placeholder="Masukan No SN"
                              value={dataBast.snMesin}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column" justify="space-beetwen">
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> Merek Ups</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography> :</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ marginTop: -10 }}>
                            <FormControl className={classes.select}>
                              <Select
                                id="status"
                                value={dataBast.upsBrand}
                                onChange={(e) =>
                                  handleChangeState(e.target.value, "upsBrand")
                                }
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                <MenuItem value="-">
                                  <em />
                                </MenuItem>
                                {MerkUps.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          style={{ paddingTop: 27 }}
                        >
                          <Grid item xs={5}>
                            <Typography>SN UPS</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <SmallInput
                              style={{ width: "135px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "snUps")
                              }
                              placeholder="Masukan No"
                              value={dataBast.snUps}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          style={{ paddingTop: 30 }}
                        >
                          <Grid item xs={5}>
                            <Typography>Jumlah Kaset</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            :
                          </Grid>
                          <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <SmallInput
                              style={{ width: "135px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "jumlahKaset")
                              }
                              placeholder="Masukan No"
                              value={dataBast.jumlahKaset}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row" style={{ paddingTop: 30 }}>
                          <Grid item xs={5}>
                            <Typography>Jumlah Reject</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            :
                          </Grid>
                          <Grid item xs={6} style={{ paddingLeft: 10 }}>
                            <SmallInput
                              style={{ width: "135px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(
                                  e.target.value,
                                  "jumlahReject"
                                )
                              }
                              placeholder="Masukan No"
                              value={dataBast.jumlahReject}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row" style={{ paddingTop: 25 }}>
                          <Grid item xs={5}>
                            <Typography>Dynabolt</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl className={classes.select}>
                              <Select
                                id="status"
                                value={dataBast.dynabolt}
                                onChange={(e) =>
                                  handleChangeState(e.target.value, "dynabolt")
                                }
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                <MenuItem value="-">
                                  <em />
                                </MenuItem>
                                {Dynabolt.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.value}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Check BOX */}
                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Grid xs={4}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciBooth === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(
                              dataBast.kunciBooth === 1 ? 0 : 1,
                              "kunciBooth"
                            )
                          }
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Booth
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciFasciaAtas === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(
                              dataBast.kunciFasciaAtas === 1 ? 0 : 1,
                              "kunciFasciaAtas"
                            )
                          }
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Fascia Atas
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid xs={4}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciKerangkeng === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(
                              dataBast.kunciKerangkeng === 1 ? 0 : 1,
                              "kunciKerangkeng"
                            )
                          }
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Kerangkeng
                        </Typography>
                      }
                    />

                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciFasciaBawah === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(
                              dataBast.kunciFasciaBawah === 1 ? 0 : 1,
                              "kunciFasciaBawah"
                            )
                          }
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Fascia Bawah
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid xs={4}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciTombak === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(
                              dataBast.kunciTombak === 1 ? 0 : 1,
                              "kunciTombak"
                            )
                          }
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Tombak
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                {/* Left Checkbox */}

                {/* Detail Tim Slm */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Detail Team SLM
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{ marginTop: 5, paddingLeft: 40, paddingRight: 60 }}
                >
                  <Divider
                    variant="fullWidth"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#BCC8E7",
                    }}
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  {/* LEFT */}
                  
                  <Grid item xs ={6}>
                     <Grid container direction="column" justify="space-beetwen">
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Kondisi Ac</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.kondisiAc}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "kondisiAc"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {KondisiAc.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                         <Grid container direction="row"  style={{paddingTop: 20}}>
                           <Grid item xs={5}>
                             <Typography>Type Booth</Typography>
                           </Grid>
                           <Grid item xs={1}>
                             <Typography>:</Typography>
                           </Grid>
                           <Grid item xs={6}>
                             <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.boothType}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "boothType"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {Typebooth.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                           </Grid>
                         </Grid>
                       </Grid>
                       <Grid item>
                         <Grid container direction="row" style={{paddingTop: 20}}>
                           <Grid item xs={5}>
                             <Typography> Kondisi Booth </Typography>
                           </Grid>
                           <Grid item xs={1}>
                             <Typography> :</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.kondisiBooth}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "kondisiBooth"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {Kondisibooth.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                           </Grid>
                         </Grid>
                       </Grid>
                        <Grid item>
                         <Grid container direction="row" style={{paddingTop: 20}}>
                           <Grid item xs={5}>
                             <Typography> Tegangan Listrik Outlet</Typography>
                           </Grid>
                           <Grid item xs={1}>
                             <Typography> :</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.teganganListrikOtlet}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "teganganListrikOtlet"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {TeganganListrikOtlet.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                           </Grid>
                         </Grid>
                       </Grid>
                       <Grid item>
                         <Grid container direction="row" style={{paddingTop: 10}}>
                           <Grid item xs={5}>
                             <Typography> Grounding Listrik Outlet</Typography>
                           </Grid>
                           <Grid item xs={1}>
                             <Typography> :</Typography>
                           </Grid>
                           <Grid item xs={6}>
                             <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.groundListrikOtlet}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "groundListrikOtlet"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {GroundingListrikOtlet.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                           </Grid>
                         </Grid>
                       </Grid>
                     </Grid>
                  </Grid>
                  {/* RIGTH */}
                  <Grid item xs ={6}>
                     <Grid container direction="column" justify="space-beetwen">
                       <Grid item>
                          <Grid container direction="row" style={{paddingTop:15}}>
                            <Grid item xs={5}>
                              <Typography>Tegangan Listrik Booth</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.teganganListrikBooth}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "teganganListrikBooth"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>

                                      {TeganganListrikBooth.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                         <Grid item>
                          <Grid container direction="row" style={{paddingTop:10}}>
                            <Grid item xs={5}>
                              <Typography>Grounding Listrik Booth</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.groundListrikBooth}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "groundListrikBooth"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {GroundingListrikBooth.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                          <Grid item>
                          <Grid container direction="row" style={{paddingTop:10}}>
                            <Grid item xs={5}>
                              <Typography>CCTV Internal</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.cctvInternal}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "cctvInternal"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {CctvInternal.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" style={{paddingTop:20}}>
                            <Grid item xs={5}>
                              <Typography>CCTV + DVR</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.cctvDvr}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "cctvDvr"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {CctvDvr.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                          <Grid item>
                          <Grid container direction="row" style={{paddingTop:20}}>
                            <Grid item xs={5}>
                              <Typography>Status Mesin</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.statusMesin}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "statusMesin"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                      statusMesin
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {StatusMesin.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      </Grid>
                 
                </Grid>

                {/* Detail Tim FLM */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Detail Team FLM
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{ marginTop: 5, paddingLeft: 40, paddingRight: 60 }}
                >
                  <Divider
                    variant="fullWidth"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#BCC8E7",
                    }}
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  {/* LEFT */}
                   <Grid item xs ={6}>
                     <Grid container direction="column" justify="space-beetwen">
                      <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Transaksi Kartu</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.testingTransaksiKartu}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "testingTransaksiKartu"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {TestingTransaksiKartu.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Testing Transaksi Octo Mobile</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.testingTransaksiOctom}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "testingTransaksiOctom"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {TestingTransaksiOctom.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Kerapihan Kabel</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.kerapihanKabel}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "kerapihanKabel"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {KerapihanKabel.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Cahaya Ruangan</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                              <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.cahayaRuangan}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "cahayaRuangan"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {CahayaRuangan.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                        </Grid>
                        </Grid>
                  {/* RIGTH */}
                  <Grid item xs ={6}>
                     <Grid container direction="column" justify="space-beetwen">
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Kebersihan Ruangan</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.kebersihanRuang}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "kebersihanRuang"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {KebersihanRuangan.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Kelengkapan</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <FormControl className={classes.select}>
                                    <Select
                                      id="status"
                                      value={dataBast.kelengkapanStiker}
                                      onChange={(e) =>
                                        handleChangeState(
                                          e.target.value,
                                          "kelengkapanStiker"
                                        )
                                      }
                                      input={<BootstrapInput />}
                                      IconComponent={DropDownIcon}
                                    >
                                      <MenuItem value="-">
                                        <em />
                                      </MenuItem>
                                      {StikerKelengkapan.map((item) => {
                                        return (
                                          <MenuItem
                                            key={item.id}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                          </Grid>
                        </Grid>
                       </Grid>
                       <Grid item>
                          <Grid
                          container
                          direction="row"
                          style={{paddingTop: 15}}
                        >
                          <Grid item xs={5}>
                             <Typography>Stiker ID</Typography>
                          </Grid>
                          <Grid item xs={1}>
                             <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                             <FormControl className={classes.select}>
                                <Select
                                  id="status"
                                  value={dataBast.stickerId}
                                  onChange={(e) =>
                                    handleChangeState(
                                      e.target.value,
                                      "stickerId"
                                    )
                                  }
                                  input={<BootstrapInput />}
                                  IconComponent={DropDownIcon}
                                >
                                  <MenuItem value="-">
                                    <em />
                                  </MenuItem>
                                  {StikerId.map((item) => {
                                    return (
                                      <MenuItem
                                        key={item.id}
                                        value={item.value}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                        </Grid>
                       </Grid>
                     </Grid>
                  </Grid>
                </Grid>

                {/*  Detail Tim Jarkom */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Detail Team Jarkom
                  </Typography>
                </Grid>

                <Grid
                  item
                  style={{ marginTop: 5, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Divider
                    variant="fullWidth"
                    style={{
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#BCC8E7",
                    }}
                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  {/* LEFT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, marginLeft: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 20, width: "110px" }}>
                            <Typography>Merek Modem :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 15 }}>
                            <SmallInput
                              style={{ width: "120px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "merekModem")
                              }
                              value={dataBast.merekModem}
                              placeholder="Sticker ID"
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20, marginLeft: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 20 }}>
                            <Typography>SN Modem :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 15 }}>
                            <SmallInput
                              style={{ width: "120px", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "snModem")
                              }
                              value={dataBast.snModem}
                              placeholder="Kondisi Sticker"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGHT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 0 }}>
                            <Typography>Hub:</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 55 }}>
                             <FormControl className={classes.select}>
                                <Select
                                  id="status"
                                  value={dataBast.hub}
                                  onChange={(e) =>
                                    handleChangeState(
                                      e.target.value,
                                      "hub"
                                    )
                                  }
                                  input={<BootstrapInput />}
                                  IconComponent={DropDownIcon}
                                >
                                  <MenuItem value="-">
                                    <em />
                                  </MenuItem>
                                  {StikerId.map((item) => {
                                    return (
                                      <MenuItem
                                        key={item.id}
                                        value={item.value}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            {/* <SmallInput
                              style={{ width: "96%", height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "hub")
                              }
                              value={dataBast.hub}
                              placeholder="Link Video"
                            /> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* FOTO SEBELUM */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 600 }}>
                    Foto Sebelum
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="depan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoFrontCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoFrontCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img
                              src={NoImage}
                              className={classes.imgContainer}
                              alt="img-depan"
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sebelum 1
                          </Typography>
                          <Typography>{dataBast.dateFrontCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kanan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoRightCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoRightCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img
                              src={NoImage}
                              className={classes.imgContainer}
                              alt="img-depan"
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sebelum 2
                          </Typography>
                          <Typography>{dataBast.dateRightCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kiri"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoLeftCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoLeftCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img
                              src={NoImage}
                              className={classes.imgContainer}
                              alt="img-depan"
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sebelum 3
                          </Typography>
                          <Typography>{dataBast.dateLeftCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="belakang"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoRearCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoRearCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img
                              src={NoImage}
                              className={classes.imgContainer}
                              alt="img-depan"
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sebelum 4
                          </Typography>
                          <Typography>{dataBast.dateRearCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                {/* FOTO SESUDAH */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 600 }}>
                    Foto Sesudah
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}
                >
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="depan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoFrontVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoFrontVendor}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState(null, "photoFrontVendor");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Depan"
                              onChange={(e) => setPhotoFront(e.target.files[0])}
                              selectedImage={photoFront}
                              onDelete={() => setPhotoFront("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 1
                          </Typography>
                          <Typography>{dataBast.dateFrontVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kanan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoLeftVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoLeftVendor}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState(null, "photoLeftVendor");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Kanan"
                              onChange={(e) => setPhotoLeft(e.target.files[0])}
                              selectedImage={photoLeft}
                              onDelete={() => setPhotoLeftt("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 2
                          </Typography>
                          <Typography>{dataBast.dateLeftVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kiri"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoRightVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoRightVendor}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState(null, "photoRightVendor");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Kiri"
                              onChange={(e) => setPhotoRight(e.target.files[0])}
                              selectedImage={photoRight}
                              onDelete={() => setPhotoRight("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 3
                          </Typography>
                          <Typography>{dataBast.dateRightVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="belakang"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.photoRearVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoRearVendor}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState(null, "photoRearVendor");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Belakang"
                              onChange={(e) => setPhotoRear(e.target.files[0])}
                              selectedImage={photoRear}
                              onDelete={() => setPhotoRear("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 4
                          </Typography>
                          <Typography>{dataBast.dateRVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 400 }}>
                    Demikian kami sampaikan atas perhatian dan kerjasamanya kami
                    ucapkan terima kasih.
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 40, marginLeft: 40 }}
                >
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="depan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {/* <Typography>{dataBast.vendorSignature.length}</Typography> */}
                          {dataBast.vendorSignature.length > 0 ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.vendorSignature[0].value}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState([], "vendorSignature");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Tanda Tangan"
                              onChange={(e) =>
                                handleChangeState(
                                  e.target.files[0],
                                  "photoSignature"
                                )
                              }
                              selectedImage={dataBast.photoSignature}
                              onDelete={() =>
                                handleChangeState(null, "photoSignature")
                              }
                            />
                          )}

                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            {dataBast.picVendor}
                          </Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                {/* Button Container */}
                <Grid
                  container
                  style={{ marginTop: 240, marginLeft: 40, marginBottom: 40 }}
                  justify="space-between"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.secondaryButton}
                      onClick={() =>
                        window.location.assign(
                          "/implementation/vendor/main-list-booth"
                        )
                      }
                      style={{ textTransform: "capitalize" }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item style={{ marginRight: 80 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.primaryButton}
                      onClick={handleSubtmit}
                      style={{ textTransform: "capitalize" }}
                    >
                      Simpan
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
        </Grid>
        <AddNewVendorPopUp
          onFilterChecked={setAddTextbox}
          defaultChecked={dataChecked}
          isOpen={isOpenAddVendor}
          onClose={() => setIsOpenAddVendor(false)}
        />
      </div>
      <SuccessPopUp
        isOpen={openSuccessCreatePopUp}
        onClose={() => {
          setOpenSuccessCreatePopUp(false);
          history.goBack();
        }}
        label="Simpan BAST Berhasil"
        type="Add"
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

export default BASTDigital;
