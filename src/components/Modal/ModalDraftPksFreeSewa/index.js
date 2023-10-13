/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Input, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import "moment/locale/id";
import LoadingView from '../../Loading/LoadingView';
import constants from '../../../helpers/constants';
import Logo from '../../../assets/images/SideMenu/logo_cimb.png';
import DateSelect from '../../Selects/DateSelect';
import CommonSelect from '../../Selects/CommonSelect';
import getMinioFromUrl from '../../../helpers/getMinioFromUrl';
import { AdvancedSmallInput } from "../../chky/ChkyInputSmall";
import AutoCompleteTest from '../../Form/AutoComplete';
import { Dark } from '../../../assets/theme/colors';
import Pasal from './Pasal';
import DateSelectTimestamp from '../../Selects/DateSelectTimestamp';
import useTimestampConverter from '../../../helpers/useTimestampConverter';
import { IdrNumberInput } from '../../chky';

moment.locale('id');

const useStyles = makeStyles({
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paperRoot: {
    position: "absolute",
    backgroundColor: constants.color.white,
    top: 0,
    width: 720,
    height: "100%",
    borderRadius: 10,
    padding: 30,
    overflowY: "auto",
  },
  girdAreaContent: {
    // background: 'blue',
    width: "100%",
  },
  logoArea: {
    marginBottom: 14,
  },
  judulArea: {
    paddingBottom: 10,
    borderBottom: `1px solid ${Dark}`
  },
  keteranganArea: {
    paddingTop: 10,
    marginBottom: 10,
  },
  wrapperArea: {
    marginBottom: 20,
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsi: {
    paddingLeft: 10,
    fontStyle: "normal",
    fontSize: 13,
    color: "#2B2F3C",
    textAlign: 'justify'
  },
  subDeskripsi:{
    fontStyle: "normal",
    fontSize: 13,
    color: "#2B2F3C",
    textAlign: 'justify'
  },
  headingBab: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
  },
  labelInput: {
    fontSize: 13,
    color: constants.color.dark,
    marginBottom: 5,
  },
  inputForm: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    height: 40,
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    width: "100%",
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  iconInputRight: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: "12px 12px",
  },
  selectRegion: {
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      height: 40,
      border: `1px solid #BCC8E7`,
    },
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: 4,
    },
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  areaTandaTangan: {
    marginTop: 40,
    marginBottom: 30,
  },
  dropdownClassName:{
    zIndex: 1300
  },
  datePksWrapper:{
    display: 'inline-block'
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: 'justify',
  },
  inputAdv: { padding: 5 }
});

const namaKaryawanPimpinan1 = 'Wijaya Handoyo Jo';
const namaKaryawanPimpinan2 = 'Deden Hidayat';

const hariSuggestions = [
  { id: 0, value: "Senin", nameEn: "Senin", nameId: "Senin" },
  { id: 1, value: "Selasa", nameEn: "Selasa", nameId: "Selasa" },
  { id: 2, value: "Rabu", nameEn: "Rabu", nameId: "Rabu" },
  { id: 3, value: "Kamis", nameEn: "Kamis", nameId: "Kamis" },
  { id: 3, value: "Jumat", nameEn: "Jumat", nameId: "Jumat" },
  { id: 3, value: "Sabtu", nameEn: "Sabtu", nameId: "Sabtu" },
  { id: 3, value: "Minggu", nameEn: "Minggu", nameId: "Minggu" },
];

function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

