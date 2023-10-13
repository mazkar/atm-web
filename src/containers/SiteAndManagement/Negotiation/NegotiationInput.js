import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import constants from '../../../helpers/constants';
import paperClip from '../../../assets/icons/siab/paperclip-white.png';
import ModalLoader from '../../../components/ModalLoader';

const useStyles = makeStyles({
  paper: {
    // position: 'absolute',
    backgroundColor: constants.color.white,
    width: 'auto',
    height: '248px',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    margin: 5,
  },

  container: {
    padding: '0 0 0 5px',
    margin: 10,
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

  clipFormat: {
    fontSize: 14,
    fontFamily: 'Barlow',
    fontWeight: 400,
    color: '#DC241F',
    cursor: 'pointer',
  },
  areaText: {
    width: '425px',
    height: '70px',
    borderRadius: 8,
    backgroundColor: constants.color.white,
  },

  formButtonContainer: {
    padding: '0 0 0 20px',
    marginTop: 10,
    marginLeft: 300,
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

const NegoInput = ({ onClick }) => {
  const {
    paper,
    container,
    primaryButton,
    textField,
    clipFormat,
    areaText,
    formButtonContainer,
    formButton,
  } = useStyles();

  const [textAreaValue, setTextAreaValue] = useState('');
  const [offerCIMB, setOfferCIMB] = useState(0);
  const [offerLandLord, setOfferLandLord] = useState(0);
  const [isOpenModalLoader, setModalLoader] = useState(false);

  const getLocId = () => {
    const status = localStorage.getItem('negoLocId');
    if (status) {
      const splitStatus = status.split(' ');
      return splitStatus;
    }
    return '-';
  };

  const submitQuota = async () => {
    const locId = getLocId();
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/saveNegotiation`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          id: '',
          locationId: locId[0],
          offeringPriceLandlord: parseInt(offerLandLord),
          note: textAreaValue,
          offeringPriceCimb: parseInt(offerCIMB),
        },
      });
      const getData = data;
      console.log('Submit Quote ====> : ', getData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error submitting Quote : \n ${error}`);
    }
  };

  return (
    <>
      <Box className={paper}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          style={{ padding: '0 0 0 15px' }}
        >
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="p"
              style={{
                fontSize: 13,
                fontWeight: 400,
                fontFamily: 'Barlow',
                marginTop: 10,
                padding: '0 0 8px',
              }}
            >
              Penawaran CIMB :
            </Typography>
            <BootstrapInput
              placeholder=" Rp 35.000.000"
              className={textField}
              onChange={(e) => setOfferCIMB(e.target.value)}
            />
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ padding: '12px 0 0 5px' }}
            >
              <img
                src={paperClip}
                style={{ width: 11.34, height: 12.02, marginRight: 5 }}
                alt=""
              />
              <Typography className={clipFormat}>Attach File</Typography>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="p"
              style={{
                fontSize: 13,
                fontWeight: 400,
                fontFamily: 'Barlow',
                marginTop: 10,
                padding: '0 0 8px',
              }}
            >
              Penawaran Landlord :
            </Typography>
            <BootstrapInput
              placeholder=" Rp 35.000.000"
              className={textField}
              onChange={(e) => setOfferLandLord(e.target.value)}
            />
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ padding: '12px 0 0 5px' }}
            >
              <img
                src={paperClip}
                style={{ width: 11.34, height: 12.02, marginRight: 5 }}
                alt=""
              />
              <Typography className={clipFormat}>Attach File</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container direction="row" justify="space-evenly" className={container} 
            style={{ background: '#68de7a' }}
            >
                
            </Grid>
            <Grid container className={container}  justify="space-between"
            style={{ background: '#dead68' }}
            >
                
                <Grid style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <img src={paperClip} style={{ width: 11.34, height: 12.02, marginRight: 5 }} alt="" />
                    <Typography className={clipFormat}>Attach File</Typography>
                </Grid>

            </Grid> */}
        <Grid container className={container} direction="column">
          <Grid item>
            <Typography
              variant="p"
              component="p"
              style={{ fontFamily: 'Barlow', fontSize: 14, fontWeight: 500 }}
            >
              Note
            </Typography>
          </Grid>
          <Grid item>
            <TextArea
              placeholder="(Optional)"
              className={areaText}
              onChange={(e) => setTextAreaValue(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container className={formButtonContainer} justify="flex-start">
          <Grid item>
            <Button
              className={formButton}
              variant="contained"
              onClick={submitQuota}
            >
              Submit Quote
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

NegoInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onClick: PropTypes.func.isRequired,
};

export default NegoInput;
