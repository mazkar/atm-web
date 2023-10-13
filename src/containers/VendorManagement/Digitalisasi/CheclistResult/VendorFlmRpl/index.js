import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/general/download-white.svg';
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import ExportPdf from "./ExportPdf";
import { doGetDetailSurveyFlmRpl } from "../../../ApiServices";
import { dataTopInfoPdfFlmRpl, flmRplSurvey } from "./DefaultData";
import InfoTabDigitalisasi from "../../../../../components/InfoTabDigitalisasi";
import { changeStateSurvey, changeStateTopPdf } from "../common/ChangeStateSurveyDetail";

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

const GeneralSLM = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoPdfFlmRpl);
  const [dataFlmRplSurvey, setDataFlmRplSurvey] = useState(flmRplSurvey);
  function loadingHandler(bool) {
    setLoadData(bool);
  }
  
  useEffect(() => {
    doGetDetailSurveyFlmRpl(loadingHandler, id)
      .then(async(response) => {
        // console.log("+++ response", response);
        if (response) {
          if(response.responseStatus=== "00"){
            const {flmReplenishment, crime, informasiUmum} = response;
            if(flmReplenishment.length > 0){
              const flmRplnewAnswerValues = [
                [flmReplenishment[0].reasonMachineAccess, flmReplenishment[0].reasonMachineType, flmReplenishment[0].reasonMachineCondition, flmReplenishment[0].photoMachineAccess],
                [flmReplenishment[0].officerName],
                [flmReplenishment[0].rackStatusCassete, flmReplenishment[0].rackStatusNoCassete, flmReplenishment[0].rackStatusCasseteCondition, flmReplenishment[0].photoRackStatus],
                [flmReplenishment[0].rackTwoStatusCassete, flmReplenishment[0].rackTwoStatusNoCassete, flmReplenishment[0].rackTwoStatusCasseteCondition, flmReplenishment[0].photoRackTwo],
                [flmReplenishment[0].rackThreeStatusCassete, flmReplenishment[0].rackThreeStatusNoCassete, flmReplenishment[0].rackThreeStatusCasseteCondition, flmReplenishment[0].photoRackThreeStatus],
                [flmReplenishment[0].rackFourStatusCassete, flmReplenishment[0].rackFourStatusNoCassete, flmReplenishment[0].rackFourStatusCasseteCondition, flmReplenishment[0].photoRackFourStatus],
                [flmReplenishment[0].dispenseTest, flmReplenishment[0].photoDispenseTest],
                [flmReplenishment[0].depositTest, flmReplenishment[0].photoDepositTest],
                [flmReplenishment[0].unloadedMachine, flmReplenishment[0].unloadedMachineUrl, flmReplenishment[0].photoUnloadedMachine],
              ];
              const potensiAnswerValues = [
                [crime[0].topBoothDoor,crime[0].photoTopBoothDoor],
                [crime[0].cageBooth, crime[0].photoCageBooth],
                [crime[0].fasciaKeyTop,crime[0].photoFasciaKeyTop],
                [crime[0].fasciaKeyBottom,crime[0].photoFasciaKeyBottom],
                [crime[0].pinCover,crime[0].photoPinCover],
                [crime[0].strangerCardSlot,crime[0].photoObjectCardSlot],
                [crime[0].strangerPinCover,crime[0].photoObjectPinCover],
                [crime[0].strangerObjectRoom,crime[0].photoObjectRoom],
              ];
    
              const newArrFlmRpl= await changeStateSurvey(dataFlmRplSurvey, "flmRpl", flmRplnewAnswerValues);
              const newArrPotensi = await changeStateSurvey(dataFlmRplSurvey, "modusKejahatan", potensiAnswerValues);
              
              // console.log(">>> newArrFlmRpl", newArrFlmRpl);
              // console.log(">>> newArrPotensi", newArrPotensi);
              setDataFlmRplSurvey({
                flmRpl: newArrFlmRpl,
                modusKejahatan: newArrPotensi,
              });
            }
            
            const topLeftPdf = [id, "?", informasiUmum[0].locationName, "?", "?"];
            const topRightPdf = ["?", "?", "?", "?"];

            const newArrTopLeftPdf= await changeStateTopPdf(dataTopInfoPdf, "infoLeft", topLeftPdf);
            const newArrTopRightPdf= await changeStateTopPdf(dataTopInfoPdf, "infoRight", topRightPdf);
            setDataTopInfoPdf({
              infoLeft: newArrTopLeftPdf,
              infoRight: newArrTopRightPdf
            });

            setInfoGeneral({
              locationMachinePhotos: informasiUmum[0].locationMachinePhotos,
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
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

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

          <PDFDownloadLink
            document={<ExportPdf dataQnA={dataFlmRplSurvey} dataTopInfo={dataTopInfoPdf} />}
            fileName="Result Vendor FLM RPL"
          >
            {({ loading }) =>
              loading ? (
                <MuiIconLabelButton
                  iconPosition='startIcon'
                  label='Loading file...'
                  disabled
                  buttonIcon={<DownloadIcon />}
                />
              ) : (
                <MuiIconLabelButton
                  iconPosition='startIcon'
                  label='Export to PDF'
                  buttonIcon={<DownloadIcon />}
                />
              )
            }
          </PDFDownloadLink>

        </Grid>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <InfoTabDigitalisasi data={dataInfoGeneral} />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent data={dataFlmRplSurvey} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralSLM);
