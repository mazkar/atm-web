import React from 'react';
import { Paper, Typography } from '@material-ui/core';

import CustomDropdown from '../components/CustomDropdown';
import RedButton from '../../../components/Button/RedButton';

const FilterBar = () => {
  return (
    <Paper
      style={{
        marginTop: 30,
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
        padding: 16,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: 30 }}>
        <Typography
          style={{
            fontWeight: '600',
            fontSize: '13px',
            lineHeight: '16px',
          }}
        >
          Showing :
        </Typography>
      </div>
      <div style={{ marginRight: 30 }}>
        <CustomDropdown label='Channel' />
      </div>
      <div>
        <CustomDropdown label='Module' />
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <RedButton label='Apply Filter' />
      </div>
    </Paper>
  );
};

export default FilterBar;
