import React from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import constants from '../../../helpers/constants';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 430,
    height: 106,
    borderRadius: 10,
  },

  container: {
    margin: 5,
  },

  buttonContainer: {
    marginTop: 75,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 8,
    width: 120,
    height: 32,
  },
  textField: {
    '& .MuiInputBase-root': {
      width: 270,
      height: 32,
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
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 270,
    // height: 32,
    borderRadius: 10,
    position: 'relative',
    border: '1px solid #BCC8E7',
    backgroundColor: '#F4F7FB',
    fontSize: 13,
    padding: '5px',
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

const ModalDialog = ({ isOpen, onClose }) => {
  const { modal, paper, container, primaryButton, textField } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      // aria-labelledby="simple-modal-title"
      // aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid
          container
          justify="space-between"
          alignItems="baseline"
          direction="column"
          spacing={1}
          className={container}
        >
          <Grid item>
            <Typography
              variant="h6"
              component="p"
              style={{ fontSize: 13, fontWeight: 500, fontFamily: 'Barlow' }}
            >
              Harga Penawaran
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: 11, fontWeight: 400, fontFamily: 'Barlow' }}
            >
              Penawaran Baru :
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-around">
          <Grid item>
            <BootstrapInput
              placeholder=" Rp 35.000.000"
              className={textField}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onClose}
            >
              Submit
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
};

export default ModalDialog;
