/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-debugger */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/styles";
import {
  Grid,
  AppBar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import AtmInfoDetail from "./AtmInfoDetail";
import PaperTransaction from "./PaperTransaction";
import PaperCost from "../../components/GeneralComponent/PaperCost";
import PaperLocation from "./PaperLocation";
import PaperMedical from "../../components/GeneralComponent/PaperMedical";
import constansts from "../../helpers/constants";
import * as ThemeColor from "../../assets/theme/colors";
import MuiIconLabelButton from "../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../assets/icons/siab/arrow-left.svg";
import LoadingView from "../../components/Loading/LoadingView";
import PhotoTabPanel from './PhotoTabPanel';

const useStyles = makeStyles({
  root: {
    background: "#F4F7FB",
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": { padding: "20px 0px 10px 0px" },
    "& .MuiPaper-elevation1": { boxShadow: 0 },
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    marginBottom: 10,
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
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  customBar: {
    borderRadius: 10,
    padding: 10,
    boxShadow: "none",
    backgroundColor: "white",
  },
}));

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: ThemeColor.Dark,
    fontSize: 17,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    opacity: 0.3,
    "&:focus": {
      opacity: 1,
      fontWeight: "bold",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const AnalyticDataDetail = () => {
  // GET ID from URL
  const { id } = useParams();
  const history = useHistory();
  const rowID = { atmId: id.toString() };
  // console.log(rowID);
  // alert(`ini${id}`);

  // styling
  const classes = useStyles();
  const tabStyles = useTabStyles();
  // init tabs
  const [tabValue, setTabValue] = useState(0);
  // State
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [atmDetail, setAtmDetail] = useState([]); // Info Detail ATM
  const [costDetail, setCostDetail] = useState([]); // Info Detail Cost
  const [locationDetail, setLocationDetail] = useState([]); // Info Detail Location
  const [position, setPosition] = useState([]);
  const [atmLocation, setAtmLocation] = useState([0, 0]);
  const [look, setLook] = useState([]);
  const [medicalDetail, setMedicalDetail] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = { headers: { "Content-Type": "application/json" } };
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        rowID
      )
      .then((res) => {
        const dataInfo = res.data.data.infoAtm[0];
        // console.log('Data Info :', dataInfo);
        const images = [
          dataInfo.locationMachinePhotos,
          dataInfo.locationFrontMachinePhoto,
          dataInfo.locationPhotosPositionNeonSign,
          dataInfo.locationPhotosPositionAtenaVsat,
          dataInfo.locationPhotosLayout
        ]
        const newInfo = {
          ...dataInfo,
          atmId: dataInfo.rowID,
          kondisi: dataInfo.openingType,
          lokasiId: dataInfo.newLocation,
          alamat: dataInfo.address,
          roArea: dataInfo.area,
          cabang: dataInfo.branch,
          picCabang: dataInfo.branchPicName,
          picPemilik: dataInfo.ownerPicName,
          picOnLocation: dataInfo.locationPicName,
          populasiATM: dataInfo.countAtm,
          jenisLokasi: dataInfo.locationType,
          aksesibilitas: dataInfo.workingHour,
          aksesPublik: dataInfo.publicAccessibility,
          luasArea: dataInfo.buildingLarge,
          jumlahAtmBankLain: dataInfo.aroundAtmCount,
          tipeAtm: dataInfo.typeAtm,
          ruangAtm: dataInfo.boothType,
          komunikasi: dataInfo.commType,
          // images: dataInfo.locationPhotosList, // <-- ini apa???
          dueDate: dataInfo.dueDate,
          images,
          // double untuk keperluan tab photos
          fotoMesin: images[0],
          fotoDepan: images[1],
          fotoNeonSign: images[2],
          fotoVsat: images[3],
          fotoLayout: images[4],
        };
        // set constructed data
        setAtmDetail(newInfo);
        // DATA CONST
        const dataCost = res.data.data.cost;
        setCostDetail(dataCost);
        // console.log(costDetail);

        const dataOnMedical = [];
        const dataMedical = Object.values(res.data.data.medicalRecordHistory);
        setMedicalDetail(dataMedical);
        // console.log('get medical', medicalDetail);
        // DATA LOCATION
        const newDataLocation = res.data.data.location.atmPoints;
        const locationData = newDataLocation.map((item, index) => {
          const newLocation = {
            locationName: item.locationName || "-",
            condition: item.condition || "N/A",
            atmId: item.atmId || "-",
            locationType: item.locationType || "-",
            locationAddress: item.locationAddress || "-",
            rentPeriod: item.rentPeriod || "-",
            endRentDate: item.endRentDate,
            openingType: item.openingType || "-",
            averageTransaction: item.averageTransaction || "-",
            cassaAmount: item.cassaAmount || "-",
            revenueAmount: item.revenueAmount || "-",
            latitude: item.latitude,
            distanceInMeter: item.distanceInMeter,
            longitude: item.longitude,
          };
          return newLocation;
        });
        const mapView = res.data.data.infoAtm;
        const viewLoc = mapView.map((item, i) => {
          const newViewLoc = {
            viewLat: item.latitude,
            viewLong: item.longitude,
          };
          return newViewLoc;
        });
        // console.log(viewLoc);
        const lookLoc = viewLoc.map((value) => {
          return { view: [value.viewLat, value.viewLong] };
        });
        const Loc = locationData.map((val) => {
          // console.log('~ val', val)
          return {
            loc: [
              parseFloat(val.latitude.split(",").join(".")),
              parseFloat(val.longitude.split(",").join(".")),
            ],
            name: val.locationName,
            distance: val.distanceInMeter,
            id: val.atmId,
          };
        });
        // set constructed data
        setLocationDetail(locationData);
        setLook(lookLoc);
        setPosition(Loc);
        setAtmLocation([mapView[0].latitude, mapView[0].longitude]);
        setModalLoader(false);
      })

      .catch((err) => {
        console.log(err);
        setModalLoader(false);
        // alert(`===> Error When Fetch Data${err}`);
      });
  }, []);
  // END HIT API

  useEffect(() => {
    if (window.location.hash === "#medicalrecord") {
      setTabValue(3);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <div>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => history.goBack()}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </div>

        <div style={{marginBottom: 20}}>
          {isOpenModalLoader ? (
            <LoadingView />
          ) : (
            <AtmInfoDetail atmDetail={atmDetail} atmID={rowID} />
          )}
        </div>

        <div>
          {isOpenModalLoader ? (
            <LoadingView />
          ) : (
            <div className={useTabStyles.root}>
              <AppBar
                position="static"
                // color="white"
                className={tabStyles.customBar}
              >
                <ContentTabs
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  {tabArr.map(({ label }, i) => (
                    <ContentTab key={i} label={label} {...a11yProps(i)} />
                  ))}
                </ContentTabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
                <PaperTransaction id={rowID.atmId} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <PaperCost cost={costDetail} idAtm={id}/>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <PaperLocation
                  dataLocation={locationDetail}
                  position={position}
                  view={look}
                  centerAtmLoc={atmLocation}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <PaperMedical steps={medicalDetail} />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <PhotoTabPanel detail={atmDetail}/>
              </TabPanel>
            </div>
          )}
        </div>
      </div>
      {/* <ModalLoader isOpen={isOpenModalLoader} /> */}
    </div>
  );
};

export default withRouter(AnalyticDataDetail);

const tabArr = [
  {
    slug: "trx",
    label: "Transaction",
  },
  {
    slug: "cost",
    label: "Cost",
  },
  {
    slug: "loc",
    label: "Location",
  },
  {
    slug: "med",
    label: "Medical Record",
  },
  {
    slug: "photo",
    label: "Photo",
  },
];
