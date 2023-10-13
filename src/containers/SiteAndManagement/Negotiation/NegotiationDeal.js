import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import constants from '../../../helpers/constants';
import paperClip from '../../../assets/icons/siab/paperclip-white.png';

const useStyles = makeStyles({
  paper: {
    // position: 'absolute',
    backgroundColor: constants.color.white,
    width: '440px',
    height: '248px',
    borderRadius: 10,
    margin: 5,
  },

  container: {
    margin: 20,
  },

  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 8,
    width: 120,
    height: 32,
  },
  textClose: {
    fontSize: 28,
    fontWeight: 500,
    // margin: 15,
    // marginLeft: 20,
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

  clipFormat: {
    fontSize: 14,
    fontFamily: 'Barlow',
    fontWeight: 400,
    color: '#DC241F',
    cursor: 'pointer',
  },
  areaText: {
    width: '410px',
    height: '70px',
    borderRadius: 8,
    backgroundColor: constants.color.white,
  },

  formButtonContainer: {
    marginTop: 10,
    marginLeft: 300,
  },
  formButton: {
    backgroundColor: constants.color.primaryHard,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: 8,
    color: constants.color.white,
    width: 120,
    height: 32,
    textTransform: 'none',
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 180,
    height: 22,
    borderRadius: 8,
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

const NegoDeal = () => {
  const classes = useStyles();

  return (
    <Box className={classes.paper}>
      <Grid container direction="column" className={classes.container}>
        <Grid item>
          <Typography className={classes.textClose}>Close Deal</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            component="p"
            style={{
              fontSize: 11,
              fontWeight: 400,
              fontFamily: 'Barlow',
              marginTop: 10,
            }}
          >
            Harga yang telah disepakati:
          </Typography>
          <BootstrapInput
            placeholder=" Rp 35.000.000"
            className={classes.textField}
          />
          <Grid style={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>
            <img
              src={paperClip}
              style={{ width: 11.34, height: 12.02, marginRight: 5 }}
              alt=""
            />
            <Typography className={classes.clipFormat}>Attach File</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NegoDeal;
