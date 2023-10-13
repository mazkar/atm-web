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
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';

import axios from 'axios';
import constants from '../../helpers/constants';
import ModalUploadSuccess from './ModalUploadSuccess';
import ModalUploadError from './ModalUploadError';

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
      width: 380,
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
  progressBar: {
    margin: '30px 0px 0px 20px;',
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: 'red',
    },
    '& .MuiLinearProgress-root': {
      height: '10px',
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
    progressBar,
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
  const ProgressBar = ({ target }) => {
    const [progressBar, setProgressBar] = useState(0);
  };

  const fileInput = React.useRef();

  const handleChange = (event) => {
    event.preventDefault();
    setFileName(`${event.target.files[0].name}`);
    // let data = new FormData();
    // data.append( 'file', files[0] )
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3001/masterrbbservices/v1/uploadOpenAtmData`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.statusCode == 200) {
            setOpenModalUploadSuccess(true);
            setOpenModalUploadError(false);
          } else {
            setOpenModalUploadError(true);
            setOpenModalUploadSuccess(false);
            setMessageUpload(res.data.message);
          }
        }
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setOpenModalUploadError(true);
        setOpenModalUploadSuccess(false);
        setMessageUpload('Please check your connection and try again');
      });
  };

  // uploadExcel = ({ target: { files } }) =>{
  //     console.log( files[0] )
  //     let data = new FormData();
  //     data.append( 'file', files[0] )

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
                Upload {mode}
              </Typography>
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
              {/* <LinearProgress variant="secondary" value={progress} className={progressBar} style={{width: `${progress}%` }} /> */}
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
    </div>
  );
};

ModalUpload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default ModalUpload;
