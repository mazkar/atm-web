import React from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

// import ModalIconBg from './ModalIconBg';
import modalIconBg from '../../assets/images/bg-not-found-location.svg';
import constants from '../../helpers/constants';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 660,
    height: 500,
    borderRadius: 10,
    padding: 20,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 40,
    padding: 20,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
  },
  secondaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.secondaryMedium,
    padding: '14px 36px',
    borderRadius: 10,
  },
});

const ModalIcon = () => (
  <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity=".4"
      d="M40 0C17.903 0 0 17.916 0 40s17.903 40 40 40 40-17.903 40-40S62.097 0 40 0zm0 60.645a5.161 5.161 0 110-10.322 5.161 5.161 0 010 10.322zm6.168-38.453l-2.065 20.645a2.581 2.581 0 01-2.568 2.324h-3.064a2.58 2.58 0 01-2.568-2.324L33.84 22.192a2.58 2.58 0 012.561-2.837h7.2a2.582 2.582 0 012.568 2.837z"
      fill="#DC241F"
    />
  </svg>
);

const closeIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="#DC241F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#DC241F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ModalLocationNotFound = ({ isOpen, onClose, type }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
  } = useStyles();

  const getMessage = () => {
    if(type === "new" || type === "add_machine"){
      return 'Please make sure input correct latitude & longitude';
    }else if(type === "reopen"){
      return 'Please input inactive ATM ID';
    }else{
      return 'Please make sure input correct ATM ID';
    }
  }

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

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          {/* <Grid item> */}
          <Typography variant="h4" component="h4">
            {type ? 'Location Not Found' : 'ATM ID Not Found'}
          </Typography>
          {/* </Grid> */}

          {/* <Grid item> */}
          <Typography
            style={{ marginTop: 20, marginBottom: 20 }}
            variant="body1"
            component="p"
          >
            {/* {type ? 'Please make sure input correct latitude & longitude' : 'Please make sure input correct ATM ID'} */}
            {getMessage()}
          </Typography>
          {/* </Grid> */}

          {/* <Grid item xs> */}
          {/* <ModalIcon /> */}
          {/* <ModalIconBg /> */}
          <img src={modalIconBg} />
          {/* </Grid> */}
        </Grid>

        <Grid container justify="center" className={buttonContainer}>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onClose}
            >
              Try Again
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalLocationNotFound.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLocationNotFound;
