import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { Radio } from 'antd';

export const RadioControllerButton = (props) => {
  const { children, value } = props;
  return (
    <Radio.Button className="RadioController__button" value={value} {...props}>
      {children}
    </Radio.Button>
  );
};

RadioControllerButton.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.element.isRequired
};

export const RadioControllerContainer = (props) => {
  const { children, defaultValue, onChange } = props;
  return (
    <Radio.Group className="RadioController__group" value={defaultValue} onChange={onChange}>
      {children}
    </Radio.Group>
  );
};

RadioControllerContainer.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired
};
