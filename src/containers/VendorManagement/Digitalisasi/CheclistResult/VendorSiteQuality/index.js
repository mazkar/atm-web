import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "./Pdf";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import dummyData from "./Pdf/dummydata";
import { doFetchDetailVendorSiteQuality } from "../../../ApiServices";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/general/download-white.svg";
import TabInfo from "./TabInfo";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { changeStateSurvey, changeStateTopPdf } from "../../../../VendorManagement/Digitalisasi/CheclistResult/common/ChangeStateSurveyDetail";
import {
  // changeStateSurvey,
  changeStateTop,
  dataTopInfoPdfSiteQuality,
  siteQualitySurveys,
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
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(
    dataTopInfoPdfSiteQuality
  );
  const [dataSiteQualitySurvey, setSiteQualitySurvey] =
    useState(siteQualitySurveys);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doFetchDetailVendorSiteQuality(loadingHandler, id)
      .then(async (response) => {
        // console.log("+++ response", response);
        if (response) {
          if (response.responseCode === "00") {
            const {
              siteQualityDto,
              potentialCrime,
              mediaPromotion,
              roomConditionDto,
              informasiUmum,
            } = response;
            // console.log("iyawwww", mediaPromotion);
            const siteQualitynewAnswerValues = [
              [siteQualityDto[0].siteQualityId],
              [siteQualityDto[0].resultId],
              [siteQualityDto[0].locType],
              [siteQualityDto[0].atmLocCondition],
              [siteQualityDto[0].atmNearExist, siteQualityDto[0].atmNearType],
              [siteQualityDto[0].parkingAtm],
              [siteQualityDto[0].photoMachineBody],
              [siteQualityDto[0].photoCloseUpAtm],
              [siteQualityDto[0].photoAroundAtm],
            ];
            const potensiAnswerValues = [
              [
                potentialCrime[0].topBoothDoor,
                potentialCrime[0].photoTopBoothDoor,
              ],
              [potentialCrime[0].cageBooth, potentialCrime[0].photoCageBooth],
              [
                potentialCrime[0].fasciaKeyTop,
                potentialCrime[0].photoFasciaKeyTop,
              ],
              [
                potentialCrime[0].fasciaKeyBottom,
                potentialCrime[0].photoFasciaKeyBottom,
              ],
              [potentialCrime[0].pinCover, potentialCrime[0].photoPinCover],
              [
                potentialCrime[0].strangerCardSlot,
                potentialCrime[0].photoObjectCardSlot,
              ],
              [
                potentialCrime[0].strangerPinCover,
                potentialCrime[0].photoObjectPinCover,
              ],
              [
                potentialCrime[0].strangerObjectRoom,
                potentialCrime[0].photoObjectRoom,
              ],
            ];
            const mediaPromotionAnswerValues = [
              [
                mediaPromotion[0].flagMountedExist,
                mediaPromotion[0].flagMountedType,
                mediaPromotion[0].flagMountedCondition,
                mediaPromotion[0].photoFlagMounted,
              ],
              [
                mediaPromotion[0].neonBoxExist,
                mediaPromotion[0].neonBoxType,
                mediaPromotion[0].neonBoxCondition,
                mediaPromotion[0].photoNeonBox,
              ],
              [
                mediaPromotion[0].stickerGlassExist,
                mediaPromotion[0].stickerGlassType,
                mediaPromotion[0].stickerGlassCondition,
                mediaPromotion[0].photoStickerGlass,
              ],
              [
                mediaPromotion[0].boothExist,
                mediaPromotion[0].boothType,
                mediaPromotion[0].boothCondition,
                mediaPromotion[0].photoBooth,
              ],
              [mediaPromotion[0].pylonExist, mediaPromotion[0].photoPylon],
              [
                mediaPromotion[0].otherMediaExist,
                mediaPromotion[0].otherMediaType,
                mediaPromotion[0].photoOtherMedia,
              ],
              [
                mediaPromotion[0].topGapMediaExist,
                mediaPromotion[0].topGapMachineCondition,
                mediaPromotion[0].photoTopGapMachine,
              ],
              [
                mediaPromotion[0].stickerMachineExist,
                mediaPromotion[0].stickerMachineType,
                mediaPromotion[0].photoStickerMachine,
              ],
              [mediaPromotion[0].bodyRedExist, mediaPromotion[0].photoBodyRed],
              [
                mediaPromotion[0].positionFlasExist,
                mediaPromotion[0].positionFlagCondition,
                mediaPromotion[0].photoPositionFlag,
              ],
              [
                mediaPromotion[0].nightFlagExist,
                mediaPromotion[0].photoNightFlag,
              ],
            ];
            const roomconditionAnswerValues = [
              [roomConditionDto[0].temperature],
              [
                roomConditionDto[0].availableAc,
                roomConditionDto[0].availableAcCondition,
                roomConditionDto[0].photoAvailableAc,
              ],
              [
                roomConditionDto[0].ceilingCondition,
                roomConditionDto[0].photoCeiling,
              ],
              [
                roomConditionDto[0].wallCondition,
                roomConditionDto[0].photoWall,
              ],
              [
                roomConditionDto[0].glassAreaCondition,
                roomConditionDto[0].photoGlassArea,
              ],
              [
                roomConditionDto[0].floorCondition,
                roomConditionDto[0].photoFloor,
              ],
              [
                roomConditionDto[0].doorExist,
                roomConditionDto[0].doorCondition,
                roomConditionDto[0].photoDoor,
              ],
              [
                roomConditionDto[0].cableInstallation,
                roomConditionDto[0].photoCableInstallation,
              ],
              [
                roomConditionDto[0].lightRoomExist,
                roomConditionDto[0].lightRoomType,
                roomConditionDto[0].lightRoomCondition,
              ],
              [
                roomConditionDto[0].electricityMeterExist,
                roomConditionDto[0].electricityMeterType,
                roomConditionDto[0].electricityMeterCondition,
                roomConditionDto[0].photoElectricityMeter,
              ],
              [
                roomConditionDto[0].electricTokenRemaining,
                roomConditionDto[0].photoElectricTokenRemaining,
              ],
            ];

            const newArrSiteQuality = await changeStateSurvey(
              dataSiteQualitySurvey,
              "vendorSiteQuality",
              siteQualitynewAnswerValues
            );
            const newArrPotensi = await changeStateSurvey(
              dataSiteQualitySurvey,
              "modusKejahatan",
              potensiAnswerValues
            );
            const newArrMediaPromotion = await changeStateSurvey(dataSiteQualitySurvey, "mediaPromosi", mediaPromotionAnswerValues );
            const newArrRoomCondition = await changeStateSurvey(dataSiteQualitySurvey, "kondisiRuangan", roomconditionAnswerValues)
            // console.log(">>> newArrFlmRpl", newArrKondisiRuangan );
            // console.log(">>> newArrPotensi", newArrPotensi);
            setSiteQualitySurvey({
              vendorSiteQuality: newArrSiteQuality,
              modusKejahatan: newArrPotensi,
              mediaPromosi: newArrMediaPromotion ,
              kondisiRuangan: newArrRoomCondition ,
            });
            const topLeftPdf = [id, "?", informasiUmum[0].locationName, "?", "?"];
            const topRightPdf = ["?", "?", "?", "?"];

            const newArrTopLeftPdf= await changeStateTop(dataTopInfoPdf, "infoLeft", topLeftPdf);
            const newArrTopRightPdf= await changeStateTop(dataTopInfoPdf, "infoRight", topRightPdf);
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

  useEffect(() => {
    // console.log("+++ dataInfoGeneral", dataInfoGeneral);
  }, [dataSiteQualitySurvey]);

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
            document={<Pdf dataQnA={dataSiteQualitySurvey} dataTopInfo={dataTopInfoPdf} />}
            fileName="Vendor Site Quality"
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
        <BottomComponent data={dataSiteQualitySurvey} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(GeneralVendorSiteMaintenance);
