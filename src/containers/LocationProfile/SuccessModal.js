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

import constants from '../../helpers/constants';

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
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 36,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    textTransform: 'none',
  },
});

const ModalIcon = () => (
  <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity=".4"
      d="M40 0C17.903 0 0 17.903 0 40s17.903 40 40 40 40-17.903 40-40S62.097 0 40 0zm25.05 31.502L35.373 61.179a2.58 2.58 0 01-3.649 0L14.95 44.405a2.58 2.58 0 010-3.648l3.648-3.65a2.58 2.58 0 013.65 0l11.3 11.3 24.204-24.204a2.581 2.581 0 013.65 0l3.648 3.65a2.58 2.58 0 010 3.649z"
      fill="#65D170"
    />
    <path
      d="M35.373 61.177a2.58 2.58 0 01-3.648 0L14.95 44.403a2.58 2.58 0 010-3.649l3.648-3.65a2.58 2.58 0 013.65 0l11.3 11.3 24.203-24.203a2.579 2.579 0 013.65 0l3.649 3.65a2.58 2.58 0 010 3.649L35.373 61.177z"
      fill="#65D170"
    />
  </svg>
);

const ModalDialog = ({ isOpen, onClose, onLeave }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
  } = useStyles();

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
          <Grid item>
            <Typography variant="h4" component="h4">
              Location Profile
            </Typography>
          </Grid>

          <Grid item>
            <ModalIcon />
          </Grid>

          <Grid item>
            <Typography
              variant="body1"
              component="p"
              style={{ textAlign: 'center' }}
            >
              Location Profile successfully submitted
              <br />
              You can see negotiation in the Procurement page
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center" className={buttonContainer}>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onLeave}
            >
              Go to Procurement
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default ModalDialog;
