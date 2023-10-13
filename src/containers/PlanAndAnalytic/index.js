/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import {
  Typography,
  Grid,
  Box,
  Drawer,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Link,
  Tab,
  Tabs,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import { useTranslation } from "react-i18next";
import { Select, Input } from "antd";
import Axios from "axios";
import moment from "moment";
import { TrainOutlined } from "@material-ui/icons";
import googleMapReact from "google-map-react";
import { Point } from "leaflet";
import { WindowsFilled } from "@ant-design/icons";
import SearchBar from "../../components/SearchBar";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import LocationForm from "./LocationForm";
import SavedLocation from "./SavedLocation";
import ModalDialog from "./ModalDialog";
import FormLocation from "./FormLocation";

import constants from "../../helpers/constants";

import sudirmanAtmImage from "../../assets/images/atm-1.png";
import senayanAtmImage from "../../assets/images/atm-2.png";
import jogjaAtmImage from "../../assets/images/atm-3.png";

import ModalLoader from "../../components/ModalLoader";
import ModalLocationNotFound from "./ModalLocationNotFound";
import ContentDrawer from "./ContentDrawer";
import * as ThemeColor from "../../assets/theme/colors";
import { ChkyTablePagination } from "../../components/chky";
import TextButton from "../../components/Button/EditButtonOnTable";
import NearMarker from "../../assets/icons/general/map-location.svg";
import SelectedMarker from "../../assets/icons/general/map-location-selected.svg";
import { RootContext } from "../../router";
import { useRenameOpeningType } from "../../helpers";

const dataset = {
  atmMachineData: [
    {
      atmId: "#10029112",
      locationName: "Alfamidi Sudirman",
      potentialModel: "CTH-1292",
      locationType: "Minimarket",
      locationAddress: "Jl. Swasembada No 1",
      locationPhotosUrl: [
        "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/setting.JPG",
        "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/user2-160x160.jpg",
      ],
      latitude: "-7.848636",
      longitude: "110.321638",
      itemTransactionTotal: null,
      condition: "Good",
      distanceInMeter: 3696,
      polyline:
        "h|qe@yjcnS[|Av@BjG^vNx@bRIpKErCBbCQt@SlB_AjAu@|Aq@f@Kr@EtAD|@Nx@V`A`@zAv@\\RR@X?F@JGpD_Cp@a@hLsIzCyBhEqCzEyCr@@`C}@pKmElCcAlDaAt@SzEoAzC{@jDw@lJgCt@QNEFVRr@Pt@?Pt@bCR|@Hl@D`AApA]bCS|@g@tAwAfCgEtHk@fASn@MnABlAHb@Vv@nChFjA|BjBjE|@~AtAtAjCfBjCdBf@`@PXTh@Bh@?b@Sv@a@d@WPgBv@{@VYR[`@m@nAcCxNmAdH[zAu@nGsBbQ_AzIq@rJ[jEu@tKSlEm@hQoA`k@S`IWxOa@nSQvHq@|^}@|e@@|KWxN]~PcB~y@]hOOnKDtIVtGb@hHXbC\\pCtAbJ`BtHxAlFxBbHzHbUrBnGjBjHd@lChAnH~@nHl@rITrHDbEGfKGlAIjCIxAYtDgAxJ]vC}Ffe@wFpc@aBtMeBdNyAhKsAnHq@xCk@xBqBvGsB`GwAfDsAxCkBnDS\\mAtByBnDs@fAaEhFqHhJ}EfGkCdDwArB}BlDkAlBuAfCoCrF{AtDwCdI{BzHq@nCwCxLqFjTqPdp@wE`RuDlMaG|P_GzOgBhEmIdSeDjHmXrj@aIfPqGzM{LzV{HfPkFnKwAlC_MpW}Unf@BlDuDlHiDxG_FhKiFlK_OjZqMhXmDlHcC|E}DvIUh@oIxSwCbIoD`KkEvN}EhQyDrP{CnNiLvi@aBpIoEtSeKxe@_Hf\\yGzZeCbLoCfKgErOeAxD}ArEqDhKaDdJoJfZoBtGeA|DsDrNyC|LeIp\\eEnPwHtZ{I|]q@nC{BrIs@hDwDvOcCxJ{EfRsDrO{Jr`@{E`ScFnR}AhFMb@a@|AiBjFqCrHgBhEsCnHe@bAANAb@Bb@N`@`@\\l@Nl@At@Mn@S\\U^[V@Zu@Lu@@iAKq@Ka@_@s@}@cAy@s@]YiAkAkA{Ay@_B{BoGqAeEs@kBe@gBQy@qFo@yCS}Fe@gGUqCEkJ]mAEqNg@_HQgEGqBJeAFyCA}DMsAMgAScAUqAa@m@YsAs@yA}@uA{@c@QeBa@kAE}@DkBCeAMgAWw@Wy@g@}C{BKBWC[UKa@@UJSTM\\CXJJJFN@XCL?DPR|AhAxAdAn@ZN?L?pAVh@BvAAdA?fCXTB^k@Cu@Cy@C}@EeBFkBTiA^mAz@_Bh@o@v@o@h@YjEmC",
    },
    {
      atmId: "#10029112",
      locationName: "Alfamidi Sudirman",
      potentialModel: "CTH-1292",
      locationType: "Minimarket",
      locationAddress: "Jl. Swasembada No 1",
      locationPhotosUrl: [
        "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/setting.JPG",
        "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/user2-160x160.jpg",
      ],
      latitude: "-7.848636",
      longitude: "110.321638",
      itemTransactionTotal: null,
      condition: "Good",
      distanceInMeter: 3696,
      polyline:
        "h|qe@yjcnS[|Av@BbWxAt^OrCBxDe@vGgDzAQtADxDhAlClAl@ElSuN`QeLfQkHpJyCzEoAtT{Ft@QVPd@hBrA`GBrC]bC{@rC_H|L_AvBMnABlA`@zAzEfJhDjH`F|DjCdBx@z@Th@BlASv@y@v@cDnAu@t@m@nAcCxNiB`KiFnd@cCt]aAvWcBbu@}B~mA}@|e@w@v[IzDDlDYfR]xL]|Ri@xVWfRNpLZxGn@`HfBjMjClL~BhIbKhZzEdQtAfIrBbS`@jPMnJMfF_AlMaKrx@uI~p@{BzQgCrNoDbM}AbEoEdK}CrFoGpJeGlHiM`OwJvNcHfNmGdR}BjIiJd_@mQrr@cKz_@sIbWwJvVeFxKqf@ncAsc@`@ml@tmAoTvc@cWfi@gJjRePn]uIdTqEjMaJxYgKvb@oMzm@cQ~w@mEpS}D|PmE`QsHd]iFhSmF|T_I|UsGdQ_GbSuH`Z_Slx@{YpkA{Ono@gSvy@eHhYsGfU_GlOiJdVgBlHs@lE]|DS|HHnG`AnKvBnJ|C`IzHlNrIhPrFxNxCfLfBjGlAzBxA~AlCjAvDh@jFR|BJdDLrIE`UoBpg@uBpHWlQWv\\VhSPzIZrGd@dMxBnElAxDlAzHnDbJbGdCtB|H|HxEzGfF|JtFtMfNj^lPdb@pB|EdEzMb@jBpBjMtArMvBrUrDxa@tA`TNrSu@d]oAdXk@~Ey@xCuCbFiGvIgDjHwB`HiA|FgArH{BhQWbDEjCJzDJ@Hb@Nr@nC|CrCzBhCf@tCOzRkBjLmA|JsA|Iu@xHWln@]lKGrNm@tWuCn`@mE|PyBdOkBjRgDbJaBl_@sGjU_CjQgBr^gEvN{AnEYtSwBhJQ`]|@|Xr@tQd@xFBrKW`MmAzMgBpKiBjKkBzL_B`P_A`EEtJNjQv@b_@fBlk@hCpIl@|Ep@dGhAbZ|GbQrBpYpCte@bFzG`AjI|BhOfGhn@|Vp_Ap_@xm@tVpt@Y~DdBvNbEd]vHtTzEvXlGhLpD~K~DtMdEvVjIzRvGbH|BfK`EhIhE~PpJvQpJlFrB~L~CtUtF~IdBvPxAd^jChG`AbLhC`b@|JfIrBlWnGnm@jN{Az^nDz@d~@dT`KnB`Fn@bHLnAN`CfAbAbA|@zBLbBUhJKbENxIRnPXzO`A|LrBjIh@lBbCfG|ChFfFnIlJfOdKpPrB|DJLSL}BlBmBfAoC~@cDz@Ub@U~BNt@hAnFx@vElAhLNx@p@hBFj@MFi@V}CrAGkAGq@Mo@q@sBUm@{Ae@s@GqBTc@R",
    },
  ],
};

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
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constants.color.grayMedium,
    "&:hover": {
      color: constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constants.color.dark,
    },
    "&:focus": {
      color: constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles({
  contentHeader: {
    padding: 20,
    marginLeft: 20,
  },
  contentBody: {
    zIndex: 1000,
    position: "relative",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: constants.color.dark,
    textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
  },
  mapsNewAtm: {
    position: "relative",
    overflow: "scroll",
    width: "100%",
    backgroundColor: constants.color.white,
    paddingBottom: 20,
    height: "100vh",
  },
  maps: {
    position: "relative",
    overflow: "scroll",
    // paddingRight: 30,
    // marginRight: 20,
    height: "80vh",
    width: "100%",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      zIndex: 1001,
      padding: "90px 0 0",
      width: 'calc((100% - 150px)*0.525)',
      '@media (max-width:1600px)': { 
        width: 'calc((100% - 250px)*0.525)'
      },
      '@media (max-width:1366px)': { 
        width: 'calc((100% - 350px)*0.525)'
      },
      '@media (max-width:1280px)': { 
        width: 'calc((100% - 450px)*0.525)'
      },
      '@media (max-width:1024px)': { 
        width: 'calc((100% - 550px)*0.525)'
      }
    },
  },
  drawerContainer: {
    width: "550px",
    height: "100%",
  },
  drawerContainerTop: {
    padding: "5px 30px 0px 30px",
    width: "150px",
  },
  drawerContainerATM: {
    padding: "0",
  },
  inputContainer: {
    "& .MuiTextField-root": {
      width: "500px",
    },
  },
  cardContainerPrimary: {
    boxShadow: "0px 16px 24px rgba(232, 238, 255, 0.6)",
    borderRadius: 10,
    width: "auto",
  },
  cardContainerSecondary: {
    boxShadow: "none",
    border: "1px solid #E6EAF3",
    borderRadius: 10,
    width: "auto",
  },
  cardImage: {
    height: 140,
  },
  cardSectionInfo: {
    marginBottom: 12,
  },
  cardSectionTransaction: {
    marginTop: 15,
  },
  currency: {
    color: constants.color.primaryHard,
    fontWeight: 500,
  },
  ATMname: {
    marginRight: 100,
    position: "sticky",
  },
  rentPriceSection: {
    backgroundColor: "rgba(244, 247, 251, 0.5)",
    marginTop: 70,
    marginBottom: 94,
    padding: "46px 30px 42px 30px",
  },
  buttonSection: {
    padding: "0 20px 30px 20px",
    marginTop: 45,
  },
  buttonPrimary: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
    borderRadius: 10,
    padding: "10px 20px",
    textTransform: "capitalize",
  },
  buttonSecondary: {
    backgroundColor: constants.color.secondaryMedium,
    color: constants.color.white,
    borderRadius: 10,
    padding: "10px 20px",
  },
  buttonOutlined: {
    border: `1px solid ${constants.color.primaryHard}`,
    color: constants.color.primaryHard,
    borderRadius: 10,
    padding: "10px 20px",
    textTransform: "capitalize",
  },
  statusGood: {
    border: "1px solid #65D170",
    backgroundColor: "#DEFFE1",
    color: "#65D170",
    borderRadius: 12,
    padding: "1px 10px 1px 10px",
    fontSize: 13,
    width: 50,
  },
  statusBad: {
    border: "1px solid #FF6A6A",
    backgroundColor: "#FFF6F6",
    color: "#FF6A6A",
    borderRadius: 12,
    padding: "1px 10px 1px 13px",
    fontSize: 13,
    width: 50,
  },
  widgetContainer: {
    position: "absolute",
    margin: 30,
    maxWidth: 520,
    '@media (max-width:1024px)': { 
      maxWidth: 400,
    },
    maxHeight: 560,
    marginTop: "0px",
  },
  inputContainerHalf: {
    "& .MuiOutlinedInput-input": {
      width: "100%",
    },
    closeIcon: {
      color: constants.color.primaryHard,
      margin: 10,
    },
  },
  inputSearchLocation: {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: 500,
    height: "50px",
    marginTop: 0,
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipsis",
    position: "absolute",
    // left: '12%',
    fontFamily: "Barlow",
    fontStyle: "italic",
    float: "left",
    // zIndex: "1100",
    marginLeft: 40,
    "&::placeholder": {
      color: "#BCC8E7",
    },
  },
});

