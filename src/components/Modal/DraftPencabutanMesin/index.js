import React, { useEffect, useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Modal,
  Grid,
  Typography,
  Button,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputBase,
} from "@material-ui/core";
import { Input, DatePicker, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import constants from "../../../helpers/constants";
import Logo from "../../../assets/images/SideMenu/logo_cimb.png";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/images/calendar-alt.svg";
import SecureStorage from "../../../helpers/secureStorage";
import { AdvancedSmallInput } from "../../chky/ChkyInputSmall";
import getMinioFromUrl from "../../../helpers/getMinioFromUrl";
import { RootContext } from "../../../router";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 13,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

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
    overflow: "scroll",
  },
  girdAreaContent: {
    // background: 'blue',
    width: "100%",
  },
  logoArea: {
    marginBottom: 51,
  },
  judulArea: {
    marginBottom: 20,
  },
  keteranganArea: {
    marginBottom: 10,
  },
  wrapperArea: {
    marginBottom: 20,
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsi: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#2B2F3C",
    textAlign: 'justify',
  },
  deskripsiFooter: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#DC241F",
    textAlign: 'justify',
  },
  headingInput: {
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
    height: 34,
  },
  inputFormTime: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    height: 34,
    width: 100,
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
  areaTandaTangan: {
    marginTop: 110,
    marginBottom: 40,
  },
  fontBold: {
    fontWeight: 700,
    fontSize: 13,
  },
});

