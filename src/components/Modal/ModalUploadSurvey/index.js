/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
// import { Upload, message, Button } from 'antd';
import PropTypes from 'prop-types';

import axios from 'axios';

import { useHistory } from 'react-router-dom';
import constants from '../../../helpers/constants';
import ModalLoader from '../../ModalLoader';
import PopupSucces from '../../PopupSucces';
import { doUploadSurveyTask } from '../../../containers/VendorManagement/ApiServices';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 780,
    minHeight: 423,
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
    borderRadius: '8px',
    height: 44,
    width: '95px',
    marginTop: '-71px',
    marginLeft: '575px',
    zIndex: 3,
    textTransform: 'capitalize',
  },
  buttonCancel: {
    margin: '65px',
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    textTransform: 'capitalize',
    '& .MuiButton-root': {
      width: '100px',
      '&:hover': {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 50,
    padding: '0px 40px 0px 40px',
  },
  textField: {
    '& .MuiInputBase-root': {
      width: 670,
      border: '1px solid',
      borderColor: '#BCC8E7',
      borderRadius: '6px',
    },
    '& .MuiInputBase-input': {
      // right: '-20px',
    },
    '& .MuiOutlinedInput-input': {
      '&: hover': {
        background: '#F4F7FB',
      },
    },
    '& .MuiButton-root': {
      '&:hover': {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  inputExcel: {
    // display: 'none',
    position: 'relative',
    marginBottom: 15,
    // marginLeft: -150,
  },
  uploadFile: {
    cursor: 'pointer',
    width: '100%',
    border: '1px solid #BCC8E7',
    borderRadius: 8,
    display: 'flex',
    justifyItems: 'space-between',
    height: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

const ModalUploadSurvey = ({ isOpen, onClose, onSuccesUpload }) => {
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
  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] = React.useState(
    false
  );
  const [isUploading, setIsUploading] = useState(false);
  function loaderHandler(bool){
    setIsUploading(bool);
  }
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    // console.log(event.target.id);
    setFileName(event.target.files[0]);
    // let data = new FormData();
    // console.log(FileName);
  };

  const onSuccessClose = () =>{
    setIsSuccess(false);
    history.go(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!fileFile){
      setFormError(true);
    }else{
      setFormError(false);
      const formData = new FormData();
      formData.append('file', fileFile);
      // formData.append('uploadDate', uploadDate);
      // console.log(`CEK FILE Name${JSON.stringify(formData)}`);
      doUploadSurveyTask(loaderHandler, formData)
        .then((response) => {
          console.log("+++ response", response);
          if(response){
            if(response.responseCode==="200"){
              loaderHandler(false);
              setIsSuccess(true);
              onSuccesUpload();
            }
          }
        })
        .catch((err) => {
          loaderHandler(true);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
    
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
                Upload Survey
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={10}>
              <Grid item className={textField}>
                <Typography
                  variant="p"
                  component="p"
                  style={{ marginBottom: 10 }}
                >
                  Upload File Survey :
                </Typography>
                <input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="fileFile"
                  type="file"
                  onChange={handleChange}
                  ref={inputFileRef}
                  style={{
                    width: '0.1px',
                    height: '0.1px',
                    opacity: 0,
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: -1,
                  }}
                />
                <label htmlFor="fileFile">
                  <div className={uploadFile}>
                    {fileFile === null ? (
                      <div style={{ padding: 12, width: '75%' }}>
                        <Typography
                          style={{
                            fontSize: 13,
                            color: '#2B2F3C',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            marginLeft: 5,
                          }}
                        >
                          Browse Directory
                        </Typography>
                      </div>
                    ) : (
                      <div style={{ padding: 12, width: '75%' }}>
                        <Typography
                          style={{
                            fontSize: 13,
                            color: '#DC241F',
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
                        style={{ marginLeft: 225, display: 'none' }}
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
            
            {formError&&(
              <Grid item>
                <Typography style={{color: "#DC241F", fontStyle: "italic"}}>File upload is required!</Typography>
              </Grid>
            )}

            <Grid container justify="space-between" className={buttonContainer}>
              <Grid item>
                <Button
                  variant="outlined"
                  disableElevation
                  className={secondaryButton}
                  onClick={onClose}
                  style={{ textTransform: 'capitalize' }}
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
                  style={{ textTransform: 'capitalize' }}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ModalLoader isOpen={isUploading} />
      <PopupSucces isOpen={isSuccess} onClose={onSuccessClose} message="Upload Survey Success!"/>
    </div>
  );
};

ModalUploadSurvey.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccesUpload: PropTypes.func.isRequired,
};

export default ModalUploadSurvey;
