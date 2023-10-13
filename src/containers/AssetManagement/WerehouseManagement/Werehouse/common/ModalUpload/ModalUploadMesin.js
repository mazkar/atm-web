/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
// import { Upload, message, Button } from 'antd';
import PropTypes from "prop-types";

import axios from "axios";

import { useHistory } from "react-router-dom";
import constants from "../../../../../../helpers/constants";
import ModalLoader from "../../../../../../components/ModalLoader";
import PopupSucces from "../../../../../../components/PopupSucces";
import ModalUploadSuccess from "../../../../../Modeling/ModelingModel/ModalUploadSuccess";
import ModalUploadError from "../../../../../Modeling/ModelingModel/ModalUploadError";
import secureStorage from "../../../../../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

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
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    height: 423,
    borderRadius: 10,
    padding: 30,
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
    margin: "65px",
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
    marginTop: 50,
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

const ModalUploadMesin = ({ isOpen, onClose, onSuccesUpload }) => {
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
  const handleCloseModalUploadSuccess = () => setOpenModalUploadSuccess(false);

  const handleChange = (event) => {
    event.preventDefault();

    setFileName(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalLoader(true);
    const formData = new FormData();
    formData.append("file", fileFile);

    axios({
      method: "post",
      url: `${constants.ASSET_MANAGEMENT_SERVICE}/uploadMasterMesin`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(JSON.stringify(res));
        if (res.status == 200) {
          if (res.data.statusCode == 200) {
            setOpenModalUploadSuccess(true);
            setOpenModalUploadError(false);
            setModalLoader(false);
          } else {
            setOpenModalUploadError(true);
            setOpenModalUploadSuccess(false);
            setMessageUpload(res.data.message);
            setModalLoader(false);
            console.log(formData, "body form");
          }
        }
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload("Please check your connection and try again");
        setModalLoader(false);
      });
  };

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
            alignItems="center"
            direction="column"
            spacing={5}
          >
            <Grid item>
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 40, fontSize: 36, fontWeight: 500 }}
              >
                Upload Excel Mesin
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={10}>
              <Grid item className={textField}>
                <Typography
                  variant="p"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  Upload File :
                </Typography>
                <input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="fileFile"
                  type="file"
                  onChange={handleChange}
                  ref={inputFileRef}
                  style={{
                    width: "0.1px",
                    height: "0.1px",
                    opacity: 0,
                    overflow: "hidden",
                    position: "absolute",
                    zIndex: -1,
                  }}
                />
                <label htmlFor="fileFile">
                  <div className={uploadFile}>
                    {fileFile === null ? (
                      <div style={{ padding: 12, width: "75%" }}>
                        <Typography
                          style={{
                            fontSize: 13,
                            color: "#2B2F3C",
                            fontWeight: 400,
                            fontStyle: "italic",
                            marginLeft: 5,
                          }}
                        >
                          Browse Directory
                        </Typography>
                      </div>
                    ) : (
                      <div style={{ padding: 12, width: "75%" }}>
                        <Typography
                          style={{
                            fontSize: 13,
                            color: "#DC241F",
                            marginLeft: 5,
                          }}
                        >
                          {fileFile.name}
                        </Typography>
                      </div>
                    )}
                  </div>
                </label>
                <Grid item>
                  <Button className={buttonUpload}>
                    <label>
                      Choose File
                      <input
                        style={{ marginLeft: 225, display: "none" }}
                        // className={inputExcel}
                        type="file"
                        accept=".xlsx"
                        onChange={handleChange}
                      />
                    </label>
                    {/* Choose File */}
                  </Button>
                </Grid>
              </Grid>
            </Grid>

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
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ModalUploadSuccess
        isOpen={OpenModalUploadSuccess}
        onClose={handleCloseModalUploadSuccess}
        onLeave={() => {
          handleCloseModalUploadSuccess();
        }}
      />

      <ModalUploadError
        isOpen={OpenModalUploadError}
        onClose={handleCloseModalUploadError}
        onLeave={() => {
          handleCloseModalUploadError();
        }}
        message={messageUpload}
      />

      <ModalLoader isOpen={isOpenModalLoader} />

      {/* <ModalLoader isOpen={isUploading} />
      <PopupSucces
        isOpen={isSuccess}
        onClose={onSuccessClose}
        message="Upload Master Data Success!"
      /> */}
    </div>
  );
};

ModalUploadMesin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccesUpload: PropTypes.func.isRequired,
};

export default ModalUploadMesin;