const ModalDraftPksFreeSewa = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose, rowToShow } = props;
  const { Option } = Select;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [displayValue, setDisplayValue] = useState("none");
  const displayDifHide = { display: displayValue };
  
  const [dataRequest, setDataRequest] = useState({
    id: null,
    referencedNumber: "",
    sendTo: "",
    nameBusinessEntity: "",
    locationName: "",
    landlordName: "",
    ownerName: "",
    ownerInfo: "",
    ownerPosition: "",
    buildingLarge: "",
    buildingName: "",
    boothType: "",
    letterDay: moment().format('dddd'),
    letterDate: "",
    letterDate2: moment().valueOf(),
    ownershipType: "",
    ownershipNumber: "",
    ownershipName: "",
    landLetterNumber: "",
    landLetterDate: "",
    landLetterArea: "",
    landLetterBuildingArea: "",
    city: "",
    district: "",
    subDistrict: "",
    address: "",
    imbNumber: "",
    imbDate: "",
    nop: "",
    startRentDate: null,
    endRentDate: null,
    bankName: "",
    noRekeningPic: "",
    nameRekeningPic: "",
    rentYear: null,
    yearlyRentCost: "",
    cityName: "",
    provinceName: "",
    namePks: "General",
    lineTlp: "",
    buildingFloor: "",
    ownerBy: "",
    witness: "",
    ppatLocation: "",
    yearlyElectricityCost: null,
    serviceCharge: null,
    maintenanceCost: null,
    branches: ""
  });
  
  const handleDataRequest = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function showHidePasal() {
    if (displayValue === "none") {
      setDisplayValue("block");
    } else {
      setDisplayValue("none");
    }
  }

  useEffect(() => {
    if (isOpen === true) {
      const dataReq = { id: rowToShow };
      handleDataRequest(rowToShow, "id");
      const config = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestDraftPks`,
            dataReq,
            config
          )
          .then(async(res) => {
            // console.log("+++ getRequestDraftPks: ", res);
            const {data} = res;
            setDataRequest((prevstate) => ({
              ...prevstate,
              referencedNumber: data.referencedNumber,
              sendTo: data.sendTo,
              nameBusinessEntity: data.nameBusinessEntity,
              locationName: data.locationName,
              landlordName: data.landlordName,
              ownerName: data.ownerName,
              ownerInfo: data.ownerInfo,
              ownerPosition: data.ownerPosition,
              buildingLarge: data.buildingLarge,
              buildingName: data.buildingName,
              boothType: data.boothType,
              // letterDay: data.namePks,
              letterDate: data.letterDate,
              // letterDate2: data.namePks,
              // ownershipType: data.namePks,
              // ownershipNumber: data.namePks,
              // ownershipName: data.namePks,
              // landLetterNumber: data.namePks,
              // landLetterDate: data.namePks,
              // landLetterArea: data.namePks,
              // landLetterBuildingArea: data.namePks,
              // city: data.cityName,
              // district: data.namePks,
              // subDistrict: data.namePks,
              // address: data.namePks,
              // imbNumber: data.namePks,
              // imbDate: data.namePks,
              // nop: data.namePks,
              startRentDate: data.startRentDate,
              endRentDate: data.endRentDate,
              bankName: data.bankName,
              noRekeningPic: data.noRekeningPic,
              nameRekeningPic: data.nameRekeningPic,
              rentYear: data.rentYear,
              yearlyRentCost: data.yearlyRentCost,
              cityName: data.cityName,
              provinceName: data.provinceName,
              namePks: data.namePks,
              // lineTlp: data.namePks,
              // buildingFloor: data.namePks,
              // ownerBy: data.namePks,
              // witness: data.namePks,
              // ppatLocation: data.namePks,
              yearlyElectricityCost: data.yearlyElectricityCost,
              serviceCharge: data.serviceCharge,
              // maintenanceCost: data.namePks,
              // branches: data.namePks
            }));
            setModalLoader(false);
          })
          .catch((err) => {
            alert(err);
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Error Fetching Data...! \n${err}`);
        setModalLoader(false);
      }
    }
  }, [rowToShow, isOpen]);

  function validateForm(){
    const arrError = [];

    if (!dataRequest.letterDay) { arrError.push("Hari Surat"); } 
    if (!dataRequest.letterDate2) { arrError.push("Tanggal Surat"); } 
    // if (!dataRequest.landlordName) { arrError.push("Diwakili Oleh"); } 
    if (!dataRequest.buildingFloor) { arrError.push("Jumlah Lantai"); } 
    if (!dataRequest.landLetterArea) { arrError.push("Luas Tanah"); } 
    if (!dataRequest.landLetterBuildingArea) { arrError.push("Luas Bangunan Keseluruhan"); } 
    if (!dataRequest.imbNumber) { arrError.push("Nomor IMB"); } 
    if (!dataRequest.imbDate) { arrError.push("Tanggal IMB"); } 
    if (!dataRequest.ownershipName) { arrError.push("Atas Nama IMB"); } 
    if (!dataRequest.ownershipType) { arrError.push("Hak IMB"); } 
    if (!dataRequest.letterDate) { arrError.push("Tanggal Gambar Stuasi"); } 
    if (!dataRequest.landLetterNumber) { arrError.push("No Gambar Stuasi"); } 
    if (!dataRequest.address) { arrError.push("Alamat"); } 
    if (!dataRequest.ownerBy) { arrError.push("yang dimiliki PEMILIK berdasarkan"); } 
    if (!dataRequest.witness) { arrError.push("PPAT"); } 
    if (!dataRequest.ppatLocation) { arrError.push("Alamat PPAT"); } 
    if (!dataRequest.buildingLarge) { arrError.push("Luas Ruang Sewa"); } 
    if (!dataRequest.boothType) { arrError.push("Ruang Sewa"); } 
    // PASAL
    if (!dataRequest.branches) { arrError.push("Pasal 11. Cabang"); } 
    
    return arrError;
  }

  const handleSend = () => {
    // console.log("REQ DATA NEW LOI",data);
    const errorArray = validateForm();
  
    if (errorArray.length > 0) {
      const stringArr = errorArray.join('\n - ');
      alert(`Harap lengkapi data terlebih dahulu !\n - ${stringArr}`);
    }else{
      // alert("SUBMIT");
      try {
        setModalLoader(true);
        // DATA HIT
        const dataHit = {
          ...dataRequest,
          letterDate2: useTimestampConverter(dataRequest.letterDate2 / 1000, "YYYY-MM-DD"),
          imbDate: useTimestampConverter(dataRequest.imbDate / 1000, "YYYY-MM-DD")
        };

        const config = {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        };
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/sendDraftPks`,
            dataHit,
            config
          )
          .then((res) => {
            if (res.data.statusCode === "00"||res.data.statusCode === 200) {
              alert("Success Send Data to Landlord!");
              setModalLoader(false);
              window.location.reload();
            } else {
              alert("Failed to Send Data to Landlord");
              setModalLoader(false);
            }
          })
          .catch((err) => {
            setModalLoader(false);
            alert(`${err}`);
          });
      } catch (err) {
        setModalLoader(false);
        alert(`Error Fetching Data...! \n${err}`);
      }
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {isOpenModalLoader ? (
          <div className={classes.paperRoot}>
            <LoadingView maxheight="100%"/>
          </div>
        ) : (
          <Paper className={classes.paperRoot}>
            <div className={classes.girdAreaContent}>
              <div item className={classes.logoArea}>
                <img style={{ width: "145px" }} src={Logo} alt="logo" />
              </div>

              <div item className={classes.judulArea}>
                <Typography
                  align="center"
                  style={{ fontWeight: "bold", fontSize: 13 }}
                >
                  PERJANJIAN  PEMAKAIAN TEMPAT<br />
                  ATM BANK CIMB NIAGA DI{" "}
                  <b>{dataRequest.locationName ? dataRequest.locationName : "-"}</b>
                </Typography>
              </div>

              <div className={classes.keteranganArea}>
                <Grid container style={{justifyContent: 'center'}}>
                  <Grid item>
                    <Typography style={{ fontSize: 13, fontWeight: 300}}>
                      <b>{dataRequest.referencedNumber ? dataRequest.referencedNumber : "-"}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              <Grid container className={classes.wrapperArea} spacing={2}>
                <Grid item>
                  <Typography className={classes.labelInput}>
                    Pada hari ini{' '}
                    <div className={classes.datePksWrapper}>
                      <CommonSelect
                        bordered
                        suggestions={hariSuggestions}
                        value={dataRequest.letterDay}
                        width="140px"
                        handleChange={(value)=>handleDataRequest(value, "letterDay")}
                        color={constants.color.dark}
                      />
                    </div>
                    {' '} tanggal {' '}
                    <div className={classes.datePksWrapper}>
                      <DateSelectTimestamp 
                        value={dataRequest.letterDate2} 
                        popupStyle={{ zIndex: 1700 }}
                        handleChange={(val) => {
                          handleDataRequest(val, "letterDate2");
                        }}/>
                    </div>
                    {' '}yang bertanda tangan di  bawah ini  :
                  </Typography>
                </Grid>
              </Grid>

              <div className={classes.deskripsiArea}>
                <b className={classes.headingBab}>I. LOKASI/ {dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</b>{" "}<br />
                <Typography className={classes.deskripsi}>
                  Dalam hal ini diwakili oleh{" "}<AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.landlordName} stateModifier={(val)=>handleDataRequest(val, "landlordName")}/>{' '} 
                  selaku <b>{dataRequest.ownerPosition ? dataRequest.ownerPosition : "-"}</b>, 
                  dari dan karenanya bertindak untuk dan atas nama{" "}<b>{dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</b>
                  , yang berkedudukan di{" "} <b>{dataRequest.locationName ? dataRequest.locationName : "-"}</b>
                  , selanjutnya disebut <b>"PIHAK PERTAMA".</b>
                </Typography>
              </div>

              <div className={classes.deskripsiArea}>
                <b className={classes.headingBab}>II. PT. BANK CIMB NIAGA Tbk,</b>
                <Typography className={classes.deskripsi}>
                  <br />
                  Suatu perseroan terbatas yang didirikan berdasarkan hukum negara Republik Indonesia, berkedudukan di Jakarta Selatan, berkantor di Griya CIMB Niaga 2, Jl. Wahid Hasyim Blok B-4 No.3 Bintaro Sektor VII Tangerang 15224, yang anggaran dasarnya telah diumumkan dalam Berita Negara Republik Indonesia Nomor 71 tanggal 4 September 1956, Tambahan Nomor 729/1956, anggaran dasar tersebut telah beberapa kali mengalami perubahan dan terakhir telah diubah dengan Akta Nomor 20 tanggal 9 April 2020, dibuat dihadapan Ashoya Ratam, SH, MKn Notaris di Jakarta Selatan, akta mana telah diterima dan dicatat dalam database Sistem Administrasi Badan Hukum Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia sebagaimana ternyata dari Surat Penerimaan Pemberitahuan Perubahan Anggaran Dasar Nomor AHU-AH.01.03-0213936  tanggal 8 Mei 2020 dan untuk susunan kepengurusan yang terakhir sebagaimana tertuang didalam Akta Nomor 20 tanggal 21 Juli 2020, dibuat dihadapan Ashoya Ratam, SH, MKn Notaris di Jakarta Selatan, akta mana  telah diterima dan dicatat dalam database Sistem Administrasi Badan Hukum Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia  sebagaimana ternyata dari Surat Penerimaan Pemberitahuan Perubahan Data Perseroan Nomor  AHU-AH.01.03-0305212 tanggal 23 Juli 2020, dalam hal ini diwakili oleh  {' '}
                  <b>{namaKaryawanPimpinan1}</b> dan <b>{namaKaryawanPimpinan2}</b>
                  , masing-masing selaku Karyawan Pimpinan PT Bank CIMB Niaga Tbk yang dalam hal ini bertindak berdasarkan Surat Kuasa No.290/Ska/DIR/IV/2020 - tertanggal 17 April 2020 dan Surat Kuasa No. No.329/Ska/DIR/VII/2021 – tertanggal 22 Juli 2021, selanjutnya disebut <b>"PIHAK KEDUA"</b>
                </Typography>
              </div>

              <div className={classes.deskripsiArea}>
                <Typography className={classes.subDeskripsi}>
                Kedua belah menerangkan terlebih dahulu :
                </Typography>
              </div>

              <Grid
                container
                direction="column"
                className={classes.deskripsiArea}
                spacing={2}
              >
                <Grid item className={classes.deskripsi}>
                  <Grid container direction='row'>
                    <Grid item xs={1}><Typography>-</Typography></Grid>
                    <Grid item xs={11}>
                      <Typography className={classes.subDeskripsi}>
                        Bahwa PIHAK PERTAMA adalah pemegang hak atas tanah berikut bangunan diatasnya berlantai 
                        {/* <AdvancedSmallInput style={{width:75}} className={classes.inputAdv} stateVar={dataRequest.buildingFloor} stateModifier={(val)=>handleDataRequest(val, "buildingFloor")}/> */}
                        <IdrNumberInput style={{width:75, margin: "0px 5px"}} value={dataRequest.buildingFloor} onValueChange={(val) => handleDataRequest(val.value, "buildingFloor")} placeholder=""/>
                        , dengan luas tanahnya 
                        {/* <AdvancedSmallInput style={{width:75}} className={classes.inputAdv} stateVar={dataRequest.landLetterArea} stateModifier={(val)=>handleDataRequest(val, "landLetterArea")}/>  */}
                        <IdrNumberInput style={{width:75, margin: "0px 5px"}} value={dataRequest.landLetterArea} onValueChange={(val) => handleDataRequest(val.value, "landLetterArea")} placeholder=""/>
                        m2 dan luas bangunan seluruhnya 
                        {/* <AdvancedSmallInput style={{width:75}} className={classes.inputAdv} stateVar={dataRequest.landLetterBuildingArea} stateModifier={(val)=>handleDataRequest(val, "landLetterBuildingArea")}/>  */}
                        <IdrNumberInput style={{width:75, margin: "0px 5px"}} value={dataRequest.landLetterBuildingArea} onValueChange={(val) => handleDataRequest(val.value, "landLetterBuildingArea")} placeholder=""/>
                        m2 , yang didirikan berdasarkan Surat Ijin Mendirikan Bangunan (IMB) No. 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.imbNumber} stateModifier={(val)=>handleDataRequest(val, "imbNumber")}/>
                        tertanggal 
                        <div className={classes.datePksWrapper}>
                          <DateSelectTimestamp 
                            value={dataRequest.imbDate} 
                            popupStyle={{ zIndex: 1700 }}
                            handleChange={(val) => {
                              handleDataRequest(val, "imbDate");
                            }}/>
                        </div>
                        terdaftar atas nama 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.ownershipName} stateModifier={(val)=>handleDataRequest(val, "ownershipName")}/>
                        , dibangun di atas tanah Hak 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.ownershipType} stateModifier={(val)=>handleDataRequest(val, "ownershipType")}/>
                        , Gambar Situasi tanggal 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.letterDate} stateModifier={(val)=>handleDataRequest(val, "letterDate")}/>
                        No.  
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.landLetterNumber} stateModifier={(val)=>handleDataRequest(val, "landLetterNumber")}/>
                        , atas nama  
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.ownershipName} stateModifier={(val)=>handleDataRequest(val, "ownershipName")}/>
                        , terletak di Jl.  
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.address} stateModifier={(val)=>handleDataRequest(val, "address")}/>
                        yang dimiliki PIHAK PERTAMA  berdasarkan  
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.ownerBy} stateModifier={(val)=>handleDataRequest(val, "ownerBy")}/>
                        yang dibuat dihadapan  
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.witness} stateModifier={(val)=>handleDataRequest(val, "witness")}/>
                        , PPAT di 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.ppatLocation} stateModifier={(val)=>handleDataRequest(val, "ppatLocation")}/>
                        , selanjutnya disebut   BANGUNAN.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item className={classes.deskripsi}>
                  <Grid container direction='row'>
                    <Grid item xs={1}><Typography>-</Typography></Grid>
                    <Grid item xs={11}>
                      <Typography className={classes.subDeskripsi}>
                        Bahwa PIHAK PERTAMA setuju memberikan pemakaian tempat 
                        kepada PIHAK KEDUA dan PIHAK KEDUA setuju menggunakan tempat seluas {" "} 
                        {/* <AdvancedSmallInput style={{width:75}} className={classes.inputAdv} stateVar={dataRequest.buildingLarge} stateModifier={(val)=>handleDataRequest(val, "buildingLarge")}/>  */}
                        <IdrNumberInput style={{width:75, margin: "0px 5px"}} value={dataRequest.buildingLarge} onValueChange={(val) => handleDataRequest(val.value, "buildingLarge")} placeholder=""/>
                        m2 yang terletak di area{" "} 
                        <AdvancedSmallInput className={classes.inputAdv} stateVar={dataRequest.boothType} stateModifier={(val)=>handleDataRequest(val, "boothType")}/>
                        , selanjutnya disebut <b>"RUANGAN SEWA"</b>.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>

              <div className={classes.deskripsiArea}>
                <Typography className={classes.subDeskripsi}>
                  Selanjutnya kedua belah pihak sepakat bahwa Perjanjian Pemakaian Tempat ini dilangsungkan dan diterima oleh kedua belah pihak dengan syarat-syarat dan ketentuan-ketentuan sebagai berikut :
                </Typography>
              </div>

              <div style={displayDifHide}>
                <Pasal data={dataRequest} handleDataRequest={handleDataRequest}/>
              </div>

              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 20,
                  color: "#DC241F",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                <Typography
                  onClick={() => {
                    showHidePasal();
                  }}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#DC241F",
                    fontSize: 16,
                  }}
                >
                  Lihat / Sembunyikan Pasal
                </Typography>
              </div>

              <div>
                Demikian  Perjanjian  ini, dibuat dalam rangkap dua  bermeterai cukup  dan mempunyai  kekuatan hukum  yang sama, masing-masing  pihak  memperoleh  1 eksemplar.
              </div>
              <br />
              <Table size="small">
                <TableRow>
                  <TableCell style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PEMILIK / PIHAK PERTAMA</Typography>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>{dataRequest.nameBusinessEntity ? dataRequest.nameBusinessEntity : "-"}</Typography>
                  </TableCell>
                  <TableCell colSpan={2} style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PENYEWA / PIHAK KEDUA</Typography>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>PT. BANK CIMB Niaga Tbk</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{paddingTop: 20, borderBottom: 'none'}}>
                    <div  style={{paddingTop: 20,}} >&nbsp;</div>
                  </TableCell>
                </TableRow>
  
                <TableRow>
                  <TableCell style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{dataRequest.landlordName? dataRequest.landlordName: "-"}</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{namaKaryawanPimpinan1}</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>{namaKaryawanPimpinan2}</Typography>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Direktur</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none', padding:'unset'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Karyawan Pimpinan</Typography>
                  </TableCell>
                  <TableCell  style={{borderBottom: 'none'}}>
                    <Typography style={{textAlign: 'center', fontSize: '13px',fontWeight: 700}}>Karyawan Pimpinan</Typography>
                  </TableCell>
                </TableRow>
              </Table>

              <Grid item className={classes.deskripsiArea} style={{marginTop : 20}}>
                <Typography className={classes.deskripsiFooter}>
                  <b>PT. Bank CIMB Niaga, Tbk. </b><br />
                Griya Niaga 2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII Tangerang 15224 
                Telp 299 72 400 Fax 7486 7959 SWIFT BNIAIDJA www.cimbniaga.com
                </Typography>
              </Grid>

              <Grid
                container
                justify="space-between"
                className={classes.buttonContainer}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={handleClose}
                    style={{ textTransform: "capitalize" }}
                  >
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSend}
                    style={{ textTransform: "capitalize" }}
                  >
                    Generate PDF & Send to Landlord
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        )}
      </Modal>
    </>
  );
};

export default ModalDraftPksFreeSewa;