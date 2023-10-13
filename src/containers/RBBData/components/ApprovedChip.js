import React from 'react';
import { Typography } from '@material-ui/core';
import { ReactComponent as GreenCheckIcon } from '../../../assets/icons/general/green_check_circle.svg';

const ApprovedChip = () => {
  return (
    <div
      style={{
        padding: '2px 12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 40,
        border: '1px solid #65D170',
        backgroundColor: '#D9FFDD',
        width: 'fit-content',
      }}
    >
      <GreenCheckIcon width={16} height={16} />
      <Typography
        style={{
          marginLeft: 10,
          color: '#65D170',
          fontSize: 13,
          fontWeight: 400,
        }}
      >
        Approved
      </Typography>
    </div>
  );
};

export default ApprovedChip;
