/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

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
  rootField: {
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  formControlSelect: {
    marginTop: 9,
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      backgroundColor: '#F4F7FB',
    },
    '& .MuiInputBase-root': {
      color: '#2B2F3C',
      fontSize: '13px',
    },
  },
});

const InputCustom = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: '100%',
    height: 35,
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
    '& .MuiInputBase-root': {
      width: '100%',
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
    infoTitle,
    rootField,
    formControlSelect,
  } = useStyles();

  const [priority, setPriority] = React.useState('High');

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

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
          spacing={1}
        >
          <Grid item>
            <Typography variant="h4" component="h4">
              New Ticket
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={rootField}>
                <InputLabel
                  htmlFor="inputVendor"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: -15,
                  }}
                >
                  Ticket ID :
                </InputLabel>
                <InputCustom placeholder="Masukan tiket ID" id="inputVendor" />
              </Grid>

              <Grid item className={rootField}>
                <InputLabel
                  htmlFor="inputVendor"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: -15,
                  }}
                >
                  Issue :
                </InputLabel>
                <InputCustom placeholder="Masukan issue" id="inputVendor" />
              </Grid>

              <Grid item className={rootField}>
                <InputLabel
                  htmlFor="inputVendor"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: -15,
                  }}
                >
                  Assignee :
                </InputLabel>
                <InputCustom placeholder="Add user" id="inputVendor" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item className={rootField}>
                <InputLabel
                  htmlFor="inputVendor"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: -15,
                  }}
                >
                  ATM ID :
                </InputLabel>
                <InputCustom placeholder="Masukan ATM ID" id="inputVendor" />
              </Grid>

              <Grid item className={rootField}>
                <InputLabel
                  htmlFor="prioritySelect"
                  style={{ fontWeight: 'bold', fontSize: 13, color: '#000' }}
                >
                  Priority :
                </InputLabel>
                <FormControl variant="outlined" className={formControlSelect}>
                  <Select
                    id="prioritySelect"
                    value={priority}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>- Select one -</em>
                    </MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

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
};

export default ModalDialog;
