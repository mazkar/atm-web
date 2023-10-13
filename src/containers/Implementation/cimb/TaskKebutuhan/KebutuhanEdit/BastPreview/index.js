import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Divider,
} from "@material-ui/core";
import moment from "moment";
import Axios from "axios";
import qs from "qs";
import MuiIconLabelButton from "../../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as CimbLogo } from "../../../../../../assets/icons/siab/cimbLogo.svg";
import { ReactComponent as DownloadIcon } from "../../../../../../assets/icons/linear-red/download.svg";
import { ReactComponent as ShareIcon } from "../../../../../../assets/icons/linear-red/upload.svg";
import MinioImageComponent from "../../../../../../components/MinioImageComponent";
import ImageSelector from "../../../../../../components/ImageSelector";
import SuccessPopUp from "../../../../../VendorManagement/Orders/common/PopUp/successPopUp";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import NoImage from "../../../../../../assets/images/image.png";
import Loading from "../../../../../../components/Loading/LoadingView";
import ModalLoader from "../../../../../../components/ModalLoader";
import { PrimaryHard } from "../../../../../../assets/theme/colors";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BASTPdf from "../../../../../VendorManagement/Orders/Kebutuhan/BastDigital/BastPdf";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  rootPaper: {
    width: "70%",
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
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: "justify",
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
});

