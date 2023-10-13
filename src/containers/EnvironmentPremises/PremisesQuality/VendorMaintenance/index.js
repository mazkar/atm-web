import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "./Pdf";
import {VendorMaintenance}  from "../../../VendorManagement/Digitalisasi/CheclistResult/common/DataDummy";
import constansts from "../../../../helpers/constants";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import dummyData from "./Pdf/dummydata";
import mappingDataVendorMaintenance from "../../../../helpers/vendors/vendormaintenance";
import InfoTabDigitalisasi from "../../../../components/InfoTabDigitalisasi";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/general/download-white.svg';
import TabInfo from "../../common/TabInfo";
import ModalLoader from "../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import {doFetchDetailVendorMaintenance} from "../../../VendorManagement/ApiServices";
import {
  changeStateSurvey,
  changeStateTop,
  dataTopInfoPdfMaintenance,
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
const GeneralVendorSiteMaintenance = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [resetData, setResetData] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataSurvey, setDataSurvey] = useState(VendorMaintenance);
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoPdfMaintenance);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doFetchDetailVendorMaintenance(loadingHandler, id)
      .then(async(response) => {
       

        if (response) {
          if(response.responseCode=== "00"){
            const {informasiUmum} = response;
            // setInfoGeneral(response);

            const dataToset = mappingDataVendorMaintenance(response);
           
          
            setDataSurvey(dataToset);
            

            const topLeftPdf = [id, "?", informasiUmum[0].locationName, "?", "?"];
            const topRightPdf = ["?", "?", "?", "?"];

            const newArrTopLeftPdf= await changeStateTop(dataTopInfoPdf, "infoLeft", topLeftPdf);
            const newArrTopRightPdf= await changeStateTop(dataTopInfoPdf, "infoRight", topRightPdf);
            setDataTopInfoPdf({
              infoLeft: newArrTopLeftPdf,
              infoRight: newArrTopRightPdf
            });
            setInfoGeneral({
              locationMachinePhotos: informasiUmum[0].locationFrontMachinePhoto,
              locationFrontMachinePhoto: informasiUmum[0].locationFrontMachinePhoto,
              atmId: informasiUmum[0].atmId,
              condition: informasiUmum[0].kondisi,
              locationName: informasiUmum[0].locationName,
              locationAddress: informasiUmum[0].alat,
              picLocationName: informasiUmum[0].picLocation,
              picLocationTelephoneNumber: informasiUmum[0].handphonePicLocation,
              picLocationEmail: informasiUmum[0].emailPicLocation,
              landlordName: informasiUmum[0].nameSignageMou,
              landlordTelephoneNumber: informasiUmum[0].noSignageMou,
              landlordEmail: informasiUmum[0].emailSignageMou,
              codeGfms: informasiUmum[0].gfmsCode,
              idRequester: informasiUmum[0].requestId,
              requesterName: informasiUmum[0].picRequest,
              requesterTelephoneNumber: informasiUmum[0].handphonePicRequest,
              requesterEmail: informasiUmum[0].emailPicRequest,
              branchInitial: informasiUmum[0].initialCabang,
              locationMode: informasiUmum[0].typeLocation,
              locationType: informasiUmum[0].locationType,
              atmPopulation: informasiUmum[0].populasiAtm,
              machineType: informasiUmum[0].tipeAtm,
              latitude: informasiUmum[0].latitude,
              longitude: informasiUmum[0].longitude,
              boothType: informasiUmum[0].atmRoom,
              buildingLarge: informasiUmum[0].luasAreaAtm,
              publicAccessibility: informasiUmum[0].publicAccess,
              publicAccessbilityNote: informasiUmum[0].noteAccessUmum,
              operasional: informasiUmum[0].operasional,
              aroundAtm: informasiUmum[0].totalOtherBank,
              denom: informasiUmum[0].denom,
              acType: informasiUmum[0].ac,
              cleanType: informasiUmum[0].kebersihan,
              commType: informasiUmum[0].jenisComunication,
              mediaPromotion: informasiUmum[0].mediaPromotion,
              mediaPromotionNote: informasiUmum[0].notes,
              electricNumber: informasiUmum[0].noMeteran,
              electricityOwnerName: informasiUmum[0].atasNama,
              yearlyElectricityCost: informasiUmum[0].electricityCostpYear,
            });
          }

        }
      })
      .catch((err) => {
        console.log("errorr cctv", err);
      });
  }, []);
  useEffect(() => {
    // console.log('+++ dataInfoGeneral', dataInfoGeneral);
  }, [dataInfoGeneral]);
  useEffect(() => {
   
  }, [dataSurvey]);

  return (
    <div className={classes.root}>
      <Grid container justifyContent='space-between'>
        <Grid item className={classes.backAction}>
          <Button onClick={() => history.goBack()}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>

        <Grid item>
        
          <PDFDownloadLink document={<Pdf  dataQnA={dataSurvey} dataTopInfo={dataTopInfoPdf}/>} fileName="Vendor Maintenance">
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
        <InfoTabDigitalisasi data={dataInfoGeneral} idAtm={id} isLoadData={isLoadData} />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent 
          data={dataSurvey}
        />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralVendorSiteMaintenance);
