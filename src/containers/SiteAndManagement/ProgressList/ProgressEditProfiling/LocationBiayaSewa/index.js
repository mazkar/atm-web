/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-lonely-if */
/* eslint-disable one-var */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@material-ui/core";
import { DatePicker } from "antd";

import Moment from "moment";
import { extendMoment } from "moment-range";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import * as Colors from "../../../../../assets/theme/colors";
import {
  ChkyInputSmall as ChkyInputSmallText,
  ChkySelectInput,
  NumericInput,
} from "../../../../../components";
import ChkyTabsAsOption from "../ChkyTabsAsOption";
import { ReactComponent as FileIcon } from "../../../../../assets/icons/general/paperclip.svg";
import ModalLoader from "../../../../../components/ModalLoader";
import ErrorComponent from "../ErrorComponent";
import useThousandSeparator from "../../../../../helpers/useThousandSeparator";
import AccordionContainer from "../../../../../components/AccordionContainer";

const moment = extendMoment(Moment);
const momentDefault = moment;

const useStyles = makeStyles({
  root: {
    padding: "0px 15px 15px 15px",
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
  },
  subsubTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  datePicker: {
    height: 32,
    width: "auto",
    border: "1px solid #E6EAF3",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "17px",
    margin: "0px",
    padding: 9,
  },
  containerInput: { marginBottom: 5 },
  labelInput: {
    fontSize: 14,
    fontWeight: 500,
  },
  uploadFile: {
    cursor: "pointer",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -65,
    color: "#DC241F",
  },
});

