/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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
import { InputNumber, Select } from 'antd';
import PropTypes from 'prop-types';

import axios from 'axios';

import constants from '../../helpers/constants';
import ModalUploadSuccess from './uploadModalSuccess';
import ModalUploadError from './uploadModalError';
import ModalLoader from '../../components/ModalLoader';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 800,
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
    height: 47,
    width: '95px',
    marginTop: '-73px',
    marginLeft: '270px',
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
    position: 'absolute',
    marginLeft: '10px',
    marginTop: '34px',
    zIndex: 2,
    opacity: 0.5,
    '& :hover': {
      color: constants.color.primaryHard,
    },
  },
  inputNumber: {
    top: 10,
    borderRadius: 8,
    width: 120,
    '& .ant-input-number-handler-wrap': {
      borderRadius: '0px 8px 8px 0px',
    },
    '& .ant-input-number-input': {
      height: 40,
      fontSize: 'medium',
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
    backgroundColor: '#FFFFFF',
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

const typeSuggestions = [
  { id: 1, value: 'Januari' },
  { id: 2, value: 'Februari' },
  { id: 3, value: 'Maret' },
  { id: 4, value: 'April' },
  { id: 5, value: 'Mei' },
  { id: 6, value: 'Juni' },
  { id: 7, value: 'Juli' },
  { id: 8, value: 'Agustus' },
  { id: 9, value: 'September' },
  { id: 10, value: 'Oktober' },
  { id: 11, value: 'November' },
  { id: 12, value: 'Desember' },
];

const monthsInd = {
  Januari: '01',
  Februari: '02',
  Maret: '03',
  April: '04',
  Mei: '05',
  Juni: '06',
  Juli: '07',
  Agustus: '08',
  September: '09',
  Oktober: '10',
  November: '11',
  Desember: '12',
};

const ModalUpload = ({ isOpen, onClose }) => {
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

  const [FileName, setFileName] = useState(null);
  const [OpenModalUploadSuccess, setOpenModalUploadSuccess] = React.useState(
    false
  );
  const handleCloseModalUploadSuccess = () => setOpenModalUploadSuccess(false);

  const [OpenModalUploadError, setOpenModalUploadError] = React.useState(false);
  const handleCloseModalUploadError = () => setOpenModalUploadError(false);

  const [messageUpload, setMessageUpload] = React.useState('');
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const inputFileRef = React.useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0]);
    console.log('event', event);
    setDisable(false);
  };

  const actionUpload = () => {
    // if (FileName === null || FileName === undefined) {
    //   inputFileRef.current.click();
    // } else {
    //   handleSubmit();
    // }
    // console.log(FileName);
    inputFileRef.current.click();
  };

  const handleSubmit = () => {
    // event.preventDefault();
    setModalLoader(true);
    const paramDate = `${uploadYear}-${uploadMonth}-01`;
    const formData = new FormData();
    formData.append('file', FileName);
    formData.append('uploadDate', paramDate);
    console.log(paramDate);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('data res', res);
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
        console.log('data res.daata', res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log('Form Data', formData);
        setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload('Please check your connection and try again');
        setModalLoader(false);
      });
  };

  const today = new Date();
  const year = today.getFullYear();
  const [uploadYear, setUploadYear] = useState(year);
  const [uploadMonth, setUploadMonth] = useState('01');
  const [isDisable, setDisable] = useState(true);

  const handleShowingOnChange = (value, defaultValue) => {
    console.log('changed year', value);
    setUploadYear(value, defaultValue);
  };

  function getMonthMM(m) {
    return monthsInd[m];
  }

  function handleMonthChange(e) {
    var getM = getMonthMM(e);
    setUploadMonth(getM);
    console.log('changed month', getM);
  }

  useEffect(() => {
    if (isOpen === false) {
      setFileName(null);
      setDisable(true);
    }
  });

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
                style={{ marginBottom: 20 }}
              >
                Upload Master Transaction
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={6}>
              <Grid item className={textField}>
                <Typography
                  variant="p"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  Upload File Master Transaction :
                </Typography>
                <label className={uploadFile}>
                  <input
                    id="input-file"
                    className={inputExcel}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleChange}
                    ref={inputFileRef}
                  />
                </label>
                <BootstrapInput disabled />
                <Grid item>
                  <Button
                    type="button"
                    method="post"
                    className={buttonUpload}
                    onClick={actionUpload}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>

              <Grid item>
                <Typography
                  variant="p"
                  component="p"
                  style={{ fontWeight: 'bold', marginBottom: 12 }}
                >
                  Bulan :
                </Typography>

                <Select
                  className={inputNumber}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  defaultValue="Januari"
                  onChange={handleMonthChange}
                  options={typeSuggestions}
                />
              </Grid>

              <Grid item>
                <Typography
                  variant="p"
                  component="p"
                  style={{ fontWeight: 'bold', marginBottom: 12 }}
                >
                  Tahun :
                </Typography>

                <InputNumber
                  className={inputNumber}
                  min={year - 10}
                  max={year + 1}
                  defaultValue={year}
                  onChange={handleShowingOnChange}
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
                  disabled={isDisable}
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
