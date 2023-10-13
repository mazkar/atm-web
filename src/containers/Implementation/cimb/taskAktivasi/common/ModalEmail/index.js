/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
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
import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import {
  GrayMedium,
  GrayUltrasoft,
  PrimaryHard,
  White,
} from "../../../../../../assets/theme/colors";
import PropTypes from "prop-types";
import Logo from "../../../../../../assets/images/logo_cimb_niaga.png";
import PickerDate from "../../../../../../components/Picker/PickerDate";
import PickerTime from "../../../../../../components/Picker/PickerTime";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import TextBody from "./TextBody";
import { ChkyButtons } from "../../../../../../components/chky";
import PopupApprovalCancel from "../../../../../../components/PopupApprovalCancel/PopupApprovalCancel";
import SuccesSend from "./SuccesSend";
import { doSendEmailActivation } from "../../../../ApiServiceImplementation";
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../../../router";

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
    cursor: "pointer"
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

const ModalEmail = (props) => {
  const classes = useStyles();
  const { userFullName } = useContext(RootContext);
  const {open, onClose, loadingHandler, onSent,dataEmail,openingType} = props;
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openCancel, setOpenCancel] = useState(false);

   useEffect(()=>{
    console.log("datammm+",dataEmail)
  },[dataEmail])

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };

  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

  const [requestState, setRequestState] = useState({
    importance: "High",
    dateExecution:null,
    time:null,
    date:null,
    subject:null,
  });

  const handleRequest = (attribut, newVal) => {
    setRequestState((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  // STATE TABLE 1
  const [table1State, setTable1State] = useState({
    no: null,
    jam:null,
    idLama:null,
    idBaru:null,
    lokasi:null,
    alamat:null,
  });

  const onTable1Change = (attribut, newVal) => {
    setTable1State((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  // STATE TABLE 2
  const [table2State, setTable2State] = useState({
    religion: null,
    unit:null,
    sn:null,
    comms:null,
    flm:null,
  });

  const onTable2Change = (attribut, newVal) => {
    setTable2State((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  // STATE TABLE 3
  const [table3State, setTable3State] = useState({
    picComms: null,
    picSlm:null,
    picFlmCabang:null
  });

  const onTable3Change = (attribut, newVal) => {
    setTable3State((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  // email
  const maxMore = 3;
  const [chipData, setChipData] = useState([]);
  const [emailString, setEmailString] = useState("");

  const [viewMore, setViewMore] = useState(false);
  const loadCount = viewMore ? chipData.length : maxMore;
  // CC
  const [chipDataCc, setChipDataCc] = useState([]);
  const [emailStringCc, setEmailStringCc] = useState("");

  const [viewMoreCc, setViewMoreCc] = useState(false);
  const loadCountCc = viewMoreCc ? chipDataCc.length : maxMore;

  // succes
  const [succesSend, setSuccesSend] = useState(false);

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

  const onSend = () => {
    if (send) {
      const dataHit = {
        implementationId,
        subject: requestState.subject,
        important: requestState.importance,
        taskTitle: openingType,
        machineType:  dataEmail.machineType,
        // executeDate: moment(requestState.dateExecution, "DD-MM-YYYY").format("YYYY-MM-DD"),
        executeDate: requestState.dateExecution,
        hourOff: requestState.time,
        dateOff: requestState.date,
        hour: table1State.jam,
        oldAtmId: dataEmail.oldId,
        newAtmId: dataEmail.newId,
        location: dataEmail.location,
        address: dataEmail.address,
        region: dataEmail.region,
        unit: dataEmail.unit,
        snType: dataEmail.serialNumber,
        comms: dataEmail.comms,
        flm: dataEmail.flmVendor,
        picComms: dataEmail.picComm,
        picSLM: dataEmail.slmPic,
        picFLM: dataEmail.flmPic,
        userName: userFullName,
        emailLists: chipData,
        emailCCLists: chipDataCc,
      };
      // console.log("+++ dataHit", dataHit);
      if(requestState.subject){
        doSendEmailActivation(loadingHandler, dataHit)
          .then((response) => {
          // console.log("+++ response", response);
            if (response.responseCode === "00") {
              setSuccesSend(true);
              onSent();
            }
          }).catch((err) => {
            console.log('Error Send Email', err);
            alert(`Terjadi Kesalahan:${err}`);
          });
      }else{
        alert("Subject email is required!");
      }
    } else {
      alert("Email address To is required!");
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
      open={open}
      onClose={onClose}
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
                    onChange={(e)=> setEmailString(e.target.value)}
                    value={emailString}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.chip}>
              <Grid container direction="row">
                {chipData.slice(0, loadCount).map((data) => {
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
                {chipData.length>maxMore && (
                  <>
                    {viewMore? (
                      <Typography
                        className={classes.viewMore}
                        onClick={()=>setViewMore(false)}
                      >
                      View Less
                      </Typography>
                    ):(
                      <Typography
                        className={classes.viewMore}
                        onClick={()=>setViewMore(true)}
                      >
                      View More
                      </Typography>
                    )}
                  </>
                )}
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
                    onChange={(e)=>setEmailStringCc(e.target.value)}
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
                {chipDataCc.slice(0, loadCountCc).map((data) => {
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
                
                {chipDataCc.length>maxMore && (
                  <>
                    {viewMoreCc? (
                      <Typography
                        className={classes.viewMore}
                        onClick={()=>setViewMoreCc(false)}
                      >
                        View Less
                      </Typography>
                    ):(
                      <Typography
                        className={classes.viewMore}
                        onClick={()=>setViewMoreCc(true)}
                      >
                        View More
                      </Typography>
                    )}
                  </>
                )}
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
                    onChange={(e)=>handleRequest("subject", e.target.value)}
                    value={requestState.subject}
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
                    value={requestState.importance}
                    indicatorColor="primary"
                    textColor={White}
                    onChange={(e, newValue)=>handleRequest("importance", newValue)}
                  >
                    <Tab classes={tabItemStyles} value="High" label="High" />
                    <Tab classes={tabItemStyles} value="Medium" label="Medium" />
                    <Tab classes={tabItemStyles} value="Low" label="Low" />
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
                        Terlampir jadwal aktivasi <b>{openingType}</b> mesin <b>{dataEmail?.machineType}</b> pada hari
                      </Typography>
                      <PickerDate
                        onChange={(e, newVal)=>handleRequest("dateExecution", newVal)}
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
                      <PickerTime onChange={(e, newVal)=>handleRequest("time", newVal)} />
                      <Typography className={classes.txt}>
                        WIB, di hari
                      </Typography>
                      <Grid item style={{ marginTop: 5 }}>
                        <PickerDate onChange={(e, newVal)=>handleRequest("date", newVal)} holder="Date" />
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
                      ATMnya pada saat {openingType}.
                    </Typography>
                    <Table1 onChange = {onTable1Change} value={dataEmail}/>
                    <Table2 onChange = {onTable2Change} value={dataEmail}/>
                    <Table3 onChange = {onTable3Change} value={dataEmail}/>
                    <TextBody userFullName={userFullName}/>
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
              style={{textTransform: "capitalize"}}
            >
              Cancel
            </ChkyButtons>
            <ChkyButtons 
              onClick={onSend} 
              height={38}
              style={{textTransform: "capitalize"}}>
              Send
            </ChkyButtons>
          </Grid>
        </Grid>
        <Modal className={classes.popUpCancel} open={openCancel}>
          <PopupApprovalCancel
            closeCancel={handleCloseCancel}
            cancel={onClose}
          />
        </Modal>
        <Modal className={classes.popUpCancel} open={succesSend}>
          <SuccesSend closeCancel={handleCloseCancel} cancel={onClose} />
        </Modal>
      </Grid>
    </Modal>
  );
};

ModalEmail.propTypes = {
  dataEmail: PropTypes.object.isRequired,
};
ModalEmail.defaultProps = {
  dataEmail:{
    no:1,
    address:"",
    oldId:"",
    newId:"",
    location:"",
    region:"",
    unit:"",
    serialNumber:"",
    comms:"",
    picComm:"",
    slmPic:"",
    flmVendor:"",
    flmPic:""
  }
};
export default ModalEmail;
