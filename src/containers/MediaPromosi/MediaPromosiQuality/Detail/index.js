import React, { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { PDFDownloadLink } from "@react-pdf/renderer";
import constansts from "../../../../helpers/constants";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/general/download-white.svg";
import TabInfo from "../../../VendorManagement/Digitalisasi/CheclistResult/common/TabInfo";
import ModalLoader from "../../../../components/ModalLoader";
import BottomComponent from "./BottomComponent";
import ExportPdf from "./ExportPdf";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import dataDummy, { dataTopInfo } from "./DummyData";
import {
  changeStateSurvey,
  changeStateTopPdf,
} from "../../../VendorManagement/Digitalisasi/CheclistResult/common/ChangeStateSurveyDetail";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import { doGetDetailSurvey } from "../../services";
import InfoTabDigitalisasi from "../../../../components/InfoTabDigitalisasi";
import mappingDataVendorMaintenance from "../common/helperTab";
import dataPromosi from "../common/dummyHelper";

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
const Detail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const [dataInfoGeneral, setInfoGeneral] = useState();
  const [dataTopInfoPdf, setDataTopInfoPdf] = useState(dataTopInfo);
  const [dataSurvey, setDataSurvey] = useState(dataDummy);
  const [dataMaintenance, setDataMaintenance] = useState(dataPromosi);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  useEffect(() => {
    doGetDetailSurvey(loadingHandler, id)
      .then(async (response) => {
        console.log("+++ response", response);
        if (response) {
          if (response.responseCode === "200") {
            // for Info General
            const dataToGeneral = response.informasiUmum[0];
            // for general info
            setInfoGeneral({
              locationMachinePhotos: dataToGeneral.locationMachinePhotos,
              locationFrontMachinePhoto:
                dataToGeneral.locationFrontMachinePhoto,
              atmId: dataToGeneral.atmId,
              condition: dataToGeneral.kondisi,
              locationName: dataToGeneral.locationName,
              locationAddress: dataToGeneral.alat,
              picLocationName: dataToGeneral.picLocation,
              picLocationTelephoneNumber: dataToGeneral.handphonePicLocation,
              picLocationEmail: dataToGeneral.emailPicLocation,
              landlordName: dataToGeneral.nameSignageMou,
              landlordTelephoneNumber: dataToGeneral.noSignageMou,
              landlordEmail: dataToGeneral.emailSignageMou,
              codeGfms: dataToGeneral.gfmsCode,
              idRequester: dataToGeneral.requestId,
              requesterName: dataToGeneral.picRequest,
              requesterTelephoneNumber: dataToGeneral.handphonePicRequest,
              requesterEmail: dataToGeneral.emailPicRequest,
              branchInitial: dataToGeneral.initialCabang,
              locationMode: dataToGeneral.locationCategori,
              locationType: dataToGeneral.typeLocation,
              atmPopulation: dataToGeneral.populasiAtm,
              machineType: dataToGeneral.tipeAtm,
              latitude: dataToGeneral.latitude,
              longitude: dataToGeneral.longitude,
              boothType: dataToGeneral.atmRoom,
              buildingLarge: dataToGeneral.luasAreaAtm,
              publicAccessibility: dataToGeneral.publicAccess,
              publicAccessbilityNote: dataToGeneral.noteAccessUmum,
              operasional: dataToGeneral.operasional,
              aroundAtm: dataToGeneral.totalOtherBank,
              denom: dataToGeneral.denom,
              acType: dataToGeneral.ac,
              cleanType: dataToGeneral.kebersihan,
              commType: dataToGeneral.jenisComunication,
              mediaPromotion: dataToGeneral.mediaPromotion,
              mediaPromotionNote: dataToGeneral.notes,
              electricNumber: dataToGeneral.noMeteran,
              electricityOwnerName: dataToGeneral.atasNama,
              yearlyElectricityCost: dataToGeneral.electricityCostpYear,
            });

            // data maintennace
            // const dataToMaintenance = response.maintenancePremises;
            const setMaintenance = mappingDataVendorMaintenance(
              response.maintenancePremises
            );
            setDataMaintenance(setMaintenance);
            console.log("main", setMaintenance);

            // data cek promosi
            const dataCekMedia = response.mediaPromotion;
            console.log("promo", dataCekMedia);
            const cekMediaPromosiAnswerValues = [
              [
                dataCekMedia.flagMountedExist,
                dataCekMedia.flagMountedType,
                dataCekMedia.flagMountedCondition,
                dataCekMedia.photoFlagMounted,
              ],
              [
                dataCekMedia.neonBoxExist,
                dataCekMedia.neonBoxType,
                dataCekMedia.neonBoxCondition,
                dataCekMedia.photoNeonBox,
              ],
              [
                dataCekMedia.stickerGlassExist,
                dataCekMedia.stickerGlassType,
                dataCekMedia.stickerGlassCondition,
                dataCekMedia.photoStickerGlass,
              ],
              [
                dataCekMedia.boothExist,
                dataCekMedia.boothType,
                dataCekMedia.boothCondition,
                dataCekMedia.photoBooth,
              ],
              [dataCekMedia.pylonExist, dataCekMedia.photoPylon],
              [
                dataCekMedia.otherMediaExist,
                dataCekMedia.otherMediaType,
                dataCekMedia.photoOtherMedia,
              ],
              [
                dataCekMedia.topGapMachineExist,
                dataCekMedia.topGapMachineCondition,
                dataCekMedia.photoTopGapMachine,
              ],
              [dataCekMedia.bodyRedExist, dataCekMedia.photoBodyRed],
              [
                dataCekMedia.positionFlasExist,
                dataCekMedia.positionFlagCondition,
                dataCekMedia.photoPositionFlag,
              ],
              [dataCekMedia.nightFlagExist, dataCekMedia.photoNightFlag],
            ];
            const newArrSurvey = await changeStateSurvey(
              dataSurvey,
              "cekMediaPromosi",
              cekMediaPromosiAnswerValues
            );
            setDataSurvey({
              cekMediaPromosi: newArrSurvey,
            });
            console.log("survey", dataSurvey);
          }
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);
  useEffect(() => {
    console.log("dataMaintenace", dataMaintenance);
    console.log("dataGeneral", dataInfoGeneral);
    console.log("dataMedia", dataSurvey);
  }, []);

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
            document={
              <ExportPdf dataQnA={dataSurvey} dataTop={dataTopInfoPdf} />
            }
            fileName="Result Vendor Media Promosi"
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
        <InfoTabDigitalisasi data={dataInfoGeneral} />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <BottomComponent data={dataSurvey} dataMaintenance={dataMaintenance} />
      </Grid>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};

export default Detail;
