import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import './yearselect.css';

const { Option } = Select;

const YearSelect = (props) => {
    const { style, years, value, defaultValue, onChange } = props;
    return (
        <Select
            style={style}
            className='selectYear'
            defaultValue={defaultValue}
            value={value || defaultValue}
            onChange={(value) => onChange(value)}
            suffixIcon={<DropDownIcon/>}
            placeholder='pilih tahun'
            dropdownStyle={{ zIndex: 1500 }}
        >
          {years.map(item => (
            <Option value={item} >{item}</Option>
          ))}
        </Select>
    );
};

YearSelect.propTypes = {
    years: PropTypes.array,
    value: PropTypes.number,
    defaultValue: PropTypes.string
};

YearSelect.defaultProps = {
    years: [],
    value: null,
    defaultValue: ''
};

export default YearSelect;