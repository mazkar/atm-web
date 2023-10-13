/* eslint-disable no-shadow */
/* eslint-disable no-undef */
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
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import axios from 'axios';

import constants from '../../helpers/constants';
import ModalUploadSuccess from './ModalUploadSuccess';
import ModalUploadError from './ModalUploadError';
import ModalLoader from '../../components/ModalLoader';

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
    borderRadius: '8px',
    height: 44,
    width: '120px',
    marginTop: '-71px',
    marginLeft: '289px',
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
      width: 360,
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
    marginTop: '10px',
    border: '1px solid #BCC8E7',
    borderRadius: 8,
    display: 'flex',
    justifyItems: 'space-between',
    height: 45,
    // '& :hover': {
    //   color: constants.color.primaryHard,
    // },
  },
  inputNumber: {
    marginTop: 10,
    borderRadius: '8px',

    height: 35,
    '& .ant-input-number-input': {
      borderRadius: '8px',
      border: '8px',
    },
    '& .ant-input-number-handler-wrap': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 250,
    height: 25,
    borderRadius: 10,
    position: 'relative',
    border: '0px solid #BCC8E7',
    fontSize: 13,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Barlow', 'NunitoRegular'].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: '-20px',
      outline: 'none',
    },
  },
}))(InputBase);

const ModalUpload = ({ isOpen, onClose, tabValue }) => {
  const {
    root,
    modal,
    paper,
    closeIcon,
    buttonUpload,
    textField,
    inputExcel,
    uploadFile,
    inputNumber,
    buttonContainer,
    primaryButton,
    secondaryButton,
  } = useStyles();

  const today = new Date();
  const year = today.getFullYear();
  const [fileName, setFileName] = useState(null);
  const [uploadYear, setUploadYear] = useState(year);
  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] = React.useState(
    false
  );
  const handleOpenModalUploadSuccess = () => setOpenModalUploadSuccess(true);
  const handleCloseModalUploadSuccess = () => setOpenModalUploadSuccess(false);

  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const handleOpenModalUploadError = () => setOpenModalUploadError(true);
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);

  const [messageUpload, setMessageUpload] = React.useState('');
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const inputFileRef = React.useRef(null);

  const isReplace = tabValue === 4

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    setFileName(event.target.files[0]);
    // let data = new FormData();
    // console.log(FileName);
  };

  const actionUpload = (event) => {
    inputFileRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalLoader(true);
    const formData = new FormData();
    formData.append('file', fileName);
    formData.append('uploadYear', uploadYear);
    // console.log(`CEK FILE Name${JSON.stringify(formData)}`);

    axios({
      method: 'post',
      url: isReplace ?
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/uploadMasterRbbReplaceFile` :
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/uploadMasterRbbFile`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(JSON.stringify(res));
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
          }
        }
        //  console.log(res.data);
      })
      .catch((_err) => {
        // console.log(err);
        setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload('Please check your connection and try again');
        setModalLoader(false);
      });
  };

  // const [uploadDate, setUploadDate] = useState(today);
  // const [selectedDate, setSelectedDate] = React.useState(new Date(today));

  const handleShowingOnChange = (value) => {
    setUploadYear(value);
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
                style={{ marginBottom: 40 }}
              >
                Upload RBB {isReplace ? 'Replace' : ''}
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={10}>
              <Grid item xs={7} className={textField}>
                <Typography
                  variant="p"
                  component="p"
                  style={{ fontWeight: 'bold', textColor: '#3F3E3D' }}
                >
                  Upload File RBB
                </Typography>
                <input
                  // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  accept=".xlsx, .xls"
                  type="file"
                  id="fileName"
                  onChange={handleChange}
                  style={{
                    width: '0.1px',
                    height: '0.1px',
                    opacity: 0,
                    overflow: 'hidden',
                    position: 'absolute',
                    zIndex: -1,
                  }}
                />
                <label htmlFor="fileName">
                  <div className={uploadFile}>
                    {fileName === null ? (
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
                          {fileName.name}
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
                        style={{ display: 'none' }}
                        // className={inputExcel}
                        type="file"
                        accept=".xlsx"
                        onChange={handleChange}
                      />
                    </label>
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Typography
                  variant="p"
                  component="p"
                  style={{
                    marginBottom: 10,
                    fontWeight: 'bold',
                    textColor: '#3F3E3D',
                  }}
                >
                  Tahun RBB:
                </Typography>

                <InputNumber
                  // className={inputNumber}
                  maxLength={4}
                  min={year - 10}
                  max={year + 1}
                  defaultValue={year}
                  onChange={handleShowingOnChange}
                  style={{
                    paddingTop: 6,
                    height: 44,
                    width: 140,
                    borderRadius: '8px',
                    border: '1px solid #BCC8E7',
                  }}
                />
              </Grid>
            </Grid>

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
                  Submit
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
