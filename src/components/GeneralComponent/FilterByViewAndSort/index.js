/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import SelectWithCaptions from '../../Selects/SelectWithCaptions';
import GeneralButton from '../../Button/GeneralButton';

const FilterByViewAndSort = ({
  viewingSuggestions,
  sortingSuggestions,
  handleViewByOnChange,
  handleSortByOnChange,
  handleStartDateOnChange,
  handleEndDateOnChange,
  onFilterSubmit,
  caption1,
  caption2,
  className
}) => {
  return (
    <div
      className={className !== undefined ? className : 'FilterByViewAndSort'}
    >
      <Row>
        <Col span="12">
          <Row justify="start">
            <Col>
              <SelectWithCaptions
                bordered
                caption={caption1 !== undefined ? caption1 : 'View By'}
                suggestions={viewingSuggestions}
                defaultValue={viewingSuggestions[0].value}
                handleChange={handleViewByOnChange}
                width="100%"
              />
            </Col>
            {sortingSuggestions !== null ? (
              <Col>
                <SelectWithCaptions
                  bordered
                  caption={caption2 !== undefined ? caption2 : 'Sort By'}
                  suggestions={sortingSuggestions}
                  defaultValue={sortingSuggestions[0].value}
                  handleChange={handleSortByOnChange}
                  width="100%"
                />
              </Col>
            ) : null}
          </Row>
        </Col>
        <Col span="12">
          <Row justify="end" gutter="2px">
            <Col>
              <SelectWithCaptions
                caption="Start Date"
                width="100%"
                isDatePicker
                defaultValue="11/09/2001"
                handleChange={handleStartDateOnChange}
              />
            </Col>
            <Col>
              <SelectWithCaptions
                caption="End Date"
                width="100%"
                isDatePicker
                defaultValue="11/09/2001"
                handleChange={handleEndDateOnChange}
              />
            </Col>
            <Col >
              <GeneralButton
                title="Apply"
                height="14"
                width='100%'
                onClick={() => onFilterSubmit}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FilterByViewAndSort;
