import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    Paper,
    TextField,
    Tabs,
    Tab,
    Box,
    Card,
    CardContent
  } from '@material-ui/core';
import constants from '../../helpers/constants';
import { makeStyles } from '@material-ui/core/styles';
import sudirmanAtmImage from '../../assets/images/atm-1.png';
import senayanAtmImage from '../../assets/images/atm-2.png';
import jogjaAtmImage from '../../assets/images/atm-3.png';
import moment from 'moment';

const useStyles = makeStyles({
    contentHeader: {
      padding: 20,
    },
    contentBody: {
      zIndex: 1000,
      position: 'relative',
    },
    title: {
      fontWeight: 500,
      fontSize: 36,
      color: constants.color.dark,
      textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
    },
    maps: {
      position: 'relative',
      overflow: 'scroll',
      height: '77vh',
      width: '100%',
      backgroundColor: constants.color.primaryHard,
    },
    drawer: {
      '& .MuiDrawer-paper': {
        zIndex: 1001,
        padding: '90px 0 0',
      },
    },
    drawerContainer: {
      padding: '20px 50px 0px 0px',
      width: '550px',
    },
    drawerContainerTop: {
      padding: '5px 30px 5px 30px',
      width: '550px',
    },
    drawerContainerATM: {
      padding: '0',
    },
    inputContainer: {
      '& .MuiTextField-root': {
        width: '500px',
      },
    },
    cardContainerPrimary: {
      boxShadow: '0px 16px 24px rgba(232, 238, 255, 0.6)',
      borderRadius: 10,
      width: 'auto',
    },
    cardContainerSecondary: {
      boxShadow: 'none',
      border: '1px solid #E6EAF3',
      borderRadius: 10,
      width: 'auto',
    },
    cardImage: {
      height: 140,
    },
    cardSectionInfo: {
      marginBottom: 12,
    },
    cardSectionTransaction: {
      marginTop: 15,
    },
    currency: {
      color: constants.color.primaryHard,
      fontWeight: 500,
    },
    ATMname: {
      // marginRight: 100,
      position: 'sticky',
      fontSize: '13px'
    },
    rentPriceSection: {
      backgroundColor: 'rgba(244, 247, 251, 0.5)',
      marginTop: 70,
      marginBottom: 94,
      padding: '46px 30px 42px 30px',
    },
    buttonSection: {
      // width: '550px',
      marginBottom: 30,
      marginTop: 25,
    },
    buttonPrimary: {
      backgroundColor: constants.color.primaryHard,
      color: constants.color.white,
      borderRadius: 10,
      padding: '10px 20px',
    },
    buttonSecondary: {
      backgroundColor: constants.color.secondaryMedium,
      color: constants.color.white,
      borderRadius: 10,
      padding: '10px 20px',
    },
    buttonOutlined: {
      border: `1px solid ${constants.color.primaryHard}`,
      color: constants.color.primaryHard,
      borderRadius: 10,
      padding: '10px 20px',
      height: '40px',
      textTransform: "capitalize"
    },
    statusGood: {
      border: '1px solid #65D170',
      backgroundColor: '#DEFFE1',
      color: '#65D170',
      borderRadius: 12,
      padding: '1px 10px 1px 10px',
      fontSize: '10px',
      width: 50,
    },
    statusBad: {
      border: '1px solid #FF6A6A',
      backgroundColor: '#FFF6F6',
      color: '#FF6A6A',
      borderRadius: 12,
      padding: '1px 10px 1px 13px',
      fontSize: '10px',
      width: 50,
    },
    widgetContainer: {
      position: 'absolute',
      margin: 30,
      maxWidth: 520,
      maxHeight: 560,
    },
    inputContainerHalf: {
      '& .MuiOutlinedInput-input': {
        width: '100%',
      },
      closeIcon: {
        color: constants.color.primaryHard,
        margin: 10,
      },
    },
  });

  const dataset = {
    atmMachineData: [
      {
        id: 10029111,
        image: sudirmanAtmImage,
        name: 'Alfamidi Sudirman',
        address: 'Jl. Bibis Raya',
        type: 'Retail',
        model: 'CTH - 1292',
        averageTransaction: 184_002_883,
        revenue: 15_201_332,
        status: 'Good',
        distanceInMeter: 0
      },
      {
        id: 10029112,
        image: senayanAtmImage,
        name: 'Plaza Senayan',
        address: 'Jl. Bibis Raya',
        type: 'Plaza',
        model: 'CTH - 1292',
        averageTransaction: 145_000_000,
        revenue: 1_230_000_000,
        status: 'Bad',
        distanceInMeter: 0
      },
      {
        id: 10029113,
        image: jogjaAtmImage,
        name: 'Jogja City Mall',
        address: 'Jl. Bibis Raya',
        type: 'Plaza',
        model: 'CTH - 1292',
        averageTransaction: 8_029_992_883,
        revenue: 100_298_884_289,
        status: 'Good',
        distanceInMeter: 0
      },
    ],
  };

