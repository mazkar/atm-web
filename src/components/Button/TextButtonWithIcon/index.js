/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Row } from 'antd';

const TextButtonWithIcon = (props) => {
  const { title, icon, onClick } = props;

  return (
    <Button
      style={{
        backgroundColor: 'transparent',
        color: '#99CC00',
        fontFamily: 'NunitoRegular',
        fontWeight: '600',
        fontSize: '14px',
        border: 'none',
        boxShadow: '0 0 0',
        height: '30px',
      }}
      onClick={onClick}
      type="link"
    >
      <Row>
        <div>{title}</div>
        <div style={{ marginLeft: '6.25px' }}>{icon}</div>
      </Row>
    </Button>
  );
};

export default TextButtonWithIcon;
