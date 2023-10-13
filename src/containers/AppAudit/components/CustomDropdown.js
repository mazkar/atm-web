import React from 'react';
import { Select } from 'antd';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const { Option } = Select;

const useStyles = makeStyles(() => ({}));

const CustomDropdown = ({ handleChange, label }) => {
  return (
    <div>
      <Typography
        component='span'
        // variant='span'
        style={{
          fontSize: '13px',
          lineHeight: '16px',
        }}
      >
        {label} :{' '}
      </Typography>
      <Select
        defaultValue=''
        style={{ width: 120, fontSize: '13px', lineHeight: '16px', fontFamily: 'Barlow' }}
        onChange={handleChange}
      >
        <Option value=''>All</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='Yiminghe'>yiminghe</Option>
      </Select>
    </div>
  );
};

export default CustomDropdown;
