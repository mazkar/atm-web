import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PrimaryHard } from '../../../../assets/theme/colors';

const ChipFilter = () => {
  const [filter2, setFilter2] = useState({
    prof1: { label: 'Profiling-1', active: false },
    prof2: { label: 'Profiling-2', active: false },
    nego: { label: 'Negotiation', active: false },
    proc: { label: 'Procurement', active: false },
    sub: { label: 'Submission', active: false },
    imp: { label: 'Implementation', active: false },
  });

  function handleClickFilter2(keyName) {
    let item = filter2[keyName];
    let active = item.active;
    let newVal = { ...item, active: !active };
    setFilter2((f) => ({ ...f, [keyName]: newVal }));
  }

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: '2',
        top: '70px',
      }}
    >
      {Object.keys(filter2).map((keyName, i) => (
        <CustomChip
          key={i}
          label={filter2[keyName].label}
          onClick={() => handleClickFilter2(keyName)}
          variant={filter2[keyName].active ? 'default' : 'outlined'}
        />
      ))}
    </div>
  );
};

export default ChipFilter;

const CustomChip = withStyles((theme) => ({
  root: {
    backgroundColor: PrimaryHard,
    color: 'white',
    height: 28,
    borderRadius: '40px',
    marginRight: 10,
    border: `1px solid ${PrimaryHard}`,
  },
  outlined: {
    backgroundColor: 'white',
    color: PrimaryHard,
  },
  label: { fontWeight: 500, fontSize: '13px', lineHeight: '16px' },
  clickable: {
    '&:hover': { backgroundColor: PrimaryHard },
    '&:focus': { backgroundColor: PrimaryHard },
    '&.MuiChip-outlined': {
      '&:focus': { backgroundColor: 'white' },
      '&:hover': { backgroundColor: 'white' },
    },
  },
}))(Chip);
