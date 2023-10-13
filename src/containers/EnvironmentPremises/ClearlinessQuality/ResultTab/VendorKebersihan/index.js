import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import constansts from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/general/download-white.svg";
import TabInfo from "../../../common/TabInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfKebersihan from "./PdfKebersihan";
import { dataTopInfoClearliness, vendorKebersihan } from "./DummyData";
import { doFetchDetailVendorKebersihan } from "../../../../VendorManagement/ApiServices";
import mappingCleanliness from "../../../../../helpers/setDataCleanliness/index";
import ModalLoader from "../../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import {
  changeStateSurvey,
  changeStateTopPdf,
} from "../../../../VendorManagement/Digitalisasi/CheclistResult/common/ChangeStateSurveyDetail";
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

const VendorKebersihans = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dataCleanliness, setDataCleanliness] = useState(vendorKebersihan);
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfoClearliness);
  const [resetData, setResetData] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  function loadingHandler(bool) {
    setLoadData(bool);
  }
  useEffect(() => {
    //console.log('+++ dataInfoGeneral', dataInfoGeneral);
  }, [dataInfoGeneral]);

  useEffect(() => {
    doFetchDetailVendorKebersihan(loadingHandler, id).then(async (response) => {
      console.log("data response kebersihan", response);
      if (response) {
        const dataUmum = response.informasiUmum[0];
        setInfoGeneral(dataUmum);
        //const cleanLiness = mappingCleanliness(response)
        const topLeftPdf = [id, "?", dataUmum.locationName, "?", "?"];
        const topRightPdf = ["?", "?", "?", "?"];
        const newArrTopLeftPdf = await changeStateTopPdf(
          dataTopInfoPdf,
          "infoLeft",
          topLeftPdf
        );
        const newArrTopRightPdf = await changeStateTopPdf(
          dataTopInfoPdf,
          "infoRight",
          topRightPdf
        );
        setDataTopInfoPdf({
          infoLeft: newArrTopLeftPdf,
          infoRight: newArrTopRightPdf,
        });
        const {
          mediaPromotion,
          potentialCrime,
          roomConditionDto,
          vendorKebersihan,
        } = response;
        const mediaPromotionNewAnswerValues = [
          [
            mediaPromotion.flagMountedExist,
            mediaPromotion.flagMountedType,
            mediaPromotion.flagMountedCondition,
            mediaPromotion.photoFlagMounted,
          ],
          [
            mediaPromotion.neonBoxExist,
            mediaPromotion.neonBoxType,
            mediaPromotion.neonBoxCondition,
            mediaPromotion.photoNeonBox,
          ],
          [
            mediaPromotion.stickerGlassExist,
            mediaPromotion.stickerGlassType,
            mediaPromotion.stickerGlassCondition,
            mediaPromotion.photoStickerGlass,
          ],
          [
            mediaPromotion.boothExist,
            mediaPromotion.boothType,
            mediaPromotion.boothCondition,
            mediaPromotion.photoBooth,
          ],
          [mediaPromotion.pylonExist, mediaPromotion.photoPylon],
          [
            mediaPromotion.otherMediaExist,
            mediaPromotion.otherMediaType,
            mediaPromotion.photoOtherMedia,
          ],
          [
            mediaPromotion.topGapMediaExist,
            mediaPromotion.topGapMediaCondition,
            mediaPromotion.photoTopGapMachine,
          ],
          [
            mediaPromotion.stickerMachineExist,
            mediaPromotion.stickerMachineType,
            mediaPromotion.photoStickerMachine,
          ],
          [mediaPromotion.bodyRedExist, mediaPromotion.photoBodyRed],
          [
            mediaPromotion.positionFlasExist,
            mediaPromotion.positionFlagCondition,
            mediaPromotion.photoPositionFlag,
          ],
          [mediaPromotion.nightFlagExist, mediaPromotion.photoNightFalg],
        ];
        const potentialCrimeNewValues = [
          [potentialCrime?.topBoothDoor, potentialCrime?.photoTopBoothDoor],
          [potentialCrime?.cageBooth, potentialCrime?.photoCageBooth],
          [potentialCrime?.fasciaKeyTop, potentialCrime?.photoFasciaKeyTop],
          [
            potentialCrime?.fasciaKeyBottom,
            potentialCrime?.photoFasciaKeyBottom,
          ],
          [potentialCrime?.pinCover, potentialCrime?.photoPinCover],
          [
            potentialCrime?.strangerCardSlot,
            potentialCrime?.photoObjectCardSlot,
          ],
          [
            potentialCrime?.strangerPinCover,
            potentialCrime?.photoObjectPinCover,
          ],
          [potentialCrime?.strangerObjectRoom, potentialCrime?.photoObjectRoom],
        ];
        const roomConditionNewValues = [
          [roomConditionDto?.temperature],
          [
            roomConditionDto?.availableAc,
            roomConditionDto?.availableAcCondition,
            roomConditionDto?.photoAvailableAc,
          ],
          [roomConditionDto?.ceilingCondition, roomConditionDto?.photoCeiling],
          [roomConditionDto?.wallCondition, roomConditionDto?.photoWall],
          [
            roomConditionDto?.glassAreaCondition,
            roomConditionDto?.photoGlassArea,
          ],
          [roomConditionDto?.floorCondition, roomConditionDto?.photoFloor],
          [
            roomConditionDto?.doorExist,
            roomConditionDto?.doorCondition,
            roomConditionDto?.photoDoor,
          ],
          [
            roomConditionDto?.cableInstallation,
            roomConditionDto?.photoCableInstallation,
          ],
          [
            roomConditionDto?.lightRoomExist,
            roomConditionDto?.lightRoomType,
            roomConditionDto?.lightRoomCondition,
          ],
          [
            roomConditionDto?.electricityMeterExist,
            roomConditionDto?.electricityMeterType,
            roomConditionDto?.electricityMeterCondition,
            roomConditionDto?.photoElectricityMeter,
          ],
          [
            roomConditionDto?.electricTokenRemaining,
            roomConditionDto?.photoElectricTokenRemaining,
          ],
        ];
        const vendorKebersihanNewValues = [
          [
            vendorKebersihan?.cleanlinessBefore,
            vendorKebersihan?.photoCleanlinessBefore,
          ],
          [
            vendorKebersihan?.cleanlinessAfter,
            vendorKebersihan?.photoCleanlinessAfter,
          ],
          [
            vendorKebersihan?.bodyMachineAfter,
            vendorKebersihan?.photoBodyMachineAfter,
          ],
          [
            vendorKebersihan?.behindMachineAfter,
            vendorKebersihan?.photoBehindMachineAfter,
          ],
          [vendorKebersihan?.boothAfter, vendorKebersihan?.photoBoothAfter],
          [
            vendorKebersihan?.garbageExist,
            vendorKebersihan?.garbageType,
            vendorKebersihan?.photoGarbage,
          ],
          [
            vendorKebersihan?.complainment,
            vendorKebersihan?.complainmentMentions,
          ],
        ];

        //setDataCleanliness(cleanLiness);
        // console.log("+++Data Umum", dataUmum)
        const newArrKebersihan = await changeStateSurvey(
          dataCleanliness,
          "kebersihan",
          vendorKebersihanNewValues
        );
        const newArrPotensi = await changeStateSurvey(
          dataCleanliness,
          "potensiModusKejahatan",
          potentialCrimeNewValues
        );
        const newArrMediaPromotion = await changeStateSurvey(
          dataCleanliness,
          "cekMediaPromosi",
          mediaPromotionNewAnswerValues
        );
        const newArrRoomCondition = await changeStateSurvey(
          dataCleanliness,
          "cekKondisiRuangan",
          roomConditionNewValues
        );

        setDataCleanliness({
          kebersihan: newArrKebersihan,
          potensiModusKejahatan: newArrPotensi,
          cekMediaPromosi: newArrMediaPromotion,
          cekKondisiRuangan: newArrRoomCondition,
        });
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item className={classes.backAction}>
          <Button
            onClick={() =>
              history.push("/environment-premises/clearliness-quality")
            }
          >
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>

        <Grid item>
          <PDFDownloadLink
            document={
              <PdfKebersihan
                dataQnA={dataCleanliness}
                dataTopInfo={dataTopInfoPdf}
              />
            }
            fileName="Result Clearliness Quality"
          >
            {({ loading }) =>
              loading ? (
                <MuiIconLabelButton
                  iconPosition="startIcon"
                  label="Loading file..."
                  disabled
                  buttonIcon={<DownloadIcon />}
                />
              ) : (
                <MuiIconLabelButton
                  iconPosition="startIcon"
                  label="Export to PDF"
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
        <BottomComponent data={dataCleanliness} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};
export default withRouter(VendorKebersihans);
