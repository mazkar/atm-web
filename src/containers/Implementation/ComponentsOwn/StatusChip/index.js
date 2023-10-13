import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const StatusChip=(props)=>{
    
  const { value } = props;

  switch (value) {
  case 'InProgress':
    return <span style={{padding: '4px 10px', borderRadius: 20, border: '1px solid #88ADFF', color: '#88ADFF', fontSize: 12, fontWeight: 400, backgroundColor: '#EFF4FF'}}>
        Inprogress
    </span>;
  case 'Done':
    return <span style={{padding: '4px 10px',  borderRadius: 20, border: '1px solid #65D170', color: '#65D170', fontSize: 12, fontWeight: 400, backgroundColor: '#DEFFE1'}}>
        Done
    </span>;
  default:
    return 'N/A';
  }
};

StatusChip.propTypes = {
  value: PropTypes.string.isRequired,
};

export default StatusChip;