const idrCurrencyFormat = (value, delimiter) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

const meterToKilometer = (num) => {
  const newNum = num / 1000;
  return newNum.toFixed(1);
};

const dateConverter = (tanggal) => {
  const dateNya = moment(new Date(tanggal)).format("DD-MM-YYYY");
  return dateNya;
};

const atmDefault = {
  atmId: "#10029112",
  locationName: "Alfamidi Sudirman",
  potentialModel: "CTH-1292",
  locationType: "Minimarket",
  locationAddress: "Jl. Swasembada No 1",
  locationPhotosUrl: [
    "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/setting.JPG",
    "https://minio.mylab-siab.com/project/atm_bussiness/public/opening/location_photo/user2-160x160.jpg",
  ],
  latitude: "-7.848636",
  longitude: "110.321638",
  itemTransactionTotal: null,
  condition: "Good",
  distanceInMeter: 3696,
  // polyline:
  //   '`x{n@gtn`TxARQxAGBc@p@qB}@yB_ACPi@dHIhAYbDUnFIvA?|BCt@CVEVWb@_@h@kA`Bg@~@St@Gj@Ax@UnC?XFjBFnA?BuBFk@@uA@mBFQzCUpCKr@i@fAo@nA{@hBq@tAI`@e@hFMr@c@hDtCr@|@Tf@Tz@j@vD`CxFrD`IrFb@f@HTDf@AbAMdFMnCQhIbC?|CEp@@CaB',
  polyline: "tdge@m{rjSBpAQ@kDI}@MAACKAONwDT}Bk@EkCMi@EeAB{@CuBSKEi@GqB[WEBY@K",
};

