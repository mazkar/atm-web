import React from "react";
import PropTypes from "prop-types";
import { Chart, Line, Point, Tooltip, Legend } from "bizcharts";
import { Typography } from "@material-ui/core";
import { Button, Col, Row } from "antd";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  Dark,
} from "../../../../assets/theme/colors";

const tplTooltip =
  '<li style="margin-bottom:12px !important;" data-index={index}>' +
  '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
  "{name}: {value}" +
  "</li>";

const scale = {
  temperature: { min: 0 },

  city: {
    formatter: (v) => {
      return {
        IM: "IM",
        MT: "MT",
        MP: "MP",
        SC: "SC",
      }[v];
    },
  },
};

export default function LineCharts3(props) {
  const { dataChartPart3, flagHalf3, setFlagHalf3 } = props;
  const plusHalf = () => {
    setFlagHalf3(true);
  };
  const minusHalf = () => {
    setFlagHalf3(false);
  };

  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        padding: 20,
        height: "100%",
      }}
    >
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
              marginRight: 18,
              padding: "3px 6px 3px 6px",
              justifyContent: "space-between",
              alignItems: "center",

              display: "flex",

              borderRadius: 8,
            }}
          >
            <ArrowBackIosIcon
              style={
                flagHalf3
                  ? { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
                  : { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
              }
              onClick={minusHalf}
            />

            <Typography style={{ fonstSize: 8 }}>
              {flagHalf3 ? "2nd Half" : "1st Half"}
            </Typography>

            <ArrowForwardIosIcon
              style={
                flagHalf3
                  ? { color: "#a6a6a6", fontSize: 14, fontWeight: "bold" }
                  : { color: "#DC241F", fontSize: 14, fontWeight: "bold" }
              }
              onClick={plusHalf}
            />
          </Col>
        </Row>
      </div>
      <Chart
        scale={scale}
        padding={[30, 20, 60, 40]}
        autoFit
        height={320}
        data={dataChartPart3}
        interactions={["element-active"]}
      >
        <Point
          position="date*value"
          shape="square"
          color={["stuff", ["#eb9b49", "#e01111", "#4188d0", "#3cc53a"]]}
          showCrosshairs={false}
        />
        <Line
          shape="smooth"
          position="date*value"
          color={["stuff", ["#eb9b49", "#e01111", "#4188d0", "#3cc53a"]]}
          label=""
        />

        <Tooltip itemTpl={tplTooltip} showTitle={false} />
        <Legend />
      </Chart>
    </div>
  );
}
LineCharts3.propTypes = {
  dataChartPart3: PropTypes.array.isRequired,
};
