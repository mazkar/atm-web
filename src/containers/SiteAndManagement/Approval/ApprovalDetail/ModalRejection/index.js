/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ChkyButtons } from '../../../../../components';
import constants from '../../../../../helpers/constants';
import {doRejectApproval} from '../../ApiServiceApproval';

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
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: '#65D170',
    padding: '14px 36px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(101, 209, 112, 0.24)',
  },
  secondaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
  },
});

const ModalRejection = ({ isOpen, onClose, loaderHandler, idAtm, idNew, userId }) => {
  const classes = useStyles();
  const [note, setNote] = useState('');
  const [errorRequire, setErrorRequire] = useState(false);
  function handleSubmit(){
    if(note === ''){
      setErrorRequire(true);
    }else{
      const dataHit={
        "idSiteNewAtm" : [idNew],
        "locationId" : [idAtm],
        "userId" : userId,
        "rejectRecomendation" : note
      };
      doRejectApproval(loaderHandler, dataHit).then(
        respons=>{
          console.log(">>>>> REJECT Location : ", JSON.stringify(respons));
          if(respons.data.responseCode === '00'){
            onClose();
            if(window.confirm('This Approval Rejected, Back to Approval table page?')){
              window.location.assign('/approval');}
          }else{
            alert(respons.data.responseMessage)
          }
        }
      );
    }
  }
  function handleChange(event){
    setNote(event.target.value);
    console.log(event.target.value);
  }
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
          <Grid item>
            <Typography className={classes.title} >Rejection</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={classes.closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container direction="column" style={{marginTop: 30,}}>
          <Grid item>
            <Typography style={{fontSize: 15, fontWeight: 500}}>Recomendation</Typography>
          </Grid>
          <Grid item className={classes.formContainer}>
            <TextField
              id="outlined-textarea"
              placeholder="Type recommendation..."
              multiline
              variant="outlined"
              rows={4}
              onChange={handleChange}
            />
            {errorRequire && 
            <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>Recomendation is required</Typography>
            }
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={classes.buttonContainer}>
          <Grid item>
            <ChkyButtons style={{textTransform:'capitalize'}} buttonType="redOutlined" onClick={onClose}>Cancel</ChkyButtons>
          </Grid>

          <Grid item>
            <ChkyButtons style={{textTransform:'capitalize'}} onClick={handleSubmit}>Confirm</ChkyButtons>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalRejection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loaderHandler: PropTypes.func.isRequired,
  idNew: PropTypes.string.isRequired,
  idAtm: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default ModalRejection;
