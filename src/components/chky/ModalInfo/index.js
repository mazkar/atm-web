/* eslint-disable no-nested-ternary */
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

import constants from '../../../helpers/constants';
import ChkyButtons from '../ChkyButtons';
import {ReactComponent as IconSucces} from '../../../assets/icons/general/green_check_circle.svg';
import {ReactComponent as  IconInfo} from '../../../assets/icons/general/info_circle.svg';

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
  buttonContainer: {
    marginTop: 36,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width:180,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border:'1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width:180,
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

const ModalInfo = ({ isOpen, onClose, onNext, message, title, modalType }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
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
              {title}
            </Typography>
          </Grid>

          <Grid item>
            {modalType === "success" ? <IconSucces width="80" height="80" /> : modalType === "failed" ? <ModalIcon /> : <IconInfo width="80" height="80" />}
          </Grid>

          <Grid item>
            <Typography variant="body1" component="p">
              {message}
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center" className={buttonContainer}>
          <Grid item>
            <ChkyButtons onClick={onNext} style={{textTransform: 'capitalize'}}> OK </ChkyButtons>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
};

export default ModalInfo;
