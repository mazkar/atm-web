/* eslint-disable react/jsx-no-bind */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { Row, Col, Input, DatePicker, Select } from "antd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import moment from "moment";

import InputBase from "@material-ui/core/InputBase";
// import { Upload, message, Button } from 'antd';
import PropTypes from "prop-types";

import axios from "axios";

import { useHistory } from "react-router-dom";
import constants from "../../../../../helpers/constants";
import ModalLoader from "../../../../../components/ModalLoader";
import PopupSucces from "../../../../../components/PopupSucces";
import ModalUploadSuccess from "../../../../Modeling/ModelingModel/ModalUploadSuccess";
import ModalUploadError from "../../../../Modeling/ModelingModel/ModalUploadError";
import secureStorage from "../../../../../helpers/secureStorage";
import ModalAddSuccess from "./ModalAddSuccess";
import ModalAddError from "./ModalAddError";

const accessToken = secureStorage.getItem("access_token");

const ddlStatus = [
  {
    id: 1,
    status: "To Do",
  },
  {
    id: 3,
    status: "Doing",
  },
  {
    id: 2,
    status: "Done",
  },
];

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    // height: 423,
    borderRadius: 10,
    padding: 30,
    paddingLeft: 70,
    paddingBottom: 50,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonUpload: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: "8px",
    height: 44,
    width: "95px",
    marginTop: "-71px",
    marginLeft: "575px",
    zIndex: 3,
    textTransform: "capitalize",
  },
  buttonCancel: {
    // margin: "45px",
    backgroundColor: constants.color.primaryHard,
    color: "white",
    textTransform: "capitalize",
    "& .MuiButton-root": {
      width: "100px",
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 10,
    padding: "0px 40px 0px 40px",
  },
  textField: {
    "& .MuiInputBase-root": {
      width: 670,
      border: "1px solid",
      borderColor: "#BCC8E7",
      borderRadius: "6px",
    },
    "& .MuiInputBase-input": {
      // right: '-20px',
    },
    "& .MuiOutlinedInput-input": {
      "&: hover": {
        background: "#F4F7FB",
      },
    },
    "& .MuiButton-root": {
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  inputExcel: {
    // display: 'none',
    position: "relative",
    marginBottom: 15,
    // marginLeft: -150,
  },
  uploadFile: {
    cursor: "pointer",
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    display: "flex",
    justifyItems: "space-between",
    height: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  text1: {
    lineHeight: 2,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  labelInput: {
    fontWeight: 400,
    fontSize: 15,
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 250,
    height: 25,
    borderRadius: 10,
    position: "relative",
    border: "0px solid #BCC8E7",
    // backgroundColor: '#F4F7FB',
    fontSize: 13,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Barlow", "NunitoRegular"].join(","),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: "-20px",
      outline: "none",
    },
  },
}))(InputBase);

const ModalAddTimeline = ({ isOpen, onClose, onSuccesUpload, refresh }) => {
  const {
    root,
    modal,
    paper,
    closeIcon,
    buttonUpload,
    buttonCancel,
    textField,
    inputExcel,
    uploadFile,
    buttonContainer,
    primaryButton,
    secondaryButton,
  } = useStyles();
  const classes = useStyles();

  // const today = new Date();
  // const year = today.getFullYear();

  const inputFileRef = React.useRef(null);
  const history = useHistory();
  const [fileFile, setFileName] = useState(null);
  // const [uploadDate, setUploadDate] = useState(today);
  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] =
    React.useState(false);
  const [isUploading, setIsUploading] = useState(false);
  function loaderHandler(bool) {
    setIsUploading(bool);
  }
  const [isSuccess, setIsSuccess] = useState(false);
  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [messageUpload, setMessageUpload] = React.useState("");
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);
  const handleCloseModalUploadSuccess = () => {
    setOpenModalUploadSuccess(false);
    window.location.reload();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0]);
  };

  const onSuccessClose = () => {
    setIsSuccess(false);
    history.go(0);
  };

  // data for body

  const [noId, setNoId] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [startDatee, setStartDate] = useState("");
  const [statuss, setStatuss] = useState("");
  const [judul, setJudul] = useState("");
  const [pic, setPic] = useState("");
  const [endDatee, setEndDate] = useState("");

  const handleChangeNoID = (e) => {
    setNoId(e);
  };
  const handleChangeKet = (e) => {
    setKeterangan(e);
  };
  const handleChangeStartDate = (e) => {
    setStartDate(e);
  };
  const handleChangeStatus = (e) => {
    setStatuss(e);
  };
  const handleChangeJudul = (e) => {
    setJudul(e);
  };
  const handleChangePic = (e) => {
    setPic(e);
  };
  const handleChangeEndDate = (e) => {
    setEndDate(e);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current < moment().add(-1, "d");
  }

  const body = {
    projectId: parseInt(noId),
    projectTitle: judul,
    projectDesc: Keterangan,
    projectPic: parseInt(pic),
    startDate: moment(startDatee).format("YYYY-MM-DD"),
    endDate: moment(endDatee).format("YYYY-MM-DD"),
    status: statuss.toString(),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalLoader(true);

    console.log(body, "body");

    axios({
      method: "post",
      url: `${constants.PROJECT_MANAGEMENT_SERVICE}/addTimeLine`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setOpenModalUploadSuccess(true);
          setOpenModalUploadError(false);
          setModalLoader(false);
          // window.location.reload();
        } else {
          setOpenModalUploadError(true);
          setOpenModalUploadSuccess(false);
          setMessageUpload(res.data.message);
          setModalLoader(false);
        }
        console.log(res);

        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload("Please check your connection and try again");
        setModalLoader(false);
      });
  };

  const [ddlPic, setDdlPic] = useState([]);

  async function getDdlPic() {
    // console.log('~ dataRequest', dataRequest);
    console.log(noId, "payload delete");

    axios({
      method: "get",
      url: `${constants.userServiceBaseUrl}/users`,

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(
        (res) => {
          console.log(res, "user");
          if (res.status === 200) {
            setDdlPic(res.data.data.users);
          } else {
            console.log(res);
            // showModalDelete(false);
            // setIsModalDelete(false);
          }
        }
        //  console.log(res.data);
      )
      .catch((err) => {
        console.log(err);
        // setOpenModalUploadError(true);
      });
  }

  useEffect(() => {
    getDdlPic();
  }, []);

  return (
    <div className={root}>
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

          <Grid
            container
            justify="center"
            // alignItems="center"
            direction="column"
            spacing={5}
          >
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 40, fontSize: 36, fontWeight: 500 }}
              >
                Add timeline
              </Typography>
            </Grid>
            <Row gutter={24} style={{ marginTop: 20, display: "flex" }}>
              <Col gutter="row" xl={12}>
                {/* <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    No ID Project :
                  </Typography>

                  <Input
                    placeholder="Input No ID Project"
                    required
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: 10,
                    }}
                    onChange={(e) => handleChangeNoID(e.target.value)}
                  />
                </div> */}
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Keterangan :
                  </Typography>

                  <Input
                    //   className={classes.inputStyle}
                    placeholder="Keterangan"
                    required
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: 10,
                    }}
                    // value={hargaToken}
                    onChange={(e) => handleChangeKet(e.target.value)}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Tanggal Mulai :
                  </Typography>

                  <Input.Group compact>
                    <DatePicker
                      //   className={classes.inputStyle}
                      disabledDate={disabledDate}
                      placeholder="Tanggal Mulai"
                      popupStyle={{ zIndex: 9999 }}
                      required
                      style={{
                        width: "90%",
                        height: "40px",
                        borderRadius: 10,
                      }}
                      // value={hargaToken}
                      onChange={(e) => handleChangeStartDate(e)}
                    />
                  </Input.Group>
                </div>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Status :
                  </Typography>
                  <Select
                    placeholder="Pilih Status"
                    required
                    dropdownStyle={{ zIndex: 9999 }}
                    size="large"
                    style={{
                      width: "90%",

                      //   height: "70px",
                      borderRadius: 10,
                    }}
                    onChange={(e) => handleChangeStatus(e)}
                  >
                    {ddlStatus.map((inv) => (
                      <Select.Option value={inv.id}>{inv.status}</Select.Option>
                    ))}
                  </Select>
                </div>
                {/* <Button onClick={buttonConsole}>azka</Button> */}
              </Col>
              <Col gutter="row" xl={12}>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Judul Project :
                  </Typography>

                  <Input
                    //   className={classes.inputStyle}
                    placeholder="Judul Project"
                    required
                    style={{
                      width: "90%",
                      height: "40px",
                      borderRadius: 10,
                    }}
                    // value={hargaToken}
                    onChange={(e) => handleChangeJudul(e.target.value)}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>PIC :</Typography>
                  <Select
                    placeholder="Pilih PIC"
                    size="large"
                    dropdownStyle={{ zIndex: 9999 }}
                    style={{
                      width: "90%",

                      //   height: "70px",
                      borderRadius: 10,
                    }}
                    onChange={(e) => handleChangePic(e)}
                  >
                    {ddlPic?.map((inv) => (
                      <Select.Option value={inv.id}>
                        {inv.fullName}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className={classes.inputContainer}>
                  <Typography className={classes.labelInput}>
                    Tanggal Selesai :
                  </Typography>

                  <Input.Group compact>
                    <DatePicker
                      //   className={classes.inputStyle}
                      disabledDate={disabledDate}
                      placeholder="Tanggal Selesai"
                      popupStyle={{ zIndex: 9999 }}
                      required
                      style={{
                        width: "90%",
                        height: "40px",
                        borderRadius: 10,
                      }}
                      // value={hargaToken}
                      onChange={(e) => handleChangeEndDate(e)}
                    />
                  </Input.Group>
                </div>
              </Col>
            </Row>

            <Grid container justify="space-between" className={buttonContainer}>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ModalLoader isOpen={isOpenModalLoader} />
      <ModalAddSuccess
        isOpen={OpenModalUploadSuccess}
        onClose={handleCloseModalUploadSuccess}
        onLeave={() => {
          handleCloseModalUploadSuccess();
        }}
      />

      <ModalAddError
        isOpen={OpenModalUploadError}
        onClose={handleCloseModalUploadError}
        onLeave={() => {
          handleCloseModalUploadError();
        }}
        message={messageUpload}
      />
    </div>
  );
};

ModalAddTimeline.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccesUpload: PropTypes.func.isRequired,
};

export default ModalAddTimeline;
