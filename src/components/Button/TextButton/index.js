/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const TextButton = (props) => {
  const { title, height, paddingLeft, onClick, ...other } = props;

  return (
    <Button
      style={{
        backgroundColor: 'transparent',
        color: '#DC241F',
        fontFamily: 'NunitoRegular',
        fontWeight: '600',
        fontSize: '14px',
        border: 'none',
        boxShadow: '0 0 0',
        height,
        paddingLeft,
      }}
      onClick={onClick}
      type="link"
      {...other}
    >
      {title}
    </Button>
  );
};

TextButton.propTypes = {
  title: PropTypes.string,
  height: PropTypes.number,
  paddingLeft: PropTypes.number,
};

TextButton.defaultProps = {
  title: 'Tombol',
  height: 40,
  paddingLeft: 14,
};

export default TextButton;
