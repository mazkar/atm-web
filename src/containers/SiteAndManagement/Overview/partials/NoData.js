import React from 'react';
import { Typography } from '@material-ui/core';
import emptyImg from '../../../../assets/images/empty_data.png';
const NoData = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={emptyImg} />
      <Typography>No data</Typography>
    </div>
  );
};

export default NoData;