const PlanAndAnalytic = ({ history }) => {
  // GET USER ID
  const { userId } = useContext(RootContext);
  useEffect(() => {
    // console.log("USER ID : ", userId);
  }, [userId]);

  // **** INIT TOP STATE ****
  const [idAtm, setIdATM] = useState(null);
  const [dataId, setDataId] = useState(null);
  const [locationMode, setLocationMode] = useState("ON");
  const [modelType, setModelType] = useState("Conventional");
  const [machineType, setMachineType] = useState("ATM");
  const [requestTpye, setRequestType] = useState("ATM Business");
  const [conven, setConven] = useState(true);

  const [inputPosition, setInputPosition] = useState({ lat: null, lng: null });

  const [cityName, setCityName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");

  const [formattedAddress, setFormattedAddress] = useState("");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [countApiReopen, setCountApiReopen] = useState(false);

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< start REVOLUSI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [openingType, setOpeningType] = useState("");

  // handling button Submit To Profilling 2
  const handlingSaveSurvei = async (navigateTo) => {
    try {
      const dataParam = {
        latitude: inputPosition.lat,
        longitude: inputPosition.lng,
        // eslint-disable-next-line radix
        id: parseInt(dataId) || dataId,
        // atmId: idAtm,
        userId, // <---- diambil dari get user id
        openingType, // <---- diambil dari
        cityName, // <---- diambil dari setOpeningType
        modelTeam: modelType,
        locationMode, // <---- diambil dari setLocationMode
        machineType, // <---- diambil dari setMachineType
        provinceName, // <---- diambil dari setProvinceName
        districtName, // <---- diambil dari setDistrictName
        conven, // <---- diambil dari setConven
        formattedAddress, // persiapan tambah formatedAddress buat nampil data di nego detail
        requester: requestTpye,
      };
      // console.log("DATA PARAM : ", dataParam);
      if (submitType === "add_machine" || submitType === "reopen") {
        dataParam.atmId = idAtm;
      }
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveSurvei`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataParam,
      });
      setModalLoader(false);
      const idSaveSurvei = data.data.id;
      // jika sukses navigate to next screen
      if (
        data.data.responseCode === "00" ||
        data.data.responseMessage === "SUCCESS"
      ) {
        // IF NAVIGATE to savedLocation
        if (navigateTo === "savedLocation") {
          history.push(`/acquisition/savedLocation`);
        } else {
          // DEFAULT NAVIGATE to Profilling 2
          history.push(
            `/acquisition/profiling?openingType=${useRenameOpeningType(
              openingType
            )}&savedId=${idSaveSurvei}&atmId=${idAtm}`
          );
        }
      }
    } catch (error) {
      setModalLoader(false);
    }
  };

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  end REVOLUSI  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // const [position, setPosition] = useState([-6.2629589, 106.649086]);
  const [newData, setNewData] = useState(atmDefault);
  const [route, setRoute] = useState([]);
  const [showLabelMarker, setShowLabelMarker] = useState(true);
  const [showLabelMarkerNearAtm, setShowLabelMarkerNearAtm] = useState(true);
  const [showLabelMarkerNearAtm1, setShowLabelMarkerNearAtm1] = useState(true);
  const [showLabelMarkerNearAtm2, setShowLabelMarkerNearAtm2] = useState(true);
  const [position, setPosition] = useState({
    lat: -6.2732099,
    lng: 106.7239952,
  });
  const [inputPositionReopen, setInputPositionReopen] = useState({
    lat: null,
    lng: null,
  });
  const [atmPosition, setAtmPosition] = useState([
    {
      lat: -6.2732099,
      lng: 106.7239099,
    },
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerNewAtm, setOpenDrawerNewAtm] = useState(true);
  function handleNewAtmDrawer(bool) {
    setOpenDrawerNewAtm(bool);
  }
  const onChangeTabFormLocation = (val) => {
    // console.log("++++ onChangeTabFormLocation: ", val);
    if (val === 0 || val === 2) {
      handleNewAtmDrawer(true);
    } else {
      handleNewAtmDrawer(false);
    }
  };
  const [openDrawerSec, setOpenDrawerSec] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [locNotFound, setLocNotFound] = useState(false);
  const [isLocType, setIsLocType] = useState(true);
  const {
    contentHeader,
    contentBody,
    title,
    maps,
    mapsNewAtm,
    drawer,
    drawerContainer,
    drawerContainerTop,
    drawerContainerATM,
    inputContainer,
    cardImage,
    cardSectionInfo,
    cardSectionTransaction,
    currency,
    cardContainerPrimary,
    cardContainerSecondary,
    rentPriceSection,
    buttonSection,
    buttonPrimary,
    buttonSecondary,
    buttonOutlined,
    statusGood,
    statusBad,
    widgetContainer,
    ATMname,
    inputContainerHalf,
    closeIcon,
    inputSearchLocation,
  } = useStyles();

  function decodePolyline(param) {
  // console.log('~ param', param)
    // set route
    // const encodedRoute = atmDefault.polyline;
    const encodedRoute = param || '';
    const decodedRoute = polyline.decode(encodedRoute);
    // console.log('~ decodedRoute', decodedRoute)
    const newroute = decodedRoute.map((item, index) => {
      const coord = {
        lat: item[0],
        lng: item[1],
      };
      return coord;
    });
    const newroute2 = [position, newroute[0]];
    // console.log("hasil decoded polyline", newroute);
    setRoute(newroute);
  }

  const { Option } = Select;

  const { atmMachineData } = dataset;
  // const position = [-7.8289648, 110.3754588];
  const defDistance = 0;

  const toggleOpenDrawer = () => setOpenDrawer(true);
  const toggleCloseDrawer = () => setOpenDrawer(false);

  const toogleOpenDrawerSec = () => setOpenDrawerSec(true);
  const toogleCloseDrawerSec = () => setOpenDrawerSec(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenLocNotFound = () => setLocNotFound(true);
  const handleCloseLocNotFound = () => setLocNotFound(false);

  const navigateToPage = (to) => history.push(to);

  const [nearATM, setNearATM] = useState([atmDefault]);

  const [items, setItems] = useState([]);

  const [locationType, setLocationType] = useState("");

  const [selectedPotentModel, setSelectedPotentModel] = useState("");

  const [draftNewAtm, setDraftNewAtm] = useState([]);

  const [quotePerKota, setQuotaPerKota] = useState(0);

  const [hideSaveButton, setHideSaveButton] = useState(false);

  const draftATM = [];
  const dataATM = [];
  let quotaBI = 0;
  let namaKota = "";
  let openType = "";
  let namaProvinsi = "";
  let namaDistrict = "";

  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [dataSavedLocation, setDataSavedLocation] = useState([
    {
      locationName: "JKT. Meruya",
      locationType: "SPBU",
      latitude: "0209188821",
      longitude: "-299917212",
      submiter: "Suwandi",
      submiterDate: "10-10-2020",
      landLordName: "Jeremy",
      locationPrice: "Rp 4.500.000",
      action: (
        <TextButton title={t("table.edit.button")} setAction={setOpenDialog} />
      ),
    },
  ]);
  const titleSavedLocation = [
    t("siteManagement.locationName"),
    t("siteManagement.locationType"),
    t("siteManagement.latitudee"),
    t("siteManagement.longitude"),
    t("siteManagement.submiter"),
    t("siteManagement.submitDate"),
    t("siteManagement.landLordName"),
    t("siteManagement.locationPrice"),
    t("siteManagement.action"),
  ];
  const valueSavedLocation = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "modal",
  ];
  const [dataReject, setDataReject] = useState([
    {
      locationName: "JKT. Meruya",
      locationType: "SPBU",
      latitude: "0209188821",
      longitude: "-299917212",
      submiter: "Suwandi",
      submiterDate: "10-10-2020",
      landLordName: "Jeremy",
      locationPrice: "Rp 4.500.000",
      status: "Reject",
      action: (
        <TextButton title={t("table.edit.button")} setAction={setOpenDialog} />
      ),
    },
    {
      locationName: "JKT. Meruya",
      locationType: "SPBU",
      latitude: "0209188821",
      longitude: "-299917212",
      submiter: "Suwandi",
      submiterDate: "10-10-2020",
      landLordName: "Jeremy",
      locationPrice: "Rp 4.500.000",
      status: "Postphone",
      action: (
        <TextButton title={t("table.edit.button")} setAction={setOpenDialog} />
      ),
    },
    {
      locationName: "JKT. Meruya",
      locationType: "SPBU",
      latitude: "0209188821",
      longitude: "-299917212",
      submiter: "Suwandi",
      submiterDate: "10-10-2020",
      landLordName: "Jeremy",
      locationPrice: "Rp 4.500.000",
      status: "Cancel",
      action: (
        <TextButton title={t("table.edit.button")} setAction={setOpenDialog} />
      ),
    },
  ]);
  const titleReject = [
    t("siteManagement.locationName"),
    t("siteManagement.locationType"),
    t("siteManagement.latitudee"),
    t("siteManagement.longitude"),
    t("siteManagement.submiter"),
    t("siteManagement.submitDate"),
    t("siteManagement.landLordName"),
    t("siteManagement.locationPrice"),
    t("siteManagement.status"),
    t("siteManagement.action"),
  ];
  const valueReject = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "modal",
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);

  function handleChangePageValue(newPage) {
    setCurrentPage(newPage);
  }

  const handleChange = (event, newTabValue) => {
    event.preventDefault();
    setTabValue(newTabValue);
    if (newTabValue === 1) {
      navigateToPage("/acquisition/savedLocation");
    }
    if (newTabValue === 2) {
      navigateToPage("/acquisition/reject");
    }
  };

  useEffect(() => {
    if (tabValue === 0) {
    } else if (tabValue === 1) {
      // fetchSavedLocation();
      navigateToPage("/acquisition/savedLocation");
    } else {
      // fetchRejectedLocation();
      navigateToPage("/acquisition/reject");
    }
  }, [tabValue]);

  const getSavedLocation = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraft`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          userId: "511",
        },
      });
      const getData = data.data;
      // console.log("SAVE DRAFT ====> : ", getData.listMrbbNewAtmDraft);
      draftATM.push(getData.listMrbbNewAtmDraft);
      setDraftNewAtm(draftATM[0]);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Data Get Saved Location : \n ${error}`);
    }
  };

  const dataToSet = [];
  const [dataTableSavedLocation, setSavedDataTableLocation] = useState([]);
  const [dataTableRejectedLocation, setdataTableRejectedLocation] = useState(
    []
  );

  const handleSavedLocation = (id) => {
    alert(`ATM ID : ${  id}`);
  };

  const fetchSavedLocation = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/savedLocation`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          pageNumber: currentPage,
          dataPerPage: rowsPerPage,
        },
      });
      const getData = data.data;
      // console.log("SAVED LOCATION ====> : ", data);
      const dataNewPre = getData.content;
      setTotalPages(getData.totalPages);
      setTotalRows(getData.totalElements);
      // eslint-disable-next-line array-callback-return
      dataNewPre.map((row) => {
        const actionDetails = [
          { name: "Edit", id: row.atmId, funct: handleSavedLocation },
        ];
        const newRow = {
          locationName: row.location,
          locationType: row.locationType,
          latitude: row.latitude,
          longitude: row.longitude,
          submitter: row.submitter,
          submitDate: dateConverter(row.submitDealDate),
          landLordName: row.landlord,
          price: `Rp ${idrCurrencyFormat(row.approximatePrice, ".")}`,
          action: actionDetails,
        };
        // set constructed data
        dataToSet.push(newRow);
      });
      setSavedDataTableLocation(dataToSet);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Data Get Saved Location : \n ${error}`);
    }
  };

  const fetchRejectedLocation = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/savedLocationReject`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          pageNumber: currentPage,
          dataPerPage: rowsPerPage,
        },
      });
      const getData = data.data;
      // console.log("SAVED LOCATION ====> : ", getData.data.totalElements);
      const dataNewPre = getData.data.data;
      setTotalPages(getData.data.totalPages);
      setTotalRows(getData.data.totalElements);
      // eslint-disable-next-line array-callback-return
      dataNewPre.map((row) => {
        const actionDetails = [
          { name: "Edit", id: row.locationId, funct: handleSavedLocation },
        ];
        const newRow = {
          locationName: row.locationName,
          locationType: row.locationType,
          latitude: row.latitude,
          longitude: row.longitude,
          submitter: row.submitterUsername,
          submitDate: dateConverter(row.submittedDate),
          landLordName: row.landLord,
          price:
            row.approximatePrice === null
              ? "-"
              : `Rp ${idrCurrencyFormat(row.approximatePrice, ".")}`,
          status:
            row.status === "1"
              ? "Rejected"
              : row.status === "2"
                ? "Cancelled"
                : "Postphone",
          action: actionDetails,
        };
        // set constructed data
        dataToSet.push(newRow);
      });
      setdataTableRejectedLocation(dataToSet);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Data Get Saved Location : \n ${error}`);
    }
  };

  useEffect(() => {
    // console.log("DATA TABLE SAVED LOCATION : ", dataTableSavedLocation);
    // console.log("DATA TABLE REJECTED LOCATION : ", dataTableRejectedLocation);
  }, [dataTableSavedLocation, dataTableRejectedLocation]);

  const markerList = [
    {
      id: 0,
      lat: 3.6074,
      lng: 98.807815,
      name: "MDN.Swalayan Jodoh Batang Kuis",
    },
    {
      id: 1,
      lat: 3.5949207,
      lng: 98.7538532,
      name: "MDN.Swalayan Jodoh Centre",
    },
    {
      id: 2,
      lat: 3.619988,
      lng: 98.740354,
      name: "MDN.SPBU 14-2031149 Laut Dendang",
    },
  ];

  const [markerToMap, setMarkerToMap] = useState(null);

  useEffect(() => {
    // console.log("DATA NEW POS MAPS : ", markerToMap);
  }, [markerToMap, route]);

  const getNearlyATM = async (lat, long) => {
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      setSubmitType("new");
      setDataId(null);
      const mapToSet = [];
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitLocation`,
        // url: 'https://profilelocationservices.getsandbox.com/profilelocationservices/v1/submitLocation',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          latitude: lat,
          longitude: long,
        },
      });
      const itemsResponse = data.data;
      // nitip set opening type
      setOpeningType(itemsResponse.openingType);
      quotaBI = `${itemsResponse.cityQuota.actual}/${itemsResponse.cityQuota.target}`;
      namaKota = itemsResponse.cityName;
      namaProvinsi = itemsResponse.provinceName;
      namaDistrict = itemsResponse.districtName;
      setCityName(namaKota);
      // console.log("set cityName getNearlyATM", namaKota);
      setQuotaPerKota(quotaBI);
      setProvinceName(namaProvinsi);
      setDistrictName(namaDistrict);
      setFormattedAddress(itemsResponse.formattedAddress);
      // console.log('~ itemsResponse', itemsResponse)
      if (itemsResponse.atmPoints) {
      // console.log('~ itemsResponse.atmPoints', itemsResponse.atmPoints)
        if (itemsResponse.atmPoints.length > 0) {
          dataATM.push(itemsResponse.atmPoints);
          setItems(dataATM[0]);
          // quotaBI = `${itemsResponse.cityQuota.actual}/${itemsResponse.cityQuota.target}`;
          // namaKota = itemsResponse.cityName;
          // namaProvinsi = itemsResponse.provinceName;
          // namaDistrict = itemsResponse.districtName;
          // setCityName(namaKota);
          // console.log("set cityName getNearlyATM", namaKota);
          // setQuotaPerKota(quotaBI);
          // setProvinceName(namaProvinsi);
          // setDistrictName(namaDistrict);
          localStorage.setItem(
            "dataNearestATMCard",
            JSON.stringify(dataATM[0])
          );
          toggleOpenDrawer();
          itemsResponse.atmPoints.map((item) => {
            const newItem = {
              id: item.atmId,
              lat: item.latitude,
              lng: item.longitude,
              name: item.locationName,
              distance: item.distanceInMeter,
              polyline: item.polyline,
            };
            mapToSet.push(newItem);
          });
          setMarkerToMap(mapToSet);
          for (const each in mapToSet) {
            if (
              mapToSet[each].polyline !== null ||
              mapToSet[each].polyline !== ""
            ) {
              decodePolyline(mapToSet[each].polyline);
            }
          }
          // decodePolyline(mapToSet[0].polyline);
        } else {
          console.log('unhandled else');
        }
      } else {
        handleOpenLocNotFound(true);
        setIsLocType(true);
      // console.log('error else');
      }
      // console.log("DATA NEW LOCATION : ", itemsResponse);
      setModalLoader(false);
      toggleOpenDrawer();
    } catch (error) {
      handleOpenLocNotFound(true);
      setIsLocType(true);
      setModalLoader(false);
    // console.log(`Error Fetching Data submit New Location : \n ${error}`);
    // console.log(error);
    }
  };

  useEffect(() => {
    // console.log("DATA ITEMS : ", items);
  }, [items]);

  const submitNewATM = async () => {
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      setSubmitType("add_machine");
      setDataId(null);
      const mapToSet = [];
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitNewAtm`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId: idAtm,
        },
      });
      const itemsRes = data.data;
      quotaBI = `${itemsRes.cityQuota.actual}/${itemsRes.cityQuota.target}`;
      namaKota = itemsRes.cityName;
      namaProvinsi = itemsRes.provinceName;
      namaDistrict = itemsRes.districtId;
      setCityName(namaKota);
      // console.log("set cityName submitNewATM", namaKota);
      setQuotaPerKota(quotaBI);
      setProvinceName(namaProvinsi);
      setDistrictName(itemsRes.districtId);
      setOpeningType(itemsRes.openingType);
      setFormattedAddress(itemsRes.formattedAddress);
      if (itemsRes.atmPoints) {
        if (itemsRes.atmPoints.length > 0) {
          dataATM.push(itemsRes.atmPoints);
          setItems(dataATM[0]);

          localStorage.setItem(
            "dataNearestATMCard",
            JSON.stringify(dataATM[0])
          );
          toggleOpenDrawer();
          itemsRes.atmPoints.map((item) => {
            const newItem = {
              id: item.atmId,
              lat: item.latitude,
              lng: item.longitude,
              name: item.locationName,
              distance: item.distanceInMeter,
              polyline: item.polyline,
            };
            mapToSet.push(newItem);
          });
          setMarkerToMap(mapToSet);
          decodePolyline(mapToSet[0].polyline);
          setPosition({
            lat: parseFloat(itemsRes.latitude),
            lng: parseFloat(itemsRes.longitude),
          });
        }
      } else {
        handleOpenLocNotFound(true);
        setIsLocType(false);
      }
      // console.log("DATA NEW ATM : ", itemsRes);
      setInputPosition({
        lat: itemsRes.latitude,
        lng: itemsRes.longitude,
      });
      setModalLoader(false);
    } catch (error) {
      handleOpenLocNotFound(true);
      setIsLocType(true);
      setModalLoader(false);
      // console.log(`Error Fetching Data submit New ATM : \n ${error}`);
    }
  };

  const submitReopen = () => {
    if (idAtm === null || idAtm === undefined) {
      alert("Please insert the ATM ID that you want to change!");
    } else {
      processReopen();
    }
  };

  const processReopen = async () => {
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      setSubmitType("reopen");
      setDataId(null);
      setModalLoader(true);
      const mapToSet = [];
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitReopenAtm`,
        // url: 'https://profilelocationservices.getsandbox.com/profilelocationservices/v1/submitReopen',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId: idAtm,
        },
      });
      const items = data.data;
      // console.log("DATA REOPEN : ", data);
      if (items.responseMessage === "SUCCESS") {
        quotaBI = `${items.cityQuota.actual}/${items.cityQuota.target}`;
        namaKota = items.cityName;
        openType = items.openingType;
        namaProvinsi = items.provinceName;
        namaDistrict = items.districtName;
        setProvinceName(namaProvinsi);
        setDistrictName(namaDistrict);
        setCityName(namaKota);
        // console.log("set cityName processReopen", namaKota);
        setQuotaPerKota(quotaBI);
        setOpeningType(openType);
        setFormattedAddress(items.formattedAddress);
        if (items.atmPoints.length > 0) {
          dataATM.push(items.atmPoints);
          setItems(dataATM[0]);
          localStorage.setItem(
            "dataNearestATMCard",
            JSON.stringify(dataATM[0])
          );
          toggleOpenDrawer();
          items.atmPoints.map((item) => {
            const newItem = {
              id: item.atmId,
              lat: item.latitude,
              lng: item.longitude,
              name: item.locationName,
              distance: item.distanceInMeter,
              polyline: item.polyline,
            };
            mapToSet.push(newItem);
          });
          setMarkerToMap(mapToSet);
          decodePolyline(mapToSet[0].polyline);
        }
        // if(countApiReopen === false){
        setInputPosition({
          lat: parseFloat(items.latitude),
          lng: parseFloat(items.longitude),
        });
        setPosition({
          lat: parseFloat(items.latitude),
          lng: parseFloat(items.longitude),
        });
        // }
      } else {
        handleOpenLocNotFound(true);
        setIsLocType(true);
      }
      setModalLoader(false);
      setCountApiReopen(true);
    } catch (error) {
      handleOpenLocNotFound(true);
      setIsLocType(true);
      setModalLoader(false);
      alert(`Error Fetching Data submit Reopen : \n ${error}`);
    }
  };

  const submitReplace = async () => {
    try {
      localStorage.setItem("resetProf2Info", true);
      localStorage.setItem("resetProf2Detail", true);
      localStorage.setItem("resetProf2Maintenance", true);
      setSubmitType("replace");
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitReplaceAtm`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId: idAtm,
          machineType,
        },
      });
      // console.log("DATA REPLACE : ", data);
      if (data.data.responseCode !== "00") {
        handleOpenLocNotFound(true);
        setIsLocType(false);
      } else {
        window.location.assign("/submission-tracking");
      }
      setModalLoader(false);
    } catch (error) {
      handleOpenLocNotFound(true);
      setIsLocType(false);
      setModalLoader(false);
      // console.log(`Error Fetching Data submit Reopen : \n ${error}`);
    }
  };

  const draftLocation = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveSurvei`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          userId: 511,
          locationType,
          longitude: position.lng,
          latitude: position.lat,
          potentialModel: selectedPotentModel,
          cityName,
        },
      });
      const getData = data.data;
      // console.log("SAVE DRAFT ====> : ", data);
      draftATM.push(getData.draftRbbNewAtm);
      setDraftNewAtm(draftATM[0]);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Data Draft Location : \n ${error}`);
    }
  };

  const deleteDraft = async (idDraft) => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/deleteDraft`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          id: idDraft,
        },
      });
      getSavedLocation();
      // console.log("DELETE DRAFT : ", data);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Fetching Data Delete Saved Location : \n ${error}`);
    }
  };

  const getDraftDetail = async (idDraft) => {
    try {
      // toggleCloseDrawer();
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftDetail`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          id: idDraft,
        },
      });
      // console.log("ID DRAFT : ", data);
      const resItem = data.data.detailData;
      if (resItem) {
        dataATM.push(resItem.findNearbyAtmResponse.atmPoints);
        setItems(dataATM[0]);
        quotaBI = `${resItem.cityQuota.actual}/${resItem.cityQuota.actual.target}`;
        setQuotaPerKota(quotaBI);
        toggleOpenDrawer();
        localStorage.setItem("dataNearestATMCard", JSON.stringify(dataATM[0]));
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(resItem));
        let dataLocation = {
          longitude: resItem.longitude,
          latitude: resItem.latitude,
        };
        dataLocation = JSON.stringify(dataLocation);
        localStorage.setItem("dataSavedLocation", dataLocation);
        navigateToPage("/acquisition/profiling");
      }
      // console.log("GET DRAFT DETAIL : ", data);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(
      //   `Error Fetching Data Get Detail Drafted Location : \n ${error}`
      // );
    }
  };

  const getAddmachineData = async (atmId, idSurvei) => {
    try {
      // toggleCloseDrawer();
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDataNewMachine`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          atmId,
          id: parseInt(idSurvei),
        },
      });
      // console.log("ID DRAFT : ", data.data);
      const resItem = data.data.detailData;
      const newItem = { ...resItem, isAddMachine: true };
      if (resItem) {
        dataATM.push(resItem.findNearbyAtmResponse.atmPoints);
        setItems(dataATM[0]);
        quotaBI = `${resItem.cityQuota.actual}/${resItem.cityQuota.actual.target}`;
        setQuotaPerKota(quotaBI);
        toggleOpenDrawer();
        localStorage.setItem("dataNearestATMCard", JSON.stringify(dataATM[0]));
        localStorage.setItem("dataGetDraftDetail", JSON.stringify(newItem));
        let dataLocation = {
          longitude: parseFloat(resItem.longitude),
          latitude: parseFloat(resItem.latitude),
        };
        dataLocation = JSON.stringify(dataLocation);
        // console.log('~ dataLocation getDataNewMachine', dataLocation)
        localStorage.setItem("dataSavedLocation", dataLocation);
        navigateToPage("/acquisition/profiling");
      }
      // console.log("GET DATA MACHINE : ", newItem);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      // console.log(
      //   `Error Fetching Data Get Detail Drafted Location : \n ${error}`
      // );
    }
  };

  const [searchBox, setSearchBox] = useState(null);
  const onLoad = (ref) => setSearchBox(ref);
  const onPlacesChanged = async () => {
    try {
      const place = searchBox.getPlaces();
      const { place_id } = place[0];
      const key = constants.API_MAP_KEY;

      const instance = Axios.create({
        baseURL: `https://maps.googleapis.com/maps/api`,
        timeout: 1000,
      });

      instance
        .get(`/geocode/json?place_id=${place_id}&key=${key}&language=id`)
        .then(function (response) {
          const results = response.data;
          setPosition(results.results[0].geometry.location);
          setInputPosition(results.results[0].geometry.location);
          // console.log("results", results.results[0].geometry.location);
        });
      toggleCloseDrawer();
    } catch (error) {
      // console.log(error);
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const postPhone = async () => {
    try {
      const dataParam = {
        latitude: inputPosition.lat,
        longitude: inputPosition.lng,
        id: parseInt(dataId),
        atmId: idAtm,
        userId,
        openingType,
        cityName,
        modelTeam: modelType,
        locationMode,
        machineType,
        provinceName,
        districtName,
        requester: requestTpye,
        formattedAddress,
      };
      // console.log("DATA PARAM : ", dataParam);
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/postPhoneSurvei`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataParam,
      });
      // console.log("Postphone Response : ", data);
      setModalLoader(false);
      toggleCloseDrawer();
      navigateToPage("/acquisition/reject");
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Postphone Service : \n ${error}`);
    }
  };

  const [submitType, setSubmitType] = useState("");

  const saveSurvei = async (whereTo) => {
    try {
      const dataParam = {
        latitude: inputPosition.lat,
        longitude: inputPosition.lng,
        id: parseInt(dataId) || dataId,
        // atmId: idAtm,
        userId,
        openingType,
        cityName,
        modelTeam: modelType,
        locationMode,
        machineType,
        provinceName,
        districtName,
        conven,
        formattedAddress, // persiapan tambah formatedAddress buat nampil data di nego detail
        requester: requestTpye,
      };
      // console.log("DATA PARAM : ", dataParam);
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveSurvei`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataParam,
      });
      // console.log("Save Survei Response : ", data);
      setModalLoader(false);
      let idSaveSurvei = 0;
      idSaveSurvei = data.data.id;
      // toggleCloseDrawer();
      if (whereTo === 1) {
        navigateToPage("/acquisition/savedLocation");
      } else if (submitType === "add_machine") {
        getAddmachineData(idAtm, idSaveSurvei);
      } else {
        getDraftDetail(idSaveSurvei);
      }
    } catch (error) {
      setModalLoader(false);
      // console.log(`Error Save Survei Service : \n ${error}`);
    }
  };

  // Generate page on tab Saved Location
  useEffect(() => {
    // console.log(window.location.hash);
    if (window.location.hash === "#savedlocation") {
      setTabValue(1);
    }
  }, [window.location.hash]);

  useEffect(() => {
    // console.log("locationMode", locationMode);
    // console.log("ATM ID : ", idAtm);
    // console.log("Request Type : ", requestTpye);
    // console.log("Location Mode : ", locationMode);
    // console.log("Machine Type : ", machineType);
    // console.log("Model Type : ", modelType);
    // console.log("Conven : ", conven);
    // console.log("openingType : ", openingType);

    localStorage.setItem("statusRequester", requestTpye);
  }, [
    idAtm,
    requestTpye,
    locationMode,
    machineType,
    modelType,
    conven,
    openingType,
  ]);

  // useEffect(() => {localStorage.removeItem("dataGetDraftDetail")}, []);

  useEffect(() => {
    const useGetDraft = localStorage.getItem("useGetDraft");
    if (useGetDraft) {
      const getItem = localStorage.getItem("dataGetDraftDetail");
      const mapToSet = [];
      // console.log("+++ getItem", getItem);
      localStorage.removeItem("useGetDraft");
      setOpenDrawer(true);
      const parseItem = JSON.parse(getItem);
      // if(parseItem.checkStatus) {
      if (parseItem) {
        if (parseItem.findNearbyAtmResponse) {
          if (parseItem.findNearbyAtmResponse.atmPoints) {
            setItems(parseItem.findNearbyAtmResponse.atmPoints);
          }
        }
        // setIdATM(parseItem.idDraft);
        // toggleOpenDrawer();
        setProvinceName(parseItem.provinceName);
        // setDistrictName(parseItem.districtId);
        setCityName(parseItem.cityName);
        // console.log("set cityName useEffect []", namaKota);
        setQuotaPerKota(
          `${parseItem.cityQuota.actual}/${parseItem.cityQuota.target}`
        );
        setDataId(parseItem.id);
        setLocationMode(parseItem.locationMode);
        setOpeningType(parseItem.openingType);
        setModelType(parseItem.modelTeam);
        setMachineType(parseItem.machineType);
        if (parseItem.requester) {
          setRequestType(parseItem.requester);
        }
        setConven(parseItem.conven);
        setPosition({
          lat: parseFloat(parseItem.latitude),
          lng: parseFloat(parseItem.longitude),
        });
        setInputPosition({
          lat: parseFloat(parseItem.latitude),
          lng: parseFloat(parseItem.longitude),
        });
        setIdATM(parseItem.atmId);
        setFormattedAddress(parseItem.formattedAddress);
        setDistrictName(parseItem.districtName);
        // parseItem.checkStatus = false;
        // localStorage.setItem("dataGetDraftDetail", JSON.stringify(parseItem));
        parseItem.findNearbyAtmResponse.atmPoints.map((item) => {
          const newItem = {
            id: item.atmId,
            lat: item.latitude,
            lng: item.longitude,
            name: item.locationName,
            distance: item.distanceInMeter,
            polyline: item.polyline,
          };
          mapToSet.push(newItem);
        });
        setMarkerToMap(mapToSet);
        decodePolyline(mapToSet[0].polyline);
        // };
      }
    }
    localStorage.removeItem("dataGetDraftDetail");
  }, []);

  return (
    <>
      <Box className={contentHeader}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={title} variant="h1" component="h1">
              {tabValue === 0
                ? "Pipeline"
                : tabValue === 1
                  ? t("siteManagement.savedLocation")
                  : t("siteManagement.reject")}
            </Typography>
            <div style={{ marginTop: 20 }}>
              <ContentTabs
                value={tabValue}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <ContentTab
                  label={t("siteManagement.newLocation")}
                  {...a11yProps(0)}
                  onClick={toggleCloseDrawer}
                />
                <ContentTab
                  label={t("siteManagement.savedLocation")}
                  {...a11yProps(1)}
                />
                <ContentTab
                  label={t("siteManagement.reject")}
                  {...a11yProps(1)}
                />
              </ContentTabs>
            </div>
          </Grid>
        </Grid>
      </Box>

      {tabValue === 0 ? (
        <div>
          <div style={{height: 60,}}>
            <LoadScript
              googleMapsApiKey={constants.API_MAP_KEY}
              libraries={["places"]}
            >
              <StandaloneSearchBox
                ref={searchBox}
                onLoad={onLoad}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  onSubmit={(event) => {
                  // console.log(event);
                    toggleOpenDrawer();
                  }}
                  type="text"
                  className={inputSearchLocation}
                  placeholder="Pencarian berdasarkan lokasi..."
                />
              </StandaloneSearchBox>
            </LoadScript>
          </div>
          <Box className={contentBody}>
            <Grid
              container
              className={widgetContainer}
              direction="column"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                <FormLocation
                  onClick={(event) => {
                    toggleCloseDrawer();
                    if (event[0] != "" && event[1] != "") {
                      // console.log(event);
                      setPosition({
                        lng: parseFloat(event[0]),
                        lat: parseFloat(event[1]),
                      });
                      setInputPosition({
                        lng: parseFloat(event[0]),
                        lat: parseFloat(event[1]),
                      });
                    }
                    getNearlyATM(event[1], event[0]);
                  }}
                  // setInputPosition={setInputPosition}
                  inputPosition={inputPosition}
                  onChangeATMId={(event) => setIdATM(event)}
                  onSubmitNewATM={() => {
                    submitNewATM();
                    toggleCloseDrawer();
                  }}
                  onSubmitReopen={() => {
                    submitReopen();
                    toggleCloseDrawer();
                  }}
                  onSubmitReplace={() => submitReplace()}
                  onChangeReq={(event) => setRequestType(event)}
                  onChangeLocationMode={(event) => setLocationMode(event)}
                  onChangeMachineType={(event) => setMachineType(event)}
                  onChangeModelType={(event) => setModelType(event)}
                  onChangeConven={(event) => setConven(event)}
                  locationMode={locationMode}
                  onChangeTab={onChangeTabFormLocation}
                  openingType={openingType} // <----- Tidak digunakan/tidak ada effect
                  requester={requestTpye}
                  machineType={machineType}
                  modelType={modelType}
                  atmID={idAtm}
                />
              </Grid>
            </Grid>

            {/* {openDrawer ? null : <FloatingChat />} */}
          </Box>
          {/* DRAWER FOR NEW ATM */}
          <Drawer
            className={drawer}
            open={openDrawerNewAtm}
            anchor="right"
            elevation={0}
            variant="persistent"
          >
            <>
              <Typography
                style={{
                  padding: "0px 20px 20px 20px",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                Set New ATM Location
              </Typography>
              <Box className={mapsNewAtm}>
                <LoadScript
                  googleMapsApiKey={constants.API_MAP_KEY}
                  libraries={["places"]}
                >
                  <GoogleMap
                    id="circle-example"
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%",
                      // height: "47.2vh",
                    }}
                    center={position}
                    zoom={8}
                    options={{
                      streetViewControl: false,
                      draggable: true, // make map draggable
                      keyboardShortcuts: false, // disable keyboard shortcuts
                      scaleControl: true, // allow scale controle
                      scrollwheel: false, // allow scroll wheel
                    }}
                    onClick={(e) => {
                      setInputPosition({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      });
                    }}
                  >
                    <Marker
                      position={inputPosition.lat ? inputPosition : position}
                      onClick={() => {
                        setShowLabelMarker(!showLabelMarker);
                        // console.log(items);
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
              </Box>
            </>
          </Drawer>
          {/* END DRAWER FOR NEW ATM */}
          <Drawer
            className={drawer}
            open={openDrawer}
            anchor="right"
            onClose={toggleCloseDrawer}
            elevation={0}
            variant="persistent"
          >
            <>
              <Grid
                container
                direction="column"
                // className={inputContainer}
                style={{paddingLeft: 20, paddingRight: 20}}
                spacing={0}
              >
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography
                      style={{ fontSize: "18px", fontWeight: 500 }}
                    >
                          Quota BI Area Ini:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      className={closeIcon}
                      onClick={toggleCloseDrawer}
                      style={{
                        color: constants.color.primaryHard,
                        position: "relative",
                        top: -25,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    fontSize: "32px",
                    fontWeight: 400,
                    marginBottom: "-12px",
                  }}
                >
                  {quotePerKota}
                </Grid>
                <Grid item>
                  <ContentDrawer
                    maxWidth
                    dataResponse={items}
                    onCancel={toggleCloseDrawer}
                    showSaveButton={(e) => setHideSaveButton(e)}
                    postPhone={postPhone}
                    saveLocationClick={() => {
                      // saveSurvei(1);
                      handlingSaveSurvei("savedLocation");
                    }}
                  />
                </Grid>
              </Grid>

              <Box className={maps}>
                <LoadScript
                  googleMapsApiKey={constants.API_MAP_KEY}
                  libraries={["places"]}
                >
                  <GoogleMap
                    id="circle-example"
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%",
                      // height: "47.2vh",
                    }}
                    center={position}
                    zoom={13}
                    options={{
                      streetViewControl: false,
                      draggable: true, // make map draggable
                      keyboardShortcuts: false, // disable keyboard shortcuts
                      scaleControl: true, // allow scale controle
                      scrollwheel: false, // allow scroll wheel
                    }}
                    onClick={(e) => {
                      if (openingType == "Reopen") {
                        setInputPosition({
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        });
                        setPosition({
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng(),
                        });
                      }
                    }}
                  >
                    {/* LAZIEST WAY BUT FAST */}
                    {markerToMap && markerToMap[0] ? (
                      <Marker
                        key={markerToMap[0].id}
                        position={{
                          lat: parseFloat(markerToMap[0].lat),
                          lng: parseFloat(markerToMap[0].lng),
                        }}
                        onClick={() => {
                          decodePolyline(markerToMap[0].polyline);
                          setShowLabelMarkerNearAtm(!showLabelMarkerNearAtm);
                        }}
                        icon={{
                          url: NearMarker,
                          anchor: new Point(20, 20),
                        }}
                      >
                        {showLabelMarkerNearAtm ? (
                          <InfoWindow
                            onCloseClick={() =>
                              setShowLabelMarkerNearAtm(!showLabelMarkerNearAtm)
                            }
                          >
                            <div>{markerToMap[0].name}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ) : null}

                    {markerToMap && markerToMap[1] ? (
                      <Marker
                        key={markerToMap[1].id}
                        position={{
                          lat: parseFloat(markerToMap[1].lat),
                          lng: parseFloat(markerToMap[1].lng),
                        }}
                        onClick={() => {
                          decodePolyline(markerToMap[1].polyline);
                          setShowLabelMarkerNearAtm1(!showLabelMarkerNearAtm1);
                        }}
                        icon={{
                          url: NearMarker,
                          anchor: new Point(20, 20),
                        }}
                      >
                        {showLabelMarkerNearAtm1 ? (
                          <InfoWindow
                            onCloseClick={() =>
                              setShowLabelMarkerNearAtm1(
                                !showLabelMarkerNearAtm1
                              )
                            }
                          >
                            <div>{markerToMap[1].name}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ) : null}

                    {markerToMap && markerToMap[2] ? (
                      <Marker
                        key={markerToMap[2].id}
                        position={{
                          lat: parseFloat(markerToMap[2].lat),
                          lng: parseFloat(markerToMap[2].lng),
                        }}
                        onClick={() => {
                          decodePolyline(markerToMap[2].polyline);
                          setShowLabelMarkerNearAtm2(!showLabelMarkerNearAtm2);
                        }}
                        icon={{
                          url: NearMarker,
                          anchor: new Point(20, 20),
                        }}
                      >
                        {showLabelMarkerNearAtm2 ? (
                          <InfoWindow
                            onCloseClick={() =>
                              setShowLabelMarkerNearAtm2(
                                !showLabelMarkerNearAtm2
                              )
                            }
                          >
                            <div>{markerToMap[2].name}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ) : null}

                    <Marker
                      position={position}
                      onClick={() => {
                        setShowLabelMarker(!showLabelMarker);
                        // console.log(items);
                      }}
                      icon={{
                        url: SelectedMarker,
                        anchor: new Point(20, 20),
                      }}
                    >
                      {showLabelMarker ? (
                        <InfoWindow
                          onCloseClick={() =>
                            setShowLabelMarker(!showLabelMarker)
                          }
                        >
                          <div>Your Location</div>
                        </InfoWindow>
                      ) : null}
                    </Marker>

                    <Polyline
                      path={route}
                      options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.75,
                        strokeWeight: 2,
                      }}
                    />
                    {openDrawerSec ? (
                      <Marker
                        position={{
                          lat: parseFloat(nearATM[0].latitude),
                          lng: parseFloat(nearATM[0].longitude),
                        }}
                        onClick={() => {
                          setShowLabelMarkerNearAtm(!showLabelMarkerNearAtm);
                        }}
                      >
                        {showLabelMarkerNearAtm ? (
                          <InfoWindow
                            onCloseClick={() =>
                              setShowLabelMarkerNearAtm(!showLabelMarkerNearAtm)
                            }
                          >
                            <div>{nearATM[0].locationName}</div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ) : null}
                  </GoogleMap>
                </LoadScript>
              </Box>
              <Grid container justify="space-between" className={buttonSection}>
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={buttonOutlined}
                    hidden={hideSaveButton}
                    onClick={() => {
                      // saveSurvei(1);
                      handlingSaveSurvei("savedLocation");
                    }}
                  >
                    Save Location
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={buttonPrimary}
                    onClick={() => {
                      // saveSurvei(2);
                      handlingSaveSurvei("profilling2");
                    }}
                  >
                    Submit to Profiling
                  </Button>
                </Grid>
              </Grid>
            </>
          </Drawer>

          <Drawer
            className={drawer}
            open={openDrawerSec}
            anchor="right"
            onClose={toggleCloseDrawer}
            elevation={0}
            variant="persistent"
          >
            <form className={root} noValidate autoComplete="off">
              <Grid container className={drawerContainerTop} spacing={2}>
                <Grid container justify="flex-end" style={{ height: 60 }}>
                  <Grid item>
                    <IconButton
                      className={closeIcon}
                      onClick={toogleCloseDrawerSec}
                      style={{ color: constants.color.primaryHard }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {nearATM?.map(
                  (
                    {
                      atmId,
                      locationName,
                      locationPhotosUrl,
                      locationAddress,
                      locationType,
                      potentialModel,
                      distanceInMeter,
                      condition,
                      itemTransactionTotal,
                    },
                    index
                  ) => (
                    <Grid key={atmId} item>
                      <Card>
                        <CardMedia
                          className={cardImage}
                          image={locationPhotosUrl[0]}
                        />
                        <CardContent>
                          <Grid className={cardSectionInfo}>
                            <Grid
                              container
                              className={drawerContainerATM}
                              spacing={1}
                            >
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                                spacing={1}
                              >
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    className={ATMname}
                                  >
                                    {locationName}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="p"
                                    className={
                                      condition === "Bad"
                                        ? statusBad
                                        : statusGood
                                    }
                                  >
                                    {condition}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                spacing={1}
                              >
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                  >
                                    {atmId}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    style={{
                                      color: constants.color.primaryHard,
                                      fontWeight: 500,
                                      padding: "0 95px 0 0",
                                    }}
                                  >
                                    {potentialModel}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                  >
                                    Total Transaction
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                spacing={1}
                              >
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="p"
                                  >
                                    {locationType} • {locationAddress} •{" "}
                                    {distanceInMeter === 0
                                      ? defDistance
                                      : meterToKilometer(distanceInMeter)}{" "}
                                    Km
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    style={{
                                      color: constants.color.primaryHard,
                                      fontWeight: 500,
                                      padding: "0 0 0 15px",
                                    }}
                                  >
                                    {itemTransactionTotal === null
                                      ? defDistance
                                      : itemTransactionTotal}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                )}
              </Grid>
            </form>
          </Drawer>
        </div>
      ) : tabValue === 1 ? (
        <div style={{ margin: "0px 30px" }}>
          <ChkyTablePagination
            data={dataTableSavedLocation}
            fields={titleSavedLocation}
            cellOption={valueSavedLocation}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
          />
        </div>
      ) : (
        <div style={{ margin: "0px 30px" }}>
          <ChkyTablePagination
            // data={dataReject}
            data={dataTableRejectedLocation}
            fields={titleReject}
            cellOption={valueReject}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            changePage={handleChangePageValue}
          />
        </div>
      )}

      <ModalDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onLeave={() => {
          handleCloseDialog();
          toggleCloseDrawer();
        }}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
      <ModalLocationNotFound
        isOpen={locNotFound}
        onClose={handleCloseLocNotFound}
        type={submitType}
      />
    </>
  );
};

PlanAndAnalytic.propTypes = {
  history: PropTypes.func.isRequired,
};

export default PlanAndAnalytic;
