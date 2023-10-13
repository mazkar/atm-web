/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, Paper, Tabs, Tab, Box, TextField, Drawer, IconButton, Container } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import ComonSelect from '../../../../../components/Selects/CommonSelect';
import SearchAtm from "./SearchAtm";
import theme from "../../../../../assets/theme/theme";
import constants from "../../../../../helpers/constants";
import {ReactComponent as LocationIcon} from "../../../../../assets/icons/duotone-red/icon-form-location.svg";
import ContentMapSelect from "./ContentMapSelect";
import ContentNearAtm from "./ContentNearAtm";
import ModalLoader from "../../../../../components/ModalLoader";
import {doFetchGetDraft, doGetNearlyATM, doUpdateDataPipeline} from '../../ApiServiceProggress';
import MuiButton from "../../../../../components/Button/MuiButton";
import { useRenameOpeningType } from "../../../../../helpers";

const useStyles = makeStyles({
  formContainer: {
    padding: 10,
    top: 30,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontStyle: "normal",
  },
  tabContent: {
    paddingTop: 10,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  label: {
    fontSize: '13px',
    fontWeight: 400
  },
  labelBottom: {
    width: 72,
    padding: 0,
    fontSize: 13,
    textAlign: 'center',
    color: '#8D98B4',
  },
  inputSearchLocation: {
    boxSizing: "border-box",
    border: "1px solid transparent",
    borderRadius: "8px",
    width: "100%",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipsis",
    fontFamily: "Barlow",
    fontStyle: "italic",
    backgroundColor: "#FFFF",
    "&::placeholder": {
      color: "#BCC8E7",
    },
  },
  drawer: {
    "& .MuiDrawer-paper": {
      zIndex: 1001,
      padding: "90px 0 0",
      width: 'calc((100% - 250px)*0.525)',
    },
  },
  drawerNear: {
    "& .MuiDrawer-paper": {
      zIndex: 1005,
      padding: "90px 0 0",
      width: 'calc((100% - 250px)*0.525)',
    },
  },
  btnOpenDrawer:{
    // transform: "rotate(-90deg)",
    position: "absolute",
    top: 5,
    right: -1,
    backgroundColor: "#DC241F",
    color: "#FFF",
    zIndex: 1002,
    textTransform: "capitalize",
  }
});

const useTabsStyles = makeStyles({
  root: {
    marginTop: 10,
    minHeight: 40,
    maxWidth: 480,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 6,
    color: constants.color.grayMedium,
  },
  indicator: {
    display: 'none',
  },
});
  
const useTabItemStyles = makeStyles({
  root: {
    minHeight: 40,
    minWidth: 120,
    fontSize: '13px',
    fontWeight: 500
    // padding: '7px 7px',
  },
  selected: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapper: {
    textTransform: 'none',
  },
});

const categorySugestions = [
  { id: 0, value: "Prominent", nameId: "Prominent", nameEn: "Prominent" },
  { id: 1, value: "Branding", nameId: "Branding", nameEn: "Branding" },
  { id: 2, value: "High SA", nameId: "High SA", nameEn: "High SA" },
  { id: 3, value: "Medium SA", nameId: "Medium SA", nameEn: "Medium SA" },
  { id: 4, value: "High Usage", nameId: "High Usage", nameEn: "High Usage" },
  { id: 5, value: "Medium Usage", nameId: "Medium Usage", nameEn: "Medium Usage", },
  { id: 6, value: "High Revenue", nameId: "High Revenue", nameEn: "High Revenue", },
  { id: 7, value: "Medium Revenue", nameId: "Medium Revenue", nameEn: "Medium Revenue", },
  { id: 8, value: "Low Performance", nameId: "Low Performance", nameEn: "Low Performance", },
  { id: 9, value: "Unrated", nameId: "Unrated", nameEn: "Unrated" },
];
const categorySugestionsON = [
  { id: 10, value: "Conventional", nameId: "Conventional", nameEn: "Conventional" },
  { id: 11, value: "Syariah", nameId: "Syariah", nameEn: "Syariah" },
];

const typeMachineSugestions = [
  { id: 0, value: 'ATM', nameId: 'ATM', nameEn: 'ATM' },
  { id: 1, value: 'CRM', nameId: 'CRM', nameEn: 'CRM' },
  { id: 2, value: 'MDM', nameId: 'MDM', nameEn: 'MDM' },
  { id: 3, value: 'CDM', nameId: 'CDM', nameEn: 'CDM' },
];

const regexVar = /-?\d+(\.\d+)?/;

const FormLocation = () => {
  const classes = useStyles();
  const tabsClasses = useTabsStyles();
  const tabItemClasses = useTabItemStyles();
  const tabsStyles = {
    root: tabsClasses.root,
    indicator: tabsClasses.indicator,
  };
  const tabItemStyles = {
    root: tabItemClasses.root,
    selected: tabItemClasses.selected,
    wrapper: tabItemClasses.wrapper,
  };
  const history = useHistory();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idSite = urlParams.get("idSite");

  //   INIT STATE
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataFetch, setDataFetch] = useState({});

  const [openingType, setOpeningType] = useState("");
  const [atmId, setAtmId] = useState("");
  const [inputPosition, setInputPosition] = useState({
    lat: -6.2732099,
    lng: 106.7239952,
  });
  const [lat, setLat] = useState(inputPosition.lat);
  const [lng, setLng] = useState(inputPosition.lng);
  const [requester, setRequester] = useState("ATM Business");
  const [selectedLokasi, setSelectedLokasi] = useState("ON");
  const [machineType, setMachineType] = useState(typeMachineSugestions[0].value);
  const [category, setCategory] =  useState("");
  const [defaultCat, setDefaultCat] =  useState("");
  const [catSugestion, setCatSugestion] =  useState(categorySugestionsON);
  const [currentMachine, setCurrentMachine] =  useState(typeMachineSugestions[0].value);
  const [machineTypeReplace, setMachineTypeReplace] =  useState(typeMachineSugestions[0].value);
  const [openDrawerNear, setOpenDrawerNear] = useState(true);
  const [openDrawerLocation, setOpenDrawerLocation] = useState(false);
  const [drawerToShow, setDrawerToShow] =  useState('near');
  const [quotaBI, setQuotaBI] = useState('');
  const [dataAtmSekitar, setDataAtmSekitar] = useState([]);

  // STATE AFTER CLICK PROCES BUTTON
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

  const loaderHandler = (bool)=>{
    setModalLoader(bool);
  };
  
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setRequester(newValue);
  };
  const handleSelectedLokasi = (event, newValue) => {
    event.preventDefault();
    setSelectedLokasi(newValue);
    if(newValue === "OFF"){
      setCatSugestion(categorySugestions);
      setDefaultCat(categorySugestions[0].value);
      setCategory(categorySugestions[0].value);
    }else {
      setCatSugestion(categorySugestionsON);
      setDefaultCat(categorySugestionsON[0].value);
      setCategory(categorySugestionsON[0].value);
    }
  };

  const onChangeAtmId = (e) => {
    setAtmId(e.target.value);
  };
  const doSubmitNewAtm = (atmIdHit) =>{
    alert(`doSubmitNewAtm: ${atmIdHit}`);
  };

  useEffect(() => {
    if(selectedLokasi === "OFF"){
      setCatSugestion(categorySugestions);
      setDefaultCat(category || categorySugestions[0].value);
    }else {
      setCatSugestion(categorySugestionsON);
      setDefaultCat(category || categorySugestionsON[0].value);
    }
  }, [selectedLokasi]);

  useEffect(() => {
    setInputPosition({lat: parseFloat(lat), lng: parseFloat(lng)});
  }, [lat, lng]);

  useEffect(() => {
    setLat(inputPosition.lat);
    setLng(inputPosition.lng);
  }, [inputPosition]);

  useEffect(() => {
    console.log("+++ category",category)
  }, [category])

  // DEFINE STATE AND HANDLER FOR STANDALONE SEARCH LOCATION BOX
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
        .then((response) => {
          const results = response.data;
          setInputPosition(results.results[0].geometry.location);
          // console.log("+++ response", response);
        });
      // toggleCloseDrawer();
    } catch (error) {
      alert("Terjadi kesalahan", error);
      // console.log(error);
    }
  };
  
  // COMPONENT DID MOUNT
  useEffect(() => {
    doFetchGetDraft(loaderHandler, {id:idSite}).then((response)=>{
      console.log(">>> CEK doFetchImplementationDetail: ", response);
      if(response){
        // DATA DIBAWAH untuk pembanding saat hit ke save
        const dataToFetch = {
          openingType: response.openingType,
          modelTeam: response.modelTeam,
          requester: response.requester,
          locationMode: response.locationMode,
          latitude: parseFloat(response.latitude),
          longitude: parseFloat(response.longitude),
          machineType: response.machineType,
          atmId: response.atmId,
          findNearbyAtmResponse: response.findNearbyAtmResponse.atmPoints,
          quotaBI: `${response.cityQuota.actual}/${response.cityQuota.target}`,
        };

        setOpeningType(response.openingType);
        setCategory(response.modelTeam);
        setRequester(response.requester);
        setSelectedLokasi(response.locationMode);
        setInputPosition({lat: parseFloat(response.latitude), lng: parseFloat(response.longitude)});
        setMachineType(response.machineType);
        setAtmId(response.atmId);
        setQuotaBI(`${response.cityQuota.actual}/${response.cityQuota.target}`);
        setDataAtmSekitar(response.findNearbyAtmResponse.atmPoints);
        // Sebagai Pembanding, jika data hit sama next tanpa save, jika ada perbedaan di dataHit saveData dan next
        setDataFetch(dataToFetch);
        setCurrentMachine(response.oldMachineType);
        // console.log("+++ dataToFetch", dataToFetch);
      }
    });
  }, []);

  function handleSaveAndNext(){
    const dataFetchCompare = {
      openingType,
      modelTeam: category,
      requester,
      locationMode: selectedLokasi,
      latitude: inputPosition.lat,
      longitude: inputPosition.lng,
      machineType,
      atmId,
      findNearbyAtmResponse: dataAtmSekitar,
      quotaBI,
    };
    // console.log("+++ dataHit", dataHit);
    // console.log("+++ dataFetch", dataFetch);
    // console.log("+++ dataHit = dataFetch", JSON.stringify(dataHit) === JSON.stringify(dataFetch));
    const compareHitAndCurrentData = JSON.stringify(dataFetchCompare) === JSON.stringify(dataFetch);
    if (!compareHitAndCurrentData){
      if(provinceName === ""){
        alert("Untuk melakukan perubahan data silahkan klik Tombol Process Terlebih dahulu!");
      }else if (window.confirm("Terdapat perubahan data pada pipeline, Apakah anda yakin update data?")){
        // window.location.assign('/modeling-model');
        let dataHit = {
          id: idSite,
          atmId,
          latitude: lat,
          longitude: lng,
          locationMode: selectedLokasi,
          machineType,
          modelTeam: category,
          openingType,
          requester,
          provinceName,
          cityName,
          districtName,
          formattedAddress,
        };
        if(openingType === "Replace"){
          dataHit = {
            ...dataHit,
            locationMode: "",
            modelTeam: "",
            requester: "",
          };
        }
  
        doUpdateDataPipeline(loaderHandler, dataHit).then((response)=>{
          console.log(">>> CEK doUpdateDataPipeline: ", response);
          if(response){
            if(response.responseCode === 200){
              alert("Data Pipeline Berhasil Diupdate, Direct ke Page Edit Profiling!");
              history.push(
                `/site-management/progress-list/edit-profiling?openingType=${useRenameOpeningType(
                  openingType
                )}&savedId=${idSite}&atmId=${atmId}`
              );
            }
          }
        });
      }
    }else{
      history.push(
        `/site-management/progress-list/edit-profiling?openingType=${useRenameOpeningType(
          openingType
        )}&savedId=${idSite}&atmId=${atmId}`
      );
    }
  }

  const submitLocation=()=>{
    let mandatory = false;
    if(openingType !== "Replace"){
      if(selectedLokasi === null || requester === null){
        mandatory = true;
        alert("Requester dan Lokasi harus dipilih untuk lanjutkan Proses, Silahkan dilengkapi dulu!");
      }else{
        mandatory = false;
      }
    }
    if(mandatory === false){
      doGetNearlyATM(loaderHandler, {latitude: inputPosition.lat, longitude: inputPosition.lng}).then((response)=>{
        console.log(">>> CEK doGetNearlyATM: ", response);
        if(response){
          // DATA DIBAWAH untuk pembanding saat hit ke save
          setDataAtmSekitar(response.atmPoints);
          setQuotaBI(`${response.cityQuota.actual}/${response.cityQuota.target}`);
          setOpenDrawerNear(true);
          setProvinceName(response.provinceName);
          setCityName(response.cityName);
          setDistrictName(response.districtName);
          setFormattedAddress(response.formattedAddress);
        }
      });
    }
  };

  return (
    <Grid container direction="column" spacing={3}>
      {/* <Grid item>
        <LoadScript
          googleMapsApiKey={constants.API_MAP_KEY}
          libraries={["places"]}
        >
          <StandaloneSearchBox
            ref={searchBox}
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <TextField
              variant="outlined"
              onSubmit={() => {
                // console.log(event);
                // toggleOpenDrawer();
              }}
              className={classes.inputSearchLocation}
              placeholder="Pencarian berdasarkan lokasi..."
            />
          </StandaloneSearchBox>
        </LoadScript>
      </Grid> */}
      <Grid item>
        <Paper className={classes.formContainer}>
          <Grid container direction="row">
            <LocationIcon />
            <Typography className={classes.title}>Input Location</Typography>
          </Grid>
          <Typography className={classes.title}>Opening Type: {openingType}</Typography>

          <div style={{padding: 10}}>
            <Grid container direction="column" spacing={2}>
              {openingType !== "New Location" && (
                <Grid item>
                  <Typography className={classes.label}>{openingType === "New Atm"? "Pilihan lokasi ID ATM dalam lokasi yang sama : ": "Pilihan ATM ID yang hendak diproses :"}</Typography>
                  {/* <SearchAtm
                    atmID={atmId}
                    onChange={onChangeAtmId}
                    onActionClicked={()=>doSubmitNewAtm(atmId)}
                  /> */}
                  <TextField
                    variant="outlined"
                    placeholder="ATM ID"
                    size="small"
                    value={atmId}
                    disabled
                    style={{marginTop: 5}}
                  />
                </Grid>
              )}
              {/* {(openingType === "New Location" || openingType === "Reopen") && ( */}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography className={classes.label}>Latitude :</Typography>
                    <TextField
                      variant="outlined"
                      id="latitude"
                      placeholder="Latitude"
                      type="number"
                      InputLabelProps={{
                        shrink: false,
                      }}
                      fullWidth
                      size="small"
                      value={lat}
                      onChange={(e) => {
                        if (e.target.value.match(regexVar) || e.target.value === "") {
                          setLat(e.target.value);
                        }
                      }}
                      style={{marginTop: 10,}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.label}>Longitude :</Typography>
                    <TextField
                      variant="outlined"
                      id="longitude"
                      placeholder="Longitude"
                      type="number"
                      InputLabelProps={{
                        shrink: false,
                      }}
                      fullWidth
                      size="small"
                      value={lng}
                      onChange={(e) => {
                        if (e.target.value.match(regexVar) || e.target.value === "") {
                          setLng(e.target.value);
                        }
                      }}
                      style={{marginTop: 10,}}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* )} */}
              {openingType !== "Replace" && (
                <>
                  <Grid item>
                    <Typography className={classes.label}>Requester :</Typography>
                    <Tabs
                      classes={tabsStyles}
                      value={requester}
                      onChange={handleSelectedTab}
                    >
                      <Tab classes={tabItemStyles} label="ATM Business" value="ATM Business"/>
                      <Tab classes={tabItemStyles} label="Branch" value="Branch" />
                      <Tab classes={tabItemStyles} label="Other BU" value="Other BU" />
                      <Tab classes={tabItemStyles} label="Special" value="Special" />
                    </Tabs>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography className={classes.label}>Lokasi :</Typography>
                        <Tabs
                          classes={tabsStyles}
                          value={selectedLokasi}
                          onChange={handleSelectedLokasi}
                        >
                          <Tab classes={tabItemStyles} style={{minWidth: 72}} label="ON" value="ON" />
                          <Tab classes={tabItemStyles} style={{minWidth: 72}} label="OFF" value="OFF"/>
                          <Tab classes={tabItemStyles} style={{minWidth: 72}} label="DL" value="DL"/>
                        </Tabs>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography className={classes.labelBottom}>Branch</Typography> 
                          <Typography className={classes.labelBottom}>Off Premises</Typography> 
                          <Typography className={classes.labelBottom}>Digital Lounge</Typography> 
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={classes.label} style={{marginBottom: 10,}}>Machine Type :</Typography>
                        <ComonSelect
                          suggestions={typeMachineSugestions}
                          value={machineType}
                          width="215px"
                          bordered
                          handleChange={(val)=>setMachineType(val)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.label} style={{marginBottom: 10,}}>Category :</Typography>
                    <ComonSelect
                      suggestions={catSugestion}
                      defaultValue={defaultCat}
                      value={category}
                      width="215px"
                      bordered
                      handleChange={(val)=>setCategory(val)}
                    />
                  </Grid>
                </>
              )}
              
              {/* REPLACE */}
              {openingType === "Replace" && (
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography className={classes.label} style={{marginBottom: 10,}}>Jenis Mesin ATM Saat Ini :</Typography>
                      <Typography style={{fontWeight: 500, fontSize: '15px'}}>{!currentMachine? "-" : currentMachine}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.label} style={{marginBottom: 10,}}>Jenis Mesin ATM Baru :</Typography>
                      <ComonSelect
                        suggestions={typeMachineSugestions}
                        defaultValue={machineType}
                        width="100%"
                        bordered
                        handleChange={(val)=>setMachineType(val)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Grid container justify="space-between">
                  <Grid item/>
                  <Grid item>
                    <MuiButton
                      label="Process"
                      height={40}
                      onClick={submitLocation}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
      {/* DRAWER CONTAINER */}
      <div>
        <Button className={classes.btnOpenDrawer} onClick={()=>{
          setOpenDrawerNear(true);
          setOpenDrawerLocation(false);
        }}>
          Open Info Atm Sekitar 
        </Button>
        <Drawer
          className={classes.drawerNear}
          open={openDrawerNear}
          anchor="right"
          elevation={0}
          variant="persistent"
        >
          <Grid container justify="space-between">
            <Grid item/>
            <Grid item style={{marginRight: 20}}>
              <IconButton
                onClick={()=>{
                  setOpenDrawerNear(false);
                  setOpenDrawerLocation(true);
                }}
              >
                <CloseIcon style={{ color: constants.color.primaryHard }}/>
              </IconButton>
            </Grid>
          </Grid>
          <div >
            <ContentNearAtm 
              position={inputPosition} 
              quotaBI={quotaBI} 
              dataAtmSekitar={dataAtmSekitar}
              onNext={handleSaveAndNext}
            />
          </div>
        </Drawer>
        <Drawer
          className={classes.drawer}
          open={openDrawerLocation}
          anchor="right"
          elevation={0}
          variant="persistent"
        >
          <div >
            <Typography
              style={{
                padding: "0px 20px 20px 20px",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
                Set New ATM Location
            </Typography>
            <ContentMapSelect position={inputPosition} 
              onClickPoint= {
                (e) => {
                  setInputPosition({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  });
                }}
            />
          </div>
        </Drawer>
      </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </Grid>
  );
};

FormLocation.propTypes = {
};

export default FormLocation;
