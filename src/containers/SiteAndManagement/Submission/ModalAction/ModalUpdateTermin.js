/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { DatePicker, TimePicker, Divider, Input, Select } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import { withRouter } from "react-router-dom";
import axios from "axios";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";
import { ReactComponent as PaperClip } from "../../../../assets/icons/siab/paperclip.svg";
import { ReactComponent as FileText } from "../../../../assets/icons/siab/file-text.svg";

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
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 25,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 85,
    height: 40,
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
  },
  inputDate: {
    "& .ant-picker": {
      borderRadius: 6,
    },
  },
  details: {
    margin: "20px 0px",
    padding: 10,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
  },
  uploadFile: {
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyItems: "space-between",
    height: 3,
  },
}));

const ModalUpdate = ({
  isOpen,
  onClose,
  onLeave,
  rowToShow,
  idLocation,
  handleModalRbbArea,
  rbbAreaId,
  rbbArea,
  defaultArea,
  successUpdate,
}) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
    secondaryButton,
    inputDate,
    details,
    uploadFile,
  } = useStyles();
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";

  const roleName = window.sessionStorage.getItem("roleName");
  
  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileNamePath, setFileNamePath] = useState("");
  const [fileFile, setFileFile] = useState(null);

  function handleChangeDay(value) {
    setDay(value);
  }
  const handleSelectDate = (date, dateString) => {
    setStartDate(moment(date));
  };
  const handleTimeStart = (time, timeString) => {
    setStartTime(moment(time).format(timeFormat));
  };
  const handleTimeEnd = (time, timeString) => {
    setEndTime(moment(time).format(timeFormat));
  };
  function limitString(string, count) {
    const result =
      string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  function fileSizeValidate(fdata, maxSize) {
    const fsize = fdata.size / 1024;
    if (fsize > maxSize) {
      // alert(`Maximum file size is 1 MB. Try Again With Another File!`);
      setFileFile(null);
      return false;
    }
    return true;
  }
  const handleChange = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0].name);
    setFileFile(event.target.files[0]);
  };

  const rowID = rowToShow;
  const idUpdate = { id: rowID };

  useEffect(() => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    if (isOpen == true) {
      setModalLoader(true);
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/viewSubmissionTermin`,
            idUpdate,
            config
          )
          .then((res) => {
            const newData = res.data;
            const dataTermin = {
              revocationDay: newData.revocationDay
                ? newData.revocationDay
                : "Senin",
              revocationDate: newData.revocationDate
                ? moment(newData.revocationDate)
                : new Date(),
              startRevocationTime: newData.startRevocationTime
                ? newData.startRevocationTime
                : "00:00",
              endRevocationTime: newData.endRevocationTime
                ? newData.endRevocationTime
                : "00:00",
              fileTerminPath: newData.fileTerminPath
                ? newData.fileTerminPath.slice(
                    newData.fileTerminPath.lastIndexOf("/") + 1
                  )
                : "",
            };

            setDay(dataTermin.revocationDay);
            setStartTime(dataTermin.startRevocationTime);
            setEndTime(dataTermin.endRevocationTime);
            setStartDate(dataTermin.revocationDate);
            setFileName(dataTermin.fileTerminPath);
            setFileNamePath(newData.fileTerminPath);
            setModalLoader(false);
          });
      } catch (err) {
        alert(err);
      }
    } else {
      console.log("Modal doesn't click");
    }
  }, [isOpen]);

  const doUpload = async (file) => {
    setModalLoader(true);
    try {
      setModalLoader(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/uploadOfferingFiles`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(result);
      setModalLoader(false);
      return result;
    } catch (err) {
      setModalLoader(false);
      alert(`Upload file failed, Please Try Again! \n${err}`);
    }
  };
  
  const matchRoleName = (value) => {
    if (value) {
      const result = value.toLowerCase().match(/planning/g) || [];
      if (result.length) {
        return result[0];
      } 
      return value;
    }
  };

  const handleSubmit = () => {
    setModalLoader(true);

    if (fileFile !== null) {
      if (fileSizeValidate(fileFile, 1024) === false) {
        setModalLoader(false);
        alert("Maximum file size is 1 MB. Try Again with Another File!");
      } else {
        doUpload(fileFile).then((response) => {
          if (response.data.responseCode === "00") {
            try {
              const dataSubmit = {
                id: idUpdate.id,
                revocationDay: moment(startDate).format("dddd"),
                revocationDate: moment(startDate).format("YYYY-MM-DD"),
                startRevocationTime: startTime,
                endRevocationTime: endTime,
                fileTerminPath: response.data.path,
                submit: false,
                approval: matchRoleName(roleName) === "planning" ? true : false,
              };

              const config = {
                headers: { "Content-Type": "application/json" },
              };

              axios
                .post(
                  `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionTermin`,
                  dataSubmit,
                  config
                )
                .then((resultSubmit) => {
                  console.log("resultSubmit", resultSubmit);
                  setModalLoader(false);
                  alert(`Success Send Data!`);
                  // window.location.assign("/submission-tracking");
                  successUpdate();
                });
            } catch (err) {
              setModalLoader(false);
              alert(`Failed Submit Data to Landlord!`);
              console.log(err);
            }
          }
        });
      }
    } else {
      try {
        const dataSubmit = {
          id: idUpdate.id,
          revocationDay: moment(startDate).format("dddd"),
          revocationDate: moment(startDate).format("YYYY-MM-DD"),
          startRevocationTime: startTime,
          endRevocationTime: endTime,
          fileTerminPath: fileNamePath,
          submit: false,
          approval: matchRoleName(roleName) === "planning" ? true : false,
        };

        const config = {
          headers: { "Content-Type": "application/json" },
        };

        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionTermin`,
            dataSubmit,
            config
          )
          .then((resultSubmit) => {
            setModalLoader(false);
            alert(`Success Send Data!`);
            // window.location.assign("/submission-tracking");
            successUpdate();
          });
      } catch (err) {
        setModalLoader(false);
        alert(`Failed Submit Data to Landlord!`);
      }
    }
  };

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>
        <div>
          {isOpenModalLoader ? (
            <LoadingView maxheight="100%" />
          ) : (
            <div>
              <div>
                <Typography variant="h6" component="h6">
                  Update Detail Penarikan
                </Typography>
              </div>

              <div className={details}>
                <Typography
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    marginBottom: 25,
                  }}
                >
                  Konfirmasi dari Landlord
                </Typography>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={4} className={inputDate}>
                    <Typography>Tanggal :</Typography>
                    <DatePicker
                      format={dateFormat}
                      value={moment(startDate, dateFormat)}
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleSelectDate}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item xs={4} className={inputDate}>
                    <Typography>Waktu :</Typography>
                    <TimePicker
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleTimeStart}
                      format={timeFormat}
                      value={moment(startTime, timeFormat)}
                      allowClear={false}
                    />
                  </Grid>
                  <Grid item xs={4} className={inputDate}>
                    <Typography>Hingga :</Typography>
                    <TimePicker
                      popupStyle={{ zIndex: 1500 }}
                      onChange={handleTimeEnd}
                      format={timeFormat}
                      value={moment(endTime, timeFormat)}
                      allowClear={false}
                    />
                  </Grid>
                </Grid>
              </div>

              <Grid
                container
                justify="space-between"
                className={buttonContainer}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={secondaryButton}
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
                    className={primaryButton}
                    onClick={handleSubmit}
                    style={{ textTransform: "capitalize" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

ModalUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  rowToShow: PropTypes.string.isRequired,
  idLocation: PropTypes.string.isRequired,
  handleModalRbbArea: PropTypes.func.isRequired,
  defaultArea: PropTypes.string.isRequired,
};

export default withRouter(ModalUpdate);
