/* Third Party Import */
import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  Grid,
  Box,
  Table,
  TableRow,
  TableCell,
  Typography,
  Chip,
  Avatar,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";
import isEmail from 'validator/es/lib/isEmail';

/* Internal Import */
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";
import {ReactComponent as LogoCIMB} from "../../../../../assets/images/logo-cimb-niaga.svg";
import LabelTextField from '../../../../../components/Form/LabelTextField';
import { GrayUltrasoft, PrimaryHard } from '../../../../../assets/theme/colors';
import ServiceIntermittenAlert from '../../service';

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "720px",
      borderRadius: "10px"
    },
  },
  rootText: {
    fontSize: "13px",
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
    fontWeight: 600
  },
  txtField: {
    height: 20,
    width: 660,
    marginLeft: 11,
  },
});

const AddEmailPopup = ({isOpen=false, onClose}) => {
  const { hitDraftEmailIntermitten, sendEmailIntermitten } = ServiceIntermittenAlert()
  const classes = useStyles();
  const [inputEmail, setInputEmail] = useState("");
  const [chips, setChips] = useState([]);
  const [txtAlert, setTxtAlert] = useState("")
  const [txtEmail, setTxtEmail] = useState({})
  const [validation, setValidation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [problemList, setProblemList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  // copas from implementation start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const maxMore = 3;
  const [chipData, setChipData] = useState([]);
  const [emailString, setEmailString] = useState("");

  const [viewMore, setViewMore] = useState(false);
  const loadCount = viewMore ? chipData.length : maxMore;
  const [send, setSend] = useState(false)
  let Alert;
  
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

  const handleDeleteChip = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  // copas from implementation end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const convertToProblemList = (problems) => {
    const arrProblems = [];
    Object.keys(problems).map((problem, index) => {
      const obj = {};
      obj.key = Object.keys(problems)[index];
      obj.title = Object.keys(problems)[index];
      obj.value = Object.values(problems)[index];
      arrProblems.push(obj);
    });
    return arrProblems;
  }

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const monthsOnRome = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]

  const thisMonth = monthsOnRome[new Date().getMonth()]

  const thisYear = new Date().getFullYear()

  useEffect(() => {
    hitDraftEmailIntermitten("ZZ53").then((res) => {
      if(res.status === 200) {
        setProblemList(convertToProblemList(res.data.problems))
        setTxtEmail({
          vendorName: res.data.vendorName,
          vendorAddress: res.data.vendorAddress,
          vendorEmail: res.data.vendorEmail,
          vendorTelephone: res.data.vendorTelephone,
          atmLocation: res.data.atmLocation,
          strProblem: res.data.strProblem,
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  /* Methods */
  const validatorEmail = () => {
    if(isEmail(inputEmail)){
      setValidation("");
      return true;
    }
    const warningText = "Format email tidak benar";
    setValidation(warningText);
  };
  const handleAddChip = (event) => {
    if(event.key === "Enter" && validatorEmail()){
      const tempArray = [...chips];
      tempArray.push(inputEmail);
      setChips(tempArray);
      setInputEmail("");
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

//   {
//     "atmId": "ZZCC",
//     "recepient": ["email@gmail.com"],
//     "ccSender": ["email@outlook.com"],
//     "subject": "Intermitten Problem",
//     "vendorName": "PT SLAMET ABADI NAN JAYA",
//     "vendorAddress": "Jalan Raya Seturan KM 82, Jakarta",
//     "vendorEmail": "info@slametabadi.com",
//     "vendorTelephone": "0210889993",
//     "atmLocation": "Jl. Raya Kotabumi Blok.B10 No.39-40",
//     "strProblem": "<tr><td><b>NoDepositandWithdrawalGreaterThen6HRs</b></td><td> <b>:</b> </td><td><b>1 Kejadian
// </b></td></tr><tr><td><b>TYPE 2 CURRENCY CASSETTE LOW</b></td><td> <b>:</b> </td><td><b>1 Kejadian
// </b></td></tr><tr><td><b>CASH HANDLER WARNING</b></td><td> <b>:</b> </td><td><b>1 Kejadian
// </b></td></tr><tr><td><b>TYPE 1 CURRENCY CASSETTE LOW</b></td><td> <b>:</b> </td><td><b>1 Kejadian </b></td></tr>"
// }

  const sendEmail = async () => {
    const dataHit = {
      atmId: "ZZ53",
      recepient: chipData,
      ccSender: [""],
      subject: "Intermitten Problem",
      vendorName: txtEmail.vendorName,
      vendorAddress: txtEmail.vendorAddress,
      vendorEmail: txtEmail.vendorEmail,
      vendorTelephone: txtEmail.vendorTelephone,
      atmLocation: txtEmail.atmLocation,
      strProblem: txtEmail.strProblem,
    }

    setIsDisabled(true)

    await sendEmailIntermitten(dataHit).then((res) => {
      console.log(res) 
      onClose()
    }).catch((err) => {
      console.log(err)
      onClose()
    })

    setIsDisabled(false)
  }

  /* Functional Component */
  const BodyEmail = () => {
    return (
      <div style={{margin: "30px 0px"}}>
        <Grid container alignItems="center" justifyContent="space-between" style={{marginBottom: "15px"}}>
          <Typography className={classes.rootText}>
            No. <b>SRT/ATM-BG/{thisMonth}/{thisYear}</b>
          </Typography>
          <Typography className={classes.rootText}>
            Tangerang, {new Date().getDate()} {months[new Date().getMonth()]} {thisYear}
          </Typography>
        </Grid>
        <Grid container style={{marginBottom: "40px"}}>
          <Grid item xs={5}>
            <Typography className={classes.rootText}>
              <b>
                Kepada Yth: <br />
                Perwakilan {txtEmail?.vendorName}  <br />
                {txtEmail?.vendorAddress} <br />
                Telp : {txtEmail?.vendorTelephone}
              </b>
            </Typography>
          </Grid>
        </Grid>
        <Typography className={classes.rootText} style={{marginBottom: "16px"}}>
          Perihal: <b>Intermitten Problem</b>
        </Typography>
        <Typography className={classes.rootText} style={{marginBottom: "16px"}}>
          Dengan ini kami dari pihak <b>PT Bank CIMB Niaga, Tbk.</b> menyampaikan
          bahwa terdapat problem yang berulang dan berlokasi di <b>{txtEmail?.atmLocation}</b>,
          Dengan rincian sebagai berikut :
        </Typography>
        <Grid container style={{marginBottom: "16px"}}>
          <Grid item xs={8}>
            <Table size="small">
              {
                problemList
                  .map(data => (
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        {data.title}
                      </TableCell>
                      <TableCell className={classes.tableCell}>: {data.value}</TableCell>
                    </TableRow>
                  ))
              }
            </Table>
          </Grid>
        </Grid>
        <Typography className={classes.rootText} style={{marginBottom: "70px"}}>
          Atas perhatian dan kerjasama yang sudah terjalin baik selama ini,
          antara PT. Bank CIMB Niaga Tbk. dengan <b>{txtEmail.vendorName}</b> , kami ucapkan terima kasih.
        </Typography>
        <Typography className={classes.rootText}>
          Hormat Kami, <br />
          <b>
            PT Bank CIMB Niaga, Tbk.
          </b>
        </Typography>
      </div>
    );
  };
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" className={classes.modal}>
      <Box style={{ padding: "50px" }}>
        <LogoCIMB width="150px" />
        <Grid container alignItems="start">
          <Grid item xs={1}>
            <Typography className={classes.rootText}>
            To:
            </Typography>
          </Grid>
          <Grid item xs={11}>
            {/* <LabelTextField
              placeholder="Email Address"
              onChange={(newVal) => setInputEmail(newVal.target.value)}
              value={inputEmail}
              height="40px"
              onKeyPress={handleAddChip}
            /> */}
            <LabelTextField
              placeholder="Email Address"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onCek();
                }
              }}
              onMouseLeave={onCek}
              onChange={(e)=> setEmailString(e.target.value)}
              value={emailString}
            />
            <Grid container style={{marginTop: "5px"}}>
              {
                chipData.map((item, index) => (
                  <Chip
                    label={item}
                    avatar={<Avatar>{item.charAt(0)}</Avatar>}
                    onDelete={handleDeleteChip(item)}
                    deleteIcon={<CloseIcon width={6} height={6} />}
                    style={{ background: GrayUltrasoft, color: '#2B2F3C', margin: "3px", fontWeight: 500 }}
                  />
                ))
              }
            </Grid>
            {
              txtAlert && <Typography style={{color: PrimaryHard, fontWeight: 500, fontSize: "10px"}}>{txtAlert}</Typography>
            }
          </Grid>
        </Grid>
        <BodyEmail />
        <ConfirmAndCancelButton
          onCancel={onClose}
          onConfirm={sendEmail}
          textCancel="Cancel"
          textConfirm="Send"
          disabled={isDisabled}
        />
      </Box>
    </Dialog>
  );
};

AddEmailPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddEmailPopup;
