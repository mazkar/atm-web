import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';

import { ReactComponent as CalcIcon } from '../../../../assets/icons/general/calculator_overview.svg';
import SummaryBarChart from './SummaryBarChart';
import SummaryDonutChart from './SummaryDonutChart';

const Summary = () => {
  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
          borderRadius: '10px',
          padding: 20,
        }}
      >
        <div
          style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}
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
            Summary All Document
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <SummaryBarChart />
          </Grid>
          <Grid item xs={6}>
            <SummaryDonutChart />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Summary;
