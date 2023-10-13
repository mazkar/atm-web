/* eslint-disable react/prop-types */
import React from 'react';
import ChildStatus from '../../chky/TableChild/ChildStatus';

function StatusTask({value}) {
  switch (value) {
  case 0:
    return (
      <ChildStatus
        value="Open"
        borderColor="#FF6A6A"
        textColor="#FF6A6A"
        fillColor="#FFF6F6"
      />
    );
  case 1:
    return (
      <ChildStatus
        value="Todo"
        borderColor="#BCC8E7"
        textColor="#BCC8E7"
        fillColor="#F4F7FB"
      />
    );
  case 2:
    return (
      <ChildStatus
        value="Ongoing"
        borderColor="#80bdff"
        textColor="#80bdff"
        fillColor="#F4F7FB"
      />
    );
  case 3:
    return (
      <ChildStatus
        value="Done"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#DEFFE1"
      />
    );
  case 4:
    return (
      <ChildStatus
        value="Overdue"
        borderColor="#FFB443"
        textColor="#FFB443"
        fillColor="#FFF9F0"
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

StatusTask.propTypes = {};

export default StatusTask;
