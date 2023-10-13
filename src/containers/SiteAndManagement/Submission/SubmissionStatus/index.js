import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  value: {
    fontSize: 13,
  },
  menuMoreItem: {
    fontSize: 13,
    justifyContent: "space-between",
    display: "flex",
    "&:hover": {
      color: "#DC241F",
    },
  },
});

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/planning/g) || [];
    if (result.length) {
      return result[0];
    } else {
      return value;
    }
  }
};

function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}
function renderStatusSubmission(param, userRoleName) {

  if (param === "1") {
    return (
      <Status
        value="Incompleted"
        borderColor="#FFB443"
        textColor="#FFB443"
        fillColor="#FFF9F0"
      />
    );
  } if (param === "2") {
    return (
      <Status
        value="Completed"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#D9FFDD"
      />
    );
  } if (param === "3") {
    return (
      <Status
        value={"Waiting Approval"}
        borderColor="#88ADFF"
        textColor="#88ADFF"
        fillColor="#EFF4FF"
      />
    );
  } if (param === "4") {
    return (
      <Status
        value="Late"
        borderColor="#FF7A76"
        textColor="#FF7A76"
        fillColor="#FFE9E9"
      />
    );
  } if (param === "5") {
    return (
      <Status
        value="Waiting Approval"
        borderColor="#FF7A76"
        textColor="#FF7A76"
        fillColor="#FFE9E9"
      />
    );
  } 
  return <center>-</center>;
    
}

function SubmissionStatus(props) {
  const {value, userRoleName} = props;
  return (
    <>
      {renderStatusSubmission(value, userRoleName)}
    </>
  );
}

SubmissionStatus.propTypes = {
  value: PropTypes.string,
  userRoleName: PropTypes.string,
};

SubmissionStatus.defaultProps = {
  value: 'string',
  userRoleName: 'string',
};

export default SubmissionStatus;

