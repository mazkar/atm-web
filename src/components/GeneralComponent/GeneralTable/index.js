/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from "react";
import { Table } from "antd";

const GeneralTable = ({ containerStyles, ...props }) => {
  return (
    <div style={containerStyles}>
      <Table {...props} />
    </div>
  );
};

export default GeneralTable;