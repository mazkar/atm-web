import React, { useState } from 'react';
import { Paper, Typography, ButtonGroup, Grid } from '@material-ui/core';

import { ReactComponent as TitleRateIcon } from '../../../../assets/icons/general/transaction_rate_overview.svg';
import BtnGroupItem from './BtnGroupItem';
import AchievementTable from './AchievementTable';
import AchievementChart from './AchievementChart';

const Achievement = (props) => {
  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
          padding: 20,
        }}
      >
        <Grid container style={{ marginBottom: 34 }}>
          <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
            <TitleRateIcon />
            <Typography
              style={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '18px',
                marginLeft: 10,
              }}
            >
              Monthly Achievement Document
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AchievementTable type={props.type} />
          </Grid>
          <Grid item xs={6}>
            <AchievementChart />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Achievement;

const statuses = ['New', 'Renewal', 'Termin', 'Replace'];
