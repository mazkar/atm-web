/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Select } from "antd";
import { Grid } from '@material-ui/core';
import PropTypes from "prop-types";

import { ReactComponent as AngleDownIcon } from "../../../assets/icons/general/dropdown_red.svg";

const { Option } = Select;

const CommonSelect = ({ bordered, suggestions, defaultValue, width, handleChange, color, disable, disabled, value, handleKey }) => {
  return (
    <div>
      {disable || disabled ?
        <Select
          className={bordered ? `CommonSelect__select--bordered ${color}` : "CommonSelect__select"}
          defaultValue={defaultValue} style={{ width: `${width}` }}
          value={value || defaultValue}
          onChange={(value, key) => {handleChange(value); handleKey(key);}}
          suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
          dropdownStyle={{ zIndex: 1500 }}
          disabled
        >
          {suggestions.map(({ value, id, icon }) => (
            <Option key={id} className="CommonSelect__select-option" value={value} >
              <Grid container direction='row'>
                  <Grid item style={{padding: "5px 10px"}}>{icon}</Grid>
                  <Grid item>{value}</Grid>
              </Grid>
            </Option>
          ))}
        </Select>
        :
        <Select
          className={bordered ? `CommonSelect__select--bordered ${color}` : "CommonSelect__select"}
          defaultValue={defaultValue} style={{ width: `${width}` }}
          value={value || defaultValue}
          // onChange={(value) => handleChange(value)}
          onChange={(value, key) => {handleChange(value); handleKey(key);}}
          suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
          dropdownStyle={{ zIndex: 1500 }}
        >
          {suggestions.map(({ value, id, icon }) => (
            <Option key={id} className="CommonSelect__select-option" value={value} >
                <Grid container direction='row'>
                    <Grid item style={{padding: "5px 10px"}}>{icon}</Grid>
                    <Grid item>{value}</Grid>
                </Grid>
            </Option>
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