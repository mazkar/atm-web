/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from '@material-ui/core';
import { Input, InputNumber, Image } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import constants from '../../../helpers/constants';
import ModalLoader from '../../../components/ModalLoader';
import LoadingView from '../../../components/Loading/LoadingView';

import { ReactComponent as IconLeft } from '../../../assets/icons/siab/chevron-left.svg';
import { ReactComponent as IconRight } from '../../../assets/icons/siab/chevron-right.svg';
// import numeral from 'numeral';
import util from '../../../helpers/utility';
import ErrorComponent from '../../LocationProfilling/ErrorComponent';
import { useMedianMath } from '../../../helpers';

const {numeral} = util;

// numeral.register('locale', 'id', {
//   delimiters: {
//     thousands: '.',
//     decimal: ',',
//   },
//   abbreviations: {
//     thousand: 'rb',
//     million: 'jt',
//     billion: 'M',
//     trillion: 'T',
//   },
//   ordinal: function (number) {
//     return 'ke';
//   },
//   currency: {
//     symbol: 'Rp',
//   },
// });

// numeral.locale('id');

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    // width: 'max-content',
    height: 'max-content',
    width: '60%',
    borderRadius: 10,
    padding: 50,
  },
  columnBox: {
    paddingLeft: 20,
  },
  titleGrid: {
    textAlign: 'center',
  },
  spanFrmTo:{
    position: 'absolute',
    zIndex: 1,
    top: 8,
    left: 6,
    fontSize: 12,
    color: '#bcc8e7'
  },
  formatInput: {
    paddingRight: 10,
    paddingLeft: 20,
    border: '1px solid #BCC8E7',
    borderRadius: 8,
    height: 35,
    width: '100%',
    textAlign: 'right',
    fontSize: 15,
  },
  gridGrey: {
    textAlign: 'center',
    backgroundColor: '#E6EAF3',
    height: 10,
    color: '#8D98B4',
  },
  buttonContainer: {
    marginTop: 50,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    margin: -20,
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  inputParam: {
    '& .ant-input-affix-wrapper-lg': {
      borderRadius: 6,
      height: 35,
    },
  },
});

