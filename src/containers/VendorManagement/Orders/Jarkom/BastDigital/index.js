/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Axios from "axios";
import qs from "qs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as CimbLogo } from "../../../../../assets/icons/siab/cimbLogo.svg";
import { ReactComponent as ShareIcon } from "../../../../../assets/icons/siab/share-2.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/linear-red/plus.svg";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ImageSelector from "../../../../../components/ImageSelector";
import NoImage from "../../../../../assets/images/image.png";
import constants from "../../../../../helpers/constants";
import PopUpBastDigitalJarkom from "../PopUpBastDigitalJarkom";
import Loading from "../../../../../components/Loading/LoadingView";
import ModalLoader from "../../../../../components/ModalLoader";
import BastPdf from "./BastPdf";
import { ReactComponent as UploadIcon } from "../../../../../assets/icons/siab/upload-cloud.svg";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";

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
    width: "60%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  rootPaperSecond: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: constants.color.white,
    boxShadow: "unset",
    height: "40px",
    width: "850px",
    border: "1px solid #BCC8E7",
  },
  iconButton: {
    padding: "0px 5px",
    color: constants.color.grayMedium,
    display: "flex",
    alignItems: "center",
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
  imgContainer: {
    borderRadius: 10,
    width: "100%",
    height: "100px",
  },
  deleteFilePhoto: {
    position: "absolute",
    right: -10,
    top: -10,
    color: "#DC241F",
  },
});