const DraftPencabutanMesin = (props) => {
  const timeFormat = "HH:mm";
  const classes = useStyles();
  const [data, setData] = useState();
  const { isOpen, onClose, rowToShow, setModalLoader } = props;
  const [cimbPic, setCimbPic] = useState("Ramlan Hidayat Said");
  const [valuePerusahaan, setValuePerusahaan] = useState(" ");
  const [valuehari, setValuehari] = useState(" ");
  const [valueWaktu, setValueWaktu] = useState(moment().startOf("day"));
  const [valueHingga, setValueHingga] = useState(moment().startOf("day"));
  const [dateValue, setDate] = useState(moment());
  const [letterDate, setLetterDate] = useState("");
  const [letterPlace, setLetterPlace] = useState("");
  const [machineRevokeLandlord, setMachineRevokeLandlord] = useState("PT. Citra Removindo");
  const [firstVendor, setFirstVendor] = useState("");
  const [secondVendor, setSecondVendor] = useState("");
  
  const { userSignature, userFullName } = useContext(RootContext);
  const [signatureSupport, setSignatureSupport] = useState(null);
  const [signatureManagement, setSignatureManagement] = useState(null);
  const [managementName, setManagementName] = useState("");
  const { userServiceBaseUrl } = constants;

  // address
  let sendAddress = [];
  if (data) {
    sendAddress = data.sendTo
      .split("\n")
      .map((item) => (item === "null" ? "-" : item));
    // sendAddress.shift();
  }

  function getManagementSignature(signature) {
    if (signature) {
      getMinioFromUrl(signature)
        .then((res) => {
          // setIsLoading(false);
          // console.log("THIS IS TTD USER LOGIN : ", res.fileUrl);
          setSignatureManagement(res.fileUrl);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      // setIsLoading(false);
    }
  }

  const perusahaanSuggestions = [
    // { id: 0, value: '0', name: 'Perusahaan 1' },
    // { id: 1, value: '1', name: 'Perusahaan 2' },
    // { id: 2, value: '2', name: 'Perusahaan 3' },
    // { id: 3, value: '3', name: 'Perusahaan 4' },
    { id: 0, value: "0", name: "PT. Citra Removindo" },
  ];

  const perusahaanSuggestionsHash = {
    " ": { id: 0, value: "0", name: "" },
    0: { id: 0, value: "0", name: "PT. Citra Removindo" },
  };

  const hariSuggestions = [
    { id: 0, value: "0", name: "Senin" },
    { id: 1, value: "1", name: "Selasa" },
    { id: 2, value: "2", name: "Rabu" },
    { id: 3, value: "3", name: "Kamis" },
    { id: 3, value: "4", name: "Jumat" },
    { id: 3, value: "5", name: "Sabtu" },
    { id: 3, value: "6", name: "Minggu" },
  ];

  const hariSuggestionsHash = {
    0: { id: 0, value: "0", name: "Senin" },
    1: { id: 1, value: "1", name: "Selasa" },
    2: { id: 2, value: "2", name: "Rabu" },
    3: { id: 3, value: "3", name: "Kamis" },
    4: { id: 3, value: "4", name: "Jumat" },
    5: { id: 3, value: "5", name: "Sabtu" },
    6: { id: 3, value: "6", name: "Minggu" },
  };

  const dateFormatList = ["DD MMMM YYYY", "YYYY MMMM DD"];

  const handleChangePerusahaan = (e) => {
    const {value} = e.target;
    setValuePerusahaan(value);
  };

  const handleChangeHari = (e) => {
    const {value} = e.target;
    setValuehari(value);
  };

  const handleChangeWaktu = (date, dateString) => {
    setValueWaktu(date);
  };

  const handleChangeHingga = (date, dateString) => {
    setValueHingga(date);
  };

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  useEffect(() => {
    if (isOpen) {
      let dataDraftTermin = {};
      dataDraftTermin = SecureStorage.getItem("dataDraftTermin");
      const securedLetterPlace = SecureStorage.getItem("kerjasamaLetterPlace");
      setData(dataDraftTermin);
      setLetterDate(dataDraftTermin?.letterDate);
      setFirstVendor(dataDraftTermin?.firstVendor);
      setSecondVendor(dataDraftTermin?.secondVendor);
      setLetterPlace(securedLetterPlace);
      getManagementSignature(dataDraftTermin.firstSignatureUrl);
      setManagementName(dataDraftTermin.firstSigner);
      setValuehari(dataDraftTermin?.revocationDay);
      setDate(moment(dataDraftTermin?.revocationDate));
      setValueWaktu(moment(dataDraftTermin?.revocationStartTime, timeFormat));
      setValueHingga(moment(dataDraftTermin?.revocationEndTime, timeFormat));
      // console.log('dataDraftTermin', dataDraftTermin);
    }
  }, [isOpen]);

  function handleGeneratePDF() {
    const request = {
      id: rowToShow,
      referenceNumber: isEmpty(data) ? "N/A" : data.referencedNumber,
      letterDate: `${letterPlace},${letterDate}`,
      sendTo: isEmpty(data) ? "N/A" : data.sendTo,
      locationName: isEmpty(data) ? "N/A" : data.locationName,
      nameLandlord: isEmpty(data) ? "N/A" : data.landlordName,
      firstActiveUser: isEmpty(data) ? "N/A" : data.firstActiveUser,
      secondActiveUser: isEmpty(data) ? "N/A" : data.secondActiveUser,
      cimbPic,
      machineRevokeLandlord: !machineRevokeLandlord ?  "N/A" : machineRevokeLandlord,
      firstVendor: !firstVendor ?  "N/A" : firstVendor,
      secondVendor: !secondVendor ? "N/A" : secondVendor,
      date: dateValue.format(dateFormatList[0]),
      timeFrom: `${moment(valueWaktu).format(timeFormat)  }:00`,
      timeUntil: `${moment(valueHingga).format(timeFormat)  }:00`,
      picName: isEmpty(data) ? "N/A" : data.picName,
      username: "vio",
      day: valuehari,
    };
    console.log("data pencabutan mesin", request);
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftTermin`,
          request,
          headers
        )
        .then((res) => {
          if (res.status == 200) {
            alert("Success Generate PDF");
            window.location.reload();
          }
        })
        .catch((err) => {
          alert("Data is not complete, some fields are required", err);
          setModalLoader(false);
        });
    } catch (err) {
      alert(`Error Fetching New Atm Data...! \n${err}`);
      setModalLoader(false);
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Paper className={classes.paperRoot}>
        <Grid item className={classes.girdAreaContent}>
          <Grid item className={classes.logoArea}>
            <img style={{ width: "145px" }} src={Logo} alt="logo" />
          </Grid>
          <Grid
            container
            justify="space-between"
            direction="row"
            className={classes.deskripsiArea}
          >
            <Grid item>
              <Typography variant="body2">
                {" "}
                <span className={classes.fontBold}>
                  {isEmpty(data) ? "N/A" : data.referencedNumber}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <AdvancedSmallInput
                  stateVar={letterPlace}
                  stateModifier={setLetterPlace}
                />
                <span>{isEmpty(letterDate) ? "N/A" : letterDate}</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              <b>Kepada Yth:</b> <br />
              <b>
                {isEmpty(data) ? "N/A" : data.picName ? data.picName : "-"}
              </b>{" "}
              <br />
              {isEmpty(data) ? (
                <b>N/A</b>
              ) : (
                sendAddress.map((item) => (
                  <div>
                    <b>{item}</b>
                  </div>
                ))
              )}
              <br />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Perihal: Penghentian Sewa Lokasi ATM CIMB Niaga di{" "}
              <b>{isEmpty(data) ? "N/A" : data.locationName}</b>
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Dengan Hormat,
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Sebelumnya kami mengucapkan terimakasih atas kepercayaan bapak
              yang telah bersedia memberikan
              kesempatan kepada kami untuk menyewakan lokasi ATM CIMB Niaga di{" "}
              <b>{isEmpty(data) ? "N/A" : data.locationName}</b>
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Bersama ini kami bermaksud mengkonfirmasi bahwa vendor yang akan
              melakukan penarikan mesin ATM
              dna perangkat lainnya akan dilakukan oleh:
            </Typography>
          </Grid>
          <Grid container className={classes.wrapperArea} spacing={2}>
            <Grid item xs={4}>
              <Grid item>
                <Typography className={classes.labelInput}>
                  Penarikan Mesin ATM :
                </Typography>
              </Grid>
              <Grid item>
                <AdvancedSmallInput
                  stateVar={machineRevokeLandlord}
                  stateModifier={setMachineRevokeLandlord}
                />
                {/* <FormControl style={{ width: "100%" }}>
                  <Select
                    id="perusahaan"
                    value={valuePerusahaan}
                    onChange={handleChangePerusahaan}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value=" ">Pilih Perusahaan</MenuItem>
                    {perusahaanSuggestions &&
                      perusahaanSuggestions.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Saran Komunikasi :
            </Typography>
            <AdvancedSmallInput
              stateVar={firstVendor}
              stateModifier={setFirstVendor}
            />
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Penarikan Uang :
            </Typography>
            <AdvancedSmallInput
              stateVar={secondVendor}
              stateModifier={setSecondVendor}
            />
          </Grid>

          <Typography className={classes.labelInput}>
            Dan waktu pelaksanaannya yaitu :
          </Typography>
          <Grid container className={classes.wrapperArea} spacing={2}>
            <Grid item xs={2}>
              <Grid item>
                <Typography className={classes.labelInput}>Hari :</Typography>
              </Grid>
              <Grid item>
                <FormControl style={{ width: "100%" }}>
                  <Select
                    id="perusahaan"
                    value={valuehari}
                    onChange={handleChangeHari}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value=" ">Pilih Hari</MenuItem>
                    {hariSuggestions &&
                      hariSuggestions.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid item>
                <Typography className={classes.labelInput}>
                  Tanggal :
                </Typography>
              </Grid>
              <Grid item>
                <DatePicker
                  className={classes.inputForm}
                  popupStyle={{ zIndex: 1700 }}
                  clearIcon
                  suffixIcon={<CalendarIcon className="DateSelect__icon" />}
                  format={dateFormatList[0]}
                  value={dateValue}
                  onChange={(e) => {
                    // console.log('onchange date', e);
                    setDate(e);
                  }}
                  allowClear={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid item>
                <Typography className={classes.labelInput}>Waktu :</Typography>
              </Grid>
              <Grid item>
                <TimePicker
                  format={timeFormat}
                  className={classes.inputFormTime}
                  popupStyle={{ zIndex: 1500 }}
                  value={moment(valueWaktu, timeFormat)}
                  onChange={handleChangeWaktu}
                  allowClear={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid item>
                <Typography className={classes.labelInput}>Hingga :</Typography>
              </Grid>
              <Grid item>
                <TimePicker
                  format={timeFormat}
                  className={classes.inputFormTime}
                  popupStyle={{ zIndex: 1500 }}
                  value={moment(valueHingga, timeFormat)}
                  onChange={handleChangeHingga}
                  allowClear={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Dengan PIC dari pihak Bank CIMB Niaga dibantu oleh{" "}
              <AdvancedSmallInput
                stateVar={cimbPic}
                stateModifier={setCimbPic}
              />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Demikian kami sampaikan, atas bantuan dan kerjasamanya, kami
              ucapkan terimakasih. <br />
              Hormat Kami,
            </Typography>
          </Grid>
          <Grid
            container
            justify="space-between"
            className={classes.areaTandaTangan}
          >
            <Grid item>
              <img
                src={signatureManagement}
                style={{
                  width: "132px",
                  height: "55px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
              />
              <Typography style={{ textAlign: "center" }}>
                {managementName} <br />
                <b>ATM Site Management</b>
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={signatureSupport}
                style={{
                  width: "132px",
                  height: "55px",
                  marginBottom: "10px",
                  marginLeft: "40px",
                }}
              />
              <Typography style={{ textAlign: "center" }}>
                {userFullName} <br />
                <b>ATM Site Management Support</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
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
                onClick={onClose}
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
                onClick={handleGeneratePDF}
                style={{ textTransform: "capitalize" }}
              >
                Generate PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DraftPencabutanMesin;