var monthsInd = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'Mei',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Agu',
  '09': 'Sep',
  '10': 'Okt',
  '11': 'Nov',
  '12': 'Des',
};

const meterToKilometer = (num) => {
  const newNum = num / 1000;
  return newNum.toFixed(1);
};

const dateConverter = (tanggal) => {
  const dateNya = moment(new Date(tanggal)).format('DD/MM/YYYY');
  return dateNya;
};

const getFullDate = (date) => {
  const getDate = dateConverter(date);
  const splitDate = getDate.split('/');
  return `${splitDate[0]} ${monthsInd[splitDate[1]]} ${splitDate[2]}`;
};

const idrCurrencyFormat = (value, delimiter) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

const ContentLocation = ({data, onCancel, onClickSaveLocation, onClickPostPhone, maxWidth = false}) => {
    const {
      contentHeader,
      contentBody,
      title,
      maps,
      drawer,
      drawerContainer,
      drawerContainerTop,
      drawerContainerATM,
      inputContainer,
      cardImage,
      cardSectionInfo,
      cardSectionTransaction,
      currency,
      cardContainerPrimary,
      cardContainerSecondary,
      rentPriceSection,
      buttonSection,
      buttonPrimary,
      buttonSecondary,
      buttonOutlined,
      statusGood,
      statusBad,
      widgetContainer,
      ATMname,
      inputContainerHalf,
      closeIcon,
    } = useStyles();

    const { atmMachineData } = dataset;
    const defDistance = 0;

    useEffect(() => {
      console.log("DAGOR DAGORAT : ", data);
    }, [data]);

    return (
      <>
        <Grid container className={drawerContainer} style={{width: maxWidth && "100%", padding: maxWidth && "20px 0px 0px 0px"}} spacing={3}>
        <Grid container direction="column" spacing={1}>
                  {data.map(
                    (
                      {
                        atmId,
                        locationName,
                        name,
                        image,
                        locationAddress,
                        address,
                        locationType,
                        type,
                        potentialModel,
                        itemTransactionTotal,
                        averageTransaction,
                        cassaAmount,
                        revenueAmount,
                        condition,
                        distanceInMeter,
                        rentPeriod,
                        endRentDate,
                        openingType,
                      },
                      index
                    ) => (
                      <Grid key={atmId} item xs>
                        <Card className={cardContainerSecondary}>
                          <CardContent
                          >
                            <Box className={cardSectionInfo}>
                              <Grid
                                container
                                className={drawerContainerATM}
                                spacing={1}
                                style={{width: maxWidth && "100%"}} 
                              >
                                <Grid
                                  container
                                  direction="row"
                                  justify="space-between"
                                  alignItems="center"
                                  spacing={10}
                                >
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h2"
                                      className={ATMname}
                                    >
                                      {locationName}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body1"
                                      component="p"
                                      className={
                                        condition === 'Bad'
                                          ? statusBad
                                          : statusGood
                                      }
                                    >
                                      {condition}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  direction="row"
                                  justify="flex-start"
                                  spacing={1}
                                >
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="h2"
                                      style={{
                                        fontSize: '11px',
                                        fontWeight: 400,
                                      }}
                                    >
                                      {atmId}
                                    </Typography>
                                  </Grid>
                                  <Grid item style={{fontSize: '11px', fontWeight: 400, color: '#DC241F'}}>
                                    {potentialModel}
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  direction="row"
                                  justify="space-between"
                                  spacing={1}
                                >
                                  <Grid item>
                                    <Typography
                                      gutterBottom
                                      variant="body1"
                                      component="p"
                                      style={{
                                        fontSize: '10px',
                                        fontWeight: 400,
                                        color: '#8D98B4',
                                      }}
                                    >
                                      {locationType} • {locationAddress} •{' '}
                                      {distanceInMeter === 0
                                        ? defDistance
                                        : meterToKilometer(
                                            distanceInMeter
                                          )}{' '}
                                      Km
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  direction="row"
                                  justify="space-between"
                                  spacing={1}
                                  style={{ marginLeft: '0px' }}
                                >
                                  <Grid item style={{ marginTop: 3 }}>
                                    <Grid
                                      container
                                      direction="column"
                                      spacing={1}
                                    >
                                      <Grid
                                        container
                                        direction="row"
                                        spacing={1}
                                      >
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          Periode Sewa
                                        </Grid>
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          : {rentPeriod === "null" || rentPeriod === null ? "-" : rentPeriod} Tahun
                                        </Grid>
                                      </Grid>

                                      <Grid
                                        container
                                        direction="row"
                                        spacing={1}
                                      >
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          Due Date
                                        </Grid>
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          : {getFullDate(endRentDate)}
                                        </Grid>
                                      </Grid>

                                      {/* <Grid
                                        container
                                        direction="row"
                                        spacing={1}
                                      >
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          Status
                                        </Grid>
                                        <Grid
                                          item
                                          style={{
                                            fontSize: '10px',
                                            fontWeight: 400,
                                          }}
                                        >
                                          : {openingType}
                                        </Grid>
                                      </Grid> */}

                                    </Grid>

                                  </Grid>

                                  <Grid item>
                                    <Grid
                                      container
                                      direction="column"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 400,
                                        }}
                                      >
                                        Average Transaction
                                      </Grid>
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '13px',
                                          fontWeight: 600,
                                          color: '#DC241F',
                                        }}
                                      >
                                        {averageTransaction !== null ? idrCurrencyFormat(averageTransaction, '.') : '-'}
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item>
                                    <Grid
                                      container
                                      direction="column"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 400,
                                        }}
                                      >
                                        CASA
                                      </Grid>
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '13px',
                                          fontWeight: 600,
                                          color: '#DC241F',
                                        }}
                                      >
                                        {cassaAmount !== null ? idrCurrencyFormat(cassaAmount, '.') : '-'}
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid item>
                                    <Grid
                                      container
                                      direction="column"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 400,
                                        }}
                                      >
                                        Revenue
                                      </Grid>
                                      <Grid
                                        item
                                        style={{
                                          fontSize: '13px',
                                          fontWeight: 600,
                                          color: '#DC241F',
                                        }}
                                      >
                                        {revenueAmount !== null ? idrCurrencyFormat(revenueAmount, '.') : '-'}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>

          <Grid
            container
            justify="space-between"
            className={buttonSection}
            spacing={1}
          >
            <Grid item>
              <Button
                variant="outlined"
                disableElevationd
                className={buttonOutlined}
                onClick={onCancel}
                //   onClick={toggleCloseDrawer}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                className={buttonOutlined}
                onClick={onClickSaveLocation}
              >
                Save Location
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                className={buttonOutlined}
                onClick={onClickPostPhone}
              >
                Postpone
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export default ContentLocation;