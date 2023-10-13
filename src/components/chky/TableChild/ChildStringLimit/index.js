/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function ChildStringLimit(props) {
  const {value, align , limit = 20} = props;
  function stringLim(text){
    return text.toString().slice(0, limit) + (text.length > limit ? "..." : "");
  };
  return (
    <Typography 
      style={{
        fontSize: 13, 
        fontWeight: 400, 
        color: '#2B2F3C', 
        textAlign: `${align}`, 
        width: "max-content",
        margin: align !== "center" ? 0 : "auto",
      }}>
      {value ? stringLim(value) : ""}
    </Typography>
  );

}

ChildStringLimit.propTypes = {
  value: PropTypes.string.isRequired,
  align: PropTypes.string,
  limit: PropTypes.number.isRequired,
};

ChildStringLimit.defaultProps = {
  align: "center",
};

export default ChildStringLimit;

