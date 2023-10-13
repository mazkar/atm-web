import React, { useState } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";

import axios from "axios";

// import constants from '../../../../../../helpers/constants';
import constants from "../../../../../helpers/constants";
import ModalUploadSuccess from "../../../../Modeling/ModelingModel/ModalUploadSuccess";
import ModalUploadError from "../../../../Modeling/ModelingModel/ModalUploadError";
// import ModalLoader from '../../../../../components/ModalLoader';
import ModalLoader from "../../../../../components/ModalLoader";

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
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: "-20px",
      outline: "none",
    },
  },
}))(InputBase);

const ModalUpload = ({ isOpen, onClose }) => {
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
  const [fileFile, setFileName] = useState(null);
  // const [uploadDate, setUploadDate] = useState(today);
  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] =
    React.useState(false);
  const handleOpenModalUploadSuccess = () => setOpenModalUploadSuccess(true);
  const handleCloseModalUploadSuccess = () => setOpenModalUploadSuccess(false);

  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const handleOpenModalUploadError = () => setOpenModalUploadError(true);
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);

  const [messageUpload, setMessageUpload] = React.useState("");
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    setFileName(event.target.files[0]);
    // let data = new FormData();
    // console.log(FileName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setModalLoader(true);
    const formData = new FormData();
    formData.append("file", fileFile);
    setOpenModalUploadSuccess(true);
    // setOpenModalUploadError(false);
    // formData.append('uploadDate', uploadDate);
    // console.log(`CEK FILE Name${JSON.stringify(formData)}`);

    // axios({
    //   method: 'post',
    //   url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/uploadMasterData`,
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => {
    //     console.log(JSON.stringify(res));
    //     if (res.status == 200) {
    //       if (res.data.statusCode == 200) {
    //         setOpenModalUploadSuccess(true);
    //         setOpenModalUploadError(false);
    //         setModalLoader(false);
    //       } else {
    //         setOpenModalUploadError(true);
    //         setOpenModalUploadSuccess(false);
    //         setMessageUpload(res.data.message);
    //         setModalLoader(false);
    //       }
    //     }
    //     //  console.log(res.data);
    //   })
    //   .catch((_err) => {
    //     // console.log(err);
    //     setOpenModalUploadError(true);
    //     setOpenModalUploadSuccess(false);
    //     setMessageUpload('Please check your connection and try again');
    //     setModalLoader(false);
    //   });
  };

  const handleDateChange = (value) => {
    setUploadDate(value);
    console.log(value);
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
                Upload Document Project
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={10}>
              <Grid item className={textField}>
                <Typography
                  variant="p"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  Upload File Document Project :
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
    </div>
  );
};

ModalUpload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalUpload;
