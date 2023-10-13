import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Typography } from "@material-ui/core";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function ButtonFirstHalf() {
  const [flagHalf, setFlagHalf] = useState(false);

  const plusHalf = () => {
    setFlagHalf(true);
  };
  const minusHalf = () => {
    setFlagHalf(false);
  };

  useEffect(() => {
    console.log(flagHalf, "flag conditional");
  }, [flagHalf]);
  return (
    <div>
      <Row
        gutter={24}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Col
          xl={5}
          style={{
            border: "1px solid #BCC8E7",
            marginRight: 24,
            padding: "3px 6px 3px 6px",
            justifyContent: "space-between",
            alignItems: "center",

            display: "flex",

            borderRadius: 8,
          }}
        >
          <ArrowBackIosIcon
            style={
              flagHalf
                ? { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
                : { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
            }
            onClick={minusHalf}
          />

          <Typography style={{ fonstSize: 8 }}>
            {flagHalf ? "2nd Half" : "1st Half"}
          </Typography>

          <ArrowForwardIosIcon
            style={
              flagHalf
                ? { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
                : { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
            }
            onClick={plusHalf}
          />
        </Col>
      </Row>
    </div>
  );
}