const LocationBiayaSewa = (props) => {
  const fileInput = React.createRef();
  const dataJenisListrik = [
    { value: "-", name: "- Pilih Jenis Listrik -" },
    { value: "CIMB - As per Usage - Token", name: "CIMB - As per Usage - Token" },
    { value: "CIMB - Vendor - Token", name: "CIMB - Vendor - Token" },
    { value: "CIMB - Vendor - Token - MCB", name: "CIMB - Vendor - Token - MCB" },
    { value: "CIMB - As per Usage - Pascabayar", name: "CIMB - As per Usage - Pascabayar" },
    { value: "CIMB - Vendor - Pascabayar", name: "CIMB - Vendor - Pascabayar" },
    { value: "CIMB - Vendor - Pascabayar - MCB", name: "CIMB - Vendor - Pascabayar - MCB" },
    { value: "Landlord - Lumpsum - Token", name: "Landlord - Lumpsum - Token" },
    { value: "Landlord - Include - Token", name: "Landlord - Include - Token" },
    { value: "Landlord - Lumpsum - Pascabayar", name: "Landlord - Lumpsum - Pascabayar" },
    { value: "Landlord - Include - Pascabayar", name: "Landlord - Include - Pascabayar" },
  ];
  const classes = useStyles();
  const {
    disabledBiaya,
    dataValue,
    onChangeData,
    errorForm,
    costList,
    setCostList,
    flatCost,
    setFlatCost,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    rentRange,
    handleChangeDate
  } = props;

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< start REVOLUSI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<                >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function disabledDateAwalSewa(current) {
    return current < moment();
  }

  function disableDateAkhirSewa(current) {
    const tglAwalSewa = moment(dataValue.startRentDate);
    return (
      current < tglAwalSewa || moment(tglAwalSewa).add(5, "year") <= current
    );
  }

  // HANDLER CHANGE PARENT DATA
  const newHandleChangeState = (newValue, keyData) => {
    // eslint-disable-next-line no-var
    var newState = {
      ...dataValue,
      [keyData]: newValue,
    };
    // console.log(
    //   "<><> newState", keyData,
    //   newState
    // );
    onChangeData(newState);
  };

  // Nilai Awal Disable End Rent
  function defaultDisableEndRent(startRentDate) {
    if (startRentDate !== "") {
      return false;
    }
    return true;
  }
  // fungsi hitung jangka waktu sewa
  function countRentRange(start, end) {
    if (start === "" || end === "") {
      return [0, 0];
    }
    const mulaiSewa = moment(start);
    const selesaiSewa = moment(end).add(1, "days");
    // years
    const years = selesaiSewa.diff(mulaiSewa, "year");
    mulaiSewa.add(years, "years");
    // days
    const days = selesaiSewa.diff(mulaiSewa, "days");
    return [years, days];
  }

  // fungsi looping input yearly rent cost
  function changeYearlyRentCostList(years) {
    const thisArrayRentList = [];
    for (let i = 0; i < years; i += 1) {
      thisArrayRentList.push(0);
    }
    return thisArrayRentList;
  }

  // value tanggal awal sewa dan akhir sewa
  function dateToShow(timestamp) {
    let dateReturn = "";
    if (timestamp !== "") {
      dateReturn = momentDefault(timestamp);
    }
    return dateReturn;
  }

  // INIT STATE THIS COMPONENT
  const [isDisabledEndRent, setIsDisabledEndRent] = useState(false);
  const [fileSuratLandlord, setFileSuratLandlord] = useState(null);
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // hitung total biaya sewa berdasarkan jenis sewa (flat/not)
  function showTotalRent(flat) {
    const preTotalArr = [];
    costList.map((item)=>{
      // CHANGE UNDEFINED / NULL VALUE to 0
      if(!item){
        preTotalArr.push(0);
      }else{
        preTotalArr.push(item);
      }
    });
    let thisTotal = 0;
    thisTotal = preTotalArr.reduce((a, b) => a + b, 0);
    return useThousandSeparator(thisTotal);
  }
  // function split path get filename
  function splitDataPath(path) {
    const res = path.split("/");
    return res[res.length - 1];
  }

  // COMPONENT DID MOUNT
  useEffect(() => {
  // console.log("<><> COMPONENT DID MOUNT");
    setIsDisabledEndRent(defaultDisableEndRent(dataValue.startRentDate));
    // check jangka waktu sewa
    const thisRangeRent = countRentRange(
      dataValue.startRentDate,
      dataValue.endRentDate
    );
    // check jangka tahun > 0 (CONDITIONAL JIKA DATA DARI DRAFT TIDAK SET yearlyRentCostList)
    if (thisRangeRent[0] > 0) {
      // check jika yearlyRentCostList lenght < 1
    // console.log("jangka tahun > 0");
      if (costList.length < 1) {
      // console.log("do changeYearlyRentCostList");
        const newArray = changeYearlyRentCostList(thisRangeRent[0]);
        newHandleChangeState(newArray, "yearlyRentCostList");
      }
    }

    // check is flat cost
  }, []);

  // do upload hit api
  useEffect(() => {
    // init function
    const handleUploadFile = (file) => {
      setModalLoader(true);
      const formData = new FormData();
      formData.append("file", file);
      Axios({
        method: "post",
        url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/offeringFile`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          // console.log("data res", res);
          if (res.status === 200) {
            if (res.data.responseCode === "00") {
              newHandleChangeState(res.data.path, "offeringFilesPath");
            } else {
              alert(res.data.responseMessage);
            }
          }
          // console.log("Data", res.data);
          setModalLoader(false);
        })
        .catch((err) => {
          alert(`Failed to upload file ${err}`);
          setModalLoader(false);
        });
    };

    if (fileSuratLandlord) {
      handleUploadFile(fileSuratLandlord);
    }
  }, [fileSuratLandlord]);

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< end REVOLUSI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const rentType = flatCost ? 0 : 1;

  return (
    <AccordionContainer title="Informasi Biaya Sewa Lokasi" defaultExpanded>
      <div className={classes.root}>
        {/* <Typography style={{ fontSize: 20, fontWeight: 500, marginBottom: 12 }}>
          Informasi Biaya Sewa Lokasi
        </Typography> */}
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={6}>
            <Typography className={classes.subTitle}>Masa Sewa</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <DatePicker
                  value={dateToShow(startDate)}
                  format="DD-MM-YYYY"
                  allowClear={false}
                  suffixIcon
                  onChange={(newDate) => {
                    const valDate = newDate.unix() * 1000;
                    newHandleChangeState(valDate, "startRentDate");
                    setStartDate(valDate);
                    setIsDisabledEndRent(false);
                    handleChangeDate(newDate, endDate);
                  }}
                  className={classes.datePicker}
                  disabledDate={disabledDateAwalSewa}
                  disabled={disabledBiaya}
                />
                {errorForm.startRentDate ? <ErrorComponent /> : null}
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15 }}>Hingga</Typography>
              </Grid>
              <Grid item>
                <DatePicker
                  value={dateToShow(endDate)}
                  placeholder="Select date"
                  format="DD-MM-YYYY"
                  allowClear={false}
                  suffixIcon
                  onChange={(newDate) => {
                    const valDate = newDate.unix() * 1000;
                    const thisRentRange = countRentRange(
                      dataValue.startRentDate,
                      valDate
                    );
                    setEndDate(valDate);
                    handleChangeDate(startDate, newDate);
                    const newYearlyList = changeYearlyRentCostList(
                      thisRentRange[0]
                    );
                    // AKSES ONCHANGE LANGSUNG KARNA NGUBAH LEBIH DARI 1 PARENT STATE
                    const newState = {
                      ...dataValue,
                      endRentDate: valDate,
                      yearlyRentCostList: newYearlyList,
                    };
                    onChangeData(newState);
                  }}
                  className={classes.datePicker}
                  disabled={isDisabledEndRent||disabledBiaya}
                  disabledDate={disableDateAkhirSewa}
                />
                {errorForm.endRentDate ? <ErrorComponent /> : null}
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15 }}>
                  {`${rentRange[0]} Tahun  ${rentRange[1]} Hari`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.subTitle}>
              Lampiran Surat Penawaran Landlord
            </Typography>
            <Box style={{ position: "relative", width: "fit-content" }}>
              <input
                id="fileSuratLandlord"
                type="file"
                accept=".doc, .docx, .xls, .xlxs, .pdf"
                onChange={(e) => {
                  setFileSuratLandlord(e.target.files[0]);
                }}
                ref={fileInput}
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  zIndex: -1,
                }}
              />
              <label htmlFor="fileSuratLandlord" className={classes.uploadFile}>
                {dataValue.offeringFilesPath !== "" ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FileIcon />
                    <Typography
                      style={{ fontSize: 14, color: "#DC241F", marginLeft: 5 }}
                    >
                      {splitDataPath(dataValue.offeringFilesPath)}
                    </Typography>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FileIcon />
                    <Typography
                      style={{ fontSize: 14, color: "#DC241F", marginLeft: 5 }}
                    >
                      Upload File{" "}
                    </Typography>
                  </div>
                )}
              </label>
              {dataValue.offeringFilesPath !== "" && (
                <IconButton
                  className={classes.resetFile}
                  onClick={() => {
                    setFileSuratLandlord(null);
                    fileInput.current.value = null;
                    newHandleChangeState("", "offeringFilesPath");
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={6}>
            <Typography className={classes.subTitle}>
              Biaya Sewa per Tahun
            </Typography>
            <div style={{ width: 267.5, marginBottom: 20 }}>
              <ChkyTabsAsOption
                currentTab={rentType}
                dataTab={["Sama", "Beda"]}
                disableTab={[false, rentRange[0] <= 1]||disabledBiaya}
                handleChangeTab={(newVal) => {
                  // console.log('<><> newVal', newVal);
                  // change flat cost type
                  let thisFlatCost = false;
                  if (newVal === 0) {
                    thisFlatCost = true;
                  }
                  newHandleChangeState(thisFlatCost, "flatCost");
                  setFlatCost(thisFlatCost);
                }}
                isUseChangeEffect
              />
            </div>
            {costList.map((value, i) => {
              return (
                <Grid
                  container
                  alignItems="center"
                  className={classes.containerInput}
                  key={i}
                >
                  <Grid item xs={2}>
                    <Typography className={classes.labelInput}>
                          Tahun Ke - {i + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <NumericInput
                      onValueChange={(val) => {
                        const newValue = val.floatValue;
                        setCostList(costList.map((oldValue, index)=>{
                          return flatCost ? newValue : index === i ? newValue : oldValue;
                        }));
                      }}
                      value={value}
                      disabled={i > 0 && flatCost || disabledBiaya}
                    />
                  </Grid>
                </Grid>
              );
            })}

            <Grid
              container
              alignItems="center"
              spacing={1}
              style={{ marginTop: "10px" }}
            >
              <Grid item>
                <Typography className={classes.labelInput}>
                  Total Sewa :
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                  Rp. {showTotalRent(flatCost)}
                </Typography>
              </Grid>
            </Grid>
            {errorForm.yearlyRentCostList ? (
              <ErrorComponent style={{ position: "unset" }} />
            ) : null}
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.subTitle}>
              Cara Pembayaran
            </Typography>
            <div style={{ width: 267.5, marginBottom: 20 }}>
              <ChkyTabsAsOption
                currentTab={() => {
                  const valFromParent = dataValue.paymentType;
                  if (valFromParent === "Full-Payment") {
                    return 1;
                  }
                  return 0;
                }}
                dataTab={["Termin", "Full-Payment"]}
                handleChangeTab={(value) => {
                  let newVal = "Termin";
                  if (value === 1) {
                    newVal = "Full-Payment";
                  }
                  newHandleChangeState(newVal, "paymentType");
                }}
                type="payment method"
                isUseChangeEffect
              />
            </div>
            <Typography className={classes.subTitle}>Jenis Listrik</Typography>
            <div style={{ width: 367, marginBottom: 20 }}>
              <ChkySelectInput
                value={dataValue.electricityType}
                selectOptionData={dataJenisListrik}
                onSelectValueChange={(value) =>
                  newHandleChangeState(value, "electricityType")
                }
              />
              {errorForm.electricityType ? (
                <ErrorComponent label="! Select one" />
              ) : null}
            </div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography className={classes.subSubTitle}>
                  Nomor Meteran
                </Typography>
                <NumericInput
                  placeholder="0"
                  value={dataValue.numberMeterElectricity}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "numberMeterElectricity");
                  }}
                />
                {errorForm.numberMeterElectricity ? <ErrorComponent /> : null}
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.subSubTitle}>
                  Atas Nama
                </Typography>
                <ChkyInputSmallText
                  InputProps={{ disableUnderline: true }}
                  placeholder="Insert name"
                  value={dataValue.electricityOwnerName}
                  onChange={(e) => {
                    // console.log(e);
                    newHandleChangeState(
                      e.target.value,
                      "electricityOwnerName"
                    );
                  }}
                />
                {errorForm.electricityOwnerName ? <ErrorComponent /> : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider style={{ marginBottom: 20 }} />
        <Grid container style={{ marginBottom: 20 }}>
          <Grid item xs={6}>
            <Typography
              className={classes.subTitle}
              style={{ marginBottom: 7 }}
            >
              Biaya Pemeliharaan Per Tahun
            </Typography>
            <Typography
              style={{ fontSize: 13, color: Colors.GrayHard, marginBottom: 15 }}
            >
              Exclude ppn, include pph
            </Typography>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Listrik per Tahun
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.yearlyElectricityCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "yearlyElectricityCost");
                  }}
                />
                {errorForm.yearlyElectricityCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Lahan Antena VSAT
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.antenaLandCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "antenaLandCost");
                  }}
                />
                {errorForm.antenaLandCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Service Charge
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.yearlyServiceCharge}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "yearlyServiceCharge");
                  }}
                />
                {errorForm.yearlyServiceCharge ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Sewa lahan signage/ pole sign
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.yearlySignageCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "yearlySignageCost");
                  }}
                />
                {errorForm.yearlySignageCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Biaya Notaris
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.notaryCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "notaryCost");
                  }}
                />
                {errorForm.notaryCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Biaya Promosi
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.promotionCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "promotionCost");
                  }}
                />
                {errorForm.promotionCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Biaya Konsesi
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.consessionCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "consessionCost");
                  }}
                />
                {errorForm.consessionCost ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>Other</Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.otherCost}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "otherCost");
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.subTitle}>Deposit</Typography>
            <div style={{ marginBottom: 41 }} />
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>Sewa</Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.depositRent}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "depositRent");
                  }}
                />
                {errorForm.depositRent ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>Listrik</Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.depositElectricity}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "depositElectricity");
                  }}
                />
                {errorForm.depositElectricity ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>
                  Service Charge
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.depositServiceCharge}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "depositServiceCharge");
                  }}
                />
                {errorForm.depositServiceCharge ? (
                  <ErrorComponent style={{ position: "unset" }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              className={classes.containerInput}
            >
              <Grid item xs={4}>
                <Typography className={classes.labelInput}>Other</Typography>
              </Grid>
              <Grid item xs={6}>
                <NumericInput
                  placeholder="0"
                  value={dataValue.depositOthers}
                  onValueChange={(val) => {
                    const newVal = val.floatValue;
                    newHandleChangeState(newVal, "depositOthers");
                  }}
                />
              </Grid>
            </Grid>
            <div style={{ width: 367 }}>
              <ChkyInputSmallText
                multiline
                rows={9}
                placeholder="Free text input"
                fullWidth
                onChange={(e) =>
                  newHandleChangeState(e.target.value, "rentInfoNote")
                }
                value={dataValue.rentInfoNote}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </AccordionContainer>
  );
};

LocationBiayaSewa.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/no-unused-prop-types
  dataValue: PropTypes.array,
  onChangeData: PropTypes.func,
  errorForm: PropTypes.object,
};

LocationBiayaSewa.defaultProps = {
  dataValue: [],
  onChangeData: () => "Data changed",
  errorForm: {},
};

export default LocationBiayaSewa;
