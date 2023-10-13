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
    width: "60%",
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
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});


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
    checkedJarkom: false,
    checkedCR: false,
    checkedSecurity: false,
    checkedPromosi: false,
    checkedSurvey: false,
    checkedOther: false,
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
      checkedJarkom: value.checkedJarkom,
      checkedCR: value.checkedCR,
      checkedSecurity: value.checkedSecurity,
      checkedPromosi: value.checkedPromosi,
      checkedSurvey: value.checkedSurvey,
      checkedOther: value.checkedOther,
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
                check: "checkedJarkom",
                phone: val.find(obj => obj.key === "Jarkom Telephone Number")?.value,
                name: val.find(obj => obj.key === "Jarkom Name")?.value,
                key: "Jaringan",
              },
              {
                check: "checkedSecurity",
                phone: val.find(obj => obj.key === "Security Telephone Number")?.value,
                name: val.find(obj => obj.key === "Security Name")?.value,
                key: "Maintenance",
              },
              {
                check: "checkedPromosi",
                phone: val.find(obj => obj.key === "Promosi Telephone Number")?.value,
                name: val.find(obj => obj.key === "Promosi Name")?.value,
                key: "Promosi",
              },
              {
                check: "checkedSurvey",
                phone: val.find(obj => obj.key === "Survey Telephone Number")?.value,
                name: val.find(obj => obj.key === "Survey Name")?.value,
                key: "Survey",
              },
              {
                check: "checkedOther",
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
        setDataResponse(response);
        if (response) {
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
            upsBrand: response.mesinUps !== null ? response.mesinUps : "",
            snUps: response.snUps !== null ? response.snUps : "",
            jumlahKaset: response.jumlahKaset !== null ? response.jumlahKaset : "",
            jumlahReject: response.jumlahReject !== null ? response.jumlahReject : "",
            dynabolt: response.dynabolt !== null ? response.dynabolt : "",
            kondisiAc: response.kondisiAc !== null ? response.kondisiAc : "",
            kondisiBooth: response.kondisiBooth !== null ? response.kondisiBooth : "",
            teganganListrikOtlet: response.teganganListrikOtlet !== null ? response.teganganListrikOtlet : "",
            teganganListrikBooth: response.teganganListrikBooth !== null ? response.teganganListrikBooth : "",
            groundListrikOtlet: response.graoundListrikOtlet !== null ? response.graoundListrikOtlet : "",
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
              const data = {
                checkedFLM: response.vendorDetails.find(obj => obj.key === "FLM Name")?.value !== "",
                checkedSLM: response.vendorDetails.find(obj => obj.key === "SLM Name")?.value !== "",
                checkedJarkom: response.vendorDetails.find(obj => obj.key === "Jarkom Name")?.value !== "",
                checkedCR: response.vendorDetails.find(obj => obj.key === "CR Name")?.value !== "",
                checkedSecurity: response.vendorDetails.find(obj => obj.key === "Security Name")?.value !== "",
                checkedPromosi: response.vendorDetails.find(obj => obj.key === "Promosi Name")?.value !== "",
                checkedSurvey: response.vendorDetails.find(obj => obj.key === "Survey Name")?.value !== "",
                checkedOther: response.vendorDetails.find(obj => obj.key === "Other Name")?.value !== ""
              };
              setDataChecked(data);
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

    const dataHit = {
      // eslint-disable-next-line radix
      id: parseInt(id),
      taskType,
      engineerPhone: dataBast.engineerPhone,
      vendorDetail: [
        {
          key: "FLM Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedFLM").phone,
        },
        {
          key: "SLM Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSLM").phone,
        },
        {
          key: "Jarkom Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedJarkom").phone,
        },
        {
          key: "CR Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedCR").phone,
        },
        {
          key: "Security Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSecurity").phone,
        },
        {
          key: "Promosi Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedPromosi").phone,
        },
        {
          key: "Survey Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSurvey").phone,
        },
        {
          key: "Other Telephone Number",
          value: dataBast.vendorDetails.find(values => values.check === "checkedOther").phone,
        },
        {
          key: "FLM Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedFLM").phone,
        },
        {
          key: "SLM Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSLM").name,
        },
        {
          key: "CR Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedCR").name,
        },
        {
          key: "Jarkom Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedJarkom").name,
        },
        {
          key: "Security Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSecurity").name,
        },
        {
          key: "Survey Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedSurvey").name,
        },
        {
          key: "Promosi Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedPromosi").name,
        },
        {
          key: "Other Name",
          value: dataBast.vendorDetails.find(values => values.check === "checkedOther").name,
        },
      ],
      mesinId: dataBast.idMesin,
      mesinType: dataBast.mesinType,
      mesin: dataBast.mesin,
      brandMesin: dataBast.merekMesin,
      snMesin: dataBast.snMesin,
      snUps: dataBast.snUps,
      upsBrand: dataBast.upsBrand,
      jumlahKaset: dataBast.jumlahKaset,
      jumlahReject: dataBast.jumlahReject,
      dynabolt: dataBast.dynabolt,
      kunciBooth: dataBast.kunciBooth,
      kunciFasciaAtas: dataBast.kunciFasciaAtas,
      kunciKrangkeng: dataBast.kunciKerangkeng,
      kunciFasciaBawah: dataBast.kunciFasciaBawah,
      kunciTombak: dataBast.kunciTombak,
      kondisiAc: dataBast.kondisiAc,
      tipeBooth: dataBast.boothType,
      groundListrikOtlet: dataBast.groundListrikOtlet,
      teganganListrikOtlet: dataBast.teganganListrikOtlet,
      teganganListrikBooth: dataBast.teganganListrikBooth,
      groundListrikBooth: dataBast.groundListrikBooth,
      cctvInternal: dataBast.cctvInternal,
      cctvDvr: dataBast.cctvDvr,
      statusMesin: dataBast.statusMesin,
      testingTransaksiKartu: dataBast.testingTransaksiKartu,
      testingTransaksiOM: dataBast.testingTransaksiOctom,
      kerapihanKabel: dataBast.kerapihanKabel,
      cahayaRuangan: dataBast.cahayaRuangan,
      kebersihanRuangan: dataBast.kebersihanRuang,
      stickerId: dataBast.stickerId,
      stickerKelengkapan: dataBast.kelengkapanStiker,
      merekModem: dataBast.merekModem,
      snModem: dataBast.snModem,
      hub: dataBast.hub,
      photoVendorFront: photoSesudah1.path,
      photoVendorRear: photoSesudah2.path,
      photoVendorLeft: photoSesudah3.path,
      photoVendorRight: photoSesudah4.path,

      kondisiBooth: dataBast.kondisiBooth,
      signageVendor: dataBast.photoSignature? [{
        key: "PIC Signature",
        value: photoReqSignature.path
      }] : dataBast.vendorSignature,
    };
    // console.log('+++ dataHit', dataHit);

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
                          <BastPdf data={dataBast} dataResponse={dataResponse} dataChecked={dataChecked} />
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
                          {dataBast.locationAddress !== undefined
                            ? dataBast.locationAddress
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
                  spacing={4}
                >
                  {/* LEFT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5} >
                            <Typography>Tgl Pekerjaan</Typography>
                          </Grid>
                          <Grid item xs={7} >
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.processingDate !== undefined
                                ? dataBast.processingDate
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Pic Pekerjaan</Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.picVendor !== undefined
                                ? dataBast.picVendor
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography style={{ fontWeight: 400 }}>
                              No Engineer
                            </Typography>
                          </Grid>
                          <Grid item >
                            <Typography>: {dataBast.engineerPhone}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item>
                            <Typography>Vendor Lainnya :</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ paddingLeft: 10, width: "inherit"}}>
                        <Grid container direction="column">
                          {dataBast.vendorDetails.map((item, index)=>{
                            if(dataChecked[item.check]){
                              return(
                                <Grid item style={{ marginTop: 10, width: "inherit"}}>
                                  <Grid
                                    container
                                    direction="row"
                                  >
                                    <Grid item xs={5}>
                                      <Typography style={{ fontWeight: 600 }}>
                                        {item.key}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                      <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                          <Typography>: {item.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                          <Typography>: {item.phone}</Typography>
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
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> No Ticket</Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{ fontWeight: 600, marginRight: 20 }}
                            >
                              : {dataBast.ticketNumber !== undefined
                                ? dataBast.ticketNumber
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>ID Location</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.locationId !== undefined
                                ? dataBast.locationId
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Nama Lokasi</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.locationName !== undefined
                                ? dataBast.locationName
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>ID Mesin</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 20 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.idMesin !== undefined
                                ? dataBast.idMesin
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Jenis Pekerjaan</Typography>
                          </Grid>
                          <Grid item >
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.jobType !== undefined
                                ? dataBast.jobType
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Tanggal Request</Typography>
                          </Grid>
                          <Grid item >
                            <Typography style={{ fontWeight: 600 }}>
                              : {dataBast.requestDate !== undefined
                                ? dataBast.requestDate
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Keterangan</Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{ fontWeight: 600, textAlign: "right" }}
                            >
                              : {dataBast.notesDescription !== undefined
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
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>ID Mesin</Typography>
                          </Grid>
                          <Grid item>
                            <Grid item>
                              <Typography>: {dataBast.idMesin}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Mesin</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.mesin}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> Merk Mesin</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.merekMesin}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> Type Mesin</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.mesinType}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>SN Mesin :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.snMesin}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column">

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Merk UPS</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.upsBrand}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>SN UPS</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.snUps}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Jumlah Kaset</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.jumlahKaset}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Jumlah Reject</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.jumlahReject}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Dynabolt</Typography>
                          </Grid>
                          <Grid item >
                            <Typography>: {dataBast.dynabolt}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Check BOX */}
                <Grid container direction="row" style={{ marginTop: 40, paddingLeft: 40, paddingRight: 40 }}>
                  <Grid xs={4}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={dataBast.kunciBooth === 1}
                          color="default"
                          onChange={() =>
                            handleChangeState(dataBast.kunciBooth === 1 ? 0 : 1, "kunciBooth")
                          }
                          disabled
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
                            handleChangeState(dataBast.kunciFasciaAtas === 1 ? 0 : 1, "kunciFasciaAtas")
                          }
                          disabled
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
                            handleChangeState(dataBast.kunciKerangkeng === 1 ? 0 : 1, "kunciKerangkeng")
                          }
                          disabled
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
                            handleChangeState(dataBast.kunciFasciaBawah === 1 ? 0 : 1, "kunciFasciaBawah")
                          }
                          disabled
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
                            handleChangeState(dataBast.kunciTombak === 1 ? 0 : 1, "kunciTombak")
                          }
                          disabled
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
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Kondisi Ac</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.kondisiAc}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Type Booth</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.boothType}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> Kondisi Booth</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography>: {dataBast.kondisiBooth}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Tegangan Listrik Outlet</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.teganganListrikOtlet}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Grounding Listrik Outlet</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.groundListrikOtlet}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Tegangan Listrik Booth</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.teganganListrikBooth}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Grounding Listrik Booth</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.groundListrikBooth}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> CCTV Internal</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.cctvInternal}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>CCTV + DVR</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography>: {dataBast.cctvDvr}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Status Mesin</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.statusMesin}</Typography>
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
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Testing Transaksi Kartu</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.testingTransaksiKartu}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>
                              Testing Transaksi Octo Mobile
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.testingTransaksiOctom}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Kerapihan Kabel</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.kerapihanKabel}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Cahaya Ruangan</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.cahayaRuangan}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Kebersihan Ruangan</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography>: {dataBast.kebersihanRuang}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Stiker Kelengkapan</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography>: {dataBast.kelengkapanStiker}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography> Stiker ID</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>: {dataBast.stickerId}</Typography>
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
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Merek Modem</Typography>
                          </Grid>
                          <Grid item >
                            <Typography>: {dataBast.merekModem}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>SN Modem</Typography>
                          </Grid>
                          <Grid item >
                            <Typography>: {dataBast.snModem}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* RIGHT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, width: "inherit" }}>
                        <Grid container direction="row">
                          <Grid item xs={5}>
                            <Typography>Hub</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 55 }}>
                            <Typography>: {dataBast.hub}</Typography>
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
                            </div>
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
                          {dataBast.photoRightVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoRightVendor}
                                className={classes.imgContainer}
                              />
                            </div>
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
                            Sesudah 2
                          </Typography>
                          <Typography>{dataBast.dateRightVendor}</Typography>
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
                          {dataBast.photoLeftVendor ? (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.photoLeftVendor}
                                className={classes.imgContainer}
                              />
                            </div>
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
                            Sesudah 3
                          </Typography>
                          <Typography>{dataBast.dateLeftVendor}</Typography>
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
                            </div>
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
                  style={{ marginTop: 40, marginLeft: 40, marginBottom: 30 }}
                >
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor="depan"
                        className={classes.imgDefault}
                        style={{ cursor: "not-allowed" }}
                      >
                        <Grid container direction="column" alignItems="center">
                          {dataBast.vendorSignature.length > 0 && (
                            <div style={{ position: "relative" }}>
                              <MinioImageComponent
                                filePath={dataBast.vendorSignature[0].value}
                                className={classes.imgContainer}
                              />
                            </div>
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
              </div>
            )}
          </Paper>
        </Grid>
      </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

export default BASTDigital;
