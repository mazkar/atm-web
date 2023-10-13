/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const ButtonLink = (props) => {
  const { title, height, onClick, disabled, ...other } = props;

  return (
    <Button
      style={disabled? {
        backgroundColor: 'transparent',
        color: '#BCC8E7',
        fontWeight: 400,
        fontSize: 13,
        border: 'none',
        boxShadow: '0 0 0',
        height,
      }: {
        backgroundColor: 'transparent',
        color: '#DC241F',
        fontWeight: 400,
        fontSize: 13,
        border: 'none',
        boxShadow: '0 0 0',
        height,
      }}
      onClick={onClick}
      type="link"
      disabled={disabled}
      {...other}
    >
      {title}
    </Button>
  );
};

ButtonLink.propTypes = {
  title: PropTypes.node,
  height: PropTypes.number,
  paddingLeft: PropTypes.number,
  disabled: PropTypes.bool,
};

ButtonLink.defaultProps = {
  title: 'Link',
  height: 40,
  paddingLeft: 14,
  disabled: false,
};

export default ButtonLink;
