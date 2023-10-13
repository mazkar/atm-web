/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ChildStatus from '../ChildStatus';

function ChildScheduleStatus({value}) {
  if (value === 1) {
    return (
      <ChildStatus
        value="Active"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#D9FFDD"
      />
    );
  } 
  return (
    <ChildStatus
      value="Inactive"
      borderColor="#FF6A6A"
      textColor="#FF6A6A"
      fillColor="#FFF6F6"
    />
  );
        
}

ChildScheduleStatus.propTypes = {};

export default ChildScheduleStatus;
