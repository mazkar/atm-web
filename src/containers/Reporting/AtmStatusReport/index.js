/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import ModalLoader from '../../../components/ModalLoader';
import constansts from '../../../helpers/constants';
import MachinePopulationBarChart from '../../../components/Chart/MachinePopulationBarChart';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constansts.color.dark,
  },
  tombolAdd: {textAlign: 'right',},
  filterContainer: {marginBottom: 15,},
  tableContent: {},
});

const dataPopulation = [
  {
    provinsi: 'Banten',
    offline: 300,
    online: 500,
  },
  {
    provinsi: 'DKI Jakarta',
    offline: 100,
    online: 900,
  },
  {
    provinsi: 'Jawa Tengah',
    offline: 200,
    online: 750,
  },
  {
    provinsi: 'Jawa Barat',
    offline: 480,
    online: 720,
  },
  {
    provinsi: 'Jawa Timur',
    offline: 150,
    online: 690,
  },
  {
    provinsi: 'Yogyakarta',
    offline: 100,
    online: 400,
  },
  {
    provinsi: 'Bali',
    offline: 200,
    online: 350,
  },
  {
    provinsi: 'Aceh',
    offline: 120,
    online: 650,
  },
  {
    provinsi: 'NTT',
    offline: 400,
    online: 670,
  },
  {
    provinsi: 'Medan',
    offline: 120,
    online: 470,
  },
  {
    provinsi: 'Sumatera Barat',
    offline: 190,
    online: 390,
  },
  {
    provinsi: 'Sumatera Utara',
    offline: 150,
    online: 680,
  },
  {
    provinsi: 'Kalimantan Barat',
    offline: 240,
    online: 820,
  },
  {
    provinsi: 'Kalimantan Selatan',
    offline: 230,
    online: 610,
  },
  {
    provinsi: 'Kalimantan Timur',
    offline: 111,
    online: 590,
  },
  {
    provinsi: 'Sulawesi Tenggara',
    offline: 270,
    online: 600,
  },
  {
    provinsi: 'Sulawesi Barat',
    offline: 180,
    online: 890,
  },
  {
    provinsi: 'Sulawesi Timur',
    offline: 250,
    online: 499,
  },
  {
    provinsi: 'Gorontalo',
    offline: 260,
    online: 500,
  },
];

function AtmStatusReport() {
  const classes = useStyles();
  // =========> FETCHING DATA
  // modalLoader
  const [isOpenModalLoader, setModalLoader] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography  className={classes.title}>ATM Status</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <MachinePopulationBarChart data={dataPopulation} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <div/>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
      
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(AtmStatusReport))
);