function BASTDigital() {
  const { id, idBast } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] =
    useState(true); /* <------- loading Summary */
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
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
    phoneFLM: null,
    phoneSLM: null,
    phoneCR: null,
    phoneJarkom: null,
    phoneOther: null,
    phonePromosi: null,
    phoneSurvey: null,
    phoneSecurity: null,
    namePicFLM: null,
    namePicSLM: null,
    namePicCR: null,
    namePicJarkom: null,
    namePicOther: null,
    namePicPromosi: null,
    namePicSurvey: null,
    namePicSecurity: null,
    ticketNumber: "-",
    locationId: "-",
    idMesin: "-",
    jobType: "-",
    requestDate: "-",
    processingDate: "-",
    notesDescription: "-",
    engineerTelephoneNumber: "-",
    linkVideo: "-",
    partNumber: "-",
    installationDate: "-",
    requesterName: "-",
    stickerId: "-",
    version: "-",
    picInstall: "-",
    brandTypeName: "-",
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
    photoSignVendor: null,
    photoList: [],
  }); // <--- init data BAST
  const [dataChecked, setDataChecked] = useState({
    checkedJarkom: false,
    checkedFLM: false,
    checkedSLM: false,
    checkedCR: false,
    checkedSecurity: false,
    checkedPromosi: false,
    checkedSurvey: false,
    checkedOther: false,
  });
  useEffect(() => {
    getResponse(id);
  }, [id]);

  useEffect(() => {
    console.log(dataBast);
  }, [dataBast]);

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
      // id: id,
      id: bastId,
      taskType: "need",
    });
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getDetailBastTask?${params}`,
        config
      );
      try {
        console.log("AHASIL: ", result);
        const response = result.data;
        let dataNameFLM,
          dataNameSLM,
          dataNameCR,
          dataNamePromosi,
          dataNameOther,
          dataNameSecurity,
          dataNameJarkom,
          dataNameSurvey;
        let dataFLM,
          dataSLM,
          dataCR,
          dataSecurity,
          dataPromosi,
          dataSurvey,
          dataOther,
          dataJarkom,
          photoFLMVendor,
          photoSLMVendor,
          photoSignVendor;
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
        if (
          response.vendorDetails != null &&
          response.vendorDetails.length > 0
        ) {
          response.vendorDetails.map((item, index) => {
            if (item.key == "FLM Signature") {
              photoFLMVendor = item.value;
            } else if (item.key == "SLM Signature") {
              photoSLMVendor = item.value;
            } else if (item.key == "FLM Telephone Number") {
              dataFLM = item.value;
            } else if (item.key == "FLM Name") {
              dataNameFLM = item.value;
              if (dataNameFLM == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedFLM: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedFLM: true,
                }));
              }
            } else if (item.key == "SLM Telephone Number") {
              dataSLM = item.value;
            } else if (item.key == "SLM Name") {
              dataNameSLM = item.value;
              if (dataNameSLM == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSLM: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSLM: true,
                }));
              }
            } else if (item.key == "CR Name") {
              dataNameCR = item.value;
              if (dataNameCR == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedCR: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedCR: true,
                }));
              }
            } else if (item.key == "CR Telephone Number") {
              dataCR = item.value;
            } else if (item.key == "Jarkom Name") {
              dataNameJarkom = item.value;
              if (dataNameJarkom == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedJarkom: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedJarkom: true,
                }));
              }
            } else if (item.key == "Jarkom Telephone Number") {
              dataJarkom = item.value;
            } else if (item.key == "Security Name") {
              dataNameSecurity = item.value;
              if (dataNameSecurity == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSecurity: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSecurity: true,
                }));
              }
            } else if (item.key == "Security Telephone Number") {
              dataSecurity = item.value;
            } else if (item.key == "Promosi Name") {
              dataNamePromosi = item.value;
              if (dataNamePromosi == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedPromosi: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedPromosi: true,
                }));
              }
            } else if (item.key == "Promosi Telephone Number") {
              dataPromosi = item.value;
            } else if (item.key == "Survey Name") {
              dataNameSurvey = item.value;
              if (dataNameSurvey == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSurvey: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedSurvey: true,
                }));
              }
            } else if (item.key == "Survey Telephone Number") {
              dataSurvey = item.value;
            } else if (item.key == "Other Name") {
              dataNameOther = item.value;
              if (dataNameOther == "") {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedOther: false,
                }));
              } else {
                setDataChecked((prevstate) => ({
                  ...prevstate,
                  checkedOther: true,
                }));
              }
            } else if (item.key == "Other Telephone Number") {
              dataOther = item.value;
            }
          });
        }
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
            phoneFLM: dataFLM !== null ? dataFLM : "-",
            phoneSLM: dataSLM !== null ? dataSLM : "-",
            phoneCR: dataCR !== null ? dataCR : "-",
            phonePromosi: dataPromosi !== null ? dataPromosi : "-",
            phoneJarkom: dataJarkom !== null ? dataJarkom : "-",
            phoneSecurity: dataSecurity !== null ? dataSecurity : "-",
            phoneSurvey: dataSurvey !== null ? dataSurvey : "-",
            phoneOther: dataOther !== null ? dataOther : "-",
            namePicFLM: dataNameFLM !== null ? dataNameFLM : "-",
            namePicCR: dataNameCR !== null ? dataNameCR : "-",
            namePicSLM: dataNameSLM !== null ? dataNameSLM : "-",
            namePicJarkom: dataNameJarkom !== null ? dataNameJarkom : "-",
            namePicPromosi: dataNamePromosi !== null ? dataNamePromosi : "-",
            namePicSecurity: dataNameSecurity !== null ? dataNameSecurity : "-",
            namePicSurvey: dataNameSurvey !== null ? dataNameSurvey : "-",
            namePicOther: dataNameOther !== null ? dataNameOther : "-",
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
            engineerTelephoneNumber:
              response.engineerTelephoneNumber !== null
                ? response.engineerTelephoneNumber
                : "-",
            linkVideo: response.linkVideo !== null ? response.linkVideo : "-",
            partNumber:
              response.partNumber !== null ? response.partNumber : "-",
            installationDate:
              response.installationDate !== null
                ? moment(response.installationDate).format("DD/MM/YYYY")
                : "-",
            picInstall:
              response.picInstall !== null ? response.picInstall : "-",
            picVendor: response.picVendor !== null ? response.picVendor : "-",
            requesterName:
              response.requesterName !== null ? response.requesterName : "-",
            brandTypeName:
              response.brandTypeName !== null ? response.brandTypeName : "-",
            stickerId: response.stickerId !== null ? response.stickerId : "",
            version: response.version !== null ? response.version : "-",
            photoFrontCimb: response.photoFrontCimb,
            datefrontCimb:
              response.photoFrontCimbUploadDate !== null
                ? moment(response.photoFrontCimbUploadDate).format(
                    "DD-MM-YYYY, HH:mm"
                  )
                : null,

            photoLeftCimb: response.photoLeftCimb,
            dateLeftCimb:
              response.photoLeftCimbUploadDate !== null
                ? moment(response.photoLeftCimbUploadDate).format(
                    "DD-MM-YYYY, HH:mm"
                  )
                : null,
            photoRightCimb: response.photoRightCimb,
            dateRightCimb:
              response.photoRightCimbUploadDate !== null
                ? moment(response.photoRightCimbUploadDate).format(
                    "DD-MM-YYYY, HH:mm"
                  )
                : null,
            photoRearCimb: response.photoRearCimb,
            dateRearCimb:
              response.photoRearCimbUploadDate !== null
                ? moment(response.photoRearCimbUploadDate).format(
                    "DD-MM-YYYY, HH:mm"
                  )
                : null,
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
            photoFLMVendor: photoFLMVendor,
            photoSLMVendor: photoSLMVendor,
            photoSignVendor: photoSignVendor,
            photoList: [],
          };
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

  const generatePDF = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "blob", // important
    };
    const params = qs.stringify({
      id,
      taskType: "need",
    });
    setModalLoader(true);
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/downloadBastTask?${params}`,
        config
      );
      console.log("pdf", result);
      const res = result;
      console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `BAST_Digital.pdf`);
      document.body.appendChild(link);
      link.addEventListener(
        "click",
        function () {
          setTimeout(() => {
            URL.revokeObjectURL(url);
            link.removeEventListener("click", this);
          }, 150);
        },
        false
      );
      link.click();
      document.body.removeChild(link);
      setModalLoader(false);
    } catch (err) {
      alert(`Error ${err}`);
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
                              //onClick={generatePDF}
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
                        <Grid container direction="row" justify="space-between">
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
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>PIC Pekerjaan :</Typography>
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

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography>No Engineer :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
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
                          <Grid item style={{ marginTop: 10 }}>
                            <Typography>Vendor Lainnya:</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/*VENDOR LAINNYA DISINI */}
                      <div>
                        {dataChecked.checkedFLM == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    FLM :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicFLM}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneFLM}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedSLM == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    SLM :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicSLM}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneSLM}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedCR == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    CR :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicCR}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneCR}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedJarkom == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    Jarkom :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicJarkom}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneJarkom}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedSurvey == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    Survey :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicSurvey}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneSurvey}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedSecurity == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    Security :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicSecurity}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneSecurity}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedPromosi == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    Promosi :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicPromosi}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phonePromosi}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {dataChecked.checkedOther == true ? (
                          <div>
                            <Grid item style={{ marginTop: 20 }}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                              >
                                <Grid item style={{ marginLeft: 20 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    Other :
                                  </Typography>
                                </Grid>
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.namePicOther}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                style={{ marginTop: 20 }}
                              >
                                <Grid item style={{ marginLeft: 20 }} />
                                <Grid item style={{ marginRight: 40 }}>
                                  <Typography style={{ fontWeight: 600 }}>
                                    {" "}
                                    {dataBast.phoneOther}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 15 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item>
                            <Typography>No Ticket :</Typography>
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
                            <Typography>ID Location :</Typography>
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
                          <Grid item xs={4}>
                            <Typography>Keterangan :</Typography>
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

                      <Grid item style={{ marginTop: 30 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 0 }}>
                            <Typography style={{ fontWeight: 400 }}>
                              Link Video :
                            </Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 25 }}>
                            <Typography>
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

                {/* Detail Atribut */}
                <Grid item style={{ marginTop: 35, marginLeft: 40 }}>
                  <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                    Detail Atribut
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
                  style={{ marginTop: 10, marginLeft: 0 }}
                >
                  {/* LEFT */}
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item style={{ marginTop: 10, marginLeft: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 20 }}>
                            <Typography>No Part :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.partNumber !== undefined
                                ? dataBast.partNumber
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, marginLeft: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 20 }}>
                            <Typography>Tgl Installasi :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.installationDate !== undefined
                                ? dataBast.installationDate
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10, marginLeft: 20 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 20 }}>
                            <Typography>PIC Pasang :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 40 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.picInstall !== undefined
                                ? dataBast.picInstall
                                : "-"}
                            </Typography>
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
                            <Typography>Merk/Type/Nama :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 60 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.brandTypeName !== undefined
                                ? dataBast.brandTypeName
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 0 }}>
                            <Typography>No Sticker Aset :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 60 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.stickerId !== undefined
                                ? dataBast.stickerId
                                : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container direction="row" justify="space-between">
                          <Grid item style={{ marginLeft: 0 }}>
                            <Typography>Version :</Typography>
                          </Grid>
                          <Grid item style={{ marginRight: 60 }}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.version !== undefined
                                ? dataBast.version
                                : "-"}
                            </Typography>
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
                  style={{ marginTop: 15, marginLeft: -10 }}
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
                            <MinioImageComponent
                              filePath={dataBast.photoFrontVendor}
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
                            <MinioImageComponent
                              filePath={dataBast.photoRightVendor}
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
                            <MinioImageComponent
                              filePath={dataBast.photoLeftVendor}
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
                            <MinioImageComponent
                              filePath={dataBast.photoRearVendor}
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
                  {dataBast.picVendor != null ? (
                    <div>
                      <Grid item>
                        <Box className={classes.imageUploadContainer}>
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
                              <div></div>
                            )}
                            <Typography
                              style={{ fontWeight: 600, marginTop: 10 }}
                            >
                              {dataBast.picVendor}
                            </Typography>
                          </Grid>
                        </Box>
                      </Grid>
                    </div>
                  ) : (
                    <div></div>
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
            )}
          </Paper>
        </Grid>
      </div>
      <SuccessPopUp
        isOpen={openSuccessCreatePopUp}
        onClose={() => setOpenSuccessCreatePopUp(false)}
        label="Task Berhasil Ditambahkan"
        type="Add"
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

export default BASTDigital;
