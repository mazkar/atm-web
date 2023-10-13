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
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';

import axios from 'axios';
import constants from '../../helpers/constants';
import ModalUploadSuccess from './ModalUploadSuccess';
import ModalUploadError from './ModalUploadError';
import ModalLoader from '../../components/ModalLoader';
import SelectWithCaptions from '../../components/Selects/SelectWithCaptions';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 660,
    height: 420,
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
    height: 49,
    width: '105px',
    marginTop: '-4px',
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
    marginTop: 45,
  },
  textField: {
    '& .MuiInputBase-root': {
      width: 280,
    },
    '& .MuiInputBase-input': {
      right: '-20px',
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
    display: 'none',
    position: 'relative',
  },
  uploadFile: {
    position: 'relative',
    cursor: 'pointer',
    position: 'absolute',
    marginLeft: '40px',
    marginTop: '40px',
    zIndex: 2,
    opacity: 0.5,
    '& :hover': {
      color: constants.color.primaryHard,
    },
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 380,
    height: 30,
    borderRadius: 10,
    position: 'relative',
    border: '0px solid #BCC8E7',
    backgroundColor: '#F4F7FB',
    fontSize: 13,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      'Barlow',
      'NunitoRegular',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: '-20px',
      outline: 'none',
    },
  },
}))(InputBase);

const ModalUpload = ({ isOpen, onClose, onLeave, mode }) => {
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
  } = useStyles();

  const [FileName, setFileName] = useState('Browse your directory');
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

  const showingSuggestions = [
    { id: 0, value: '2010', nameEn: '2010', nameId: '2010' },
    { id: 1, value: '2011', nameEn: '2011', nameId: '2011' },
    { id: 2, value: '2012', nameEn: '2012', nameId: '2012' },
    { id: 3, value: '2013', nameEn: '2013', nameId: '2013' },
    { id: 4, value: '2014', nameEn: '2014', nameId: '2014' },
    { id: 5, value: '2015', nameEn: '2015', nameId: '2015' },
    { id: 6, value: '2016', nameEn: '2016', nameId: '2016' },
    { id: 7, value: '2017', nameEn: '2017', nameId: '2017' },
    { id: 8, value: '2018', nameEn: '2018', nameId: '2018' },
    { id: 9, value: '2019', nameEn: '2019', nameId: '2019' },
    { id: 10, value: '2020', nameEn: '2020', nameId: '2020' },
    { id: 11, value: '2021', nameEn: '2021', nameId: '2021' },
  ];

  const [uploadYear, setUploadYear] = useState(showingSuggestions);

  const handleShowingOnChange = (event, value) => {
    console.log(value);
    setUploadYear(event.target.value);
  };

  let fileInput = React.useRef();

  const handleChange = (event) => {
    event.preventDefault();
    setFileName(`${event.target.files[0].name}`);
    // let data = new FormData();
    // data.append( 'file', files[0] )
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalLoader(true);

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/uploadMasterRbbFile`
      )
      .then((res) => {
        console.log(res);
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
      .catch((err) => {
        console.log(err);
        setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload('Please check your connection and try again');
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
              <Typography variant="h4" component="h4">
                Upload {mode} RBB
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={3}>
              <Grid item style={{ marginTop: 40 }}>
                <span>Upload File RBB :</span>
              </Grid>

              <Grid item className={textField}>
                <label className={uploadFile} onChange={handleChange}>
                  {' '}
                  {FileName}
                  <input
                    className={inputExcel}
                    type="file"
                    accept=".xlsx"
                    ref={fileInput}
                  />
                </label>
                <BootstrapInput disabled />
                <Button
                  type="submit"
                  method="post"
                  className={buttonUpload}
                  onClick={handleSubmit}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>

            <Grid container justify="center" direction="row" spacing={3}>
              <Grid item style={{ marginTop: 40, marginLeft: -220 }}>
                <span>Tahun :</span>
              </Grid>

              <Grid item style={{ marginTop: 40, marginLeft: 20 }}>
                <SelectWithCaptions
                  bordered
                  suggestions={showingSuggestions}
                  defaultValue={showingSuggestions[0].value}
                  handleChange={handleShowingOnChange}
                  value={uploadYear}
                  width="auto"
                />
              </Grid>
            </Grid>

            <Button onClick={onClose} className={buttonCancel}>
              Cancel
            </Button>
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
  onLeave: PropTypes.func.isRequired,
};

export default ModalUpload;
