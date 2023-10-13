import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function excecuteStyle(val, borderColor, textColor,fillColor){
  return <Typography align="center" style={{
    borderRadius: 20,
    width: 'max-content',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 'auto', 
    border: `1px solid ${borderColor}`, 
    color: textColor, 
    fontSize: 13, 
    fontWeight: 500, 
    backgroundColor: fillColor}}
  >
    {val}
  </Typography>;
}

function ChildStatusApproval(props) {
  const { status } = props;
  function renderType(str){
    if (str === null){
      return '';
    }
    const string = str.toString();
    switch (string) {
    case '1':
      return  excecuteStyle('Need Approval', '#FFB443', '#FFB443', '#FFF9F0');
    case '2':
      return excecuteStyle('Approved', '#65D170', '#65D170', '#DEFFE1');
    case '3':
      return excecuteStyle('Rejected', '#FF7A76', '#FF7A76', '#FFE9E9');
    case '10':
      return excecuteStyle('Rejected', '#FF7A76', '#FF7A76', '#FFE9E9');
    default:
      return '';
    }
  }
  return renderType(status);
}

ChildStatusApproval.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ChildStatusApproval;

