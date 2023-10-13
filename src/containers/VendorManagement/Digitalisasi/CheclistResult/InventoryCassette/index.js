import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PDFDownloadLink } from "@react-pdf/renderer";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from '../../../../../assets/icons/general/download-white.svg';
import TabInfo from "../common/TabInfo";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import ExportPdf from "./ExportPdf";
import { dataTopInfoPdfCassette, inventoryCassette } from "./DefaultData";
import { changeStateSurvey, changeStateTopPdf } from "../common/ChangeStateSurveyDetail";
import { doGetDetailSurveyCassette } from "../../../ApiServices";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import InfoTabDigitalisasi from "../../../../../components/InfoTabDigitalisasi";

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
const InventoryCassette = () => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [resetData, setResetData] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const { id } = useParams();

  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoPdfCassette);
  const [dataSurvey, setDataSurvey] = useState(inventoryCassette);
  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doGetDetailSurveyCassette(loadingHandler, id)
      .then(async(response) => {
        console.log("+++ response", response);
        if (response) {
          if(response.responseCode=== "200"){
            const {detail, implementationInformation} = response;
            const checkDate = detail[0].checkDate? useTimestampConverter(detail[0].checkDate): "-";
            const vaultDateIn = detail[0].vaultDateIn? useTimestampConverter(detail[0].vaultDateIn): "-";
            const vaultDateOut = detail[0].vaultDateOut? useTimestampConverter(detail[0].vaultDateOut): "-";

            const inventoryCassetteAnswerValues = [
              [detail[0].noCassette],
              [detail[0].typeCassette],
              [detail[0].statusCassetteCheck, "?"],
              [detail[0].picCassette],
              [checkDate],
              [vaultDateIn],
              [vaultDateOut],
            ];

            const newArrSurvey= await changeStateSurvey(dataSurvey, "inventoryCassette", inventoryCassetteAnswerValues);
          
            console.log("+++ newArrSurvey", newArrSurvey);

            setDataSurvey({
              inventoryCassette: newArrSurvey,
            });
            const topLeftPdf = [id, "?", implementationInformation.locationName, "?", "?"];
            const topRightPdf = ["?", "?", "?", "?"];

            const newArrTopLeftPdf= await changeStateTopPdf(dataTopInfoPdf, "infoLeft", topLeftPdf);
            const newArrTopRightPdf= await changeStateTopPdf(dataTopInfoPdf, "infoRight", topRightPdf);
            setDataTopInfoPdf({
              infoLeft: newArrTopLeftPdf,
              infoRight: newArrTopRightPdf
            });

            setInfoGeneral({
              locationMachinePhotos: null,
              locationFrontMachinePhoto: null,
              atmId: "?",
              condition: implementationInformation.atmCondition,
              locationName: implementationInformation.locationName,
              locationAddress: implementationInformation.locationAddress,
              picLocationName: implementationInformation.picLocation,
              picLocationTelephoneNumber: implementationInformation.picPhonePicLoc,
              picLocationEmail: implementationInformation.emailPicLoc,
              landlordName: implementationInformation.signerLooMouName,
              landlordTelephoneNumber: implementationInformation.signerLooMouPhone,
              landlordEmail: implementationInformation.signerLooMouEmail,
              codeGfms: implementationInformation.gmfsCode,
              idRequester: implementationInformation.requesterId,
              requesterName: implementationInformation.picRequester,
              requesterTelephoneNumber: implementationInformation.picPhonePicReq,
              requesterEmail: implementationInformation.picEmailPicReq,
              branchInitial: implementationInformation.initialBranch,
              locationMode: implementationInformation.categoryLoc,
              locationType: implementationInformation.locationType,
              atmPopulation: implementationInformation.populationAtm,
              machineType: implementationInformation.atmType,
              latitude: "",
              longitude: "",
              boothType: "?",
              buildingLarge: "?",
              publicAccessibility: "?",
              publicAccessbilityNote: "?",
              operasional: "?",
              aroundAtm: "?",
              denom: "?",
              acType: "?",
              cleanType: "?",
              commType: "?",
              mediaPromotion: "?",
              mediaPromotionNote: "?",
              electricNumber: "?",
              electricityOwnerName: "?",
              yearlyElectricityCost: "?",
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
            document={<ExportPdf dataQnA={dataSurvey.inventoryCassette} dataTopInfo={dataTopInfoPdf} />}
            fileName="Result Vendor Inventory Cassette"
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
        <InfoTabDigitalisasi data={dataInfoGeneral}/>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent dataQnA={dataSurvey.inventoryCassette} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default InventoryCassette;
