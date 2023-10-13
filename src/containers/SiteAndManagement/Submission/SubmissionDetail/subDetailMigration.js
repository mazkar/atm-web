/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { makeStyles, Grid, Typography, Button, Paper } from "@material-ui/core";
import { Radio, Input, TimePicker, DatePicker, Select } from "antd";
import moment from "moment";
import axios from "axios";
import constants from "../../../../helpers/constants";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import SubAtmInfo from "./subAtmInfo";
import SubDetailPaper from "./subDetailPaper";
import PaperSubmissionProgress from "../../../../components/GeneralComponent/PaperSubmissionProgress";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import RupiahConverter from "../../../../helpers/useRupiahConverter";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constants.color.primaryHard,
    marginLeft: 5,
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
  details: {
    margin: "20px 0px",
    padding: 10,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
  },
  inputDay: {
    width: 90,
  },
  inputDate: {
    "& .ant-picker": {
      borderRadius: 6,
    },
  },
  btnSend: {
    backgroundColor: constants.color.primaryHard,
    color: "white",
    borderRadius: 6,
    textTransform: "capitalize",
  },
});

// --- RADIO STYLES --- //
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const SubDetailReplace = ({ history }) => {
  const classes = useStyles();
  const { Option } = Select;
  const dateFormat = "DD/MM/YYYY";
  const format = "HH:mm";

  // GET ID from URL
  const { id } = useParams();
  const rowID = { atmId: id.toString() };

  // --- INITIAL STATE --- //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [data, setData] = useState("");
  const [position, setPosition] = useState([]);
  const [cost, setCost] = useState("");
  const [dataDetail, setDataDetail] = useState("");
  const [radioValue, setRadioValue] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [statusProgress, setStatusProgress] = useState();

  const onSelectType = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  function handleChangeDay(value) {
    console.log(`selected ${value}`);
  }

  const handleSelectDate = (date, dateString) => {
    console.log("TAMPILKAN", date, dateString);
  };

  const handleTimeStart = (time, timeString) => {
    console.log(time, timeString);
    // setStartTime(time?.format('HH:mm'));
  };

  const handleTimeEnd = (time, timeString) => {
    console.log(time, timeString);
    // setEndTime(time?.format('HH:mm'));
  };

  const handleSend = () => {
    alert("Data sent successfully");
    setIsSubmitDisabled(false);
  };

  const handleSubmit = () => {
    alert("Send All Data!");
  };

  // HIT API GET Data Detail
  useEffect(() => {
    const dataAtm = [];
    setModalLoader(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    setModalLoader(true);

    axios
      .post(
        `https://atm-biz-siab.getsandbox.com:443/sitemanagement/submissiondetail`,
        rowID,
        config
      )
      .then((res) => {
        if (res.data.detailInformation) {
          const dataInfo = res.data.detailInformation[0];
          console.log("INI DATA", dataInfo);
          const newInfo = {
            type: dataInfo.type === null ? "-" : dataInfo.type,
            kondisi: dataInfo.condition === null ? "-" : dataInfo.condition,
            lokasiId:
              dataInfo.locationName === null ? "-" : dataInfo.locationName,
            alamat: dataInfo.address === null ? "-" : dataInfo.address,
            roArea: dataInfo.roArea === null ? "-" : dataInfo.roArea,
            cabang: dataInfo.branch === null ? "-" : dataInfo.branch,
            picCabang: dataInfo.branchPic === null ? "-" : dataInfo.branchPic,
            picPemilik: dataInfo.ownerPic === null ? "-" : dataInfo.ownerPic,
            picOnLocation:
              dataInfo.picOnLocation === null ? "-" : dataInfo.picOnLocation,
            populasiATM:
              dataInfo.atmPopulation === null ? "-" : dataInfo.atmPopulation,
            categoryType:
              dataInfo.categoryType === null ? "-" : dataInfo.categoryType,
            locationCategory:
              dataInfo.locationCategory === null
                ? "-"
                : dataInfo.locationCategory,
            // jenisLokasiMakro: dataInfo.macroLocationType === null ? '-' : dataInfo.macroLocationType,
            // jenisLokasiMikro: dataInfo.microLocationType === null ? '-' : dataInfo.microLocationType,
            aksesibilitas:
              dataInfo.accessibility === null ? "-" : dataInfo.accessibility,
            aksesPublik:
              dataInfo.publicAccess === null ? "-" : dataInfo.publicAccess,
            luasArea:
              dataInfo.buildingLarge === null ? "-" : dataInfo.buildingLarge,
            jumlahAtmBankLain:
              dataInfo.aroundAtmCount === null ? "-" : dataInfo.aroundAtmCount,
            tipeAtm: dataInfo.boothType === null ? "-" : dataInfo.boothType,
            ruangAtm: dataInfo.atmRoom === null ? "-" : dataInfo.atmRoom,
            komunikasi:
              dataInfo.communicationType === null
                ? "-"
                : dataInfo.communicationType,
          };
          console.log("INI NEW INFO", JSON.stringify(newInfo));
          // set constructed data
          setData(newInfo);
          setModalLoader(false);
        }

        if (res.data.detailLocation) {
          const dataLocation = res.data.detailLocation[0];
          const newPosition = [dataLocation.latitude, dataLocation.longitude];
          setPosition(newPosition);
        }

        if (res.data.detailCost) {
          const dataCost = res.data.detailCost[0];
          console.log("INI COST", dataCost);
          const newCost = {
            biayaSewa: RupiahConverter(dataCost.yearlyRentCost),
            biayaListrik: RupiahConverter(dataCost.yearlyElectricityCost),
            telepon: RupiahConverter(dataCost.yearlyTelephoneRentCost),
            serviceCharge: RupiahConverter(dataCost.yearlyServiceCharge),
            total: RupiahConverter(dataCost.totalRent),
            nilaiTerendah: RupiahConverter(dataCost.lowerCost),
            nilaiTengah: RupiahConverter(dataCost.higherCost),
            nilaiTertinggi: RupiahConverter(dataCost.mediumCost),
          };
          setCost(newCost);
          const { approver } = res.data;
          // console.log("INI DETAIL BIAYA", dataDetail);
          console.log("APPROVER", approver);
          const newDetail = {
            biayaSewa: RupiahConverter(dataCost.yearlyRentCost),
            biayaListrik: RupiahConverter(dataCost.yearlyElectricityCost),
            telepon: RupiahConverter(dataCost.yearlyTelephoneRentCost),
            serviceCharge: RupiahConverter(dataCost.yearlyServiceCharge),
            totalSewa: RupiahConverter(dataCost.totalRent),
            name: approver,
          };
          setDataDetail(newDetail);
        }
        if (res.data.status) {
          setStatusProgress(res.data.status);
        }
      });
  }, []);

  useEffect(() => {
    console.log("INI DATA DETAIL", data);
    console.log("INI DATA POSITION", position);
    console.log("INI DATA POSITION", cost);
    console.log("INI DATA BIAYA SEWA", dataDetail);
  }, [data, position, cost, dataDetail]);

  return (
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
            atmId={rowID}
            data={data}
            position={position}
            cost={cost}
          />
        </Grid>
        <Grid item>
          <PaperSubmissionProgress statusProgress={statusProgress} />
        </Grid>

        <Grid container direction="row" spacing={2} style={{ padding: 10 }}>
          <Grid item xs={4}>
            <SubDetailPaper dataDetail={dataDetail} />
          </Grid>

          <Grid item xs={8}>
            <Paper style={{ padding: 20 }}>
              <Typography style={{ fontSize: 24, fontWeight: 500 }}>
                Detail Migration
              </Typography>

              <div className={classes.details}>
                <Typography
                  style={{ fontSize: 15, fontWeight: 500, marginBottom: 25 }}
                >
                  Migration Type
                </Typography>

                <Radio.Group onChange={onSelectType} value={radioValue}>
                  <Radio style={radioStyle} value={1}>
                    On Premises to Off Premises
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    Off Premises to On Premises
                  </Radio>
                </Radio.Group>
              </div>

              <div className={classes.details}>
                <Typography
                  style={{ fontSize: 15, fontWeight: 500, marginBottom: 25 }}
                >
                  Rencana Tanggal Tarik dan Izin Landlord{" "}
                </Typography>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={2}>
                    <Typography>Hari :</Typography>
                    <Select
                      defaultValue="Senin"
                      className={classes.inputDay}
                      onChange={handleChangeDay}
                    >
                      <Option value="Senin">Senin</Option>
                      <Option value="Selasa">Selasa</Option>
                      <Option value="Rabu">Rabu</Option>
                      <Option value="Kamis">Kamis</Option>
                      <Option value="Jumat">Jumat</Option>
                      <Option value="Sabtu">Sabtu</Option>
                      <Option value="Minggu">Minggu</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={3} className={classes.inputDate}>
                    <Typography>Tanggal :</Typography>
                    <DatePicker
                      format={dateFormat}
                      // defaultValue={moment()}
                      //   value={room}
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleSelectDate}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.inputDate}>
                    <Typography>Waktu :</Typography>
                    <TimePicker
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleTimeStart}
                      defaultValue={moment("14:00", format)}
                      format={format}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item xs={2} className={classes.inputDate}>
                    <Typography>Hingga :</Typography>
                    <TimePicker
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleTimeEnd}
                      defaultValue={moment("14:00", format)}
                      format={format}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>&nbsp;</Typography>
                    <Button
                      variant="contained"
                      className={classes.btnSend}
                      style={{ height: 30 }}
                      onClick={handleSend}
                    >
                      Send To Landlord
                    </Button>
                  </Grid>
                </Grid>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignContent: "flex-end",
                  marginTop: "9%",
                }}
              >
                <Button
                  variant="contained"
                  className={classes.btnSend}
                  style={{ width: 115 }}
                  onSubmit={handleSubmit}
                  disabled={isSubmitDisabled}
                >
                  Submit
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(SubDetailReplace);
