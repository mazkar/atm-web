import React from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ReactComponent as WarningIcon } from "../../assets/icons/siab/warning-icon.svg";
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
    width: 500,
    borderRadius: 10,
    padding: 30,
  },
  buttonContainer: {
    marginTop: 60,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    padding: '14px 36px',
    borderRadius: 10,
  },
});

const PopUpConfirmation = ({ isOpen, onClose, onLeave, onSubmit, message = "Anda yakin akan melakukan perubahan task?", desc = "" }) => {
  const {
    modal,
    paper,
    buttonContainer,
    primaryButton,
    secondaryButton,
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

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h4" component="h4" style={{color: '#374062', fontWeight: 500, textAlign: "center"}}>
              {message}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" component="h4" style={{color: '#374062', fontWeight: 500, textAlign: "center", fontSize: 13}}>
              {desc}
            </Typography>
          </Grid>

          <Grid item>
            <WarningIcon style={{width: '120px', height: '120px', marginTop: 20}}/>
          </Grid>

        </Grid>

        <Grid container justify="space-between" className={buttonContainer}>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={secondaryButton}
              onClick={onLeave}
            >
              Batal
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

PopUpConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default PopUpConfirmation;