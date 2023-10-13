/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Modal, Box, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Button from '../../../../../components/chky/ChkyButtons';
import constants from '../../../../../helpers/constants';
import ModalApproveSuccesful from '../ModalApproveSuccesful';
import { doApproveApproval } from '../../ApiServiceApproval';

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

const ModalApprove = ({
  isOpen,
  onClose,
  idAtm,
  idNew,
  typeValue,
  loaderHandler,
  userId,
  isNewLocation,
  atmId,
  idRequester,
}) => {
  const classes = useStyles();
  const title = (str) => {
    if (str === 'new') {
      return 'New';
    }
    if (str === 'renewal') {
      return 'Renewal';
    }
    if (str === 'reopen') {
      return 'Reopen';
    }
    if (str === 'termin') {
      return 'Termin';
    }
  };

  // modal for Approve Success
  const [openModalSuccessful, setOpenModalSuccessful] = useState(false);
  const handleOpenModalSuccessful = () => {
    setOpenModalSuccessful(true);
  };
  const handleCloseModalSuccessful = () => {
    setOpenModalSuccessful(false);
    window.location.assign('/approval');
  };

  // handle function when confirm button clicked
  const handleApprove = () => {
    const dataHit = {
      idSiteNewAtm: [idNew],
      locationId: [idAtm],
      userId: userId,
    };
    // console.log(">>>> DATA HIT: ",JSON.stringify(dataHit));
    doApproveApproval(loaderHandler, dataHit).then((respons) => {
      // console.log(">>>>> APPROVE Location : ", JSON.stringify(respons));
      if (respons.data.responseCode === '00') {
        onClose();
        handleOpenModalSuccessful();
      } else {
        alert(respons.data.responseMessage);
      }
    });
    // setModalLoader(true);
    // setTimeout(() => { handleOpenModalSuccessful(); }, 3000);
    // setTimeout(() => {onClose(); }, 3000);
    // setTimeout(() => { setModalLoader(false); }, 3000);
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box className={classes.paper}>
          <Grid container justify='space-between'>
            <Grid item />
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container direction='column' style={{ marginTop: 10 }}>
            <Grid item>
              <Typography className={classes.title}>{title(typeValue)} ATM Approve</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 17, fontWeight: 400, textAlign: 'center' }}>
                Are you sure want to approve {isNewLocation ? 'ID Request' : 'ATM ID'} {idAtm} ?
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='space-between' className={classes.buttonContainer}>
            <Grid item>
              <Button buttonType='redOutlined' disableElevation onClick={onClose}>
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button disableElevation onClick={handleApprove}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ModalApproveSuccesful
        isOpen={openModalSuccessful}
        onClose={handleCloseModalSuccessful}
        idAtm={idAtm}
        typeValue={typeValue}
      />
    </div>
  );
};

ModalApprove.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idNew: PropTypes.string.isRequired,
  idAtm: PropTypes.string.isRequired,
  typeValue: PropTypes.string.isRequired,
  loaderHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  isNewLocation: PropTypes.bool.isRequired,
};

export default ModalApprove;
