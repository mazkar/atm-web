import React from 'react';
import { Typography } from '@material-ui/core';

import { GrayUltrasoft } from '../../assets/theme/colors';
import FilterBar from './partials/FilterBar';
import TableSection from './partials/TableSection';

const index = () => {
  return (
    <div style={{ padding: 30, backgroundColor: GrayUltrasoft }}>
      <Typography
        style={{
          fontWeight: '500',
          fontSize: '28px',
          lineHeight: '34px',
          textShadow: '0px 6px 10px rgba(0, 0, 0, 0.08)',
        }}
      >
        App Audit
      </Typography>
      <FilterBar />
      <TableSection/>
    </div>
  );
};

export default index;
