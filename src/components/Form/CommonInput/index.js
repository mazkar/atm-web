/* eslint-disable react/prop-types */
import React from "react";
import { Input } from "antd";

const CommonInput = ({ id, label, className, labelClassName, ...props }) => {
  return (
    <div className={className || 'CommonInput'}>
      {label ?
        <label htmlFor={id} className={labelClassName || 'CommonInput__label'}>
          {label}
        </label>
        :
        null
      }
      <Input id={id} {...props} />
    </div>
  );
};

export default CommonInput;