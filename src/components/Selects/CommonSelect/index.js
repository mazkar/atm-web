/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Select } from "antd";

import PropTypes from "prop-types";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/general/dropdown_red.svg";

const { Option } = Select;

const CommonSelect = ({ bordered, suggestions, defaultValue, width, handleChange, color, disable, disabled, value }) => {
  return (
    <div>
      {disable || disabled ?
        <Select
          className={bordered ? `CommonSelect__select--bordered ${color}` : "CommonSelect__select"}
          defaultValue={defaultValue} style={{ width: `${width}` }}
          value={value || defaultValue}
          onChange={(value) => handleChange(value)}
          suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
          dropdownStyle={{ zIndex: 1500 }}
          disabled
        >
          {suggestions.map(({ value, nameId }) => (
            <Option key={nameId} className="CommonSelect__select-option" value={value} >{nameId}</Option>
          ))}
        </Select>
        :
        <Select
          className={bordered ? `CommonSelect__select--bordered ${color}` : "CommonSelect__select"}
          defaultValue={defaultValue} style={{ width: `${width}` }}
          value={value || defaultValue}
          onChange={(value) => handleChange(value)}
          suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
          dropdownStyle={{ zIndex: 1500 }}
        >
          {suggestions.map(({ value, nameId }) => (
            <Option key={nameId} className="CommonSelect__select-option" value={value} >{nameId}</Option>
          ))}
        </Select>
      }
    </div>
  );
};

CommonSelect.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    nameEn: PropTypes.string.isRequired,
    nameId: PropTypes.string.isRequired
  })).isRequired,
  // defaultValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  color: PropTypes.string,
  disable: PropTypes.bool.isRequired
};

CommonSelect.defaultProps = {
  bordered: false,
  color: '',
  disable: false
};

export default CommonSelect;