/* eslint-disable react/prop-types */
import React from 'react';
import ChildStatus from '../ChildStatus';

function ChildResultStatus({value}) {
  switch (value) {
  case 1:
    return (
      <ChildStatus
        value="Open"
        borderColor="#FF6A6A"
        textColor="#FF6A6A"
        fillColor="#FFF6F6"
      />
    );
  case 2:
    return (
      <ChildStatus
        value="Survey Done"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#DEFFE1"
      />
    );
  case 3:
    return (
      <ChildStatus
        value="Survey Delay"
        borderColor="#FFB443"
        textColor="#FFB443"
        fillColor="#FFF9F0"
      />
    );
  case 4:
    return (
      <ChildStatus
        value="Not Survey"
        borderColor="#CB88FF"
        textColor="#CB88FF"
        fillColor="#F3E3FF"
      />
    );
  case 5:
    return (
      <ChildStatus
        value="Manual"
        borderColor="#749BFF"
        textColor="#749BFF"
        fillColor="#EBF0FF"
      />
    );
    
  default:
    return (
      <ChildStatus
        value="-"
        borderColor="#FF6A6A"
        textColor="#FF6A6A"
        fillColor="#FFF6F6"
      />
    );
  }
        
}

ChildResultStatus.propTypes = {};

export default ChildResultStatus;
