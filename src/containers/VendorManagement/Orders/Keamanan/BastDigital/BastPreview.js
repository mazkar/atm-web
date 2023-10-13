import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { DatePicker } from "antd";
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Axios from "axios";
import qs from "qs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as CimbLogo } from "../../../../../assets/icons/siab/cimbLogo.svg";
import { ReactComponent as ShareIcon } from "../../../../../assets/icons/linear-red/upload.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/icons/linear-red/plus.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ImageSelector from "../../../../../components/ImageSelector";
import NoImage from "../../../../../assets/images/image.png";
import constants from "../../../../../helpers/constants";
import AddNewVendorPopUp from "../../common/PopUp/AddNewVendor";
import Loading from "../../../../../components/Loading/LoadingView";
import ModalLoader from "../../../../../components/ModalLoader";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";
import BASTPdf from "./BASTPdf";

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
    width: "100%",
    height: "100px",
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: "justify",
  },
});

function BastPreview() {
  const classes = useStyles();
  const history = useHistory();
  const [isOpenAddVendor, setIsOpenAddVendor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [photoFront, setPhotoFront] = useState("");
  const [photoLeft, setPhotoLeft] = useState("");
  const [photoRight, setPhotoRight] = useState("");
  const [photoRear, setPhotoRear] = useState("");
  const [photoFLM, setPhotoFLM] = useState("");
  const [photoSLM, setPhotoSLM] = useState("");
  const [photoCIT, setPhotoCIT] = useState("");
  const [photoCR, setPhotoCR] = useState("");
  const [photoSign, setPhotoSign] = useState("");
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
    picVendor: "-",
    phoneFLM: null,
    phoneSLM: null,
    phoneCIT: null,
    phoneCR: null,
    ticketNumber: "-",
    locationId: "-",
    idMesin: "-",
    jobType: "-",
    requestDate: "-",
    processingDate: "-",
    notesDescription: "-",
    engineerTelephoneNumber: null,
    linkVideo: null,
    partNumber: null,
    installationDate: null,
    picInstall: null,
    requesterName: null,
    brandTypeName: null,
    stickerId: null,
    version: null,
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
    photoCITVendor: null,
    photoCRVendor: null,
    photoSignVendor: null,
    namePicFLM: null,
    namePicSLM: null,
    namePicCIT: null,
    namePicCR: null,
    phoneFLM: null,
    phoneSLM: null,
    phoneCIT: null,
    phoneCR: null,

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
  });
  useEffect(() => {
    getResponse(localStorage.bastId);
  }, []);
  async function getResponse(bastId) {
    if (bastId == "" || bastId == undefined) {
      bastId = null;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const params = qs.stringify({
      id: bastId,
      taskType: "security",
    });
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getDetailBastTask?${params}`,
        config
      );
      try {
        console.log("Result", result);
        const response = result.data;
        let dataFLM; let dataSLM; let dataCIT; let dataCR;
        let dataNameFLM; let dataNameSLM; let dataNameCIT; let dataNameCR;
        let photoFLMVendor;
        let photoSLMVendor;
        let photoCITVendor;
        let photoCRVendor;
        let photoSignVendor;
        if (
          response.vendorSignature != null &&
          response.vendorSignature.length > 0
        ) {
          response.vendorSignature.map((item, index) => {
            if (item.key == "PIC Signature") {
              photoSignVendor = item.value;
            }
          });
        }

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

        if (response) {
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
            picVendor: response.picVendor !== null ? response.picVendor : "-",
            // phoneFLM: dataFLM !== null ? dataFLM : "-",
            // phoneSLM: dataSLM !== null ? dataSLM : "-",
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
            requesterName:
              response.requesterName !== null ? response.requesterName : "-",
            notesDescription:
              response.notesDescription !== null
                ? response.notesDescription
                : "-",
            engineerTelephoneNumber:
              response.engineerTelephoneNumber !== null
                ? response.engineerTelephoneNumber
                : "-",
            linkVideo: response.linkVideo !== null ? response.linkVideo : "",
            photoFrontVendor: response.photoFrontVendor,
            dateFrontVendor:
              response.photoFrontVendorUploadDate !== null
                ? moment(response.photoFrontVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoLeftVendor: response.photoLeftVendor,
            dateLeftVendor:
              response.photoLeftVendorUploadDate !== null
                ? moment(response.photoLeftVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRearVendor: response.photoRearVendor,
            dateRearVendor:
              response.photoRearVendorUploadDate !== null
                ? moment(response.photoRearVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoRightVendor: response.photoRightVendor,
            dateRightVendor:
              response.photoRightVendorUploadDate !== null
                ? moment(response.photoRightVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : "-",
            photoFLMVendor,
            photoSLMVendor,
            photoCITVendor,
            photoCRVendor,
            photoSignVendor,
            // namePicFLM: dataNameFLM !== null ? dataNameFLM : "-",
            // namePicSLM: dataNameSLM !== null ? dataNameSLM : "-",
            // namePicCIT: dataNameCIT !== null ? dataNameCIT : "-",
            // namePicCR: dataNameCR !== null ? dataNameCR : "-",
            // phoneFLM: dataFLM !== null ? dataFLM : "-",
            // phoneSLM: dataSLM !== null ? dataSLM : "-",
            // phoneCIT: dataCIT !== null ? dataCIT : "-",
            // phoneCR: dataCR !== null ? dataCR : "-",

            photoList: [],
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
          console.log(dataNew);
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
  function setAddTextbox(value) {
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
    console.log("+++ photoRear", JSON.stringify(photoRear));
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
    if (photoSign !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoSign",
        file: photoSign,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoSign";
      });
      handleChangeState(newDataList, "photoSign");
    }
  }, [photoSign]);
  useEffect(() => {
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
  useEffect(() => {
    if (photoCIT !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoCIT",
        file: photoCIT,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoCIT";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoCIT]);

  useEffect(() => {
    if (photoCR !== "") {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoCR",
        file: photoCR,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "photoList");
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "photoCR";
      });
      handleChangeState(newDataList, "photoList");
    }
  }, [photoCR]);
  const handleChangeState = (newVal, attribut) => {
    console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataBast((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
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
                        <BASTPdf data={dataBast} dataChecked={dataChecked} />
                      }
                      fileName="BAST"
                    >
                      {({ loading }) =>
                        loading ? (
                          "loading document..."
                        ) : (
                          <MuiIconLabelButton
                            label="Export To PDF"
                            iconPosition="endIcon"
                            // onClick={generatePDF}
                            buttonIcon={<ShareIcon />}
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
                <Grid item>
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
                        <b>
                          {dataBast.nameLandlord !== undefined
                            ? dataBast.nameLandlord
                            : "-"}
                        </b>
                      </Typography>
                      <Typography>
                        Pemilik Pengelola Lokasi{" "}
                        <b>
                          {dataBast.locationAddress !== undefined
                            ? dataBast.locationAddress
                            : "-"}
                        </b>
                      </Typography>
                    </Grid>
                    <Grid item style={{ paddingBottom: 30 }}>
                      <Typography>
                        Perihal : <b>Berita Acara Serah Terima</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            ID ATM :
                          </Typography>
                          <Typography>
                            {dataBast.atmId !== undefined
                              ? dataBast.atmId
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography style={{ fontWeight: 600 }}>
                            Area:
                          </Typography>
                          <Typography style={{ wordWrap: "anywhere" }}>
                            {dataBast.areaName !== undefined
                              ? dataBast.areaName
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography style={{ fontWeight: 600 }}>
                            Lokasi :
                          </Typography>
                          <Typography>
                            {dataBast.locationName !== undefined
                              ? dataBast.locationName
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Latitude :
                          </Typography>
                          <Typography>
                            {dataBast.latitude !== undefined
                              ? dataBast.latitude
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography style={{ fontWeight: 600 }}>
                            Longitude :
                          </Typography>
                          <Typography>
                            {dataBast.longitude !== undefined
                              ? dataBast.longitude
                              : "-"}
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
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
                          <Typography>Tgl Pekerjaan :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 40, marginTop: 5 }}>
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.processingDate !== undefined
                              ? dataBast.processingDate
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Grid container direction="row" justify="space-between">
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>PIC Pekerjaan :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 40, marginTop: 5 }}>
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
                        <Grid item>
                          <Typography>No Engineer :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 40, marginTop: 5 }}>
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.engineerTelephoneNumber !== undefined
                              ? dataBast.engineerTelephoneNumber
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" justify="space-between">
                        <Grid item style={{ marginTop: 20 }}>
                          <Typography>Vendor Lainnya:</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* VENDOR LAINNYA DISINI */}
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
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <Grid item style={{ marginTop: 15 }}>
                      <Grid container direction="row" justify="space-between">
                        <Grid item>
                          <Typography>No Ticket:</Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            style={{
                              fontWeight: 600,
                              marginRight: 15,
                            }}
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
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>ID Location :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 20, marginTop: 5 }}>
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
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>Nama Lokasi :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 20, marginTop: 5 }}>
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
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>ID Mesin :</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 20, marginTop: 5 }}>
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.idMesin !== undefined
                              ? dataBast.idMesin
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Grid container direction="row" justify="space-between">
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>Jenis Pekerjaan:</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 20, marginTop: 5 }}>
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.jobType !== undefined
                              ? dataBast.jobType
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Grid container direction="row" justify="space-between">
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>Tanggal Request:</Typography>
                        </Grid>
                        <Grid item style={{ marginRight: 20, marginTop: 5 }}>
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
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>Keterangan:</Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            marginRight: 20,
                            marginTop: 5,
                            textAlign: "left",
                          }}
                        >
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.notesDescription !== undefined
                              ? dataBast.notesDescription
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 20 }}>
                      <Grid container direction="row" justify="space-between">
                        <Grid item style={{ marginTop: 5 }}>
                          <Typography>Link Video:</Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            marginRight: 20,
                            marginTop: 5,
                            textAlign: "left",
                          }}
                        >
                          <Typography style={{ fontWeight: 600 }}>
                            {dataBast.linkVideo !== undefined
                              ? dataBast.linkVideo
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* FOTO */}
              <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                <Typography style={{ fontWeight: 600 }}>
                  Foto Sesudah
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justify="space-around"
                style={{ marginTop: 15, marginLeft: 0 }}
              >
                <Grid item>
                  <Box className={classes.imageUploadContainer}>
                    <label
                      htmlFor="depan"
                      className={classes.imgDefault}
                      style={{ cursor: "not-allowed" }}
                    >
                      <Grid container direction="column" alignItems="center">
                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
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
                            alt="img-sesudah1"
                          />
                        )}
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "15px",
                            marginTop: 10,
                          }}
                        >
                          Sesudah 1
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "13px",
                          }}
                        >
                          {dataBast.dateFrontVendor}
                        </Typography>
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
                          <div>
                            <MinioImageComponent
                              filePath={dataBast.photoRightVendor}
                              className={classes.imgContainer}
                            />
                          </div>
                        ) : (
                          <img
                            src={NoImage}
                            className={classes.imgContainer}
                            alt="img-sesudah2"
                          />
                        )}

                        <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                          Sesudah 2
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "13px",
                          }}
                        >
                          {dataBast.dateRightVendor}
                        </Typography>
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
                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
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
                            alt="img-sesudah3"
                          />
                        )}

                        <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                          Sesudah 3
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "13px",
                          }}
                        >
                          {dataBast.dateLeftVendor}
                        </Typography>
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
                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
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
                            alt="img-sesudah4"
                          />
                        )}
                        <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                          Sesudah 4
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "13px",
                          }}
                        >
                          {dataBast.dateRearVendor}
                        </Typography>
                      </Grid>
                    </label>
                  </Box>
                </Grid>
              </Grid>
              <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                <Typography style={{ fontWeight: 400, fontSize: "14px" }}>
                  Demikian kami sampaikan atas perhatian dan kerjasamanya kami
                  ucapkan terima kasih.
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                style={{ marginTop: 60, marginLeft: 40 }}
              >
                {dataBast.picVendor != null ? (
                  <div>
                    <Grid item>
                      <Box className={classes.imageUploadContainer}>
                        <label
                          htmlFor="vendor"
                          className={classes.imgDefault}
                          style={{ cursor: "not-allowed" }}
                        >
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                          >
                            {dataBast.photoSignVendor ? (
                              <div>
                                <MinioImageComponent
                                  filePath={dataBast.photoSignVendor}
                                  className={classes.imgContainer}
                                />
                              </div>
                            ) : (
                              <div>
                                <ImageSelector
                                  title="Tanda Tangan Vendor"
                                  selectedImage={photoSign}
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
                  </div>
                ) : (
                  <div />
                )}
              </Grid>
              <Grid
                container
                style={{ marginTop: 50, marginLeft: 40, marginBottom: 40 }}
              >
                <Grid item>
                  <Grid item className={classes.deskripsiArea}>
                    <Typography className={classes.deskripsiFooter}>
                      <b>PT. Bank CIMB Niaga, Tbk. </b>
                      <br />
                      Griya Niaga 2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3
                      Bintaro Sektor VII Tangerang 15224
                      <br />
                      Telp 299 72 400 Fax 7486 7959 SWIFT BNIAIDJA
                      www.cimbniaga.com
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        <AddNewVendorPopUp
          onFilterChecked={setAddTextbox}
          defaultChecked={dataChecked}
          isOpen={isOpenAddVendor}
          onClose={() => setIsOpenAddVendor(false)}
        />
      </div>
    </div>
  );
}
export default BastPreview;
