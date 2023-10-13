/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import axios from "axios";
import SubAtmInfo from "./subAtmInfo";
import SubDetailPaper from "./subDetailPaper";
import PaperSubmissionProgress from "../../../../components/GeneralComponent/PaperSubmissionProgress";
import LoadingView from "../../../../components/Loading/LoadingView";
import constansts from "../../../../helpers/constants";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import RupiahConverter from "../../../../helpers/useRupiahConverter";
import NewForm from '../SubmissionForm/NewForm';
import ModalLoader from '../../../../components/ModalLoader'

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
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
      "& .MuiButton-label": {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  paperDetail: { padding: 20 },
});

const SubDetailNew = () => {
  const classes = useStyles();
  // ANTD COMPONENT //

  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [data, setData] = useState("");
  const [position, setPosition] = useState([]);
  const [cost, setCost] = useState("");
  const [dataDetailCost, setDataDetailCost] = useState("");
  const [statusProgress, setStatusProgress] = useState();

  // GET ID from URL
  const { id } = useParams();
  const rowId = { id: id };

  const { atmId } = useParams();
  const idAtm = { atmId: atmId };

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/detailSubmissionNew`,
        rowId,
        config
      )
      .then((res) => {
        const dataInfo = res.data.informasiNegotiation[0];
        const newInfo = {
          type: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          kondisi: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          lokasiId: dataInfo.newLocation === null ? "-" : dataInfo.newLocation,
          requestId: dataInfo.locationId === null ? "-" : dataInfo.locationId,
          alamat: dataInfo.address === null ? "-" : dataInfo.address,
          roArea: dataInfo.branchInitial === null ? "-" : dataInfo.branchInitial,
          cabang: dataInfo.codeGFMS === null ? "-" : dataInfo.codeGFMS,
          picCabang:
            dataInfo.branchPicName === null ? "-" : dataInfo.branchPicName,
          picPemilik:
            dataInfo.ownerPicName === null ? "-" : dataInfo.ownerPicName,
          picOnLocation:
            dataInfo.locationPicName === null ? "-" : dataInfo.locationPicName,
          populasiATM: dataInfo.countAtm === null ? "-" : dataInfo.countAtm,
          categoryType:
            dataInfo.categoryType === null ? "-" : dataInfo.categoryType,
          locationCategory:
            dataInfo.locationCategory === null
              ? "-"
              : dataInfo.locationCategory,
          aksesibilitas:
            dataInfo.workingHour === null ? "-" : `${dataInfo.workingHour} Jam`,
          aksesPublik:
            dataInfo.publicAccessibility === null
              ? "-"
              : dataInfo.publicAccessibility,
          luasArea:
            dataInfo.buildingLarge === null ? "-" : dataInfo.buildingLarge,
          jumlahAtmBankLain:
            dataInfo.aroundAtmCount === null ? "-" : dataInfo.aroundAtmCount,
          tipeAtm: dataInfo.typeAtm === null ? "-" : dataInfo.typeAtm,
          ruangAtm:
            dataInfo.boothType === null
              ? "-"
              : dataInfo.boothType,
          komunikasi: dataInfo.commType === null ? "-" : dataInfo.commType,
          nilaiTerendah: dataInfo.minOffering,
          nilaiTengah: dataInfo.averageOffering,
          nilaiTertinggi: dataInfo.maxOffering,
          locationPhotosPositionNeonSign:
            dataInfo.locationPhotosPositionNeonSign,
          locationPhotosPositionAtenaVsat:
            dataInfo.locationPhotosPositionAtenaVsat,
          locationMachinePhotos:
            dataInfo.locationMachinePhotos,
          locationFrontMachinePhoto:
            dataInfo.locationFrontMachinePhoto,
        };
        setData(newInfo);
        setModalLoader(false);

        const dataLocation = res.data.informasiNegotiation[0];
        const newPosition = [
          dataLocation.latitude === null ? -6.1753924 : dataLocation.latitude,
          dataLocation.longitude === null
            ? 106.8249641
            : dataLocation.longitude,
        ];
        setPosition(newPosition);
        setModalLoader(false);
        const dataCost = res.data.detailRent;
        setCost(dataCost);
        setModalLoader(false);

        const dataCostDetail = res.data.rent[0];
        const { detailRent } = res.data
        const approver = res.data.rent[0].daNameList;
        const newDetail = {
          biayaSewa: detailRent.map(({yearlyRentCost})=>RupiahConverter(yearlyRentCost)),
          biayaListrik:
            dataCostDetail.yearlyElectricityCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyElectricityCost),
          telepon:
            dataCostDetail.yearlyTelephoneRentCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyTelephoneRentCost),
          serviceCharge:
            dataCostDetail.yearlyServiceCharge === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyServiceCharge),
          totalSewa:
            dataCostDetail.totalRent === null
              ? "-"
              : RupiahConverter(dataCostDetail.totalRent),
          fileDocument: dataCostDetail.documents,
          name: approver === null ? "N/A" : approver,
        };
        setDataDetailCost(newDetail);
        setStatusProgress(res.data.status);
        setModalLoader(false);
      })
      .catch((err) => {
        setModalLoader(false);
        alert(err);
      });
  }, []);

  return (
    <>
      {isOpenModalLoader ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div className={classes.root}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container>
                <div className={classes.backButton}>
                  <MuiIconLabelButton
                    label="Back"
                    iconPosition="startIcon"
                    onClick={() => window.history.back()}
                    buttonIcon={<ArrowLeft />}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <SubAtmInfo
                atmId={idAtm}
                data={data}
                position={position}
                cost={cost}
              />
            </Grid>
            <Grid item>
              <PaperSubmissionProgress statusProgress={statusProgress} />
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <SubDetailPaper dataDetail={dataDetailCost} />
                </Grid>

                <Grid item xs={8}>
                  <Paper className={classes.paperDetail}>
                    <NewForm formType='submit' id={id} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

export default withRouter(SubDetailNew);
