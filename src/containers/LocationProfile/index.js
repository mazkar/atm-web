/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import {
  Typography,
  Breadcrumbs,
  Paper,
  Link,
  Grid,
  InputBase,
  Box,
  OutlinedInput,
  TextField,
  ButtonBase,
  Button,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavigateNext } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import constants, { dataTypeLokasi } from "../../helpers/constants";
import { Handler } from "leaflet";
import { Map, TileLayer, ZoomControl, Marker, Popup } from "react-leaflet";
import UploadImg from "./UploadLocationPhotos";
import FormGroup from "@material-ui/core/FormGroup";
import {
  DatePicker,
  Upload,
  message,
  Button as ButtonAntd,
  Checkbox as CheckboxAntd,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
import ModalDialog from "../PlanAndAnalytic/ModalDialog";
import moment from "moment";
import NumericInput from "./inputBiayaPemeliharaan";
import { Select, Input, Collapse } from "antd";
import ModalLoader from "../../components/ModalLoader";
import Axios from "axios";

const { Panel } = Collapse;
const { TextArea } = Input;
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const dataset = {
  atmMachineData: [
    {
      id: "#10029111",
      name: "Alfamidi Sudirman",
      address: "• Jl. Bibis Raya • 2,3 Km",
      type: "Retail",
      model: "CTH - 1292",
      averageTransaction: 184_002_883,
      revenue: 15_201_332,
      status: "Good",
    },
    {
      id: "#10029112",
      name: "Plaza Senayan",
      address: "• Jl. Bibis Raya • 2,3 Km",
      type: "Plaza",
      model: "CTH - 1292",
      averageTransaction: 145_000_000,
      revenue: 1_230_000_000,
      status: "Bad",
    },
    {
      id: "#10029113",
      name: "Jogja City Mall",
      address: "• Jl. Bibis Raya • 2,3 Km",
      type: "Plaza",
      model: "CTH - 1292",
      averageTransaction: 8_029_992_883,
      revenue: 100_298_884_289,
      status: "Good",
    },
  ],
};

const { atmMachineData } = dataset;

const useStyles = makeStyles({
  breadCrumbs: {
    padding: 14,
  },
  container: {
    padding: "20px 30px",
  },
  contenPaper: {
    padding: "0",
    // width: '1200px'
    width: "calc(100%)",
  },
  title: {
    textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
    color: constants.color.dark,
    fontWeight: 500,
    fontSize: 36,
  },
  formContainer: {
    borderRadius: 10,
    padding: "20px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    maxWidth: "calc(100%)",
  },
  searchBar: {
    backgroundColor: "rgba(244, 247, 251, 0.5)",
    borderRadius: 8,
    padding: 12,
    width: "50ch",
  },
  searchIcon: {
    paddingRight: 10,
  },
  inputContainer: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
  inputForm: {
    marginTop: 24,
  },
  textInput: {
    borderRadius: 8,
    width: "20ch",
    border: `1px solid ${constants.color.graySoft}`,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    marginTop: 3,
  },
  textInputFormat: {
    padding: "17px 0",
    borderRadius: 8,
    width: "30ch",
    border: `1px solid ${constants.color.graySoft}`,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  browseButton: {
    padding: "18.5px 14px",
    width: "25ch",
    border: `1px solid ${constants.color.primaryHard}`,
    borderRadius: 8,
    color: constants.color.primaryHard,
    fontSize: "1em",
  },
  previewPlaceholder: {
    border: `1px dashed ${constants.color.graySoft}`,
    borderRadius: 8,
    display: "flex",
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    marginTop: 24,
    marginLeft: 10,
  },
  suggestedInputForm: {
    borderRadius: 8,
    width: "50ch",
    border: `1px solid ${constants.color.graySoft}`,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  buttonSection: {
    // width: 'auto',
    padding: "10px 30px 50px",
  },
  buttonPrimary: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
    borderRadius: 10,
    padding: "10px 20px",
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
  },
  drawerContainer: {
    padding: "10px 30px 20px 0px",
    // width: '1450px'
    maxWidth: "calc(100%)",
    overflow: "auto",
  },
  cardContainerSecondary: {
    boxShadow: "none",
    border: "1px solid #E6EAF3",
    borderRadius: 10,
    width: "450px",
    marginRight: 10,
    marginBottom: 10,
  },
  cardSectionInfo: {
    marginBottom: 12,
  },
  drawerContainerATM: {
    padding: "0",
  },
  ATMname: {
    marginRight: 100,
    position: "sticky",
  },
  ATMname: {
    marginRight: 100,
    position: "sticky",
    fontSize: 13,
    fontFamily: "Barlow",
    fontWeight: 600,
  },
  ATMnameId: {
    fontSize: 11,
    fontFamily: "Barlow",
    fontWeight: 400,
  },
  ATMformat: {
    fontSize: 10,
    fontFamily: "Barlow",
    fontWeight: 400,
    color: "#8D98B4",
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
  currency: {
    color: constants.color.primaryHard,
    fontWeight: 500,
  },
  cardSectionTransaction: {
    marginTop: 15,
  },
  maps: {
    position: "relative",
    width: "calc(100%)",
    backgroundColor: constants.color.graySoft,
  },
  textUpload: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Barlow",
    fontStyle: "italic",
    color: "#BCC8E7",
  },
  textJenis: {
    fontSize: 15,
    fontWeight: 400,
    fontFamily: "Barlow",
    paddingLeft: 50,
  },
});

const SearchIcon = ({ color }) => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ImagePlaceholderIcon = () => (
  <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M38 6H10a4 4 0 00-4 4v28a4 4 0 004 4h28a4 4 0 004-4V10a4 4 0 00-4-4z"
      stroke="#DC241F"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 20a3 3 0 100-6 3 3 0 000 6zM42 30L32 20 10 42"
      stroke="#DC241F"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaperClipIcon = () => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.44 11.05l-9.19 9.19a6.003 6.003 0 11-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 11-2.83-2.83l8.49-8.48"
      stroke="#BCC8E7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const idrCurrencyFormat = (value, delimiter) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

const getYear = (d1, d2) => {
  let date1 = moment(d1),
    date2 = moment(d2);
  return date1.diff(date2, "years") + " Tahun";
};

const LocationProfile = ({ history }) => {
  let savedLocationData = localStorage.getItem("dataSavedLocation");
  console.log(savedLocationData);
  let locationDefault = [-6.2732641, 106.7239952];
  if (savedLocationData) {
    savedLocationData = JSON.parse(savedLocationData);
    locationDefault = [savedLocationData.latitude, savedLocationData.longitude];
  }
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // const position = [-6.2732641, 106.7239952];
  const position = locationDefault;
  const [dataRequest, setDataRequest] = useState({});

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [dateResult, setDateResult] = useState(null);

  const [opState, setStateOp] = useState({
    operasional: "24jam",
  });
  const handleChangeOp = (event) => {
    setStateOp({ [event.target.name]: event.target.value });
    let newData = dataRequest;
    newData = {
      ...newData,
      workingHour: event.target.value,
    };
    console.log(newData);
    setDataRequest(newData);
  };

  const [stateAkses, setStateAkses] = useState({
    akses: "yes",
  });
  const handleChangeAkses = (event) => {
    setStateAkses({ [event.target.name]: event.target.value });
    let newData = dataRequest;
    newData = {
      ...newData,
      publicAccessibility: event.target.value,
    };
    console.log(newData);
    setDataRequest(newData);
  };

  const [stateJenis, setStateJenis] = useState({
    jenis: "lama",
  });
  const handleChangeJenis = (event) => {
    setStateJenis({ [event.target.name]: event.target.value });
    let newData = dataRequest;
    newData = {
      ...newData,
      openingType: event.target.value,
    };
    console.log(newData);
    setDataRequest(newData);
  };

  const [statePemb, setStatePemb] = useState({
    pembayaran: "cash",
  });
  const handleChangePemb = (event) => {
    setStatePemb({ [event.target.name]: event.target.value });
    let newData = dataRequest;
    newData = {
      ...newData,
      paymentType: event.target.value,
    };
    console.log(newData);
    setDataRequest(newData);
  };

  const { operasional } = opState;
  const { akses } = stateAkses;
  const { jenis } = stateJenis;
  const { pembayaran } = statePemb;

  const {
    title,
    container,
    breadCrumbs,
    formContainer,
    searchBar,
    searchIcon,
    inputContainer,
    inputForm,
    textInput,
    browseButton,
    previewPlaceholder,
    previewContainer,
    suggestedInputForm,
    buttonPrimary,
    buttonSecondary,
    buttonOutlined,
    buttonSection,
    contenPaper,
    drawerContainer,
    cardContainerSecondary,
    cardSectionInfo,
    cardSectionTransaction,
    drawerContainerATM,
    ATMname,
    statusGood,
    statusBad,
    currency,
    maps,
    textInputFormat,
    textUpload,
    textJenis,
  } = useStyles();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const navigateToPage = (to) => history.push(to);

  const saveProfile = async () => {
    console.log(dataRequest);
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveProfilling`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataRequest,
      });
      console.log(data);
      setModalLoader(false);
      navigateToPage("/plan");
    } catch (error) {
      setModalLoader(false);
      handleCloseDialog();
      console.log("error save profile");
      console.log(error);
    }
  };

  const submitProfile = async () => {
    // console.log(dataRequest)
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitProfilling`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataRequest,
      });
      console.log(data);
      setModalLoader(false);
      handleOpenModal();
    } catch (error) {
      setModalLoader(false);
      handleCloseDialog();
      console.log("error submit profile");
      console.log(error);
    }
  };

  const saveToDraft = async () => {
    try {
      setModalLoader(true);
      let dataSavedLocation = "";
      dataSavedLocation = localStorage.getItem("dataSavedLocation");
      dataSavedLocation = JSON.parse(dataSavedLocation);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/saveSurvei`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: dataSavedLocation,
      });
      console.log(data);
      setModalLoader(false);
      navigateToPage("/plan");
    } catch (error) {
      setModalLoader(false);
      handleCloseDialog();
    }
  };

  return (
    <>
      <Paper elevation={0} className={breadCrumbs}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link color="inherit" href="/plan">
            ATM Plan
          </Link>
          <Link color="inherit" href="/plan/location">
            Location Profile
          </Link>
        </Breadcrumbs>
      </Paper>

      <Grid container direction="column" className={container} spacing={3}>
        <Grid item>
          <Typography className={title} variant="h1" component="h1">
            Location Profile
          </Typography>
        </Grid>

        <Grid item>
          <Collapse
            expandIconPosition="right"
            style={{
              borderColor: "white",
              borderRadius: 8,
              backgroundColor: "white",
            }}
            bordered={false}
          >
            <Panel
              style={{
                padding: "10px 0 10px 0",
                borderColor: 8,
                borderColor: "white",
                fontSize: 22,
              }}
              bordered={false}
              header="Informasi Umum"
            >
              <Paper className={formContainer}>
                <Grid container direction="column" spacing={2}>
                  {/* <Grid item>
                    <Typography variant="h5" component="h5">
                      Informasi Umum
                    </Typography>
                  </Grid> */}
                  <Grid item>
                    <Box className={maps}>
                      <Map
                        center={position}
                        zoom={15}
                        style={{ height: "30vh", width: "100%" }}
                        zoomControl={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                          <Popup>
                            <span>Your location</span>
                          </Popup>
                        </Marker>
                        <ZoomControl position="bottomright" />
                      </Map>
                    </Box>
                  </Grid>
                </Grid>

                <Grid
                  container
                  className={contenPaper}
                  // spacing={1}
                  direction="row"
                >
                  <Grid item>
                    {/* LEFT SIDE */}
                    <Grid
                      container
                      className={inputForm}
                      spacing={1}
                      direction="row"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 5px" }}
                            >
                              Location
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={suggestedInputForm}
                              style={{ width: "585px" }}
                              id="location-input"
                              variant="outlined"
                              placeholder="Location"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  newLocation: event.target.value,
                                };
                                console.log(newData);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className={inputForm}
                      spacing={1}
                      direction="row"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 2px" }}
                            >
                              Visitor per day
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={textInput}
                              id="visitor-perday-input"
                              // variant="outlined"
                              type="number"
                              placeholder="00"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  visitorPerDay: event.target.value,
                                };
                                console.log(newData);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 2px" }}
                            >
                              ID Location
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={textInput}
                              id="id-location-input"
                              // variant="outlined"
                              placeholder="ID Location"
                              size="large"
                              value="JKT.CIMBN.Jakarta Selatan"
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 2px" }}
                            >
                              Type Location
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Select
                              getPopupContainer={(trigger) =>
                                trigger.parentNode
                              }
                              onLeave={() => alert("Leave")}
                              style={{ borderRadius: 8, width: "20ch" }}
                              listHeight="120px"
                              size="large"
                              placeholder="Type Location"
                              options={dataTypeLokasi.map((value)=>({value}))}
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  locationType: event,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className={inputForm}
                      spacing={1}
                      direction="row"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 2px" }}
                            >
                              Cabang
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={textInput}
                              id="quota-bi-input"
                              // variant="outlined"
                              placeholder="Nama Cabang"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  branch: event.target.value,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid Item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 2px" }}
                            >
                              RO Area
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={textInput}
                              id="grid-analys-select"
                              // variant="outlined"
                              placeholder="Ro Area"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  area: event.target.value,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className={inputForm}
                      spacing={1}
                      direction="row"
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid item>
                            <Typography
                              variant="h6"
                              component="h6"
                              style={{ padding: "0 1px" }}
                            >
                              PIC Cabang
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Input
                              // className={textInput}
                              id="pic-cabang-input"
                              // variant="outlined"
                              placeholder="Username"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  branchPicName: event.target.value,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="h6" component="h6">
                              PIC Pemilik
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Input
                              // className={textInput}
                              id="pic-pemilik-select"
                              // variant="outlined"
                              placeholder="Username"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  ownerPicName: event.target.value,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={inputContainer}
                          spacing={1}
                        >
                          <Grid item>
                            <Typography variant="h6" component="h6">
                              PIC Pengelola
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Input
                              // className={textInput}
                              id="pic-pengelola-select"
                              // variant="outlined"
                              placeholder="Username"
                              size="large"
                              onChange={(event) => {
                                let newData = dataRequest;
                                newData = {
                                  ...newData,
                                  locationPicName: event.target.value,
                                };
                                console.log(event);
                                setDataRequest(newData);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    {/* RIGHT SIDE */}
                    <Grid
                      container
                      spacing={1}
                      className={previewContainer}
                      direction="column"
                    >
                      <Grid item>
                        <Typography variant="h6" component="h6">
                          Recommendation
                        </Typography>
                      </Grid>

                      <Grid item>
                        <TextArea
                          style={{ width: "390px", height: "130px" }}
                          placeholder="Jelaskan rekomendasi Anda"
                          onChange={(event) => {
                            let newData = dataRequest;
                            newData = {
                              ...newData,
                              recommendation: event.target.value,
                            };
                            console.log(event);
                            setDataRequest(newData);
                          }}
                        />
                      </Grid>

                      {/* <Grid item>
                        <Typography
                          variant="h6"
                          component="h6"
                          style={{ padding: '10px 0 0' }}
                        >
                          Upload Foto Lokasi :
                        </Typography>
                      </Grid>

                      <Grid item>
                        <UploadImg />
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>

                {/* CARD */}
                <Grid container className={drawerContainer} spacing={1}>
                  <Grid item>
                    <Typography
                      variant="h5"
                      component="h5"
                      style={{ padding: "10px 0 0 1px" }}
                    >
                      Nearest ATM
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    style={{ padding: "5px 5px 5px 4px", maxHeight: 500 }}
                  >
                    {atmMachineData?.map(
                      ({
                        id,
                        name,
                        address,
                        type,
                        model,
                        averageTransaction,
                        revenue,
                        status,
                      }) => (
                        // <Grid key={id} item xs>
                        <Card className={cardContainerSecondary}>
                          <CardContent>
                            <Box className={cardSectionInfo}>
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
                                      {name}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body1"
                                      component="p"
                                      className={
                                        status === "Bad"
                                          ? statusBad
                                          : statusGood
                                      }
                                    >
                                      {status}
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
                                      {id}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h2"
                                      className={currency}
                                    >
                                      {model}
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
                                      variant="body1"
                                      component="p"
                                    >
                                      {type}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body1"
                                      component="p"
                                    >
                                      {address}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>

                            {/* <Divider />

                              <Box className={cardSectionTransaction}>
                                <Grid
                                  container
                                  justify="space-between"
                                  alignItems="center"
                                  spacing={10}
                                >
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body2"
                                      component="p"
                                    >
                                      Average Transaction :
                                    </Typography>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h6"
                                      className={currency}
                                    >
                                      Rp{' '}
                                      {idrCurrencyFormat(
                                        averageTransaction,
                                        '.'
                                      )}
                                    </Typography>
                                  </Grid>

                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body2"
                                      component="p"
                                    >
                                      Revenue :
                                    </Typography>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h6"
                                      className={currency}
                                    >
                                      Rp {idrCurrencyFormat(revenue, '.')}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box> */}
                          </CardContent>
                        </Card>
                        // </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Panel>
          </Collapse>
        </Grid>
      </Grid>

      {/* DETAIL ATM */}
      <Grid Container direction="column" className={container} spacing={3}>
        <Collapse
          expandIconPosition="right"
          style={{
            borderColor: "white",
            borderRadius: 8,
            backgroundColor: "white",
          }}
          bordered={false}
        >
          <Panel
            style={{
              padding: "10px 0 10px 0",
              borderColor: 8,
              borderColor: "white",
              fontSize: 22,
            }}
            bordered={false}
            header="Detil ATM"
          >
            <Paper className={formContainer}>
              {/* <Typography variant="h5" component="h5">
                Detil ATM
              </Typography> */}
              <Grid
                container
                style={{ padding: "10px 0px" }}
                spacing={3}
                direction="row"
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Jenis Lokasi
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        style={{ borderRadius: 8, width: "20ch" }}
                        placeholder="Type Location"
                        options={[{ value: "Cabang" }, { value: "Non Cabang" }]}
                        size="large"
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            locationBranchType: event,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Jenis Lokasi Makro
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        // className={textInput}
                        id="lokasi-makro-input"
                        // variant="outlined"
                        placeholder="Cabang"
                        size="large"
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            locationMacroType: event.target.value,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Jenis Lokasi Mikro
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        // className={textInput}
                        id="lokasi-mikro-input"
                        // variant="outlined"
                        placeholder="Cabang"
                        size="large"
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            locationMicroType: event.target.value,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                style={{ padding: "10px 0px" }}
                spacing={10}
                direction="row"
              >
                <Grid item>
                  <Grid
                    container
                    style={{ padding: "10px 0px 0px 15px" }}
                    spacing={3}
                    direction="column"
                  >
                    <Typography variant="h6" component="h6">
                      Aksesibilitas / Operasional
                    </Typography>
                    <FormGroup row style={{ padding: "15px 0 15px 0" }}>
                      <CheckboxAntd
                        checked={operasional === "24jam"}
                        name="operasional"
                        value="24jam"
                        onChange={handleChangeOp}
                      >
                        24 Jam
                      </CheckboxAntd>
                      <CheckboxAntd
                        checked={operasional === "8jam"}
                        name="operasional"
                        value="8jam"
                        onChange={handleChangeOp}
                      >
                        8 Jam
                      </CheckboxAntd>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    style={{ padding: "10px 0px 0px 15px" }}
                    spacing={3}
                    direction="column"
                  >
                    <Typography variant="h6" component="h6">
                      Akses Umum
                    </Typography>
                    <FormGroup row style={{ padding: "15px 0 15px 0" }}>
                      <CheckboxAntd
                        checked={akses === "yes"}
                        name="akses"
                        value="yes"
                        onChange={handleChangeAkses}
                      >
                        Ya
                      </CheckboxAntd>
                      <CheckboxAntd
                        checked={akses === "tidak"}
                        name="akses"
                        value="tidak"
                        onChange={handleChangeAkses}
                      >
                        Tidak
                      </CheckboxAntd>
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                style={{ padding: "10px 0px 72px" }}
                spacing={3}
                direction="row"
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Luas Area ATM (Meter)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        type="number"
                        // className={textInput}
                        id="luas-area-input"
                        // variant="outlined"
                        placeholder="00"
                        size="large"
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            area: event.target.value,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Jumlah ATM Bank Lain
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Input
                        // className={textInput}
                        id="jumlah-atm-lain-input"
                        // variant="outlined"
                        placeholder="00"
                        size="large"
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            aroundAtmCount: event.target.value,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Tipe ATM
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        style={{ borderRadius: 8, width: "20ch" }}
                        listHeight="95px"
                        size="large"
                        placeholder="Tipe ATM"
                        options={[
                          { value: "Through the Wall" },
                          { value: "Lobby" },
                          { value: "Drive Thru" },
                        ]}
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            publicAccessibility: event,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Ruang ATM
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        style={{ borderRadius: 8, width: "20ch" }}
                        listHeight="95px"
                        size="large"
                        placeholder="Ruang ATM"
                        options={[
                          { value: "Ya, dari CIMB Niaga" },
                          { value: "Ya, dari Pemilik/Pengelola" },
                          { value: "Tidak" },
                        ]}
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            boothAvailability: event,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={inputContainer}
                    spacing={1}
                  >
                    <Grid item>
                      <Typography variant="h6" component="h6">
                        Jenis Komunikasi
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        style={{ borderRadius: 8, width: "20ch" }}
                        listHeight="95px"
                        size="large"
                        placeholder="Jenis Komunikasi"
                        options={[
                          { value: "Telepon" },
                          { value: "Leased Line" },
                          { value: "VSAT" },
                          { value: "DOV" },
                          { value: "Low Speed" },
                          { value: "Lainnya" },
                        ]}
                        onChange={(event) => {
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            commType: event,
                          };
                          console.log(event);
                          setDataRequest(newData);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    spacing={1}
                    className={previewContainer}
                    direction="column"
                  >
                    <Grid item>
                      <Typography
                        variant="h6"
                        component="h6"
                        style={{ padding: "10px 0 0" }}
                      >
                        Upload Foto Lokasi :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <UploadImg />
                    </Grid>
                    <Grid item>
                      <Typography className={textUpload}>
                        Maximum capacity 1 mb
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Panel>
        </Collapse>
      </Grid>

      {/* INFORMASI BIAYA SEWA LOKASI */}
      <Grid Container direction="column" className={container} spacing={3}>
        <Collapse
          expandIconPosition="right"
          style={{
            borderColor: "white",
            borderRadius: 8,
            backgroundColor: "white",
          }}
          bordered={false}
        >
          <Panel
            style={{
              padding: "10px 0 10px 0",
              borderColor: 8,
              borderColor: "white",
              fontSize: 22,
            }}
            bordered={false}
            header="Informasi Biaya Sewa Lokasi"
          >
            <Paper className={formContainer}>
              <Grid container direction="column" spacing={2}>
                {/* <Grid item>
              <Typography variant="h5" component="h5">
                Informasi Biaya Sewa Lokasi
              </Typography>
            </Grid> */}

                <Grid item>
                  <Typography variant="h6" component="h6">
                    Masa Sewa
                  </Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" spacing={10} justify="flex-start">
                <Grid item>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ marginTop: 10 }}
                  >
                    Tanggal Sewa
                  </Typography>

                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "10px 0" }}
                  >
                    <Grid item>
                      <DatePicker
                        allowClear={false}
                        selectedDate={selectedDate}
                        onChange={(selectedDate) => {
                          setSelectedDate(selectedDate.toArray().splice(0, 2));
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            startRentDate: selectedDate.valueOf(),
                          };
                          console.log(selectedDate.valueOf());
                          setDataRequest(newData);
                        }}
                        format="dd/MM/yyyy"
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{ marginTop: 9 }}
                      >
                        Hingga
                      </Typography>
                    </Grid>
                    <Grid item>
                      <DatePicker
                        allowClear={false}
                        selectedDate={selectedDate2}
                        onChange={(selectedDate2) => {
                          setDateResult(
                            getYear(
                              selectedDate2.toArray().splice(0, 2),
                              selectedDate
                            )
                          );
                          console.log(selectedDate2);
                          let newData = dataRequest;
                          newData = {
                            ...newData,
                            selectedDate2: selectedDate2.valueOf(),
                          };
                          console.log(selectedDate2.valueOf());
                          setDataRequest(newData);
                        }}
                        format="dd/MM/yyyy"
                      />
                    </Grid>
                    <Grid>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{ padding: "18px 0" }}
                      >
                        {dateResult}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ padding: "5px 0 0" }}
                    >
                      Jenis
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormGroup row style={{ padding: "15px 0 15px 0" }}>
                      <CheckboxAntd
                        checked={jenis === "lama"}
                        name="jenis"
                        value="lama"
                        onChange={handleChangeJenis}
                      >
                        Lama
                      </CheckboxAntd>
                      <CheckboxAntd
                        checked={jenis === "baru"}
                        name="jenis"
                        value="baru"
                        onChange={handleChangeJenis}
                      >
                        Baru
                      </CheckboxAntd>
                      <Typography className={textJenis}>
                        Exclude pph include ppn
                      </Typography>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ marginTop: 10 }}
                  >
                    Lampiran Surat Penawaran Landlord
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "15px 0 0 10px" }}
                  >
                    <Upload {...props}>
                      <ButtonAntd icon={<UploadOutlined />}>
                        Upload File
                      </ButtonAntd>
                    </Upload>
                  </Grid>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ padding: "25px 0 0" }}
                  >
                    Cara Pembayaran
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "10px 10px" }}
                  >
                    <FormGroup row style={{ padding: "15px 0 15px 0" }}>
                      <CheckboxAntd
                        checked={pembayaran === "cash"}
                        name="pembayaran"
                        value="cash"
                        onChange={handleChangePemb}
                      >
                        Cash
                      </CheckboxAntd>
                      <CheckboxAntd
                        checked={pembayaran === "termin"}
                        name="pembayaran"
                        value="termin"
                        onChange={handleChangePemb}
                      >
                        Termin
                      </CheckboxAntd>
                      <CheckboxAntd
                        checked={pembayaran === "full"}
                        name="pembayaran"
                        value="full"
                        onChange={handleChangePemb}
                      >
                        Full - Payment
                      </CheckboxAntd>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid item>{/* empty */}</Grid>
                <Grid item>{/* empty */}</Grid>
              </Grid>

              <Divider
                variant="inset"
                style={{ marginLeft: 0, marginTop: 20 }}
              />

              <NumericInput onChange={(event) => console.log(event)} />
            </Paper>
          </Panel>
        </Collapse>
      </Grid>

      <Grid container justify="space-between" className={buttonSection}>
        <Grid item>
          <Button
            variant="outlined"
            disableElevation
            className={buttonOutlined}
            onClick={handleOpenDialog}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            disableElevation
            className={buttonSecondary}
            onClick={() => saveProfile()}
          >
            Save
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            disableElevation
            className={buttonPrimary}
            onClick={() => submitProfile()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <SuccessModal
        isOpen={openModal}
        onClose={() => {
          handleCloseModal();
          navigateToPage("/plan");
        }}
        onLeave={() => navigateToPage("/procurement")}
      />
      <ModalDialog
        isOpen={openDialog}
        onClose={() => {
          handleCloseDialog();
          // navigateToPage('/plan')
          saveToDraft();
        }}
        onLeave={() => {
          handleCloseDialog();
          navigateToPage("/plan");
        }}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

SearchIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

LocationProfile.propTypes = {
  history: PropTypes.func.isRequired,
};

export default withRouter(LocationProfile);
