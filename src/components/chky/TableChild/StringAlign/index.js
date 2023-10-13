/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function StringAlign(props) {
  const {value, align = 'center'} = props;
  return (
    <Typography style={{fontSize: 13, fontWeight: 400, color: '#2B2F3C', textAlign: `${align}`}}>
      {value === null ? "-" : value === "" ? "-" : value}
    </Typography>
  );

}

StringAlign.propTypes = {
  value: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
};

export default StringAlign;

