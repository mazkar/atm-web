/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Button from '../../../../../components/chky/ChkyButtons';
import constants from '../../../../../helpers/constants';

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
  title: {
    fontSize: 28,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 35,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  formContainer: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  buttonContainer: {
    marginTop: 60,
  },
});

const ModalApproveAll = ({ isOpen, onClose, idAtm, typeValue }) => {
  const classes = useStyles();
  const title = (str)=>{
    if(str==='new'){
      return "New";
    }
    if(str==='renewal'){
      return "Renewal";
    }
    if(str==='reopen'){
      return "Reopen";
    }
    if(str==='termin'){
      return "Termin";
    }
  };
  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container justify="space-between">
          <Grid item/>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={classes.closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container direction="column" style={{marginTop: 10,}}>
          <Grid item>
            <Typography className={classes.title} >{title(typeValue)} ATM Approved</Typography>
          </Grid>
          <Grid item>
            <Typography style={{fontSize: 17, fontWeight: 400, textAlign: 'center'}}>
              ATM ID {idAtm} has been approved
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="center" className={classes.buttonContainer}>
          <Grid item>
            <Button
              disableElevation
              onClick={onClose}
            >
              Ok
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalApproveAll.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idAtm: PropTypes.string.isRequired,
  typeValue: PropTypes.string.isRequired,
};

export default ModalApproveAll;
