import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { PDFDownloadLink } from "@react-pdf/renderer";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";

import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import mappingDataVendorFlm from "../../../../../helpers/vendors/vendorflmhelper";
import { doFetchDetailVendorFlm } from "../../../ApiServices";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/general/download-white.svg";
import TabInfo from "./TabInfo";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import Pdf from "./Pdf";
import dummyData from "./Pdf/dummydata";
import {vendorFlmSurvey } from "../common/DataDummy";
import {
  changeStateSurvey,
  changeStateTop,
  dataTopInfoPdfFlm,
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
  const [data, setData] = useState(null);
  const [resetData, setResetData] = useState(0);
  const [dataSurvey, setDataSurvey] = useState(vendorFlmSurvey);
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoPdfFlm);
  const [activeMenu, setActiveMenu] = useState(null);
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doFetchDetailVendorFlm(loadingHandler, id)
      .then(async (response) => {
        

       

        if (response) {
          if (response.responseCode === "00") {
            const {informasiUmum} = response;
            setInfoGeneral(response);
           
  
            const dataToset = mappingDataVendorFlm(response);
            
            setDataSurvey(dataToset);
  
            const topLeftPdf = [id, "?", informasiUmum[0].locationName, "?", "?"];
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
          <PDFDownloadLink
            document={<Pdf dataQnA={dataSurvey} dataTopInfo={dataTopInfoPdf}  />}
            fileName="Vendor FLM"
          >
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
        <BottomComponent data={dataSurvey} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralVendorSiteSurvey);
