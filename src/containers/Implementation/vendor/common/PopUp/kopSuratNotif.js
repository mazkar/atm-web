import React from 'react'
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg"
import PropTypes from 'prop-types'
import constants from '../../../../../helpers/constants'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

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
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 'max-content',
    height: 40,
    marginLeft: -15,
  },
});

const kopSuratNotif = ({ isOpen, onClose }) => {
  const {
    modal,
    paper,
    primaryButton
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
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>
        <Grid
          container
          justify="flex-start"
          direction="column"
          style={{marginTop: 25}}
        >

          <Grid item style={{textAlign: 'left'}}>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: "#000000", fontWeight: 600 }}
            >
              Notes :
            </Typography>
          </Grid>

          <Grid item style={{marginTop: 25}}>
              <Grid container direction='row'>
                  <Grid item>
                      <FiberManualRecordIcon style={{padding: 5, color: '#DC241F'}}/>
                  </Grid>
                  <Grid item>
                      <Typography style={{ color: "#000000", fontWeight: 400 }}>Pastikan kop surat memiliki lebar...cm & tinggi...cm</Typography>
                  </Grid>
              </Grid>
          </Grid>

          <Grid item>
              <Grid container direction='row'>
                  <Grid item>
                      <FiberManualRecordIcon style={{padding: 5, color: '#DC241F'}}/>
                  </Grid>
                  <Grid item>
                      <Typography style={{ color: "#000000", fontWeight: 400 }}>Pastikan kop surat jelas dan dapat dibaca</Typography>
                  </Grid>
              </Grid>
          </Grid>

        </Grid>
        
        <Grid container justify='center' style={{marginTop: 120}}>
            <Button
                variant="contained"
                disableElevation
                className={primaryButton}
                onClick={onClose}
                style={{ textTransform: "capitalize", width: '100%' }}
            >
                Lanjutkan
            </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

kopSuratNotif.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default kopSuratNotif;