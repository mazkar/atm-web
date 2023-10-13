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
import { ReactComponent as WarningIcon } from "../../../../../../assets/icons/siab/warning-icon.svg";
import constants from '../../../../../../helpers/constants';

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
    height: 400,
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

const confirmDeletePopUp = ({ isOpen, onClose, onLeave, onSubmit }) => {
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
            <Typography variant="h4" component="h4" style={{color: '#374062', fontWeight: 500}}>
                Anda yakin akan menghapus?
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
              Hapus
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

confirmDeletePopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default confirmDeletePopUp;