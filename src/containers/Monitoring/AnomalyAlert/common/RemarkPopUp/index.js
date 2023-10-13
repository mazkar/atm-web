/* Third Party Import */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Dialog, Box, Grid, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import moment from "moment";
/* Internal Import */
import LabelTextField from "../../../../../components/Form/LabelTextField";
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";
import Toast from "../../../../../components/Toast";
import { RootContext } from "../../../../../router";
import axios from "axios";
import LoadingView from "../../../../../components/Loading/LoadingView";

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
});

const RemarkPopUp = ({ isOpen = false, onClose, idData }) => {
  const classes = useStyles();
  const { userId, userRoleName } = useContext(RootContext);
  const [remark, setRemark] = useState("");
  const [isShowToast, setShowToast] = useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataRemark, setDataRemark] = useState([]);

  // useEffect(()=>{
  //   if(isOpen === true){
  //     const requestGet = {
  //       id: idData,
  //       remarkType: "VENDOR_REMARK",
  //     };
  //     const headers = {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       "Access-Control-Allow-Origin": "*",
  //     };
  //     try{
  //       setModalLoader(true);
  //       axios.post(`${process.env.REACT_APP_API_INFORMATION_MONITORING}/getRemarkUptimeNote`,
  //         requestGet,
  //         headers
  //       ).then((res)=>{
  //         console.log("___res Remark",res);
  //         const dataPre = res.data.dataList;
  //         setDataRemark(dataPre)
  //         setModalLoader(false);
  //       }).catch((err)=>{
  //         alert(err);
  //         setModalLoader(false);
  //       });
  //     }catch(err){
  //       alert(`Error Fetching Data ...!\n${err}`);
  //     }
  //   }
  // },[idData]);

  useEffect(() => {
    console.log(idData);
  }, [idData]);

  const handleSubmit = () => {
    if (isOpen === true) {
      const request = {
        id: idData,
        remark: remark,
      };
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_INFORMATION_MONITORING}/remarkAnomalyAlert`,
            request,
            headers
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setShowToast(true);
              setModalLoader(false);
            }
          })
          .catch((err) => {
            alert(err);
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
        <Typography className={classes.title}>Remark</Typography>
        {isOpenModalLoader ? (
          <LoadingView />
        ) : (
          dataRemark &&
          dataRemark.map((item, i) => {
            return (
              <div>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                >
                  <Grid item>
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      Remark {i + 1}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#BCC8E7",
                      }}
                    >
                      {moment(item.date).format("DD/MM/YY | HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="column" justify="flex-start">
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.remark}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        color: "#DC241F",
                      }}
                    >
                      {item.username}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            );
          })
        )}
        <LabelTextField
          label="Remark Vendor: "
          placeholder="Masukkan Remark"
          onChange={(newVal) => setRemark(newVal.target.value)}
          value={remark}
          multiline
          rows={4}
          style={{ marginBottom: "20px" }}
        />
        {isShowToast && (
          <Toast
            title="Success"
            subtitle="Add Remark Success"
            type="success"
            onClose={() => {
              setShowToast(false);
              window.location.reload();
            }}
          />
        )}
        <ConfirmAndCancelButton
          onCancel={onClose}
          onConfirm={handleSubmit}
          textCancel="Cancel"
          textConfirm="Submit"
        />
      </Box>
    </Dialog>
  );
};

export default RemarkPopUp;
