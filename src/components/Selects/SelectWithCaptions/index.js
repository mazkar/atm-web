import React from "react";

import { Row, Col } from "antd";

import PropTypes from "prop-types";

import CommonSelect from "../CommonSelect";
import DateSelect from "../DateSelect";

const SelectWithCaptions = ({ caption, isDatePicker, ...props }) => {
  return (
    <div className="SelectWithCaptions">
      <Row gutter="7px" type="flex">
        <Col className="SelectWithCaptions__container-caption">
          <span
            className="SelectWithCaptions__caption"
            style={{ fontSize: 13, fontWeight: 400, color: "#2B2F3C" }}
          >
            {caption} :
          </span>
        </Col>
        <Col className="SelectWithCaptions__container-select">
          {isDatePicker ? (
            <DateSelect {...props} />
          ) : (
            <CommonSelect {...props} />
          )}
        </Col>
      </Row>
    </div>
  );
};

SelectWithCaptions.propTypes = {
  caption: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      nameEn: PropTypes.string.isRequired,
      nameId: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  isDatePicker: PropTypes.bool,
};

SelectWithCaptions.defaultProps = {
  isDatePicker: false,
};

export default SelectWithCaptions;
