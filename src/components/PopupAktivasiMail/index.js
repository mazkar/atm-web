import {
  Avatar,
  Button,
  Chip,
  Grid,
  makeStyles,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  GrayMedium,
  GrayUltrasoft,
  PrimaryHard,
  White,
} from "../../assets/theme/colors";
import Logo from "../../assets/images/logo_cimb_niaga.png";
import TextField from "@material-ui/core/TextField";
import PickerDate from "../Picker/PickerDate";
import PickerTime from "../Picker/PickerTime";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table1";
import TextBody from "./TextBody";
import { ChkyButtons } from "../chky";
import PopupApprovalCancel from "../PopupApprovalCancel/PopupApprovalCancel";
import SuccesSend from "./SuccesSend";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: 840,
    height: 665,
    backgroundColor: White,
    padding: 20,
    borderRadius: 10,
  },
  modal: {
    flexDirection: "column",
  },
  scroll: {
    width: 840,
    height: 539,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
  },
  label: {
    width: 89,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  txtBold: {
    fontFamily: "Barlow",
    fontSize: 15,
    fontWeight: 600,
  },
  txtField: {
    height: 20,
    width: 660,
    marginLeft: 11,
  },
  txt: {
    fontFamily: "Barlow",
    fontSize: 15,
    marginTop: 10,
  },
  chip: {
    marginLeft: 100,
    marginTop: 20,
  },
  rootTabs: {
    minHeight: 40,
    backgroundColor: GrayUltrasoft,
    borderRadius: 10,
    color: GrayMedium,
    width: "fit-content",
    position: "relative",
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 56,
    padding: "7px 10px",
  },
  selectedTabItem: {
    backgroundColor: PrimaryHard,
    color: White,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
  viewMore: {
    color: GrayMedium,
    fontSize: 13,
    fontFamily: "Barlow",
    fontWeight: 500,
    marginTop: 10,
  },
  popUpCancel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  txtAlert: {
    fontFamily: "Barlow",
    fontWeight: 500,
    color: PrimaryHard,
  },
  modalGlobal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PopupAktivasiMail = (props) => {
  const classes = useStyles();
  const [openCancel, setOpenCancel] = useState(false);

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };

  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

  const [importance, setImportance] = useState(0);
  const [dateExecution, setDateExecution] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // STATE TABLE 1
  const [no, setNo] = useState(0);
  const [jam, setJam] = useState("");
  const [idLama, setIdLama] = useState("");
  const [idBaru, setIdBaru] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [alamat, setAlamat] = useState("");

  // STATE TABLE 2
  const [religion, setReligion] = useState("");
  const [unit, setUnit] = useState("");
  const [sn, setSn] = useState("");
  const [comms, setComms] = useState("");
  const [flm, setFlm] = useState("");

  //STATE TABLE 3
  const [picComms, setPicComms] = useState("");
  const [picSlm, setPicSlm] = useState("");
  const [picFlmCabang, setPicFlmCabang] = useState("");

  //email
  const [chipData, setChipData] = useState([]);
  const [emailString, setEmailString] = useState("");

  const [viewMore, setViewMore] = useState(false);
  const loadCount = viewMore ? chipData.length : 7;

  //CC
  const [chipDataCc, setChipDataCc] = useState([]);
  const [emailStringCc, setEmailStringCc] = useState("");

  const [viewMoreCc, setViewMoreCc] = useState(false);
  const loadCountCc = viewMoreCc ? chipDataCc.length : 7;

  //succes
  const [succesSend, setSuccesSend] = useState(false);

  //email
  const onBenificiary = (event) => {
    setEmailString(event.target.value);
  };

  //cc
  const onCc = (event) => {
    setEmailStringCc(event.target.value);
  };

  const handleOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  const [txtAlert, setTxtAlert] = useState(" ");
  const [txtAlertCc, setTxtAlertCc] = useState("");
  const [send, setSend] = useState(false);
  let Alert;
  let AlertCc;

  const onCek = () => {
    chipData.map((chip) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(chip)) {
        Alert = "";
        setSend(true);
        setTxtAlert(Alert);
      } else {
        Alert = (
          <Typography className={classes.txtAlert}>
            Email belum terisi atau email ini {chip} belum valid!
          </Typography>
        );
        setSend(false);
        setTxtAlert(Alert);
      }
    });
  };

  const onCekCc = () => {
    chipDataCc.map((chipCc) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(chipCc)) {
        AlertCc = "";
        setTxtAlertCc(AlertCc);
      } else {
        AlertCc = (
          <Typography className={classes.txtAlert}>
            Email belum terisi atau email ini {chipCc} belum valid!
          </Typography>
        );
        setTxtAlertCc(AlertCc);
      }
    });
  };

  const handleDeleteChip = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleDeleteChipCc = (chipToDelete) => () => {
    setChipDataCc((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleDateExecution = (event, newValue) => {
    setDateExecution(newValue);
  };

  const handleDate = (event, newValue) => {
    setDate(newValue);
  };

  const handleTime = (event, newValue) => {
    setTime(newValue);
  };

  const handleImportance = (event, newValue) => {
    setImportance(newValue);
  };

  const handleViewMore = () => {
    setViewMore(true);
  };

  const handleViewMoreCc = () => {
    setViewMoreCc(true);
  };

  //OnChange TABLE 1
  const onNo = (event) => {
    setNo(event.target.value);
  };
  const onJam = (event) => {
    setJam(event.target.value);
  };
  const onIdLama = (event) => {
    setIdLama(event.target.value);
  };
  const onIdBaru = (event) => {
    setIdBaru(event.target.value);
  };
  const onLokasi = (event) => {
    setLokasi(event.target.value);
  };
  const onAlamat = (event) => {
    setAlamat(event.target.value);
  };

  //Onchange TABLE 2
  const onReligion = (event) => {
    setReligion(event.target.value);
  };
  const onUnit = (event) => {
    setUnit(event.target.value);
  };
  const onSn = (event) => {
    setSn(event.target.value);
  };
  const onComms = (event) => {
    setComms(event.target.value);
  };
  const onFlm = (event) => {
    setFlm(event.target.value);
  };

  //onChange TABLE 3
  const onPicComms = (event) => {
    setPicComms(event.target.value);
  };
  const onPicSlm = (event) => {
    setPicSlm(event.target.value);
  };
  const onPicFlmCabang = (event) => {
    setPicFlmCabang(event.target.value);
  };

  const onSend = () => {
    if (send) {
      setSuccesSend(true);
    } else {
      alert("data email kosong");
    }
  };

  useEffect(() => {
    const emailArr = emailString.split(";");
    const arrToChip = [];
    emailArr.map((item) => {
      arrToChip.push(item);
    });
    setChipData(arrToChip);
  }, [emailString]);

  useEffect(() => {
    const joinNewArrChanged = chipData.join(";");
    setEmailString(joinNewArrChanged);
  }, [chipData]);

  useEffect(() => {
    const emailArrCc = emailStringCc.split(";");
    const arrToChipCc = [];
    emailArrCc.map((item) => {
      arrToChipCc.push(item);
    });
    setChipDataCc(arrToChipCc);
  }, [emailStringCc]);

  useEffect(() => {
    const joinNewArrChangedCc = chipDataCc.join(";");
    setEmailStringCc(joinNewArrChangedCc);
  }, [chipDataCc]);

  return (
    <Modal
      className={classes.modalGlobal}
      open={props.open}
      onClose={props.onClose}
    >
      <Grid container className={classes.container}>
        <Grid container className={classes.modal}>
          <Grid item>
            <img src={Logo} style={{ height: 46, width: 146 }} />
          </Grid>
          <Grid item className={classes.scroll}>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Grid container className={classes.label}>
                    <Typography className={classes.txtBold}>To</Typography>
                    <Typography className={classes.txtBold}>:</Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    className={classes.txtField}
                    id="outlined-basic"
                    label="Benificiary"
                    variant="outlined"
                    margin="dense"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onCek();
                      }
                    }}
                    onMouseLeave={onCek}
                    onChange={onBenificiary}
                    value={emailString}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.chip}>
              <Grid container direction="row">
                {chipData.slice(0, loadCount).filter(val=>val.length>0).map((data) => {
                  return (
                    <Chip
                      style={{ marginRight: 10, marginBottom: 10 }}
                      key={data.key}
                      avatar={<Avatar>{data.charAt(0)}</Avatar>}
                      onDelete={handleDeleteChip(data)}
                      variant="outlined"
                      label={data}
                    />
                  );
                })}
                <Typography
                  className={classes.viewMore}
                  onClick={handleViewMore}
                >
                  View More
                </Typography>
              </Grid>
              {txtAlert}
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Grid container className={classes.label}>
                    <Typography className={classes.txtBold}>CC</Typography>
                    <Typography className={classes.txtBold}>:</Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    className={classes.txtField}
                    id="outlined-basic"
                    label="CC"
                    variant="outlined"
                    margin="dense"
                    onChange={onCc}
                    value={emailStringCc}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        onCekCc();
                      }
                    }}
                    onMouseLeave={onCekCc}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.chip}>
              <Grid container direction="row">
                {chipDataCc.slice(0, loadCountCc).filter(val=>val.length>0).map((data) => {
                  return (
                    <Chip
                      style={{ marginRight: 10, marginBottom: 10 }}
                      key={data.key}
                      avatar={<Avatar>{data.charAt(0)}</Avatar>}
                      onDelete={handleDeleteChipCc(data)}
                      variant="outlined"
                      label={data}
                    />
                  );
                })}
                <Typography
                  className={classes.viewMore}
                  onClick={handleViewMoreCc}
                >
                  View More
                </Typography>
              </Grid>
              {txtAlertCc}
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Grid container className={classes.label}>
                    <Typography className={classes.txtBold}>Subject</Typography>
                    <Typography className={classes.txtBold}>:</Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    className={classes.txtField}
                    id="outlined-basic"
                    label="Subject"
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Grid container>
                <Grid item>
                  <Grid container className={classes.label}>
                    <Typography className={classes.txtBold}>
                      Importance
                    </Typography>
                    <Typography className={classes.txtBold}>:</Typography>
                  </Grid>
                </Grid>

                <Grid item style={{ marginLeft: 11, marginTop: 6 }}>
                  <Tabs
                    classes={tabsStyles}
                    value={importance}
                    indicatorColor="primary"
                    textColor={White}
                    onChange={handleImportance}
                  >
                    <Tab classes={tabItemStyles} label="High" />
                    <Tab classes={tabItemStyles} label="Medium" />
                    <Tab classes={tabItemStyles} label="Low" />
                  </Tabs>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Grid container className={classes.label}>
                    <Typography className={classes.txtBold}>Message</Typography>
                    <Typography className={classes.txtBold}>:</Typography>
                  </Grid>
                </Grid>

                <Grid item style={{ marginLeft: 11, marginTop: 14 }}>
                  <Grid container direction="column">
                    <Typography className={classes.txtBold}>
                      Dear All,
                    </Typography>
                    <Grid container direction="row">
                      <Typography className={classes.txt}>
                        Terlampir jadwal aktivasi replace mesin CRM pada hari
                      </Typography>
                      <PickerDate
                        onChange={handleDateExecution}
                        holder="Date Execution"
                      />
                      <Typography className={classes.txt}>
                        , mohon bantuan dan
                      </Typography>
                    </Grid>
                    <Typography className={classes.txt}>
                      koordinasi masing masing team:
                    </Typography>
                    <Typography
                      className={classes.txtBold}
                      style={{ marginTop: 10 }}
                    >
                      Dear Team SSI
                    </Typography>
                    <Typography className={classes.txt}>
                      Mohon bantuanya untuk dapat mengkosongkan dan mematikan
                      mesin ATM terkait sebelum jam
                    </Typography>
                    <Grid container direction="row">
                      <PickerTime onChange={handleTime} />
                      <Typography className={classes.txt}>
                        WIB, di hari
                      </Typography>
                      <Grid item style={{ marginTop: 5 }}>
                        <PickerDate onChange={handleDate} holder="Date" />
                      </Grid>
                      <Typography className={classes.txt}>
                        karena ada perubahan dan
                      </Typography>
                    </Grid>
                    <Typography className={classes.txt}>
                      pendaftaran mesin CRMnya.
                    </Typography>
                    <Typography className={classes.txtBold}>
                      Dan tolong dipersiapkan kunci, kaset dll untuk mesin
                      ATMnya pada saat replace.
                    </Typography>
                    <Table1
                      onNo={onNo}
                      onJam={onJam}
                      onIdLama={onIdLama}
                      onIdBaru={onIdBaru}
                      onLokasi={onLokasi}
                      onAlamat={onAlamat}
                    />
                    <Table2
                      onReligion={onReligion}
                      onUnit={onUnit}
                      onSn={onSn}
                      onComms={onComms}
                      onFlm={onFlm}
                    />
                    <Table3
                      onPicComms={onPicComms}
                      onPicSlm={onPicSlm}
                      onPicFlmCabang={onPicFlmCabang}
                    />
                    <TextBody />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            direction="row"
            style={{ marginTop: -13 }}
          >
            <ChkyButtons
              height={38}
              btnType="redOutlined"
              buttonType="redOutlined"
              onClick={() => {
                handleOpenCancel();
              }}
            >
              Cancel
            </ChkyButtons>
            <ChkyButtons onClick={onSend} height={38}>
              Send
            </ChkyButtons>
          </Grid>
        </Grid>
        <Modal className={classes.popUpCancel} open={openCancel}>
          <PopupApprovalCancel
            closeCancel={handleCloseCancel}
            cancel={props.onClose}
          />
        </Modal>
        <Modal className={classes.popUpCancel} open={succesSend}>
          <SuccesSend closeCancel={handleCloseCancel} cancel={props.onClose} />
        </Modal>
      </Grid>
    </Modal>
  );
};

export default PopupAktivasiMail;