function BASTDigital() {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [isOpenAddVendor, setIsOpenAddVendor] = useState(false);
  const [isLoading, setIsLoading] = useState(
    true
  ); /* <------- loading Summary */
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [photoFront, setPhotoFront] = useState("");
  const [photoLeft, setPhotoLeft] = useState("");
  const [photoRight, setPhotoRight] = useState("");
  const [photoRear, setPhotoRear] = useState("");
  const [photoFLM, setPhotoFLM] = useState("");
  const [photoSLM, setPhotoSLM] = useState("");
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

  const [dataBast, setDataBast] = useState({
    noReference: "-",
    letterDate: "-",
    nameLandlord: "-",
    locationArea: "-",
    locationAddress: "-",
    locationName: "-",
    locationCity: "-",
    atmId: "-",
    latitude: "-",
    longitude: "-",
    areaName: "-",
    cityName: "-",
    ticketNumber: "-",
    picVendor: '-',
    locationId: "-",
    idMesin: "-",
    jobType: "-",
    requestDate: "-",
    processingDate: "-",
    notesDescription: "-",
    engineerTelephoneNumber: null,
    linkVideo: null,
    requesterName: null,
    photoFrontCimb: null,
    datefrontCimb: null,
    photoLeftCimb: null,
    dateLeftCimb: null,
    photoRightCimb: null,
    dateRightCimb: null,
    photoRearCimb: null,
    dateRearCimb: null,
    photoFrontVendor: null,
    dateFrontVendor: null,
    photoLeftVendor: null,
    dateLeftVendor: null,
    photoRightVendor: null,
    dateRightVendor: null,
    photoRearVendor: null,
    dateRearVendor: null,
    photoFLMVendor: null,
    photoSLMVendor: null,
    photoList: [],

    vendorDetails: [
      {
        check: "checkedCR",
        phone: "",
        name: "",
        key: "CR",
      },
      {
        check: "checkedFLM",
        phone: "",
        name: "",
        key: "FLM",
      },
      {
        check: "checkedSLM",
        phone: "",
        value: "",
        key: "SLM",
      },
      {
        check: "checkedSecurity",
        phone: "",
        name: "",
        key: "Security",
      },
      {
        check: "checkedVendorJaringan",
        phone: "",
        name: "",
        key: "Jaringan",
      },
      {
        check: "checkedVendorMaintenance",
        phone: "",
        name: "",
        key: "Maintenance",
      },
      {
        check: "checkedVendorMediaPromosi",
        phone: "",
        name: "",
        key: "Promosi",
      },
      {
        check: "checkedVendorSurvey",
        phone: "",
        name: "",
        key: "Survey",
      },
      {
        check: "checkedOthers",
        phone: "",
        name: "",
        key: "Other",
      },],
  }); // <--- init data BAST

  useEffect(() => {
    getResponse(id);
  }, []);

  // useEffect(() => {
  //   console.log("dataChecked", dataChecked);
  //   console.log("INI DATA dataBast", dataBast);
  // }, [dataChecked]);

  async function getResponse() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const params = qs.stringify({
      // id: id,
      id,
      taskType: "jarkom",
    });
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getDetailBastTask?${params}`,
        config
      );
      try {
        // console.log("HASIL: ", result);
        const response = result.data;
        let photoFLMVendor;
        if (
          response.vendorSignature !== null &&
          response.vendorSignature.length > 0
        ) {
          response.vendorSignature.map((item, index) => {
            if (item.key === "FLM Signature") {
              photoFLMVendor = item.value;
            }
          });
        }

        if (response) {
          // console.log("INI vendorDetails LHOOO", response.vendorDetails.key);
          // console.log("INI vendorSignature LHOOO", response.vendorSignature);
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

          const dataNew = {
            noReference:
              response.referenceNumber !== null
                ? response.referenceNumber
                : "-",
            letterDate:
              response.letterDate !== null ? response.letterDate : "-",
            nameLandlord:
              response.nameLandlord !== null ? response.nameLandlord : "-",
            locationArea:
              response.locationArea !== null ? response.locationArea : "-",
            locationAddress:
              response.locationAddress !== null
                ? response.locationAddress
                : "-",
            locationName:
              response.locationName !== null ? response.locationName : "-",
            locationCity:
              response.locationCity !== null ? response.locationCity : "-",
            atmId: response.atmId !== null ? response.atmId : "-",
            latitude: response.latitude !== null ? response.latitude : "-",
            longitude: response.longitude !== null ? response.longitude : "-",
            areaName: response.areaName !== null ? response.areaName : "-",
            cityName: response.cityName !== null ? response.cityName : "-",
            ticketNumber:
              response.ticketNumber !== null ? response.ticketNumber : "-",
            locationId:
              response.locationId !== null ? response.locationId : "-",
            idMesin: response.idMesin !== null ? response.idMesin : "-",
            picVendor: response.picVendor !== null ? response.picVendor : '-',
            jobType: response.jobType !== null ? response.jobType : "-",
            requestDate:
              response.requestDate !== null
                ? moment(response.requestDate).format("DD/MM/YYYY")
                : "-",
            processingDate:
              response.processingDate !== null
                ? moment(response.processingDate).format("DD/MM/YYYY")
                : "-",
            requesterName:
              response.requesterName !== null ? response.requesterName : "-",
            notesDescription:
              response.notesDescription !== null
                ? response.notesDescription
                : "-",
            engineerTelephoneNumber:
              response.engineerTelephoneNumber !== null
                ? response.engineerTelephoneNumber
                : "",
            linkVideo: response.linkVideo !== null ? response.linkVideo : "",
            photoFrontCimb: response.photoFrontCimb,
            datefrontCimb:
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
            photoFLMVendor,
            photoList: [],
            vendorDetails: newArrVendorDetails,
          };
          if(response.vendorDetails !== null){
            if(response.vendorDetails.length>0){
              const dataChecked = {
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
              // console.log("+++ dataChecked", dataChecked);
              setDataChecked(dataChecked);
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

  useEffect(() => {
    // console.log("INI DATA CHECKED", dataChecked);
    if (photoFLM !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFLM",
        file: photoFLM,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoFLM";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoFLM]);

  useEffect(() => {
    if (photoSLM !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoSLM",
        file: photoSLM,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoSLM";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoSLM]);

  const handleChangeState = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataBast((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  const onSubmitNewBAST = async () => {
    // HANDLE PHOTO FILES
    const photoFront = { path: null, url: null };
    const photoRight = { path: null, url: null };
    const photoLeft = { path: null, url: null };
    const photoRear = { path: null, url: null };

    const photoSLM = { path: null, url: null };
    const photoFLM = { path: null, url: null };

    setModalLoader(true);
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
                      photoFront.path = res.data.path;
                      break;
                    case "photoLeft":
                      photoLeft.path = res.data.path;
                      break;
                    case "photoRight":
                      photoRight.path = res.data.path;
                      break;
                    case "photoRear":
                      photoRear.path = res.data.path;
                      break;
                    case "photoSLM":
                      photoSLM.path = res.data.path;
                      break;
                    case "photoFLM":
                      photoFLM.path = res.data.path;
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

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
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
      id,
      taskType: "jarkom",
      engineerTelephoneNumber: dataBast.engineerTelephoneNumber,
      linkVideo: dataBast.linkVideo,
      photoRearVendor: photoRear.path
        ? photoRear.path
        : dataBast.photoRearVendor,
      photoFrontVendor: photoFront.path
        ? photoFront.path
        : dataBast.photoFrontVendor,
      photoRightVendor: photoRight.path
        ? photoRight.path
        : dataBast.photoRightVendor,
      photoLeftVendor: photoLeft.path
        ? photoLeft.path
        : dataBast.photoLeftVendor,
      vendorDetails: newDataVendorDetail,
      vendorSignature: [
        {
          key: "FLM Signature",
          value: photoFLM.path ? photoFLM.path : dataBast.photoFLMVendor,
        },
      ],
    };
    // console.log("INI DATA HIT =>", dataHit);
    const result = await Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateBastTask`,
      dataHit,
      config
    );
    try {
      // console.log("AHASIL: ", result);
      if (result.status === 200) {
        setOpenSuccessCreatePopUp(true);
      } else {
        alert(`Save failed data BAST`, result.status);
      }
      setModalLoader(false);
    } catch (error) {
      alert(`Error ${error}`);
      setModalLoader(false);
    }
  };

  const generatePDF = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const params = qs.stringify({
      id,
      taskType: "jarkom",
    });
    setModalLoader(true);
    const result = await Axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/downloadBastTask?${params}`,
      config
    );
    try {
      // console.log("pdf", result);
      if (result.status == 200) {
        alert("Success Generate PDF");
        window.location.reload();
        setModalLoader(false);
      } else {
        alert("Generate PDF Failed ", result.status);
        setModalLoader(false);
      }
    } catch (err) {
      alert(`Error ${err}`);
      setModalLoader(false);
    }
  };

  function setAddTextbox(value) {
    // console.log("INI VALUE =>", value);
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
    // console.log("INI DATA =>", data);
    setDataChecked(data);
  }

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
                          <BastPdf data={dataBast} dataChecked={dataChecked} />
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
                          Perihal : <b>Berita Acara Serah Terima</b>
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
                            <Typography>
                              {dataBast.latitude !== undefined
                                ? dataBast.latitude
                                : "-"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              Longitude :
                            </Typography>
                            <Typography>
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
                        <Grid item style={{ marginTop: 20 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid item style={{ marginTop: 5 }}>
                              <Typography>Tgl Pekerjaan :</Typography>
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
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
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

                        <Grid item style={{ marginTop: 10, paddingRight: 20 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid sm={5} item>
                              <Typography style={{ fontWeight: 400 }}>
                                Engineer Phone :
                              </Typography>
                            </Grid>
                            <Grid sm={7} item>
                              <SmallInput
                                style={{ height: "23px" }}
                                onChange={(e) =>
                                  handleChangeState(
                                    e.target.value,
                                    "engineerTelephoneNumber"
                                  )
                                }
                                value={dataBast.engineerTelephoneNumber}
                                placeholder="Masukan No Telp"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        style={{
                          marginTop: 28,
                        }}
                      >
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Vendor Lainya :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
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
                        <Grid item style={{ marginTop: 20 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid item style={{ marginTop: 5 }}>
                              <Typography>No Ticket :</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: 40 }}>
                              <Typography style={{ fontWeight: 600 }}>
                                {dataBast.ticketNumber !== undefined
                                  ? dataBast.ticketNumber
                                  : "-"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item style={{ marginTop: 10 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid item style={{ marginTop: 5 }}>
                              <Typography>ID Location :</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: 40 }}>
                              <Typography style={{ fontWeight: 600 }}>
                                {dataBast.locationId !== undefined
                                  ? dataBast.locationId
                                  : "-"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item style={{ marginTop: 10 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid item style={{ marginTop: 5 }}>
                              <Typography>Nama Lokasi :</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: 40 }}>
                              <Typography style={{ fontWeight: 600 }}>
                                {dataBast.locationName !== undefined
                                  ? dataBast.locationName
                                  : "-"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item style={{ marginTop: 10 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
                            <Grid item style={{ marginTop: 5 }}>
                              <Typography>ID Mesin :</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: 40 }}>
                              <Typography style={{ fontWeight: 600 }}>
                                {dataBast.idMesin !== undefined
                                  ? dataBast.idMesin
                                  : "-"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item style={{ marginTop: 10 }}>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
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
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                          >
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
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item xs={4}>
                            <Typography>Keterangan :</Typography>
                          </Grid>
                          <Grid item xs={6} style={{ marginRight: 20 }}>
                            <Typography
                              style={{ fontWeight: 600, textAlign: "right", wordWrap: 'break-word' }}
                            >
                              {dataBast.notesDescription !== undefined
                                ? dataBast.notesDescription
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 30 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item sm={5}>
                            <Typography style={{ fontWeight: 400 }}>
                              Link Video :
                            </Typography>
                          </Grid>
                          <Grid item sm={7}>
                            <SmallInput
                              style={{ height: "23px" }}
                              onChange={(e) =>
                                handleChangeState(e.target.value, "linkVideo")
                              }
                              value={dataBast.linkVideo}
                              placeholder="Masukan Link Video"
                            />
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
                  style={{ marginTop: 15, marginLeft: -10 }}
                >
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kanan"
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
                          <Typography>{dataBast.datefrontCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item>
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
                  <Grid item>
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
                  <Grid item>
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
                  style={{ marginTop: 15 }}
                >
                  <Grid item>
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
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kanan"
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
                              title="Kanan"
                              onChange={(e) => setPhotoRight(e.target.files[0])}
                              selectedImage={photoRight}
                              onDelete={() => setPhotoRight("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 2
                          </Typography>
                          <Typography>{dataBast.dateRightVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="kiri"
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
                              title="Kiri"
                              onChange={(e) => setPhotoLeft(e.target.files[0])}
                              selectedImage={photoLeft}
                              onDelete={() => setPhotoLeft("")}
                            />
                          )}
                          <Typography
                            style={{ fontWeight: 600, marginTop: 10 }}
                          >
                            Sesudah 3
                          </Typography>
                          <Typography>{dataBast.dateLeftVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item>
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
                          <Typography>{dataBast.dateRearVendor}</Typography>
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
                          {dataBast.photoFLMVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoFLMVendor}
                                className={classes.imgContainer}
                              />
                              <IconButton
                                className={classes.deleteFilePhoto}
                                onClick={() => {
                                  handleChangeState(null, "photoFLMVendor");
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          ) : (
                            <ImageSelector
                              title="Tanda Tangan"
                              onChange={(e) => setPhotoFLM(e.target.files[0])}
                              selectedImage={photoFLM}
                              onDelete={() => setPhotoFLM("")}
                            />
                          )}
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.picVendor !== undefined
                              ? dataBast.picVendor
                              : "-"}
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
                          "/vendor-management/orders/kebutuhan"
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
                      onClick={onSubmitNewBAST}
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
        <PopUpBastDigitalJarkom
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
        label="Task Berhasil Ditambahkan"
        type="Add"
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

export default BASTDigital;
