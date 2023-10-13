/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Modal, Box, Grid, IconButton, Typography,Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import constants from "../../../helpers/constants";
import { Checkbox, DatePicker, TimePicker, Divider, Input } from "antd";
import { withRouter, useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import LoadingView from "../../../components/Loading/LoadingView";
import { ReactComponent as ArrowRight } from "../../../assets/icons/siab/arrow-right.svg";
import ModalLoader from "../../../components/ModalLoader";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/linear-red/calendar.svg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: "max-content",
    height: "max-content",
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
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
  paperDetail: { padding: 20 },
  rows: { border: "none" },
  cell: { borderBottom: "unset", fontSize: 12 },
  cellTotal: {
    borderBottom: "unset",
    position: "relative",
    left: -15,
    fontSize: 13,
    fontWeight: 500,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 85,
    height: 40,
    marginRight: 25,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 85,
    height: 40,
    marginLeft: 25,
    visibility: "hidden",
  },
  inputDate: {
    "& .ant-picker": {
      borderRadius: 6,
    },
  },
}));

const ModalLocationPrepare = ({
  // PROPS
  isOpen,
  onClose,
  rowToShow,
}) => {
  const {
    // CLASSES
    modal,
    paper,
    closeIcon,
    inputDate,
  } = useStyles();
const { TextArea } = Input;
const dateFormat = "DD/MM/YYYY";
const format = "DD/MM/YYYY, HH:mm";
const fullFormat = "YYYY-MM-DD HH:mm";
const [valueNote, setValueNote] = useState("");
const [checkRoom, setCheckRoom] = useState(false);
const [room, setRoom] = useState();
const [isDisabledRoom, setIsDisabledRoom] = useState(true);
const [checkElectric, setCheckElectric] = useState(false);
const [electric, setElectric] = useState();
const [isDisabledElectric, setIsDisabledElectric] = useState(true);
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();
const [onlineDate, setOnlineDate] = useState();
const [selectedArea, setSelectedArea] = useState(0);
const [areaName, setAreaName] = useState("");
const [rbbAreaId, setRbbAreaId] = useState("");

const rowId = {id:rowToShow}

useEffect(()=>{
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/vendorservices/v1/viewLocationPre`,rowId,config
    ).then((res)=>{
        console.log("DATANYA",res)
        const data = res.data;
        const viewData = {
          room: data.preparationLocation,
          electric: data.preparationElectricty,
          electricDate: data.preparationElectrictyDate,
          roomDate: data.preparationLocationDate == null ? null : moment(data.preparationLocationDate,fullFormat),
          onlineTargetDate: data.onlineTargetDate,
          startDate:
            data.startWorkPermit == null
              ? null
              : moment(data.startWorkPermit, fullFormat),
          endDate:
            data.endWorkPermit == null
              ?null
              : moment(data.endWorkPermit, fullFormat),
          startTime: data.startWorkPermit,
          endTime: data.endWorkPermit,
          valueNote: data.notePreparation,
          rbbArea: data.rbbArea ? data.rbbArea : "",
          rbbAreaId: data.rbbAreaId ? data.rbbAreaId : "",
        };
        if (viewData.room === "tidak" || viewData.room === null) {
          setCheckRoom(false);
          setIsDisabledRoom(true);
        } else {
          setCheckRoom(true);
          setIsDisabledRoom(false);
        }

        if (viewData.electric === "tidak" || viewData.room === null) {
          setCheckElectric(false);
          setIsDisabledElectric(true);
        } else {
          setCheckElectric(true);
          setIsDisabledElectric(false);
        }

        if (viewData.onlineTargetDate === null) {
          setOnlineDate(null);
        } else {
          setOnlineDate(moment(viewData.onlineTargetDate));
        }

        setRoom(viewData.roomDate);
        setElectric(
          viewData.electricDate === null
            ? null
            : moment(viewData.electricDate, fullFormat)
        );
        setStartDate(viewData.startDate);
        setEndDate(viewData.endDate);
        setValueNote(viewData.valueNote);
        setAreaName(viewData.rbbArea);
        setRbbAreaId(viewData.rbbAreaId);
       // setModalLoader(false);
    });

},[rowToShow])

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="h6">
              Kesiapan Lokasi
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container alignItems="left" direction="column" spacing={5}>
          <Grid item>
            <Grid container direction="row">
              <Grid item xs={3}>
                <Checkbox checked={checkRoom}>Persiapan Ruangan</Checkbox>
              </Grid>
              <Grid item xs={3} className={inputDate}>
                <DatePicker
                  disabled
                  format={dateFormat}
                  value={room}
                  popupStyle={{ zIndex: 1500 }}
                  suffixIcon={
                    <CalendarIcon
                      style={{
                        height: 20,
                        position: "absolute",
                        top: 0,
                        left: 95,
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Typography style={{ fontSize: 15, fontWeight: 400 }}>
                      Tanggal Online
                    </Typography>
                  </Grid>
                  <Grid item xs={3} className={inputDate} >
                    <DatePicker
                      disabled
                      format={dateFormat}
                      value={
                        onlineDate ? moment(onlineDate, dateFormat) : undefined
                      }
                      popupStyle={{ zIndex: 1500 }}
                      suffixIcon={
                        <CalendarIcon
                          style={{
                            height: 20,
                            position: "absolute",
                            top: 0,
                            left: 90,
                          }}
                        />
                      }
                      style={{ width: 130, marginLeft:40}}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                  <Checkbox checked={checkElectric}>Persiapan Listrik</Checkbox>
                </Grid>
                <Grid item xs={3} className={inputDate}>
                  <DatePicker
                    disabled
                    format={dateFormat}
                    popupStyle={{ zIndex: 1500 }}
                    value={electric}
                    suffixIcon={
                      <CalendarIcon
                        style={{
                          height: 20,
                          position: "absolute",
                          top: 0,
                          left: 95,
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography style={{ fontSize: 15, fontWeight: 400 }}>
                    RBB Area
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ marginRight: 45 }}>
                  <Link
                    href="#"
                    // onClick={handleModalRbbArea}
                    style={{ fontSize: 16 }}
                    color={constants.color.primaryHard}
                  >
                    {areaName ? areaName : "Choose"}
                    <ArrowRight style={{ paddingTop: 6, marginLeft: 5 }} />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item>
            <Grid item>
              <Typography
                variant="p"
                component="p"
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Izin Kerja
              </Typography>
            </Grid>
            <Grid container direction="row" alignContent="center">
              <Grid item xs={3}>
                <Typography variant="p" component="p" style={{ marginTop: 25 }}>
                  Tanggal Kerja
                </Typography>
              </Grid>
              <Grid item xs={3} className={inputDate}>
                <Typography variant="p" component="p">
                  Dari
                </Typography>
                <DatePicker
                  disabled
                  format={dateFormat}
                  popupStyle={{ zIndex: 1500 }}
                  showTime={{ format: "HH:mm" }}
                  value={startDate}
                  suffixIcon={
                    <CalendarIcon
                      style={{
                        height: 20,
                        position: "absolute",
                        top: 0,
                        left: 95,
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={3} className={inputDate}>
                <Typography variant="p" component="p">
                  Hingga
                </Typography>
                <DatePicker
                  disabled
                  format={dateFormat}
                  popupStyle={{ zIndex: 1500 }}
                  showTime={{ format: "HH:mm" }}
                  value={endDate}
                  suffixIcon={
                    <CalendarIcon
                      style={{
                        height: 20,
                        position: "absolute",
                        top: 0,
                        left: 95,
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography style={{ marginTop: 20 }}>Catatan :</Typography>
          </Grid>
          <Grid item>
            <TextArea style={{ borderRadius: 6 }} rows={4} value={valueNote} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalLocationPrepare.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  rowToShow: PropTypes.string.isRequired,
  idLocation: PropTypes.string.isRequired,
  handleModalRbbArea: PropTypes.func.isRequired,
  defaultArea: PropTypes.string.isRequired,
};

export default withRouter(ModalLocationPrepare);
