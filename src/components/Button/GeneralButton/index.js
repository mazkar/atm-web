/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const GeneralButton = (props) => {
  const { title, width, height, onClick } = props;

  return (
    <Button
      style={{
        backgroundColor: '#99CC00',
        borderColor: '#99CC00',
        borderRadius: '6px',
        color: '#ffffff',
        width,
        height,
        fontFamily: 'NunitoRegular',
        fontWeight: '600',
        fontSize: '14px',
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

GeneralButton.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

GeneralButton.defaultProps = {
  title: "Tombol",
  width: 100,
  height: 40,
};

export default GeneralButton;
