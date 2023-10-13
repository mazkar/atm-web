import { Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from "prop-types";

const TieringList = ({ array }) => {
  return (
    <>
      {array.map((price, index) => (
        <Typography style={{ textAlign: 'center' }}>{array.length > 1 && `th-${index+1}` } {price}</Typography> 
      ))}
    </>
  );
};

TieringList.propTypes={
  // eslint-disable-next-line react/forbid-prop-types
  array: PropTypes.any.isRequired,
};

export default TieringList;
