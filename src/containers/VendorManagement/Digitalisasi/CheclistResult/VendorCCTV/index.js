import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import { doFetchDetailVendorCctv } from "../../../ApiServices";
import {cctvSurvey}  from "../common/DataDummy";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import Pdf from "./Pdf";
import  mappingDataVendorCctv from "../../../../../helpers/vendors/vendorcctv";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/general/download-white.svg";
import TabInfo from "./TabInfo";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import dummyData from "./Pdf/dummydata";

import {
  changeStateSurvey,
  changeStateTop,
  dataTopInfoPdfCctv,
  flmRplSurvey,
} from "./DefaultData";


const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
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
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  divider: { marginTop: 25 },
  boldText: {
    fontFamily: "Barlow",
    fontWeight: "600",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  normalText: {
    fontFamily: "Barlow",
    fontWeight: "400",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  tableRoot: {
    minWidth: 500,
  },
  tableCell: {
    borderBottom: "none",
  },
});

const dummyInfo = [
  {
    id: 0,
    kondisi: "Nama Location",
    namaLokasi: "JKT.CRM.Rezeki Fresh",
    alamat: "Jl.Hayam Wuruk",
    picLokasi: "Username",
    noHpPic: "081234567890",
    emailPic: "ahmad@email.com",
    namaPenandatanganLOO: "Username",
    noHpPenandatanganLOO: "Ahamad@email.com",
    kodeGfms: "123456",
    idRequester: "wr1234",
    picRequest: "Username",
    noHpPicReq: "08123456789",
    emailPicReq: "Ahmad@email.com",
    initialCabang: "HY1234",
    kategoriLokasi: "ON",
    tipelokasi: "Recall",
    populasiATM: "34 ATM",
    tipeATM: "ATM",
  },
];
const GeneralVendorSiteSurvey = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dataTop, setDataTop] = useState();
  const [dataSurvey, setDataSurvey] = useState(cctvSurvey);
  const [resetData, setResetData] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [dataResponse, setDataResponse] = useState(null);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoPdfCctv);
  const [dataInfoGeneral, setInfoGeneral] = useState({});

  const [dataLeft, setDataLeft] = useState({
    atmCondition: "",
    locationName: "",
    locationAddress: "",
    picLocation: "",
    picPhonePicLoc: null,
    emailPicLoc: null,
    signerLooMouName: "",
    signerLooMouPhone: "",
    signerLooMouEmail: " ",
    gmfsCode: 0,
    requesterId: null,
    picRequester: " ",
    picPhonePicReq: null,
    picEmailPicReq: null,
    initialBranch: "",
    categoryLoc: "",
    locationType: "",
    populationAtm: "",
    atmType: "",

  });
  
 
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doFetchDetailVendorCctv(loadingHandler,  id)
      .then(async(response) => {
        
        if (response) {
          if (response.responseCode === "200") {
            const {implementationInformation} = response;
            setInfoGeneral(response);
            // setDataLeft((prevstate)=>({
            //   ...prevstate,
            //   atmCondition:response.atmCondition
            // }))
            
            console.log( setInfoGeneral);
           
           
            
            const dataToset = mappingDataVendorCctv(response);
            
            setDataSurvey(dataToset);
           


            const topLeftPdf = [id, "?", implementationInformation.locationName, "?", "?"];
            const topRightPdf = ["?", "?", "?", "?"];
  
            const newArrTopLeftPdf= await changeStateTop(dataTopInfoPdf, "infoLeft", topLeftPdf);
            const newArrTopRightPdf= await changeStateTop(dataTopInfoPdf, "infoRight", topRightPdf);
            setDataTopInfoPdf({
              infoLeft: newArrTopLeftPdf,
              infoRight: newArrTopRightPdf
            });
          }
         
        }
      
      })
      .catch((err) => {
        console.log("errorr cctv", err);
      });
  }, []);

  useEffect(() => {
  
  }, [dataSurvey]);

  
  useEffect(() => {
    // console.log('+++ dataInfoGeneral', dataInfoGeneral);
  }, [dataInfoGeneral]);
 
  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item className={classes.backAction}>
          <Button onClick={() => history.goBack()}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>

        <Grid item>
          <PDFDownloadLink document={<Pdf dataQnA={dataSurvey} dataTopInfo={dataTopInfoPdf}  />} fileName="Vendor CCTV">
            {({ loading }) =>
              loading ? (
                "loading document..."
              ) : (
                <MuiIconLabelButton
                  label="Export To PDF"
                  iconPosition="endIcon"
                  // onClick={generatePDF}
                  buttonIcon={<DownloadIcon />}
                />
              )
            }
          </PDFDownloadLink>
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <TabInfo data={dataInfoGeneral} idAtm={id} isLoadData={isLoadData} />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent
          // handleChangeStates={handleLeftComponent}
          data={dataSurvey}
          dataResponse={dataResponse}
          isLoadData={isOpenModalLoader}
        />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralVendorSiteSurvey);
