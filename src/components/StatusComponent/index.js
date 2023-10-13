import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
function Status({borderColor, fillColor, textColor, value}) {
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor,
          background: fillColor,
          color: textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          // margin: "auto",
        }}
      >
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}

function StatusComponent({color = "blue", lable = ""}) {
  switch (color) {
  case "yellow":
    return <Status
      value={lable}
      borderColor="#FFB443"
      textColor="#FFB443"
      fillColor="#FFF9F0"
    />;

  case "green":
    return <Status
      value={lable}
      borderColor="#65D170"
      textColor="#65D170"
      fillColor="#DEFFE1"
    />;
  case "red":
    return <Status
      value={lable}
      borderColor="#FF6A6A"
      textColor="#FF6A6A"
      fillColor="#FFF6F6"
    />;
  default:
    return null;
  }
}

StatusComponent.propTypes = {
  color: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
};

export default StatusComponent;

