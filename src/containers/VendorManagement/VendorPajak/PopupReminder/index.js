/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { Select } from 'antd';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import { ReactComponent as CloseButton } from "../../../../assets/icons/siab/x-new.svg";
import constants from '../../../../helpers/constants';
import { doFetchReminderPajak } from '../../ApiServices';
import useTimestampConverter from '../../../../helpers/useTimestampConverter';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
    backgroundColor: constants.color.white,
    width: 800,
    minHeight: "550px",
    height: "570px",
    borderRadius: 10,
    padding: 30,
  },
  lable: {
    fontSize: 13,
    color: "#2B2F3C",
  },
  value: {
    fontSize: 15,
    fontWeight: 600,
    color: "#2B2F3C",
  }
});

const PopupReminder = ({ isOpen, onClose, idRow }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState({
    atmId: null,
    location: null,
    address: null,
    pajakAwal: null,
    pajakAkhir: null,
    vendorPajak: null,
    typeOrderan: null
  });
  const [history, setHistory] = useState([]);

  function loadingHandler(bool){
    setIsLoading(bool);
  }

  useEffect(() => {
    if(isOpen){
      // console.log('+++ ID', idRow);
      doFetchReminderPajak(loadingHandler, idRow)
        .then((response) => {
          // console.log("+++ response", response);
          if(response.responseCode === "200"){
            setDetail({
              atmId: response.atmId,
              location: response.lokasi,
              address: response.alamat,
              pajakAwal: response.pajakAwal? useTimestampConverter(response.pajakAwal / 1000, "DD/MM/YYYY") : "-",
              pajakAkhir: response.pajakAhir? useTimestampConverter(response.pajakAhir / 1000, "DD/MM/YYYY") : "-",
              vendorPajak: response.vendorpajak,
              typeOrderan: response.typOrder
            });
            const arrHistory = [];
            response.historyReminderPjkdoneList.map((item)=>{
              arrHistory.push({
                tanggalKirim: item.tglReminder? useTimestampConverter(item.tglReminder / 1000, "DD/MM/YYYY") : "-",
                userPengirim: item.userPengirim
              });
            });
            setHistory(arrHistory);
          }
        }).catch((err) => {
          console.log('Error Fetching: ', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  }, [isOpen]);

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>
        <Typography
          variant="h5"
          component="h5"
          align="center"
          style={{ color: "#2B2F3C", fontWeight: 600, fontSize: 36, marginBottom: 35 }}
        >
            Reminder
        </Typography>

        <Grid container>
          <Grid item xs={4} spacing={2}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>ATM ID : </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.atmId}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Lokasi : </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.location}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Alamat : </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.address}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{marginTop: 15}}>
          <Grid item xs={4} spacing={2}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Pajak Awal :</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.pajakAwal}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Pajak Akhir : </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.pajakAkhir}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Vendor Pajak : </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.vendorPajak}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{marginTop: 15}}>
          <Grid item xs={4} spacing={2}>
            <Grid container direction="column">
              <Grid item>
                <Typography className={classes.lable}>Type Orderan :</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.value}>{detail.typeOrderan}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography style={{ color: "#2B2F3C", fontWeight: 600, fontSize: 16, marginTop: 20, marginBottom: 15 }}>
            History Reminder
        </Typography>
        <div style={{border: "1px solid #E6EAF3", borderRadius: 10}}>
          <Table>
            <TableHead>
              <TableRow style={{fontSize: 13, fontWeight: 600, color: "#2B2F3C"}}>
                <TableCell align='center'>Reminder ke</TableCell>
                <TableCell align='center'>Tanggal kirim</TableCell>
                <TableCell align='center'>User Pengirim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index)=>(
                <TableRow style={{fontSize: 13, color: "#2B2F3C"}}>
                  <TableCell align='center'>{index+1}</TableCell>
                  <TableCell align='center'>{item.tanggalKirim}</TableCell>
                  <TableCell align='center'>{item.userPengirim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </Box>
    </Modal>
  );
};

PopupReminder.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idRow: PropTypes.string.isRequired,
};

export default PopupReminder;