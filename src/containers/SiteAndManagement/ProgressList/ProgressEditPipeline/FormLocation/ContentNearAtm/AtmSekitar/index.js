/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent
} from '@material-ui/core';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import constants from '../../../../../../../helpers/constants';

const useStyles = makeStyles({
  drawerContainer: {
    padding: 20,
  },
  drawerContainerATM: {
    padding: '0',
  },
  cardContainerSecondary: {
    boxShadow: 'none',
    border: '1px solid #E6EAF3',
    borderRadius: 10,
    width: 'auto',
  },
  cardSectionInfo: {
    marginBottom: 12,
  },
  ATMname: {
    // marginRight: 100,
    position: 'sticky',
    fontSize: '13px'
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

const dataset =  [
  {
    "atmId": "5925",
    "locationName": "DUMMY DATA",
    "potentialModel": "",
    "locationType": null,
    "locationAddress": "Jl. Abdul Fatah/Tenjo - Jasinga Kp Sukamulya RT.01/02",
    "locationPhotosUrl": null,
    "latitude": "-6.327895",
    "longitude": "106.460866",
    "itemTransactionTotal": null,
    "condition": "Good",
    "distanceInMeter": 3253,
    "polyline": "tgpe@ifuhSn@v@z@tAv@v@h@Tz@LvB^lCp@`@Ln@RNJVZXt@XdAZv@Zd@f@`@TN@SDMHEfABXIJKPYv@sB~@oBvAiCx@cBtB}EpBqDdB{B~AkBl@k@n@m@z@q@VQx@a@fCi@pA]lAa@t@KrD{@h@ODEB]Fq@FYHIvAKp@Er@Ql@Yd@QJk@Di@?o@UoDEqBM}EPkD\\iGH[BoADq@`@}BRuABw@Ek@aAiCw@sAq@wA",
    "rentPeriod": "1",
    "endRentDate": 1672419600000,
    "openingType": null,
    "averageTransaction": 2104,
    "cassaAmount": 2433434294,
    "revenueAmount": 110117484,
    "machineType": "ATM"
  },
  {
    "atmId": "4912",
    "locationName": "TGR.Indomaret Taman Adiyasa (F58L)",
    "potentialModel": "",
    "locationType": null,
    "locationAddress": "Perum Taman Adiyasa Blok F no. 09 - 10 RT/RW. 001/008",
    "locationPhotosUrl": null,
    "latitude": "-6.325909",
    "longitude": "106.421862",
    "itemTransactionTotal": null,
    "condition": "Good",
    "distanceInMeter": 3344,
    "polyline": "tgpe@ifuhSn@v@z@tAv@v@h@Tz@LvB^lCp@`@Ln@RNJVZXt@XdAZv@Zd@f@`@pA~@d@^|@xAL^Hx@HjE?dBG|A@~@FbAD`EHn@FZ^lAJV@NQfAA~@DVTj@XZtBrBx@j@PLTL~Bf@tGhApAZ`@^vDhG~ClEj@`AJTJ^EV[lAOd@]`AS`@ONAHBv@Ff@LhBl@zEHtALzCR~HRpGBf@BBDDBPKNC@NzD",
    "rentPeriod": "2",
    "endRentDate": 1672419600000,
    "openingType": null,
    "averageTransaction": 3390,
    "cassaAmount": 7883102886,
    "revenueAmount": 168706457,
    "machineType": "ATM"
  },
  {
    "atmId": "4283",
    "locationName": "TGR.SPBU 34-15713 Solear",
    "potentialModel": "",
    "locationType": null,
    "locationAddress": "Jl. Raya Cisoka, Solear",
    "locationPhotosUrl": null,
    "latitude": "-6.286054",
    "longitude": "106.415042",
    "itemTransactionTotal": null,
    "condition": "Good",
    "distanceInMeter": 7705,
    "polyline": "tgpe@ifuhS]e@Q]Qg@Me@Ua@[e@UUg@WeA_@cBe@wAYwAKeAAyIMyMc@{DOaKi@aOk@uKe@cOc@?bHFzA?z@BpBEdABn@EFKDOBEDCLC^CNKNORAhA?n@DNb@zB?LGFYPIJ?TRh@F\\EZ]n@KXCT^lAJt@J^FRHt@HtCBb@Nh@r@dBr@lAJn@Nl@N^N^XtAJj@?LCt@DzANfBPbB@b@DRPb@R\\DX?RLv@HbA?ZXpDb@vFH^JVHz@DlAVfGHpCHdB@v@CHIFKDc@FeDF{@FUL]^a@Fm@@{C?gBNcAFQ?e@E]Hg@j@}@r@Sj@Ip@a@zAYd@_APuAF_AL{Dh@K@y@Xy@^u@D}ADgCNc@HOHgAz@iAN{ADgBLgDL[B[Rs@p@INAJEjD@zCEhAEHs@NWDIDCHAFHXBPGT_@\\GX?^@tCKNg@NsBf@OFIJMh@Eb@Cj@EHSJS@w@@c@HQNe@t@Yh@WdAMrAIb@QPQJOTOFc@?iB?[HgAp@a@f@KZKl@K~AjD\\pELhDV|CZr@L\\Ft@T",
    "rentPeriod": "3",
    "endRentDate": 1661878800000,
    "openingType": null,
    "averageTransaction": 3271,
    "cassaAmount": 5958615753,
    "revenueAmount": 144333495,
    "machineType": "ATM"
  }
];

const monthsInd = {
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

const AtmSekitar = (props) => {
  const {data}= props;
  const classes = useStyles();

  const defDistance = 0;

  return (
    <>
      <Grid container className={classes.drawerContainer} spacing={3}>
        <Grid container direction="column" spacing={1}>
          {data.map((item, index) => (
            <Grid item>
              <Card className={classes.cardContainerSecondary}>
                <CardContent>
                  <Box className={classes.cardSectionInfo}>
                    <Grid container className={classes.drawerContainerATM} spacing={1}>
                      <Grid container direction="row" justify="space-between" alignItems="center" spacing={10}>
                        <Grid item>
                          <Typography gutterBottom variant="h6" component="h2" className={classes.ATMname} >
                            {item.locationName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant="body1" component="p"
                            className={item.condition === 'Bad' ? classes.statusBad : classes.statusGood}>
                            {item.condition}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row" justify="flex-start" spacing={1} >
                        <Grid item>
                          <Typography gutterBottom variant="h6" component="h2" style={{ fontSize: '11px', fontWeight: 400, }} >
                            {item.atmId}
                          </Typography>
                        </Grid>
                        <Grid item style={{fontSize: '11px', fontWeight: 400, color: '#DC241F'}}>
                          {item.potentialModel}
                        </Grid>
                      </Grid>

                      <Grid container direction="row" justify="space-between" spacing={1} >
                        <Grid item>
                          <Typography gutterBottom variant="body1" component="p" style={{ fontSize: '10px', fontWeight: 400, color: '#8D98B4'}}
                          >
                            {item.locationType} • {item.locationAddress} •{' '}
                            {item.distanceInMeter === 0
                              ? defDistance
                              : meterToKilometer(
                                item.distanceInMeter
                              )}{' '}
                                      Km
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row" justify="space-between" spacing={1} style={{ marginLeft: '0px' }}>
                        <Grid item style={{ marginTop: 3 }}>
                          <Grid container direction="column" spacing={1}
                          >
                            <Grid container direction="row" spacing={1} >
                              <Grid item style={{ fontSize: '10px', fontWeight: 400, }} >
                                Periode Sewa
                              </Grid>
                              <Grid item style={{ fontSize: '10px', fontWeight: 400}}
                              >
                                : {item.rentPeriod} Tahun
                              </Grid>
                            </Grid>

                            <Grid container direction="row" spacing={1} >
                              <Grid item style={{ fontSize: '10px', fontWeight: 400}}>
                                Due Date
                              </Grid>
                              <Grid item style={{ fontSize: '10px', fontWeight: 400}}
                              >
                                : {getFullDate(item.endRentDate)}
                              </Grid>
                            </Grid>

                            <Grid container direction="row" spacing={1}>
                              <Grid item style={{ fontSize: '10px', fontWeight: 400}}
                              >
                                Status
                              </Grid>
                              <Grid item style={{ fontSize: '10px', fontWeight: 400}}
                              >
                                : {item.openingType}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container direction="column" spacing={1} alignItems="center">
                            <Grid item style={{ fontSize: '10px', fontWeight: 400 }}>
                                Average Transaction
                            </Grid>
                            <Grid item style={{ fontSize: '13px', fontWeight: 600, color: '#DC241F'}}>
                              {item.averageTransaction !== null ? idrCurrencyFormat(item.averageTransaction, '.') : '-'}
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container direction="column" spacing={1} alignItems="center">
                            <Grid item style={{fontSize: '10px', fontWeight: 400}}>
                                CASA
                            </Grid>
                            <Grid item style={{fontSize: '13px', fontWeight: 600, color: '#DC241F'}}
                            >
                              {item.cassaAmount !== null ? idrCurrencyFormat(item.cassaAmount, '.') : '-'}
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container direction="column" spacing={1} alignItems="center">
                            <Grid item style={{ fontSize: '10px', fontWeight: 400}}>
                                Revenue
                            </Grid>
                            <Grid item style={{fontSize: '13px', fontWeight: 600, color: '#DC241F'}}>
                              {item.revenueAmount !== null ? idrCurrencyFormat(item.revenueAmount, '.') : '-'}
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
      </Grid>
    </>
  );
};

AtmSekitar.propTypes = {
  data: PropTypes.object,
};

AtmSekitar.defaultProps = {
  data: dataset,
};

export default AtmSekitar;