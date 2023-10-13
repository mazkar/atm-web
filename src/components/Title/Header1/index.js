/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from 'antd';

import SelectWithCaptions from '../../Selects/SelectWithCaptions';
import GeneralButton from '../../Button/GeneralButton';

const Header1 = ({
  defaultValue,
  suggestions,
  handleOnchange,
  style,
  width,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Row
        style={
          style !== undefined
            ? style
            : {
              alignItems: 'center',
              borderBottom: '1px solid #e5edf8',
              height: '70px',
              padding: '0px 20px',
              width: '100%',
            }
        }
      >
        <div style={{ width: '35%' }}>
          <SelectWithCaptions
            bordered="CommonSelect__select--bordered"
            caption="View"
            defaultValue={defaultValue}
            handleChange={handleOnchange}
            suggestions={suggestions}
            width={width !== undefined ? width : '110px'}
          />
        </div>
        <Row style={{ width: '65%', justifyContent: 'flex-end' }}>
          <SelectWithCaptions
            bordered="CommonSelect__select--bordered"
            caption="Start Date"
            defaultValue="11/09/2001"
            handleChange={handleOnchange}
            width="125px"
            isDatePicker
          />
          <SelectWithCaptions
            bordered="CommonSelect__select--bordered"
            caption="End Date"
            defaultValue="11/09/2001"
            handleChange={handleOnchange}
            width="125px"
            isDatePicker
          />
          <GeneralButton title="Apply" width="92px" height="31px" />
        </Row>
      </Row>
    </div>
  );
};

export default Header1;
