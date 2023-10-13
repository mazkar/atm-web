import React, { useContext } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';

import { ReactComponent as CalcIcon } from '../../../../assets/icons/general/calculator_overview.svg';
import AtmDonutChart from './AtmDonutChart';
import { SiteManOvContext } from '../index';
import LoadingView from '../../../../components/Loading/LoadingView';

const AtmImplementation = () => {
  const { atmImpData } = useContext(SiteManOvContext);

  const {
    newAtmImplementation = {},
    renewalImplementation = {},
    terminImplementation = {},
    replaceImplementation = {},
  } = atmImpData || {};

  const { online, progress } = newAtmImplementation;
  const { hasBukpot, inprogress } = renewalImplementation;
  const { hasPull } = terminImplementation;

  const newData = newAtmImplementation
    ? [
        {
          status: 'Online',
          value: online,
        },
        {
          status: 'Inprogress',
          value: progress,
        },
        {
          status: 'Target',
          value: newAtmImplementation.target,
        },
      ]
    : null;

  const renewalData = renewalImplementation
    ? [
        {
          status: 'Done',
          value: hasBukpot,
        },
        {
          status: 'Inprogress',
          value: inprogress,
        },
        {
          status: 'Target',
          value: renewalImplementation.target,
        },
      ]
    : null;

  const terminData = terminImplementation
    ? [
        {
          status: 'Done',
          value: hasPull,
        },
        {
          status: 'Inprogress',
          value: terminImplementation.inprogress,
        },
        {
          status: 'Target',
          value: terminImplementation.target,
        },
      ]
    : null;

  const replaceData = replaceImplementation
    ? [
        {
          status: 'Done',
          value: replaceImplementation.hasDone,
        },
        {
          status: 'Inprogress',
          value: replaceImplementation.inprogress,
        },
        {
          status: 'Target',
          value: replaceImplementation.target,
        },
      ]
    : null;

  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
          padding: 20,
        }}
      >
        {atmImpData == null ? (
          <LoadingView maxheight='100%' />
        ) : (
          <>
            <div
              style={{
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CalcIcon />
              <Typography
                style={{
                  fontWeight: 500,
                  fontSize: '15px',
                  lineHeight: '18px',
                  marginLeft: 10,
                }}
              >
                RBB Implementation
              </Typography>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <AtmDonutChart title='New ATM' data={newData} />
              </Grid>
              <Grid item xs={3}>
                <AtmDonutChart title='Renewal' data={renewalData} />
              </Grid>
              <Grid item xs={3}>
                <AtmDonutChart title='Termin' data={terminData} />
              </Grid>
              <Grid item xs={3}>
                <AtmDonutChart title='Replace' data={replaceData} />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </div>
  );
};

export default AtmImplementation;

const isi = {
  contents: {
    new: [
      {
        status: 'Online',
        value: 20201,
      },
      {
        status: 'On Progress',
        value: 3329,
      },
    ],
    termin: [
      {
        status: 'Sudah Tarik',
        value: 20201,
      },
      {
        status: 'Inprogress',
        value: 3329,
      },
    ],
    renewal: [
      {
        status: 'Sudah Bukpot',
        value: 20201,
      },
      {
        status: 'Inprogress',
        value: 3329,
      },
    ],
  },
};
