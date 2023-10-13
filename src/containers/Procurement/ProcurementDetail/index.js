/* eslint-disable object-shorthand */
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { ReactComponent as BackIcon } from "../../../assets/icons/general/arrow_back_red.svg";
import constansts from "../../../helpers/constants";
import {
  NegosiasiHistoriesPaper,
  NegotiationProgressPaper,
} from "../../../components";
import ProcurementPaper from "../ProcurementPaper";
import LoadingView from "../../../components/Loading/LoadingView";
import TabInfo from "./TabInfo";
import * as ThemeColor from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "100vh",
  },
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
});

function handleRenegotiate() {
  alert("ini renegotiate");
}

function handleApprove() {
  alert("ini approve");
}

const ProcurementDetail = ({ history }) => {
  const [isOpenModalLoader, setModalLoader] = useState(true);
  const classes = useStyles();
  const [dataInformasi, setDataInformasi] = useState();
  const [dataTabInfo, setDataTabInfo] = useState({});
  const [position, setPosition] = useState();
  const [dataProcurement, setDataProcurement] = useState();
  const [dataNego, setDataNego] = useState();
  const [locationId, setLocationId] = useState();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isApproved = urlParams.get("isApproved");

  useEffect(() => {
    const id = window.location.hash;
    const locId = id.slice(1, id.length);
    setLocationId(locId);
  // console.log(locationId);
    const data = { id: locationId };
  // console.log(data);
    setModalLoader(true);
    if (locationId != null) {
      Axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getDetailProcurement`,
        data
      )
        .then((res) => {
        // console.log(res);
          // Mapping data Top Card Tab Information
          const dataInfo = res.data.informasiProcurement[0];
          const dataInfoLoc = res.data.informasiProcurement;
          const info = {
            id: dataInfo.locationId === null ? "N/A" : dataInfo.locationId,
            status: dataInfo.status,
            address: dataInfo.address === null ? "N/A" : dataInfo.address,
            area: dataInfo.area === null ? "N/A" : dataInfo.area,
            aroundAtmCount:
              dataInfo.aroundAtmCount === null
                ? "N/A"
                : dataInfo.aroundAtmCount,
            boothAvailability:
              dataInfo.boothAvailability === null
                ? "N/A"
                : dataInfo.boothAvailability,
            boothType: dataInfo.boothType === null ? "N/A" : dataInfo.boothType,
            branch: dataInfo.branch === null ? "N/A" : dataInfo.branch,
            branchPicName:
              dataInfo.branchPicName === null ? "N/A" : dataInfo.branchPicName,
            buildingLarge:
              dataInfo.buildingLarge === null ? "N/A" : dataInfo.buildingLarge,
            commType: dataInfo.commType === null ? "N/A" : dataInfo.commType,
            countAtm: dataInfo.countAtm === null ? "N/A" : dataInfo.countAtm,
            latitude: dataInfo.latitude === null ? "N/A" : dataInfo.latitude,
            longitude: dataInfo.longitude === null ? "N/A" : dataInfo.longitude,
            locationPhotoslist:
              dataInfo.locationPhotoslist === null
                ? "N/A"
                : dataInfo.locationPhotoslist,
            locationPicName:
              dataInfo.locationPicName === null
                ? "N/A"
                : dataInfo.locationPicName,
            locationType:
              dataInfo.categoryType === null ? "N/A" : dataInfo.categoryType,
            locationCategory:
              dataInfo.locationCategory === null
                ? "N/A"
                : dataInfo.locationCategory,
            newLocation:
              dataInfo.newLocation === null ? "N/A" : dataInfo.newLocation,
            openingType:
              dataInfo.openingType === null ? "N/A" : dataInfo.openingType,
            ownerPicName:
              dataInfo.ownerPicName === null ? "N/A" : dataInfo.ownerPicName,
            publicAccessibility:
              dataInfo.publicAccessibility === null
                ? "N/A"
                : dataInfo.publicAccessibility,
            requester: dataInfo.requester === null ? "N/A" : dataInfo.requester,
            typeAtm: dataInfo.typeAtm === null ? "N/A" : dataInfo.typeAtm,
            workingHour:
              dataInfo.workingHour === null ? "N/A" : dataInfo.workingHour,
            locationPhotosPositionNeonSign:
              dataInfo.locationPhotosPositionNeonSign,
            locationPhotosPositionAtenaVsat:
              dataInfo.locationPhotosPositionAtenaVsat,
            locationMachinePhotos: dataInfo.locationMachinePhotos,
            locationFrontMachinePhoto: dataInfo.locationFrontMachinePhoto,
          };
          setDataInformasi(info);

          // Mapping data Top card tab Map
          const lookLoc = dataInfoLoc.map((value) => {
            return [value.latitude, value.longitude];
          });
          setPosition(lookLoc[0]);
          setDataTabInfo({
            informasiApproval: res.data.informasiProcurement[0],
            detail: res.data.detailRent[0],
            detailRent: res.data.detailInforent,
          });

          // Mapping data Approval card
          const appr = {
            ...res.data.detailRent[0],
            detailInforent: res.data.detailInforent,
          };
          // console.log('??? appr', appr);

          setDataProcurement(appr);

          // Mapping data Negotiation
          const nego = res.data.procurementDetailNegotiation;
          setDataNego(nego);
          setModalLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setModalLoader(false);
          // alert(`===> Error When Fetch Data${err}`);
        });
    }
  }, [locationId]);
  // useEffect(() => {
  // // console.log(">>> CEK: ", JSON.stringify(dataTabInfo));
  // }, [dataTabInfo]);

  const typeProcurement = document.URL.replace(/.*type=([^&]*).*|(.*)/, "$1");

  return (
    <div className={classes.root}>
      {isOpenModalLoader ? (
        <LoadingView maxheight="100%" />
      ) : (
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ marginBottom: 20 }}
        >
          <Grid item>
            <div className={classes.backAction}>
              <Button onClick={() => history.goBack()}>
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </div>
          </Grid>
          <Grid item>
            {/* <DetailAtmInfoPaper data={dataInformasi} type={typeProcurement} location={position} cost={cost} id={locationId}/> */}
            <TabInfo
              data={dataTabInfo}
              idAtm={locationId}
              isLoadData={isOpenModalLoader}
            />
          </Grid>
          <Grid item>
            <NegotiationProgressPaper
              // dataSteps={steps}
              status={dataInformasi?.status}
              openingType={dataInformasi?.openingType}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={5}>
              <Grid item sm={6}>
                <ProcurementPaper
                  dataProcurement={dataProcurement}
                  locId={dataInformasi}
                  renegotiateBtnHandler={handleRenegotiate}
                  approveBtnHandler={handleApprove}
                  isApproved={isApproved}
                />
              </Grid>
              <Grid item sm={6}>
                <NegosiasiHistoriesPaper
                  dataNego={dataNego}
                  topData={dataProcurement}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default withRouter(ProcurementDetail);
