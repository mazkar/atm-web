/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import ChildStatus from "../ChildStatus";

function ChildTicketStatus({ value }) {
  switch (value) {
  case 1:
    return (
      <ChildStatus
        value="Done"
        borderColor="#65D170"
        textColor="#65D170"
        fillColor="#DEFFE1"
      />
    );
  case 2:
    return (
      <ChildStatus
        value="Assign to Vendor"
        borderColor="#749BFF"
        textColor="#749BFF"
        fillColor="#EBF0FF"
      />
    );
  default:
    return (
      <ChildStatus
        value="Open"
        borderColor="#FF6A6A"
        textColor="#FF6A6A"
        fillColor="#FFF6F6"
      />
    );
  }
}

ChildTicketStatus.propTypes = {};

export default ChildTicketStatus;
