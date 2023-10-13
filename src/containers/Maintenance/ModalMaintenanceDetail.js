import React from 'react';
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
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

import InputBase from '@material-ui/core/InputBase';

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
    minHeight: 420,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 180,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 180,
  },
  textField: {
    '& .MuiInputBase-root': {
      width: 380,
    },
    '& .MuiOutlinedInput-input': {
      borderRadius: 8,
      border: '1px solid #BCC8E7',
      background: '#F4F7FB',
      '&: hover': {
        borderRadius: 5,
        border: '1px solid #DDE6FF',
        background: '#F4F7FB',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #BCC8E7',
    },
  },
  infoContainer: {
    marginTop: 40,
  },
  infoTitle: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  infoDesc: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '11px',
  },
  statusHigh: {
    backgroundColor: '#FFE9E9',
    border: '1px solid #FF7A76',
    boxSizing: 'border-box',
    borderRadius: '40px',
    padding: '5px 20px',
  },
  statusInprogress: {
    backgroundColor: '#EFF4FF',
    border: '1px solid #88ADFF',
    boxSizing: 'border-box',
    borderRadius: '40px',
    padding: '5px 20px',
    marginTop: 5,
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
    height: 40,
    borderRadius: 10,
    position: 'relative',
    border: '1px solid #BCC8E7',
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
    },
  },
}))(InputBase);

const ModalDialog = ({ isOpen, onClose, onEdit, onComplete }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
    secondaryButton,
    infoContainer,
    infoTitle,
    infoDesc,
    statusHigh,
    statusInprogress,
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
              Ticket Detail
            </Typography>
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={infoContainer}>
          <Grid item>
            <div className={infoTitle}>Ticket ID</div>
            <div className={infoDesc}>#221918</div>
          </Grid>
          <Grid item>
            <div className={infoTitle}>ATM ID</div>
            <div className={infoDesc}>#221918</div>
          </Grid>
          <Grid item>
            <div className={infoTitle}>Date</div>
            <div className={infoDesc}>#221918</div>
          </Grid>
          <Grid item>
            <div className={statusHigh}>High</div>
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={infoContainer}>
          <Grid item>
            <div className={infoTitle}>Issue</div>
            <div className={infoDesc}>Error 404</div>
          </Grid>
          <Grid item>
            <div
              className={infoTitle}
              style={{ minWidth: '250px', marginLeft: 80 }}
            >
              Status
            </div>
            <Progress value={24} barColor="#DC241F" />
          </Grid>

          <Grid item>
            <div className={statusInprogress}>Inprogress</div>
          </Grid>
        </Grid>

        <Grid container justify="space-between" style={{ marginTop: 25 }}>
          <Grid item>
            <div className={infoTitle}>Assignee</div>
            <Grid container justify="flex-start" style={{ marginTop: 10 }}>
              <Grid item>{CircleText('#FF9595', 'MY')}</Grid>
              <Grid item>{BlueText('Muhammad Yasin')}</Grid>
            </Grid>
            <Grid container justify="flex-start" style={{ marginTop: 10 }}>
              <Grid item>{CircleText('#92D991', 'I')}</Grid>
              <Grid item>{BlueText('Isabella')}</Grid>
            </Grid>
            <Grid container justify="flex-start" style={{ marginTop: 10 }}>
              <Grid item>{CircleText('#50A0FF', 'AR')}</Grid>
              <Grid item>{BlueText('Abdul Rasyid')}</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={buttonContainer}>
          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={secondaryButton}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onEdit}
            >
              Edit
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onComplete}
            >
              Complete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

function Progress(props) {
  const useStyles = makeStyles({
    rootProgress: {
      display: 'block',
      height: '100%',
      minWidth: '250px',
      marginLeft: 80,
      borderRadius: 5,
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: props.barColor,
      },
    },
  });

  const classes = useStyles();
  return (
    <Box alignItems="center">
      <Box
        width="100%"
        style={{
          position: 'relative',
          height: '20px',
        }}
      >
        <LinearProgress
          className={classes.rootProgress}
          variant="determinate"
          {...props}
        />
        <Box
          minWidth={35}
          style={{
            textAlign: 'right',
            width: '100%',
            height: '15px',
            paddingRight: '5%',
            transform: 'translate(20px, -20px)',
            zIndex: 9,
          }}
        >
          <Typography
            style={{ paddingRight: '15%' }}
            variant="body2"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

const CircleText = (color, text) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: 'white',
        border: '2px solid #FFFFFF',
        boxSizing: 'border-box',
        boxShadow: '0px 8px 8px rgba(188, 200, 231, 0.2)',
        borderRadius: '50%',
        height: 30,
        width: 30,
        textAlign: 'center',
        padding: 2,
      }}
    >
      {text}
    </div>
  );
};

const BlueText = (text) => {
  return (
    <div
      style={{
        color: '#88ADFF',
        height: 30,
        textAlign: 'center',
        padding: 2,
        marginLeft: 5,
      }}
    >
      {text}
    </div>
  );
};

ModalDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default ModalDialog;
