/* Third Party Import */
import React, {useState,useEffect} from 'react';
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  Grid,
  Box,
  IconButton,
  Typography,
  OutlinedInput,
  FormControl,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";

/* Internal Import */
import LabelTextField from "../../../../components/Form/LabelTextField";
import ConfirmAndCancelButton from "../../../../components/Button/ConfirmAndCancelButton";
import Toast from "../../../../components/Toast";
import LoadingView from '../../../../components/Loading/LoadingView';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GrayMedium, GrayUltrasoft, PrimaryHard, PrimaryUltrasoft } from '../../../../assets/theme/colors';

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "500px",
    },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
  },
  label: {
    fontWeight: 600,
    fontSize: "15px",
    marginBottom: "10px"
  },
  inputText: {
    margin: 0,
    backgroundColor: "#ffffff",
    border: `1px solid ${GrayMedium}`,
    borderRadius: 8,
    fontSize: "13px",
    lineHeight: "16px",
    "&.Mui-error": {
      borderColor: PrimaryHard,
      backgroundColor: PrimaryUltrasoft,
      "& fieldset": {
        backgroundColor: PrimaryHard,
        opacity: 0.1,
      },
    },
    "& .MuiSvgIcon-root": {
      fill: PrimaryHard,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: GrayUltrasoft,
    },
    "& .MuiOutlinedInput-input": {
      padding: "16px 0 16px 12px",
      "&:-webkit-autofill": {
        borderRadius: "8px 0 0 8px",
      },
      "&::placeholder": {
        color: GrayMedium,
        fontStyle: "italic",
      },
    },
  }
});

const AddAcknowledgeRemarkOrder = ({isOpen = false, onClose, idData, onSuccess}) => {
  const classes = useStyles();
  const [remark, setRemark] = useState(0);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const history = useHistory();
  const[dataRemark, setDataRemark]=useState([]);
  const [timeDown,setTimeDown]=useState("");
  useEffect(()=>{
    if(isOpen === true){
      const requestGet = {
        id: idData,
        remarkType: "VENDOR_REMARK",
      };
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try{
        setModalLoader(true);
        axios.post(`${process.env.REACT_APP_API_INFORMATION_MONITORING}/getRemarkUptimeNote`,
          requestGet,
          headers
        ).then((res)=>{
          console.log("___res Remark",res);
          setDataRemark(res.data.dataList === null ? [] : res.data.dataList);
          setRemark(res.data.downtime);
          setModalLoader(false);
        }).catch((err)=>{
          alert(err);
          setModalLoader(false);  
        });
      }catch(err){
        alert(`Error Fetching Data ...!\n${err}`);
      }
    }
  },[idData]);
  const handleSubmit = () => {
    if (isOpen === true) {
      const request = {
        id: idData,
        remarkType: "ACKNOWLEDGE_REMARK",
        downtime: remark,
      };
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_INFORMATION_MONITORING}/submitRemarkUptime`,
            request,
            headers
          )
          .then((res) => {
            if (res.status === 200) {
              // setShowToast(true);
              onClose()
              onSuccess()
              setModalLoader(false);
            }
          })
          .catch((err) => {
            if(err.response.status === 400){
              alert("Pastikan Remark berupa angka!")
            } else {
              alert(err);
            }
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
        setModalLoader(false);
      }
    }

    /* setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 2000); */
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "26px" }}>
        <Grid container justify="flex-end">
          <IconButton small onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography className={classes.title}>Acknowledge Remark</Typography>
        {isOpenModalLoader ? (
          <LoadingView />
        ) : (
          <div>
            {dataRemark.map((item)=>{
              return (
                <div style={{ marginBottom: "20px" }}>
                  <Typography className={classes.label}>
                    Remark Vendor:
                  </Typography>
                  <Typography>{item?.remark}</Typography>
                </div>
              );
            })}
            <Typography className={classes.label}>
              Downtime after Remark:
            </Typography>
            {/* <LabelTextField
              placeholder="Masukan Waktu Downtime /Menit"
              onChange={(newVal) => setRemark(newVal.target.value)}
              value={remark}
              type="number"
              endAdornment="Menit"
              style={{ marginBottom: "20px" }}
            /> */}
            
            <FormControl fullWidth>
              <OutlinedInput 
                className={classes.inputText} 
                onChange={(newVal) => setRemark(newVal.target.value)}
                value={remark}
                type="number"
                style={{ marginBottom: 20 }}
                endAdornment={
                  <Typography>Menit</Typography>
                }
              />
            </FormControl>
          </div>
        )}

        <ConfirmAndCancelButton
          onCancel={onClose}
          textCancel="Reject"
          textConfirm="Accept"
          onConfirm={handleSubmit}
        />
      </Box>
    </Dialog>
  );
};

export default AddAcknowledgeRemarkOrder;