const Parameterize = ({ isOpen, onClose, onFilter, data, handleLoading }) => {
  const {
    root,
    modal,
    paper,
    columnBox,
    titleGrid,
    formatInput,
    gridGrey,
    buttonContainer,
    primaryButton,
    secondaryButton,
    closeIcon,
    inputParam,
    spanFrmTo
  } = useStyles();

  const [highCasaData, setHighCasa] = useState(0);
  const [highTrxData, setHighTrx] = useState(0);
  const [highRevData, setHighRev] = useState(0);

  const [mediumCasaData, setMediumCasa] = useState(0);
  const [mediumTrxData, setMediumTrx] = useState(0);
  const [mediumRevData, setMediumRev] = useState(0);

  const [mediumCasaDataFrom, setMediumCasaFrom] = useState(0);
  const [mediumTrxDataFrom, setMediumTrxFrom] = useState(0);
  const [mediumRevDataFrom, setMediumRevFrom] = useState(0);

  const [lowCasaData, setLowCasa] = useState(0);
  const [lowTrxData, setLowTrx] = useState(0);
  const [lowRevData, setLowRev] = useState(0);

  const [anomalyData, setAnomaly] = useState(0);

  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    handleLoading(loadingData);
  }, [loadingData]);

  useEffect(() => {
    setMediumCasa(highCasaData);
    setMediumTrx(highTrxData);
    setMediumRev(highRevData);

    setMediumCasaFrom(lowCasaData);
    setMediumTrxFrom(lowTrxData);
    setMediumRevFrom(lowRevData);
    
  }, [lowCasaData,highCasaData, highTrxData,lowTrxData, highRevData,lowRevData]);

  const handleSaveHigh = (value) => {
    // console.log('handle change high casa', value.floatValue);
    if(value.floatValue === undefined){
      setHighCasa(0);
    }else{
      setHighCasa(value.floatValue);
    }
  };

  const handleTrxHigh = (value) => {
    // console.log('handle change high transaction', value.floatValue);
    if(value.floatValue === undefined){
      setHighTrx(0);
    }else{
      setHighTrx(value.floatValue);
    }
  };

  const handleRevHigh = (value) => {
    // console.log('handle change high revenue', value.floatValue);
    if(value.floatValue === undefined){
      setHighRev(0);
    }else{
      setHighRev(value.floatValue);
    }
  };

  const handleSaveMed = (value) => {
    // console.log('handle change medium casa', value.floatValue);
    if(value.floatValue === undefined){
      setMediumCasa(0);
    }else{
      setMediumCasa(value.floatValue);
    }
  };

  const handleTrxMed = (value) => {
    // console.log('handle change medium transaction', value.floatValue);
    if(value.floatValue === undefined){
      setMediumTrx(0);
    }else{
      setMediumTrx(value.floatValue);
    }
  };

  const handleRevMed = (value) => {
    // console.log('handle change medium revenue', value.floatValue);
    if(value.floatValue === undefined){
      setMediumRev(0);
    }else{
      setMediumRev(value.floatValue);
    }
  };

  const handleSaveLow = (value) => {
    // console.log('handle change low casa', value.floatValue);
    if(value.floatValue === undefined){
      setLowCasa(0);
    }else{
      setLowCasa(value.floatValue);
    }
  };

  const handleTrxLow = (value) => {
    // console.log('handle change low transaction', value.floatValue);
    if(value.floatValue === undefined){
      setLowTrx(0);
    }else{
      setLowTrx(value.floatValue);
    }
  };

  const handleRevLow = (value) => {
    // console.log('handle change low revenue', value);
    if(value.floatValue === undefined){
      setLowRev(0);
    }else{
      setLowRev(value.floatValue);
    }
  };

  const handleAnom = (value) => {
    // console.log('+++ handle change anomaly', value.floatValue);
    if(value.floatValue === undefined){
      // console.log('+++ undefined anomaly');
      setAnomaly(0);
    }else if (value.floatValue < 100) {
      // console.log('+++ set anomaly');
      setAnomaly(value.floatValue / 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataHit = {
      highCasa: highCasaData,
      mediumCasa: mediumCasaData,
      lowCasa: lowCasaData,

      highTransaction: highTrxData,
      mediumTransaction: mediumTrxData,
      lowTransaction: lowTrxData,

      highRevenue: highRevData,
      mediumRevenue: mediumRevData,
      lowRevenue: lowRevData,

      anomaly: anomalyData,
    };
    // console.log('+++ dataHit', dataHit);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
    setLoadingData(true);
    try {
      axios
        .patch(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings/updateParameter`,
          dataHit,
          config
        )
        .then((res) => {
          setLoadingData(false);
          console.log('ini data res', res);
          if (res.status === 200) {
            if (window.confirm("Update Parameterize Successfully, Back to modeling page?")){
              window.location.assign('/modeling-model');
            }
            // console.log('ini berhasil');
          }
        })
        .catch((error) => {
          alert(`Error Fetching Parameterize Update : \n ${error}`);
          console.log('ini error', error);
          setLoadingData(false);
        });
    } catch {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    setHighCasa(data.highCasaData);
    setHighTrx(data.highTrxData);
    setHighRev(data.highRevData);

    setMediumCasa(data.mediumCasaData);
    setMediumTrx(data.mediumTrxData);
    setMediumRev(data.mediumRevData);

    setLowCasa(data.lowCasaData);
    setLowTrx(data.lowTrxData);
    setLowRev(data.lowRevData);
    setAnomaly(data.anomalyData);
  }, [data]);

  return (
    <div className={root}>
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

          <div>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              spacing={5}
              className={columnBox}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  component="h4"
                  style={{ marginBottom: 20 }}
                >
                Parameterize
                </Typography>
              </Grid>

              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="row-reverse"
                spacing={5}
                style={{ paddingBottom: 20 }}
              >
                <Grid item xs={3} className={titleGrid}>
                  <Typography style={{ fontWeight: 'bold' }}>
                  Revenue Per Cost
                  </Typography>
                </Grid>

                <Grid item xs={3} className={titleGrid}>
                  <Typography style={{ fontWeight: 'bold' }}>
                  Transaction
                  </Typography>
                </Grid>

                <Grid item xs={3} className={titleGrid}>
                  <Typography style={{ fontWeight: 'bold' }}>
                  Saving Account
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <p> </p>
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                spacing={5}
                style={{ paddingBottom: 20 }}
              >
                <Grid item xs={3} className={gridGrey}>
                  <Typography style={{ lineHeight: 0 }}>High</Typography>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconRight
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleSaveHigh}
                      value={highCasaData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconRight
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleTrxHigh}
                      value={highTrxData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconRight
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleRevHigh}
                      value={highRevData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                spacing={5}
                style={{ paddingBottom: 5 }}
              >
                <Grid item xs={3} className={gridGrey}>
                  <Typography style={{ lineHeight: 0 }}>Medium</Typography>
                </Grid>
                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>To</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumCasaData}
                        thousandSeparator="."
                        decimalSeparator=","
                        thousandsGroupStyle="thousand"
                      // style={{paddingLeft: 35}}
                      />
                    </Tooltip>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>To</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumTrxData}
                        thousandSeparator="."
                        decimalSeparator=","
                        thousandsGroupStyle="thousand"
                      />
                    </Tooltip>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>To</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumRevData}
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>

              {/* MEDIUM FROM */}
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                spacing={5}
                style={{ paddingBottom: 20 }}
              >
                <Grid item xs={3}/>
                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>From</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumCasaDataFrom}
                        thousandSeparator="."
                        decimalSeparator=","
                        thousandsGroupStyle="thousand"
                        style={{paddingLeft: 35}}
                      />
                    </Tooltip>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>From</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumTrxDataFrom}
                        thousandSeparator="."
                        decimalSeparator=","
                        thousandsGroupStyle="thousand"
                        style={{paddingLeft: 35}}
                      />
                    </Tooltip>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <span className={spanFrmTo}>From</span>
                    </div>
                    <Tooltip title="Auto Fill" aria-label="auto-fill">
                      <NumberFormat
                        disabled
                        className={formatInput}
                        size="large"
                        placeholder="0"
                        value={mediumRevDataFrom}
                        thousandSeparator="."
                        decimalSeparator=","
                        style={{paddingLeft: 35}}
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>

              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
                spacing={5}
                style={{ paddingBottom: 20 }}
              >
                <Grid item xs={3} className={gridGrey}>
                  <Typography style={{ lineHeight: 0 }}>Low</Typography>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconLeft
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleSaveLow}
                      value={lowCasaData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconLeft
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleTrxLow}
                      value={lowTrxData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <div>
                      <IconLeft
                        style={{
                          position: 'absolute',
                          zIndex: 1,
                          top: 10,
                          left: 2,
                        }}
                      />
                    </div>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      placeholder="0"
                      onValueChange={handleRevLow}
                      value={lowRevData}
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandsGroupStyle="thousand"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid
                container
                justify="left"
                alignItems="center"
                direction="row"
                spacing={5}
              >
                <Grid item xs={3} className={gridGrey}>
                  <Typography style={{ lineHeight: 0 }}>% Anomaly</Typography>
                </Grid>

                <Grid item xs={3}>
                  <div style={{ display: 'flex', position: 'relative' }}>
                    <NumberFormat
                      className={formatInput}
                      size="large"
                      onValueChange={handleAnom}
                      placeholder="0%"
                      value={anomalyData * 100}
                      format="##%"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container justify="space-between" className={buttonContainer}>
                <Grid item>
                  <Button
                    variant="outlined"
                    disableElevation
                    className={secondaryButton}
                    onClick={onClose}
                    style={{ textTransform: 'capitalize' }}
                  >
                  Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={primaryButton}
                    onClick={handleSubmit}
                    style={{ textTransform: 'capitalize' }}
                  >
                  Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

Parameterize.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // onLeave: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
  handleLoading: PropTypes.bool,
};

Parameterize.dafaultProps = {
  handleLoading: false,
};
export default Parameterize;
